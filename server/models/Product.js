import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'اسم المنتج مطلوب'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['furniture', 'decoration', 'building_materials', 'contractor_service', 'repair_service'],
    required: true
  },
  subcategory: String,
  price: {
    type: Number,
    required: [true, 'السعر مطلوب'],
    min: 0
  },
  discountPrice: Number,
  discountPercent: {
    type: Number,
    default: 0,
    max: 100
  },
  images: [{
    url: String,
    alt: String
  }],
  thumbnail: String,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specifications: {
    material: String,
    color: String,
    size: String,
    dimensions: String,
    weight: String
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    rating: Number,
    comment: String,
    images: [String],
    helpful: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }],
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;