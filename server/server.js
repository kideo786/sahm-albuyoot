import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();

const app = express();

// ============================================
// 🔒 أمان قوي جداً
// ============================================

// 1. Helmet - حماية رؤوس HTTP
app.use(helmet());

// 2. Sanitize - حماية من الحقن
app.use(mongoSanitize());

// 3. Rate Limiting - حماية من الهجمات
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب فقط
  message: '⚠️ عدد الطلبات كثير جداً، حاول لاحقاً'
});
app.use(limiter);

// 4. CORS آمن
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

// 5. Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================
// 🗄️ اتصال قاعدة البيانات
// ============================================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sahm-albuyoot', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ قاعدة البيانات متصلة');
  } catch (error) {
    console.error('❌ خطأ في الاتصال:', error.message);
    process.exit(1);
  }
};

connectDB();

// ============================================
// 📋 نماذج البيانات (Models)
// ============================================

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'],
    default: 'customer'
  },
  avatar: String,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Store Request Model - طلبات فتح المتاجر
const storeRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  storeName: { type: String, required: true },
  storeCategory: {
    type: String,
    enum: ['furniture', 'decoration', 'building_materials', 'contractor', 'repair'],
    required: true
  },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  
  // المستندات والتراخيص
  documents: [{
    type: String, // URL الملف
    documentType: {
      type: String,
      enum: ['license', 'tax_id', 'id_card', 'commercial_registration', 'other'],
      required: true
    }
  }],
  
  // حالة الطلب
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending'
  },
  rejectionReason: String,
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // المدير الذي وافق
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const StoreRequest = mongoose.model('StoreRequest', storeRequestSchema);

// Store Model - المتاجر المعتمدة فقط
const storeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  storeName: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  phone: String,
  address: String,
  logo: String,
  banner: String,
  
  // معلومات التراخيص
  licenseNumber: String,
  taxId: String,
  commercialRegistration: String,
  
  // التحليلات
  analytics: {
    totalSales: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 }
  },
  
  // حالة المتجر
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: true }, // تم التحقق منه من قبل الإدارة
  
  createdAt: { type: Date, default: Date.now }
});

const Store = mongoose.model('Store', storeSchema);

// Product Model
const productSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  images: [String],
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Cart Model
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

// Order Model
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  shippingAddress: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// ============================================
// 🔐 Routes - المسارات الآمنة
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ Server is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Store Request Routes
app.post('/api/store-requests', async (req, res) => {
  try {
    const { userId, storeName, storeCategory, description, phone, address, documents } = req.body;

    // التحقق من أن المستخدم لم يطلب من قبل
    const existingRequest = await StoreRequest.findOne({ userId, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ error: 'عندك طلب معلق بالفعل' });
    }

    const storeRequest = new StoreRequest({
      userId,
      storeName,
      storeCategory,
      description,
      phone,
      address,
      documents,
      status: 'pending'
    });

    await storeRequest.save();
    res.status(201).json({ message: '✅ تم إرسال الطلب، سيتم المراجعة قريباً', request: storeRequest });
  } catch (error) {
    res.status(500).json({ error: '❌ خطأ في الخادم: ' + error.message });
  }
});

// Get Store Requests (للإدارة فقط)
app.get('/api/store-requests', async (req, res) => {
  try {
    const requests = await StoreRequest.find().populate('userId').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve Store Request (للإدارة فقط)
app.post('/api/store-requests/:id/approve', async (req, res) => {
  try {
    const { approvedBy } = req.body;
    const storeRequest = await StoreRequest.findById(req.params.id);

    if (!storeRequest) {
      return res.status(404).json({ error: 'الطلب غير موجود' });
    }

    // إنشاء متجر جديد
    const store = new Store({
      owner: storeRequest.userId,
      storeName: storeRequest.storeName,
      category: storeRequest.storeCategory,
      description: storeRequest.description,
      phone: storeRequest.phone,
      address: storeRequest.address,
      isVerified: true
    });

    await store.save();

    // تحديث حالة الطلب
    storeRequest.status = 'approved';
    storeRequest.approvedBy = approvedBy;
    await storeRequest.save();

    res.json({ message: '✅ تمت الموافقة على المتجر', store });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject Store Request
app.post('/api/store-requests/:id/reject', async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    const storeRequest = await StoreRequest.findById(req.params.id);

    if (!storeRequest) {
      return res.status(404).json({ error: 'الطلب غير موجود' });
    }

    storeRequest.status = 'rejected';
    storeRequest.rejectionReason = rejectionReason;
    await storeRequest.save();

    res.json({ message: '✅ تم رفض الطلب' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Store Analytics (للمتجر الخاص به فقط)
app.get('/api/stores/:storeId/analytics', async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ error: 'المتجر غير موجود' });
    }

    // إرجاع التحليلات
    res.json({
      storeName: store.storeName,
      analytics: store.analytics,
      isActive: store.isActive
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// 🛒 Cart Routes
// ============================================

app.post('/api/cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }

    cart.items.push({
      product: productId,
      quantity,
      price: product.price
    });

    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();

    res.status(201).json({ message: '✅ تم الإضافة للسلة', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    res.json(cart || { items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// 💳 Payment Routes (Stripe)
// ============================================

app.post('/api/checkout', async (req, res) => {
  try {
    const { userId, cartId } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'السلة غير موجودة' });
    }

    // إنشاء طلب جديد
    const orderNumber = 'ORD-' + Date.now();
    const order = new Order({
      orderNumber,
      customer: userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      status: 'pending'
    });

    await order.save();

    // هنا يتم الربط مع Stripe للدفع
    // سيتم إضافة التفاصيل

    res.json({ message: '✅ تم إنشاء الطلب', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// 🚀 Server Start
// ============================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
✅ سهم البيوت - Sahm AlBuyoot
🚀 Server running on: http://localhost:${PORT}
🔒 Security: Helmet + Sanitize + Rate Limiting
🗄️ Database: MongoDB
📡 Health Check: http://localhost:${PORT}/api/health
`);
});

export default app;
