# 🏠 سهم البيوت - Sahm AlBuyoot

## 📋 تطبيق متاجر متخصص للبيوت والديكور والأثاث

تطبيق تجارة إلكترونية متقدم يجمع بين أفضل مميزات تطبيقات نينجا وحراج وهنقرستيشن وكيتا وسله وZ، مع ميزات إضافية مخصصة لقطاع البيوت والديكورات.

---

## 🎯 الميزات الرئيسية

### 📦 نظام المتاجر والمنتجات
- متاجر متخصصة في 5 فئات رئيسية
- نظام تقييمات وتعليقات مفصل
- عروض وخصومات ذكية
- بحث متقدم وفلترة
- صور عالية الجودة و3D Gallery

### 👥 نظام المستخدمين والأدوار
- **عميل عادي**: تصفح وشراء
- **بائع**: إدارة متجره
- **مقاول/حرفي**: تقديم خدمات
- **مسؤول إداري**: إدارة النظام
- **فريق دعم فني**: 4 مستويات رتب مع صلاحيات متدرجة

### 🔐 نظام الرتب والصلاحيات المتقدم
- **Super Admin (أنت)**: صلاحيات كاملة - إضافة إداريين فقط
- **Admin**: إدارة الإداريين والدعم والمستخدمين
- **Support Tier 3 (قائد فريق)**: إدارة فريق الدعم والتقارير
- **Support Tier 2 (متخصص)**: معالجة قضايا معقدة
- **Support Tier 1 (عضو عادي)**: معالجة قضايا عامة
- **Lead**: قيادة الفريق والمراجعة

### 💬 نظام الدعم الفني
- Chatbot للأسئلة الشائعة
- Live Chat مباشر مع فريق الدعم
- نظام التذاكر (Support Tickets)
- سجل المحادثات

### 🛒 نظام الطلبات والدفع
- سلة تسوق ذكية
- خيارات دفع متعددة
- تتبع الطلبات بالخريطة
- الشراء السريع

### ⭐ نظام التقييمات والعروض
- تقييمات ونجوم للمنتجات والمتاجر
- تعليقات مع صور ورد المتجر
- عروض محدودة بالوقت (Flash Sale)
- كود خصم وبرامج ولاء

### 📊 لوحة التحكم الإدارية
- إحصائيات وتقارير مفصلة
- إدارة المستخدمين والمتاجر
- مراقبة الطلبات والعروض
- سجل التدقيق (Audit Log)
- إدارة فريق الدعم

---

## 🛠️ التقنيات المستخدمة

### Backend
- **Node.js + Express.js**
- **MongoDB** (قاعدة بيانات)
- **JWT** (المصادقة والتحقق)
- **Stripe** (معالجة الدفع)
- **Cloudinary** (تخزين الصور)
- **Socket.io** (الدردشة المباشرة)

### Frontend
- **React 18**
- **Redux Toolkit** (إدارة الحالة)
- **Tailwind CSS** (التصميم)
- **Vite** (بناء المشروع)
- **React Router** (التوجيه)
- **Swiper** (العروض المتحركة)

---

## 📁 هيكل المشروع

```
sahm-albuyoot/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Store.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   ├── Role.js
│   │   ├── AdminAccess.js
│   │   ├── SupportTeam.js
│   │   ├── Permission.js
│   │   ├── AuditLog.js
│   │   ├── SupportTicket.js
│   │   └── Chat.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── users.js
│   │   ├── stores.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── reviews.js
│   │   ├── support.js
│   │   └── payment.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── setupRoles.js
│   │   ├── sendEmail.js
│   │   └── validation.js
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Stores.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── ...
│   │   ├── store/
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── productsSlice.js
│   │   │   ├── storesSlice.js
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .env.example
├── .gitignore
├── PROJECT_PLAN.md
└── README.md
```

---

## 🚀 البدء السريع

### المتطلبات
- Node.js v16+
- MongoDB
- npm أو yarn

### التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/kideo786/sahm-albuyoot.git
cd sahm-albuyoot

# تثبيت الحزم
npm install

# إنشاء ملف البيئة
cp .env.example .env

# تشغيل السيرفر
npm run server

# تشغيل الواجهة (في نافذة أخرى)
cd client
npm run dev
```

---

## 📊 الإحصائيات المتوقعة

| المعيار | القيمة |
|--------|--------|
| عدد الملفات | ~200 ملف |
| عدد أسطر الكود | ~30,000 سطر |
| عدد المسارات API | ~80 مسار |
| عدد الصفحات الرئيسية | 20+ صفحة |
| عدد المكونات React | 150+ مكون |
| عدد نماذج قاعدة البيانات | 15 نموذج |
| نسبة الإتمام المتوقعة | 100% ✅ |

---

## 📞 المساعدة والدعم

للتواصل والدعم الفني:
- البريد الإلكتروني: support@sahm-albuyoot.com
- الدردشة المباشرة: متوفرة في التطبيق
- سجل المشاكل: GitHub Issues

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT License

---

**تم البدء:** 29 أغسطس 2026
**الحالة:** قيد التطوير 🚀
**المسؤول:** فريق التطوير
