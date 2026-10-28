const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Aapka MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://priyanshsharma0501_db_user:tcp4UaLJ8o9tkQta@cluster0.xfmgwe9.mongodb.net/imovies?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB Atlas successfully');
  await seedSampleData();
})
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Movie Schema & Model
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  language: String,
  city: String,
  showTime: String,
  pricing: {
    recliner: Number,
    executive: Number
  },
  posterUrl: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Sample Data Function (9 Movies - 3 for each city)
async function seedSampleData() {
  try {
    const count = await Movie.countDocuments();
    if (count === 0) {
      const sampleMovies = [
        // Indore Movies (3)
        {
          title: "Avengers: Endgame",
          genre: "Action / Sci-Fi",
          language: "English / Hindi",
          city: "Indore",
          showTime: "07:30 PM",
          pricing: { recliner: 350, executive: 220 },
          posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&auto=format&fit=crop&q=60"
        },
        {
          title: "Pathaan",
          genre: "Action / Thriller",
          language: "Hindi",
          city: "Indore",
          showTime: "09:15 PM",
          pricing: { recliner: 300, executive: 180 },
          posterUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=60"
        },
        {
          title: "Stree 2",
          genre: "Comedy / Horror",
          language: "Hindi",
          city: "Indore",
          showTime: "04:00 PM",
          pricing: { recliner: 280, executive: 150 },
          posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60"
        },

        // Mumbai Movies (3)
        {
          title: "Inception",
          genre: "Sci-Fi / Thriller",
          language: "English",
          city: "Mumbai",
          showTime: "09:00 PM",
          pricing: { recliner: 400, executive: 250 },
          posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60"
        },
        {
          title: "Jawan",
          genre: "Action / Drama",
          language: "Hindi",
          city: "Mumbai",
          showTime: "06:30 PM",
          pricing: { recliner: 350, executive: 220 },
          posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60"
        },
        {
          title: "Spider-Man: No Way Home",
          genre: "Action / Sci-Fi",
          language: "English / Hindi",
          city: "Mumbai",
          showTime: "01:00 PM",
          pricing: { recliner: 380, executive: 240 },
          posterUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60"
        },

        // Delhi NCR Movies (3)
        {
          title: "Interstellar",
          genre: "Sci-Fi / Drama",
          language: "English",
          city: "Delhi NCR",
          showTime: "06:00 PM",
          pricing: { recliner: 380, executive: 240 },
          posterUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=60"
        },
        {
          title: "Animal",
          genre: "Action / Crime",
          language: "Hindi",
          city: "Delhi NCR",
          showTime: "08:30 PM",
          pricing: { recliner: 350, executive: 200 },
          posterUrl: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=500&auto=format&fit=crop&q=60"
        },
        {
          title: "Dune: Part Two",
          genre: "Sci-Fi / Adventure",
          language: "English",
          city: "Delhi NCR",
          showTime: "03:30 PM",
          pricing: { recliner: 450, executive: 300 },
          posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60"
        }
      ];
      await Movie.insertMany(sampleMovies);
      console.log('🎬 9 Sample movies (3 per city) added to MongoDB Atlas!');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

// API Routes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});