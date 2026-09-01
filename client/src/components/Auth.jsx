import React, { useState } from 'react';
import { FaSignInAlt, FaUserPlus, FaTimes } from 'react-icons/fa';
import './Auth.css';

const Auth = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('الرجاء ملء جميع الحقول');
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        setError('الرجاء ملء جميع الحقول');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('كلمات المرور غير متطابقة');
        return false;
      }
      if (formData.password.length < 6) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, phone: formData.phone, password: formData.password };

      // محاكاة الطلب (سيتم تحديثه لاحقاً مع الخادم الحقيقي)
      setTimeout(() => {
        const token = 'fake-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ name: formData.name || 'المستخدم', email: formData.email }));
        onLoginSuccess();
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('❌ حدث خطأ: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="auth-header">
          <h2>{isLogin ? '🔐 تسجيل الدخول' : '✏️ إنشاء حساب'}</h2>
          <p>{isLogin ? 'ادخل بيانات حسابك' : 'أنشئ حساب جديد معنا'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="الاسم الكامل"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />

          {!isLogin && (
            <input
              type="tel"
              name="phone"
              placeholder="رقم الهاتف"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="تأكيد كلمة المرور"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field"
            />
          )}

          {error && <div className="error-message">⚠️ {error}</div>}

          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? '⏳ جاري المعالجة...' : (isLogin ? 'دخول' : 'إنشاء حساب')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? 'ليس لديك حساب؟' : 'هل لديك حساب بالفعل؟'}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'أنشئ حساب' : 'ادخل'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
