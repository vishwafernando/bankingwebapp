// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [currentPanel, setCurrentPanel] = useState('login');
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    loginUsername: '',
    loginPassword: '',
    signupUsername: '',
    signupPassword: '',
    signupBalance: '',
    depositAmount: '',
    withdrawAmount: ''
  });
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState({
    login: false,
    signup: false,
    deposit: false,
    withdraw: false
  });

  // Initialize users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('bankUsers') || '{}');
    setUsers(storedUsers);
  }, []);

  // Save users to localStorage
  useEffect(() => {
    if (Object.keys(users).length > 0) {
      localStorage.setItem('bankUsers', JSON.stringify(users));
    }
  }, [users]);

  const showMessage = (panel, message, type) => {
    setMessages({
      ...messages,
      [panel]: {
        text: message,
        type: type
      }
    });
    
    setTimeout(() => {
      setMessages({
        ...messages,
        [panel]: null
      });
    }, 3000);
  };

  const togglePasswordVisibility = (id) => {
    const input = document.getElementById(id);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { loginUsername, loginPassword } = formData;

    if (!loginUsername || !loginPassword) {
      showMessage('login', 'Please enter both username and password', 'error');
      return;
    }

    setLoading({...loading, login: true});

    setTimeout(() => {
      const user = users[loginUsername];
      if (user && user.password === loginPassword) {
        setCurrentUser(user);
        showMessage('login', 'Login successful! Welcome back!', 'success');
        setCurrentPanel('dashboard');
      } else {
        showMessage('login', 'Invalid username or password', 'error');
      }
      setLoading({...loading, login: false});
    }, 800);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { signupUsername, signupPassword, signupBalance } = formData;
    const initialBalance = parseFloat(signupBalance);

    if (signupUsername.length < 4) {
      showMessage('signup', 'Username must be at least 4 characters long', 'error');
      return;
    }

    if (signupPassword.length < 6) {
      showMessage('signup', 'Password must be at least 6 characters long', 'error');
      return;
    }

    if (isNaN(initialBalance) || initialBalance < 0) {
      showMessage('signup', 'Please enter a valid initial balance', 'error');
      return;
    }

    if (users[signupUsername]) {
      showMessage('signup', 'Username already exists', 'error');
      return;
    }

    setLoading({...loading, signup: true});

    setTimeout(() => {
      const newUser = {
        username: signupUsername,
        password: signupPassword,
        balance: initialBalance,
        transactions: [{
          type: 'DEPOSIT',
          amount: initialBalance,
          date: new Date().toISOString(),
          balance: initialBalance
        }]
      };

      setUsers({
        ...users,
        [signupUsername]: newUser
      });

      showMessage('signup', 'Account created successfully! You can now login.', 'success');
      setLoading({...loading, signup: false});
      
      setFormData({
        ...formData,
        signupUsername: '',
        signupPassword: '',
        signupBalance: ''
      });
      
      setTimeout(() => setCurrentPanel('login'), 1500);
    }, 800);
  };

  const handleDeposit = () => {
    const amount = parseFloat(formData.depositAmount);
    
    if (isNaN(amount) || amount <= 0) {
      showMessage('main', 'Please enter a valid deposit amount', 'error');
      return;
    }

    setLoading({...loading, deposit: true});
    
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        balance: currentUser.balance + amount,
        transactions: [
          ...currentUser.transactions,
          {
            type: 'DEPOSIT',
            amount: amount,
            date: new Date().toISOString(),
            balance: currentUser.balance + amount
          }
        ]
      };

      setCurrentUser(updatedUser);
      setUsers({
        ...users,
        [currentUser.username]: updatedUser
      });
      
      setFormData({...formData, depositAmount: ''});
      showMessage('main', `Successfully deposited $${amount.toFixed(2)}`, 'success');
      setLoading({...loading, deposit: false});
    }, 800);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(formData.withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      showMessage('main', 'Please enter a valid withdrawal amount', 'error');
      return;
    }

    if (amount > currentUser.balance) {
      showMessage('main', 'Insufficient funds', 'error');
      return;
    }

    setLoading({...loading, withdraw: true});
    
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        balance: currentUser.balance - amount,
        transactions: [
          ...currentUser.transactions,
          {
            type: 'WITHDRAWAL',
            amount: amount,
            date: new Date().toISOString(),
            balance: currentUser.balance - amount
          }
        ]
      };

      setCurrentUser(updatedUser);
      setUsers({
        ...users,
        [currentUser.username]: updatedUser
      });
      
      setFormData({...formData, withdrawAmount: ''});
      showMessage('main', `Successfully withdrew $${amount.toFixed(2)}`, 'success');
      setLoading({...loading, withdraw: false});
    }, 800);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setFormData({
      ...formData,
      loginUsername: '',
      loginPassword: ''
    });
    setCurrentPanel('login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="App">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="app-container">
        {/* Login Panel */}
        {currentPanel === 'login' && (
          <div className="panel fade-in">
            <div className="logo">
              <h1>SecureBank</h1>
              <p>Your trusted banking partner</p>
              <div className="security-badge">
                <i className="fas fa-shield-alt"></i>
                <span>256-bit Encryption</span>
              </div>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="loginUsername"
                  value={formData.loginUsername}
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="Enter your username" 
                  required 
                />
              </div>
              <div className="form-group password-container">
                <input 
                  type="password" 
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleInputChange}
                  id="loginPassword"
                  className="input-field" 
                  placeholder="Enter your password" 
                  required 
                />
                <span 
                  className="toggle-password" 
                  onClick={() => togglePasswordVisibility('loginPassword')}
                >
                  <i className="fas fa-eye"></i>
                </span>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading.login}>
                <span>Login</span>
                {loading.login && <div className="spinner" style={{display: 'inline-block'}}></div>}
              </button>
              <div className="nav-buttons">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setCurrentPanel('signup')}
                >
                  <i className="fas fa-user-plus"></i> Create Account
                </button>
              </div>
            </form>
            {messages.login && (
              <div className={messages.login.type === 'error' ? 'error-message' : 'success-message'}>
                {messages.login.text}
              </div>
            )}
          </div>
        )}

        {/* Signup Panel */}
        {currentPanel === 'signup' && (
          <div className="panel fade-in">
            <div className="logo">
              <h1>Join SecureBank</h1>
              <p>Create your account today</p>
              <div className="security-badge">
                <i className="fas fa-shield-alt"></i>
                <span>FDIC Insured</span>
              </div>
            </div>
            
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="signupUsername"
                  value={formData.signupUsername}
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="Choose a username (min 4 characters)" 
                  required 
                />
              </div>
              <div className="form-group password-container">
                <input 
                  type="password" 
                  name="signupPassword"
                  value={formData.signupPassword}
                  onChange={handleInputChange}
                  id="signupPassword"
                  className="input-field" 
                  placeholder="Create a password (min 6 characters)" 
                  required 
                />
                <span 
                  className="toggle-password" 
                  onClick={() => togglePasswordVisibility('signupPassword')}
                >
                  <i className="fas fa-eye"></i>
                </span>
              </div>
              <div className="form-group">
                <input 
                  type="number" 
                  name="signupBalance"
                  value={formData.signupBalance}
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder="Initial deposit amount" 
                  min="0" 
                  step="0.01" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading.signup}>
                <span>Create Account</span>
                {loading.signup && <div className="spinner" style={{display: 'inline-block'}}></div>}
              </button>
              <div className="nav-buttons">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setCurrentPanel('login')}
                >
                  <i className="fas fa-arrow-left"></i> Back to Login
                </button>
              </div>
            </form>
            {messages.signup && (
              <div className={messages.signup.type === 'error' ? 'error-message' : 'success-message'}>
                {messages.signup.text}
              </div>
            )}
          </div>
        )}

        {/* Main Dashboard Panel */}
        {currentPanel === 'dashboard' && currentUser && (
          <div className="panel fade-in">
            <div className="logo">
              <h1>Welcome Back!</h1>
              <p id="welcomeUser">Welcome, {currentUser.username}!</p>
            </div>

            <div className="balance-card">
              <h2><i className="fas fa-wallet"></i> Current Balance</h2>
              <div className="balance-amount">${currentUser.balance.toFixed(2)}</div>
            </div>

            <div className="main-dashboard">
              <div className="action-card">
                <h3><i className="fas fa-money-bill-wave"></i> Deposit Money</h3>
                <div className="form-group">
                  <input 
                    type="number" 
                    name="depositAmount"
                    value={formData.depositAmount}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter amount to deposit" 
                    min="0.01" 
                    step="0.01" 
                  />
                </div>
                <button 
                  className="btn btn-deposit" 
                  onClick={handleDeposit}
                  disabled={loading.deposit}
                >
                  <span>Deposit</span>
                  {loading.deposit && <div className="spinner" style={{display: 'inline-block'}}></div>}
                </button>
              </div>

              <div className="action-card">
                <h3><i className="fas fa-hand-holding-usd"></i> Withdraw Money</h3>
                <div className="form-group">
                  <input 
                    type="number" 
                    name="withdrawAmount"
                    value={formData.withdrawAmount}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter amount to withdraw" 
                    min="0.01" 
                    step="0.01" 
                  />
                </div>
                <button 
                  className="btn btn-withdraw" 
                  onClick={handleWithdraw}
                  disabled={loading.withdraw}
                >
                  <span>Withdraw</span>
                  {loading.withdraw && <div className="spinner" style={{display: 'inline-block'}}></div>}
                </button>
              </div>

              <div className="transaction-history">
                <h3><i className="fas fa-history"></i> Transaction History</h3>
                <div style={{overflowX: 'auto'}}>
                  <table className="transaction-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUser.transactions.length > 0 ? (
                        [...currentUser.transactions].reverse().map((transaction, index) => {
                          const date = new Date(transaction.date).toLocaleString();
                          const typeClass = transaction.type === 'DEPOSIT' ? 
                            'transaction-deposit' : 'transaction-withdrawal';
                          const typeIcon = transaction.type === 'DEPOSIT' ? '⬇️' : '⬆️';
                          
                          return (
                            <tr key={index} className="fade-in">
                              <td>{date}</td>
                              <td className={typeClass}>{typeIcon} {transaction.type}</td>
                              <td className={typeClass}>${transaction.amount.toFixed(2)}</td>
                              <td>${transaction.balance.toFixed(2)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4" style={{textAlign: 'center', color: '#999', padding: '20px'}}>
                            <i className="fas fa-inbox" style={{fontSize: '2rem', marginBottom: '10px', display: 'block'}}></i>
                            No transactions yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <button className="btn btn-logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
            {messages.main && (
              <div className={messages.main.type === 'error' ? 'error-message' : 'success-message'}>
                {messages.main.text}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;