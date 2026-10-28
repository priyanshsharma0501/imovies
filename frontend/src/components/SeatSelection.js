import React, { useState } from 'react';

function SeatSelection({ movie, onBack, onConfirm }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const categories = [
    { title: 'Recliner - ₹350', price: 350, rows: ['A', 'B'] },
    { title: 'Executive - ₹220', price: 220, rows: ['C', 'D', 'E'] }
  ];

  const handleSeatClick = (seatCode, price) => {
    const existing = selectedSeats.find(s => s.code === seatCode);
    if (existing) {
      setSelectedSeats(selectedSeats.filter(s => s.code !== seatCode));
    } else {
      setSelectedSeats([...selectedSeats, { code: seatCode, price }]);
    }
  };

  const ticketTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const convenienceFee = selectedSeats.length > 0 ? 30 * selectedSeats.length : 0;
  const grandTotal = ticketTotal + convenienceFee;

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
      
      <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '16px', border: '1px solid #334155' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>{movie.title}</h2>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
          PVR: Treasure Island, {movie.city || 'Indore'} | 🕒 Show Time: <strong style={{ color: '#38bdf8' }}>{movie.showTime || '07:30 PM'}</strong>
        </p>

        <div style={{ background: 'linear-gradient(180deg, #38bdf8 0%, transparent 100%)', height: '8px', borderRadius: '4px', marginBottom: '8px', opacity: 0.6 }}></div>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '11px', letterSpacing: '2px', marginBottom: '30px' }}>SCREEN THIS WAY</p>

        {categories.map((cat) => (
          <div key={cat.title} style={{ marginBottom: '25px' }}>
            <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>{cat.title}</span>
            <hr style={{ borderColor: '#334155', margin: '6px 0 15px 0' }} />
            
            {cat.rows.map((row) => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', justifyContent: 'center' }}>
                <span style={{ color: '#64748b', width: '20px', fontWeight: 'bold', fontSize: '13px' }}>{row}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                    const code = `${row}${num}`;
                    const isSelected = selectedSeats.some(s => s.code === code);
                    return (
                      <button
                        key={code}
                        onClick={() => handleSeatClick(code, cat.price)}
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: isSelected ? '#22c55e' : '#0f172a',
                          color: isSelected ? '#fff' : '#cbd5e1',
                          border: isSelected ? 'none' : '1px solid #334155',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '16px', border: '1px solid #334155', height: 'fit-content' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>Booking Summary</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Time:</span>
            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{movie.showTime || '07:30 PM'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Seats ({selectedSeats.length}):</span>
            <span style={{ color: '#fff', fontWeight: 'bold' }}>{selectedSeats.map(s => s.code).join(', ') || 'None'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tickets Total:</span>
            <span>₹{ticketTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Convenience Fee:</span>
            <span>₹{convenienceFee}</span>
          </div>
          <hr style={{ borderColor: '#334155', margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', color: '#22c55e' }}>
            <span>Grand Total:</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
          <button onClick={onBack} style={{ flex: 1, padding: '12px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Back</button>
          <button onClick={() => onConfirm(selectedSeats, grandTotal)} disabled={selectedSeats.length === 0} style={{ flex: 2, padding: '12px', backgroundColor: selectedSeats.length > 0 ? '#f43f5e' : '#475569', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Pay ₹{grandTotal}</button>
        </div>
      </div>

    </div>
  );
}

export default SeatSelection;