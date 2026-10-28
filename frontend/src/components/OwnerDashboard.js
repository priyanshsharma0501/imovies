import React, { useState } from 'react';

function OwnerDashboard({ movies, onAddMovie }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [city, setCity] = useState('Indore');
  const [showTime, setShowTime] = useState('07:30 PM');
  const [reclinerPrice, setReclinerPrice] = useState('350');
  const [executivePrice, setExecutivePrice] = useState('220');
  const [posterUrl, setPosterUrl] = useState('');

  const cities = ['Indore', 'Mumbai', 'Delhi NCR', 'Bengaluru', 'Ahmedabad'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !genre) {
      alert('Please fill required fields!');
      return;
    }
    onAddMovie({
      _id: Date.now().toString(),
      title,
      genre,
      language: language || 'Hindi / English',
      city,
      showTime: showTime || '07:30 PM',
      pricing: {
        recliner: Number(reclinerPrice) || 350,
        executive: Number(executivePrice) || 220
      },
      posterUrl: posterUrl || 'https://via.placeholder.com/220x280?text=Movie+Poster'
    });
    setTitle(''); setGenre(''); setLanguage(''); setShowTime('07:30 PM'); setReclinerPrice('350'); setExecutivePrice('220'); setPosterUrl('');
    alert(`Movie screening and custom pricing published successfully for ${city}!`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155', marginBottom: '30px' }}>
        <h2 style={{ color: '#38bdf8', marginTop: 0 }}>🏢 Theater Owner Portal</h2>
        <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>Publish movie screenings with custom show timings, city, and seat pricing.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }} />
          <input type="text" placeholder="Genre (e.g. Action / Thriller)" value={genre} onChange={(e) => setGenre(e.target.value)} style={{ padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }} />
          <input type="text" placeholder="Language (e.g. Hindi / English)" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Screening City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }}>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Show Timing</label>
              <input type="text" placeholder="e.g. 07:30 PM" value={showTime} onChange={(e) => setShowTime(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Recliner Price (₹)</label>
              <input type="number" placeholder="350" value={reclinerPrice} onChange={(e) => setReclinerPrice(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Executive Price (₹)</label>
              <input type="number" placeholder="220" value={executivePrice} onChange={(e) => setExecutivePrice(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>
          </div>

          <input type="text" placeholder="Poster Image URL" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} style={{ padding: '12px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }} />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Publish Screening</button>
        </form>
      </div>

      <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '16px', border: '1px solid #334155' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#f1f5f9' }}>Your Screened Movies ({movies.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {movies.map((m) => (
            <div key={m._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '12px 15px', borderRadius: '8px', border: '1px solid #334155' }}>
              <span><strong>{m.title}</strong> - {m.genre} | 🕒 {m.showTime || '07:30 PM'} | 💰 Recliner: ₹{m.pricing?.recliner || 350}</span>
              <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: 'bold' }}>Live</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;