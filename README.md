# SecureBank - Vite + React Banking App

SecureBank is a simple, secure banking web application built with React and Vite.  
It supports user signup, login, deposits, withdrawals, and transaction history.

---

## 🚀 Live Demo

[https://vishwafernando.github.io/bankingwebapp](https://vishwafernando.github.io/bankingwebapp) br
[https://bankingwebapp-nu.vercel.app](https://bankingwebapp-nu.vercel.app/)

---

## 🔐 Features

- User authentication (signup/login)
- Deposit and withdraw money
- Real-time balance updates
- Transaction history with timestamps
- Responsive and modern UI with Font Awesome icons
- Client-side state management (`useState`)
- Built with Vite for fast development and optimized builds

---

## 🛠 Technologies Used

- React 19.x
- Vite
- Font Awesome
- CSS3

---

## 🧰 Getting Started

### ✅ Prerequisites

- Node.js (v16 or later)
- npm (comes with Node.js)

### 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/vishwafernando/bankingwebapp.git
cd bankingwebapp
npm install
npm run dev
```

### 🚀 Deployment to GitHub Pages

To build and deploy the app to GitHub Pages:

```bash
npm run build
npm run deploy
```

#### Configuration

Ensure these settings are correct:

In `vite.config.js`:

```bash
export default defineConfig({
  base: '/bankingwebapp/',
  plugins: [react()],
});
```

In `package.json`:

```bash
"homepage": "https://vishwafernando.github.io/bankingwebapp"
```

### 📁 Project Structure


```bash
bankingwebapp/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    └── App.css
```

### 📌 Usage


### 🔹 Sign Up

- Click "Sign Up".

- Enter a username, password, and an initial balance.

### 🔹 Login
- Click "Login".

- Enter your username and password.

### 🔹 Deposit / Withdraw
- After logging in, use the form to deposit or withdraw money.

- Transactions are saved and displayed in real-time.

### 🔹 Logout
- Click "Logout" to end the session securely.

## 📄 License
This project is licensed under the MIT License.
See the LICENSE file for full details.

## 🤝 Contributing
Contributions are welcome!
Feel free to submit issues or pull requests to help improve this app.

## 📬 Contact
Created by Vishwa Fernando

- GitHub: https://github.com/vishwafernando

- Email: vishwafernando.vf@gmail.com

- LinkedIn: https://linkedin.com/in/vishwafernando

Feel free to reach out if you have any questions or feedback!


---
