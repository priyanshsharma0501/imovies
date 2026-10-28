import React from 'react';

function AdminDashboard({ movies }) {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155' }}>
      <h2 style={{ color: '#fbbf24', marginTop: 0 }}>⚡ Super Admin Control Panel</h2>
      <p style={{ color: '#94a3b8', marginBottom: '25px', fontSize: '14px' }}>Platform analytics & active vendor management</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#38bdf8', fontSize: '24px' }}>{movies.length}</h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Active Movies</p>
        </div>
        <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#22c55e', fontSize: '24px' }}>4</h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Registered Theaters</p>
        </div>
        <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#f43f5e', fontSize: '24px' }}>₹48,500</h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Platform Revenue</p>
        </div>
      </div>

      <h3 style={{ fontSize: '16px', color: '#f1f5f9', marginBottom: '15px' }}>Platform Movie Catalog</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {movies.map((m) => (
          <div key={m._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '12px 18px', borderRadius: '8px', border: '1px solid #334155' }}>
            <span style={{ fontWeight: '500' }}>{m.title} <span style={{ color: '#94a3b8', fontSize: '12px' }}>({m.genre})</span></span>
            <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Active</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;