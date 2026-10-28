import React, { useState } from 'react';

function AuthModal({ isOpen, onClose, setUser, setRole }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user'); // 'user', 'owner', 'admin'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    let errs = {};
    if (isSignUp && !formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address';
    
    if (isSignUp && (!formData.phone || formData.phone.length !== 10)) {
      errs.phone = 'Enter valid 10-digit mobile number';
    }
    
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setUser({
        name: isSignUp ? formData.name : formData.email.split('@')[0],
        email: formData.email,
        role: selectedRole // Yahan role already pass ho raha hai
      });
      onClose();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#1e293b', width: '100%', maxWidth: '400px', padding: '30px', borderRadius: '16px', border: '1px solid #334155', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>{isSignUp ? 'Create Account' : 'Sign In to IMovies'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Role Selector in Auth Modal */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Select Account Type</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
            >
              <option value="user">Movie Goer (User)</option>
              <option value="owner">Theater Owner</option>
              <option value="admin">Super Admin</option>
            </select>
          </div>

          {isSignUp && (
            <div>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
              {errors.name && <span style={{ color: '#f43f5e', fontSize: '12px' }}>{errors.name}</span>}
            </div>
          )}

          <div>
            <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
            {errors.email && <span style={{ color: '#f43f5e', fontSize: '12px' }}>{errors.email}</span>}
          </div>

          {isSignUp && (
            <div>
              <input type="text" placeholder="Mobile Number (10 digits)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
              {errors.phone && <span style={{ color: '#f43f5e', fontSize: '12px' }}>{errors.phone}</span>}
            </div>
          )}

          <div>
            <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
            {errors.password && <span style={{ color: '#f43f5e', fontSize: '12px' }}>{errors.password}</span>}
          </div>

          <button type="submit" style={{ padding: '12px', backgroundColor: '#f43f5e', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            {isSignUp ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', marginTop: '20px' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => { setIsSignUp(!isSignUp); setErrors({}); }} style={{ color: '#f43f5e', cursor: 'pointer', fontWeight: 'bold' }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;