import React from 'react';

function Navbar({ city, setCity, openAuthModal, user, setUser }) {
  const cities = ['Indore', 'Mumbai', 'Delhi NCR', 'Bengaluru', 'Ahmedabad'];

  return (
    <nav style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '12px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h1 style={{ margin: 0, color: '#f43f5e', fontSize: '26px', fontWeight: '800', cursor: 'pointer', letterSpacing: '-0.5px' }}>
          🎬 IMovies
        </h1>
        
        <select 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          style={{ backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', padding: '6px 12px', fontSize: '14px', outline: 'none' }}
        >
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '500' }}>
              Hi, {user.name} <span style={{ fontSize: '11px', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>{user.role.toUpperCase()}</span>
            </span>
            <button onClick={() => setUser(null)} style={{ backgroundColor: '#334155', color: '#f8fafc', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Logout</button>
          </div>
        ) : (
          <button onClick={openAuthModal} style={{ backgroundColor: '#f43f5e', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
            Sign In / Register
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;