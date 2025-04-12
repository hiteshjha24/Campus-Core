// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize App
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/youlink', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ==== SCHEMAS ====
const CollegeSchema = new mongoose.Schema({
  name: String,
  location: String,
});

const PostSchema = new mongoose.Schema({
  collegeId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const NoteSchema = new mongoose.Schema({
  collegeId: mongoose.Schema.Types.ObjectId,
  subject: String,
  uploaderName: String,
  fileUrl: String,
  date: { type: Date, default: Date.now },
});

// ==== MODELS ====
const College = mongoose.model('College', CollegeSchema);
const Post = mongoose.model('Post', PostSchema);
const Note = mongoose.model('Note', NoteSchema);

// ==== ROUTES ====

// Root
app.get('/', (req, res) => {
  res.send('YouLink Backend is Running...');
});

// Colleges
app.get('/api/colleges', async (req, res) => {
  const colleges = await College.find();
  res.json(colleges);
});

app.post('/api/colleges', async (req, res) => {
  const college = new College(req.body);
  await college.save();
  res.json({ message: 'College added', college });
});

// Posts (Events/Updates)
app.get('/api/posts/:collegeId', async (req, res) => {
  const posts = await Post.find({ collegeId: req.params.collegeId });
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json({ message: 'Post created', post });
});

// Notes
app.get('/api/notes/:collegeId', async (req, res) => {
  const notes = await Note.find({ collegeId: req.params.collegeId });
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json({ message: 'Note uploaded', note });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
