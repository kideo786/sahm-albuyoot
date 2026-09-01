import React, { useState } from 'react';
import { FaShoppingCart, FaBox, FaChartLine, FaStore } from 'react-icons/fa';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [storeData, setStoreData] = useState({
    storeName: '',
    category: 'furniture',
    description: '',
    phone: '',
    address: ''
  });
  const [documents, setDocuments] = useState([]);

  const handleStoreChange = (e) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files]);
  };

  const handleSubmitStore = async (e) => {
    e.preventDefault();
    
    // محاكاة إرسال البيانات
    console.log('Store Request:', { ...storeData, documents });
    alert('✅ تم إرسال طلب فتح المتجر! سيتم مراجعته من قبل الإدارة خلال 24-48 ساعة');
    setShowStoreForm(false);
  };

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h2>🏪 لوحة تحكم البائع</h2>
        {!showStoreForm && (
          <button 
            className="open-store-btn"
            onClick={() => setShowStoreForm(true)}
          >
            <FaStore /> افتح متجرك الآن
          </button>
        )}
      </div>

      {showStoreForm && (
        <div className="store-form-container">
          <div className="form-header">
            <h3>📝 طلب فتح متجر</h3>
            <p>⚠️ جميع البيانات والمستندات مطلوبة - سيتم التحقق من قبل الإدارة</p>
          </div>

          <form onSubmit={handleSubmitStore} className="store-form">
            <div className="form-group">
              <label>اسم المتجر *</label>
              <input
                type="text"
                name="storeName"
                placeholder="مثلاً: متجر الفخامة للأثاث"
                value={storeData.storeName}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="form-group">
              <label>الفئة *</label>
              <select
                name="category"
                value={storeData.category}
                onChange={handleStoreChange}
                required
              >
                <option value="furniture">🛋️ الأثاث</option>
                <option value="decoration">✨ الديكورات</option>
                <option value="building_materials">🔧 مواد البناء</option>
                <option value="contractor">👷 مقاولون</option>
                <option value="repair">🔨 إصلاح</option>
              </select>
            </div>

            <div className="form-group">
              <label>الوصف *</label>
              <textarea
                name="description"
                placeholder="صف متجرك وخدماتك"
                value={storeData.description}
                onChange={handleStoreChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>رقم الهاتف *</label>
              <input
                type="tel"
                name="phone"
                placeholder="0501234567"
                value={storeData.phone}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="form-group">
              <label>العنوان *</label>
              <input
                type="text"
                name="address"
                placeholder="العنوان الكامل"
                value={storeData.address}
                onChange={handleStoreChange}
                required
              />
            </div>

            <div className="documents-section">
              <h4>📄 المستندات والتراخيص المطلوبة:</h4>
              <p className="document-info">
                ⚠️ الرجاء رفع النسخ الأصلية من المستندات التالية:
              </p>
              <div className="document-types">
                <label className="doc-label">
                  <input type="checkbox" disabled /> ✅ الهوية الوطنية
                </label>
                <label className="doc-label">
                  <input type="checkbox" disabled /> ✅ الرخصة التجارية
                </label>
                <label className="doc-label">
                  <input type="checkbox" disabled /> ✅ رقم التسجيل الضريبي
                </label>
                <label className="doc-label">
                  <input type="checkbox" disabled /> ✅ شهادة السجل التجاري
                </label>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="file-input"
                accept=".pdf,.jpg,.png,.jpeg"
              />
              {documents.length > 0 && (
                <div className="uploaded-files">
                  <p>✅ تم تحميل {documents.length} ملف(ات)</p>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">🚀 إرسال الطلب</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowStoreForm(false)}
              >
                ❌ إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine /> نظرة عامة
        </button>
        <button
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <FaBox /> المنتجات
        </button>
        <button
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <FaShoppingCart /> الطلبات
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview">
            <h3>📊 الإحصائيات</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>المبيعات الإجمالية</h4>
                <p className="stat-value">45,000 ر.س</p>
              </div>
              <div className="stat-card">
                <h4>عدد الطلبات</h4>
                <p className="stat-value">124</p>
              </div>
              <div className="stat-card">
                <h4>المنتجات</h4>
                <p className="stat-value">45</p>
              </div>
              <div className="stat-card">
                <h4>التقييم</h4>
                <p className="stat-value">⭐ 4.8</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <h3>📦 إدارة المنتجات</h3>
            <button className="add-product-btn">+ إضافة منتج جديد</button>
            <p>لا توجد منتجات حالياً</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h3>📋 الطلبات</h3>
            <p>لا توجد طلبات حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
