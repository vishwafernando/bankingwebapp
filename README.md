# SecureBank - Vite + React Banking App

---------

SecureBank is a simple, secure banking web application built with React and Vite.  
It supports user signup, login, deposits, withdrawals, and transaction history.



## Live Demo

[https://vishwafernando.github.io/bankingwebapp](https://vishwafernando.github.io/bankingwebapp)



## Features

- User authentication (signup/login)
- Deposit and withdraw money
- Real-time balance updates
- Transaction history with timestamps
- Responsive and modern UI with Font Awesome icons
- Client-side state management (React `useState`)
- Built with Vite for fast development and optimized builds



## Technologies Used

- React 19.x
- Vite
- Font Awesome (for icons)
- CSS3 for styling



# Getting Started

## Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repo:

```bash
git clone https://github.com/vishwafernando/bankingwebapp.git
cd bankingwebapp
```

---

## Deployment to GitHub Pages

To build and deploy the app:

```bash
npm run build
npm run deploy
```

Make sure your `vite.config.js` includes the correct `base` path:

```bash
base: '/bankingwebapp/'
```

And your package.json has:

```bash
"homepage": "https://Username.github.io/Repo-name"
```



# Project Structure

```
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



# Usage


### Sign Up
1. If you’re a new user, choose the "Sign Up" option.
2. Enter a username, password, and an initial balance.

### Login
1. For existing users, select "Login."
2. Enter your username and password.

### Deposit/Withdraw
1. After logging in, choose to deposit or withdraw funds.
2. The application will update and display your balance after each transaction.

### Logout
- Log out to securely save your data.



# License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.



# Contributing
Feel free to submit issues and pull requests to improve the application. Your contributions are welcome!

 
# Contact

Created by Vishwa Fernando

- GitHub: [https://github.com/vishwafernando](https://github.com/vishwafernando)  
- Email: vishwafernando.vf@gmail.com  
- LinkedIn: [https://linkedin.com/in/vishwafernando](https://linkedin.com/in/vishwafernando)  

Feel free to reach out if you have any questions or feedback!
