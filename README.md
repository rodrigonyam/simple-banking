# Simple Banking - React Web App

A modern banking web application built with React and Vite, featuring a clean and intuitive interface for managing your finances.

## 🚀 Features

- **Secure Authentication** - Demo login system with mock credentials
- **Account Dashboard** - Overview of all your accounts and balances
- **Transaction History** - Detailed view of all transactions with filtering and search
- **Money Transfers** - Transfer funds between accounts instantly
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Clean and professional interface with smooth animations

## 🛠️ Technologies

- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **React Router** - Client-side routing for single-page application
- **Lucide React** - Beautiful and consistent icons
- **CSS3** - Modern styling with flexbox and grid layouts

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rodrigonyam/simple-banking.git
cd simple-banking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:3000`

### Demo Credentials
- **Email:** `demo@bank.com`
- **Password:** `demo123`

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
simple-banking/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   │   └── Header.jsx     # Navigation header
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx  # Account dashboard
│   │   ├── Login.jsx     # Authentication page
│   │   ├── Transactions.jsx # Transaction history
│   │   └── Transfer.jsx   # Money transfer page
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🔐 Security Features

- **Mock Authentication System** - Simulated secure login
- **Protected Routes** - Authenticated access to banking features
- **Input Validation** - Form validation for transfers and transactions
- **Responsive Design** - Secure and accessible across all devices

## 🎨 Design Features

- **Modern UI/UX** - Clean and intuitive interface
- **Gradient Backgrounds** - Professional banking aesthetic
- **Icon Integration** - Lucide React icons for better visual hierarchy
- **Loading States** - Smooth user experience with loading indicators
- **Error Handling** - Clear error messages and validation feedback

## 🚀 Future Enhancements

- [ ] Real backend integration
- [ ] Account opening functionality
- [ ] Bill payment features
- [ ] Investment portfolio tracking
- [ ] Mobile app version
- [ ] Advanced security features (2FA, biometrics)
- [ ] Transaction categorization and budgeting
- [ ] Financial analytics and reporting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Lucide for the beautiful icon set
- Banking industry for inspiration

---

**Note:** This is a demo application created for educational purposes. It does not handle real financial data or transactions.
