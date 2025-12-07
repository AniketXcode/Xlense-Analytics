# Xlense Analytics 📊

A modern, AI-powered Excel analytics platform that transforms your data into interactive charts and insights. Built with React, Node.js, and MongoDB.

## Demo live https://xlens-alpha.vercel.app/

## ✨ Features

### 🎯 Core Analytics
- **Excel File Upload**: Support for .xlsx, .xls, and .csv files
- **Interactive Charts**: 2D and 3D visualizations with Highcharts
- **Dynamic Axis Selection**: Choose X, Y, and Z axes for your charts
- **Chart History**: Save and revisit your visualizations
- **File Download**: Download original files from history

### 🤖 AI-Powered Insights
- **Smart Data Analysis**: Real-time insights based on your data
- **Context-Aware Recommendations**: Suggestions based on selected axes
- **Statistical Analysis**: Correlation, trends, and data quality insights
- **Missing Value Detection**: Identify data quality issues

### 👥 User Management
- **User Authentication**: Secure login/signup with JWT
- **Role-Based Access**: Admin and User roles
- **Admin Dashboard**: User management and system monitoring
- **File Management**: Upload, download, and organize files

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Eye-friendly interface
- **Real-time Updates**: Dynamic data loading
- **Interactive Components**: Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Clone and navigate to backend**
```bash
cd Xlense-analytics/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
Create `.env` in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. **Start the server**
```bash
npm run dev
```

### Frontend Setup

1. **Navigate to frontend**
```bash
cd Xlense-analytics/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

### Admin Setup

1. **Create an admin user**
```bash
cd Xlense-analytics/backend
node scripts/makeAdmin.js "your-email@example.com"
```

2. **Log in with the admin account**
The user will now have admin privileges.

## 📁 Project Structure

```
Xlense-analytics/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin operations
│   │   ├── aiController.js       # AI insights
│   │   ├── analysisController.js # Chart generation
│   │   ├── authController.js     # Authentication
│   │   ├── dashboardController.js # Dashboard stats
│   │   └── fileController.js     # File operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── uploadMiddleware.js   # File upload handling
│   ├── models/
│   │   ├── ChartModel.js         # Chart schema
│   │   ├── FileModel.js          # File schema
│   │   └── UserModel.js          # User schema
│   ├── routes/
│   │   ├── adminRoutes.js        # Admin endpoints
│   │   ├── aiRoutes.js           # AI endpoints
│   │   ├── analysisRoutes.js     # Chart endpoints
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── dashboardRoutes.js    # Dashboard endpoints
│   │   └── fileRoutes.js         # File endpoints
│   ├── scripts/
│   │   └── makeAdmin.js          # Admin user creation
│   ├── uploads/                  # File storage
│   └── server.js                 # Main server file
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── auth.js           # Auth API calls
    │   │   └── config.js         # Axios configuration
    │   ├── components/
    │   │   ├── AIInsights.jsx    # AI insights component
    │   │   ├── Chart2D.jsx       # 2D chart component
    │   │   ├── Chart3D.jsx       # 3D chart component
    │   │   ├── FileUploadDemo.jsx # File upload component
    │   │   ├── HistoryTable.jsx  # History table component
    │   │   ├── StatCard.jsx      # Stats card component
    │   │   └── ui/               # Reusable UI components
    │   ├── pages/
    │   │   ├── AdminPanel.jsx    # Admin dashboard
    │   │   ├── Charts.jsx        # Chart viewer
    │   │   ├── Dashboard.jsx     # User dashboard
    │   │   ├── History.jsx       # Chart history
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Signup.jsx        # Signup page
    │   │   └── Upload.jsx        # File upload page
    │   ├── utils/
    │   │   └── downloadHelper.js # File download utility
    │   └── App.tsx               # Main app component
    └── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files` - Get user files
- `GET /api/files/:id/download` - Download file
- `DELETE /api/files/:id` - Delete file

### Charts & Analysis
- `POST /api/analysis/generate-charts/:id` - Generate charts
- `POST /api/analysis/map-data/:id` - Get file columns
- `GET /api/analysis/chart-history` - Get chart history
- `POST /api/analysis/save-chart` - Save chart

### AI Insights
- `POST /api/ai/insights/:fileId` - Generate AI insights

### Admin (Admin only)
- `GET /api/admin/stats` - Get admin statistics
- `DELETE /api/admin/clear-storage` - Clear all storage
- `DELETE /api/admin/users/:id` - Delete user
- `PATCH /api/admin/users/:id/role` - Update user role

### Dashboard
- `GET /api/dashboard/stats` - Get user dashboard stats

## 🎯 Usage Guide

### For Users

1. **Sign Up/Login**
   - Create an account or log in to access the platform

2. **Upload Files**
   - Click "Upload New File" on the dashboard
   - Select Excel (.xlsx, .xls) or CSV files
   - Files are automatically processed

3. **Create Charts**
   - Navigate to "Axis Selection" after upload
   - Choose X, Y, and Z axes for your visualization
   - Select chart type (2D or 3D)
   - Generate and view your chart

4. **AI Insights**
   - View AI-powered insights on the Charts page
   - Get data analysis, correlations, and recommendations
   - Insights update based on your selected axes

5. **Manage History**
   - View all your saved charts in History
   - Download original files
   - Revisit and modify charts

### For Admins

1. **Access Admin Panel**
   - Log in with admin credentials
   - Navigate to the Admin Panel

2. **Monitor System**
   - View total users, files, and storage usage
   - Monitor user activity and file uploads

3. **User Management**
   - View all users and their upload counts
   - Change user roles (Admin/User)
   - Delete users (removes all their data)

4. **System Maintenance**
   - Clear all storage (soft delete)
   - Monitor system health

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling
- **XLSX** - Excel file processing

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Highcharts** - Chart library
- **Axios** - HTTP client
- **React Router** - Navigation

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Role-Based Access Control** - Admin/User permissions
- **File Upload Validation** - Type and size restrictions
- **Protected Routes** - API endpoint protection
- **Input Validation** - Server-side validation

## 🚀 Deployment

### Backend Deployment
1. Set environment variables
2. Build and deploy to your preferred platform (Heroku, Vercel, etc.)
3. Ensure MongoDB connection is configured

### Frontend Deployment
1. Update API base URL in `src/api/config.js`
2. Build the project: `npm run build`
3. Deploy to static hosting (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Made with ❤️ for data analytics enthusiasts** 
