# 🍕 Food-Zaika - Food Delivery App

A modern, responsive food delivery web application built with React and modern web technologies. Experience seamless food ordering with a beautiful UI, dark/light theme support, and mobile-first design.

![Food-Zaika Preview](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-orange?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9-purple?style=for-the-badge&logo=redux)

## ✨ Features

### 🎨 **User Interface**
- **Responsive Design** - Mobile-first approach with tablet and desktop optimization
- **Dark/Light Theme** - Toggle between themes with persistent user preference
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Shimmer Loading** - Elegant loading states for better user experience

### 🔍 **Search & Discovery**
- **Real-time Search** - Instant restaurant and food search with case-insensitive matching
- **Location-based** - Editable location with geolocation support
- **Infinite Scroll** - Seamless loading of restaurant listings
- **Filter Options** - Advanced filtering capabilities

### 🛒 **Shopping Experience**
- **Cart Management** - Add/remove items with Redux state management
- **Persistent Cart** - Cart contents saved across sessions
- **Item Quantities** - Easy quantity adjustment
- **Order Summary** - Detailed cart overview

### 📱 **Mobile Features**
- **PWA Support** - Progressive Web App capabilities
- **Hamburger Menu** - Collapsible navigation for mobile devices
- **Touch-friendly** - Optimized for touch interactions
- **Offline Support** - Basic offline functionality

### 🔐 **Authentication**
- **User Login/Logout** - Secure authentication system
- **Profile Management** - User profile and preferences
- **Session Management** - Persistent login sessions

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** - Latest React features with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing and navigation

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI Icons** - Beautiful, consistent iconography
- **Custom CSS** - Enhanced animations and effects

### **State Management**
- **Redux Toolkit** - Modern Redux with simplified syntax
- **React Redux** - React bindings for Redux
- **Local Storage** - Persistent data storage

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-zaika.git
   cd food-zaika
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
Food-Zaika/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx     # Main navigation component
│   │   ├── Body.jsx       # Main content area
│   │   ├── Cart.jsx       # Shopping cart component
│   │   ├── RestaurantCard.jsx # Restaurant display cards
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Loginn.jsx     # Login page
│   │   ├── Success.jsx    # Success page
│   │   └── ...
│   ├── utils/             # Utility functions and hooks
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Redux store configuration
│   │   └── ...
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🎯 Key Features Implementation

### **Responsive Navigation**
- Adaptive navbar with hamburger menu for mobile
- Active page highlighting
- Smooth transitions and animations

### **Search Functionality**
- Real-time search with debouncing
- Case-insensitive matching
- Clear search option
- Enter key support

### **Theme System**
- Context-based theme management
- Persistent theme preference
- Smooth theme transitions
- Enhanced dark mode styling

### **Cart Management**
- Redux-based state management
- Add/remove items with quantity control
- Persistent cart data
- Real-time cart updates

### **Adding New Features**
1. Create new components in `src/components/`
2. Add routes in `src/App.jsx`
3. Update Redux store if needed in `src/utils/store/`
4. Add custom hooks in `src/utils/hooks/`

## 📱 PWA Features

The application includes Progressive Web App features:
- **Service Worker** - Offline functionality
- **Web App Manifest** - App-like experience
- **Install Prompt** - Add to home screen capability

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@tabish-27]((https://github.com/tabish-27))
- LinkedIn: [tabish-javed]((https://www.linkedin.com/in/tabish-javed/))

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Material-UI Icons](https://mui.com/material-ui/material-icons/) - Icon library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

---

⭐ **Star this repository if you found it helpful!**

SCREENSHOT---
<img width="2880" height="3452" alt="screenshot food" src="https://github.com/user-attachments/assets/23566e13-21fd-4122-9c4a-0dcaf2d5a930" />


*Built with ❤️ using React, Vite, and Tailwind CSS* 
