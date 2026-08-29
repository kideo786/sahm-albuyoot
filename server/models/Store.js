import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'اسم المتجر مطلوب'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['furniture', 'decoration', 'building', 'contractor', 'repair'],
    required: true
  },
  logo: String,
  banner: String,
  cover: String,
  phone: {
    type: String,
    required: true
  },
  email: String,
  address: {
    street: String,
    city: String,
    region: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  operatingHours: {
    open: String,
    close: String,
    daysOpen: [String]
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    reviews: [{
      userId: mongoose.Schema.Types.ObjectId,
      userName: String,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }]
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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

const Store = mongoose.model('Store', storeSchema);
export default Store;