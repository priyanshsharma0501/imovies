import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import SeatSelection from './components/SeatSelection';
import OwnerDashboard from './components/OwnerDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [city, setCity] = useState('Indore');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    fetch('https://imovies-backend-iy11.onrender.com')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddMovieByOwner = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const filteredMovies = movies.filter((m) => {
    const matchesCity = m.city ? m.city === city : true;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif", 
      background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #090d16 60%, #030712 100%)', 
      color: '#f8fafc', 
      minHeight: '100vh',
      backgroundAttachment: 'fixed'
    }}>
      
      <Navbar 
        city={city} 
        setCity={setCity} 
        openAuthModal={() => setIsAuthOpen(true)}
        user={user}
        setUser={(u) => { 
          setUser(u); 
          setSelectedMovie(null); 
          setBookingDetails(null); 
        }}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        setUser={setUser} 
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '35px 24px' }}>
        
        {(!user || user.role === 'user') && !selectedMovie && !bookingDetails && (
          <>
            {/* Banner Section with proper Flex and Gradient */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)', 
              backdropFilter: 'blur(12px)',
              padding: '40px', 
              borderRadius: '24px', 
              marginBottom: '40px', 
              border: '1px solid rgba(56, 189, 248, 0.2)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '25px' 
            }}>
              <div style={{ flex: '1 1 300px' }}>
                <h1 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
                  Book Movie Tickets in <span style={{ color: '#38bdf8', textShadow: '0 0 20px rgba(56,189,248,0.4)' }}>{city}</span>
                </h1>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px', lineHeight: '1.5' }}>Experience blockbuster hits in IMAX, 4DX, and premium recliner formats.</p>
              </div>

              <div style={{ position: 'relative', width: '100%', maxWidth: '320px', flex: '0 1 300px' }}>
                <span style={{ position: 'absolute', left: '16px', top: '14px', fontSize: '15px' }}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Search movies, genre..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    backgroundColor: 'rgba(11, 15, 25, 0.8)', 
                    border: '1px solid rgba(56, 189, 248, 0.3)', 
                    padding: '14px 18px 14px 44px', 
                    borderRadius: '12px', 
                    color: '#fff', 
                    width: '100%', 
                    outline: 'none', 
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s ease'
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#f1f5f9', margin: 0, letterSpacing: '-0.3px' }}>Recommended Movies</h2>
              <span style={{ fontSize: '13px', color: '#94a3b8', background: 'rgba(30, 41, 59, 0.6)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>Showing {filteredMovies.length} results</span>
            </div>
            
            {filteredMovies.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '20px', border: '1px solid #1e293b' }}>
                <p style={{ fontSize: '36px', margin: '0 0 10px 0' }}>🎬</p>
                <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>No movies available in {city} matching your search.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                {filteredMovies.map((m) => (
                  <div key={m._id} style={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.85)', 
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ position: 'relative', overflow: 'hidden', height: '340px' }}>
                      <img src={m.posterUrl} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: 'rgba(15, 23, 42, 0.85)', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', backdropFilter: 'blur(6px)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)' }}>
                        {m.language || 'Hindi'}
                      </div>
                    </div>
                    
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: '#f9fafb' }}>{m.title}</h3>
                        <p style={{ margin: '0 0 10px 0', color: '#9ca3af', fontSize: '13px' }}>{m.genre}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '18px', color: '#38bdf8', fontSize: '13px', fontWeight: '600' }}>
                          <span>🕒</span> <span>{m.showTime || '07:30 PM'}</span>
                        </div>
                      </div>

                      <button onClick={() => {
                        if (!user) {
                          setIsAuthOpen(true);
                        } else {
                          setSelectedMovie(m);
                        }
                      }} style={{ 
                        width: '100%', 
                        padding: '12px', 
                        background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '10px', 
                        cursor: 'pointer', 
                        fontWeight: '700',
                        fontSize: '14px',
                        boxShadow: '0 6px 20px rgba(225, 29, 72, 0.4)',
                        transition: 'transform 0.2s ease'
                      }}>
                        Book Tickets
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {user && user.role === 'user' && selectedMovie && !bookingDetails && (
          <SeatSelection 
            movie={selectedMovie} 
            onBack={() => setSelectedMovie(null)} 
            onConfirm={(seats, amount) => setBookingDetails({ movie: selectedMovie, seats, amount })}
          />
        )}

        {user && user.role === 'user' && bookingDetails && (
          <div style={{ maxWidth: '480px', margin: '60px auto', backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(56,189,248,0.2)', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>🎟️</div>
            <h2 style={{ color: '#22c55e', margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Booking Confirmed!</h2>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>Your e-ticket has been successfully issued.</p>
            
            <div style={{ backgroundColor: 'rgba(11, 15, 25, 0.8)', padding: '20px', borderRadius: '14px', margin: '20px 0', textAlign: 'left', fontSize: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ margin: '8px 0', color: '#9ca3af' }}>Movie: <strong style={{ color: '#fff' }}>{bookingDetails.movie.title}</strong></p>
              <p style={{ margin: '8px 0', color: '#9ca3af' }}>Show Time: <strong style={{ color: '#38bdf8' }}>{bookingDetails.movie.showTime || '07:30 PM'}</strong></p>
              <p style={{ margin: '8px 0', color: '#9ca3af' }}>Selected Seats: <strong style={{ color: '#fff' }}>{bookingDetails.seats.map(s => s.code).join(', ')}</strong></p>
              <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '14px 0' }} />
              <p style={{ margin: '8px 0', display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                <span style={{ color: '#9ca3af' }}>Total Amount:</span> 
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>₹{bookingDetails.amount}</span>
              </p>
            </div>

            <button onClick={() => { setBookingDetails(null); setSelectedMovie(null); }} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', boxShadow: '0 6px 20px rgba(225, 29, 72, 0.4)' }}>
              Book More Tickets
            </button>
          </div>
        )}

        {user && user.role === 'owner' && (
          <OwnerDashboard movies={movies} onAddMovie={handleAddMovieByOwner} />
        )}

        {user && user.role === 'admin' && (
          <AdminDashboard movies={movies} />
        )}

      </div>
    </div>
  );
}

export default App;
