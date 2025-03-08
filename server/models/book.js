import mongoose from "mongoose";


// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, 

  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  synopsis: {
    type: String,
    required: true
  },
 
}, {
  timestamps: true // This automatically handles the createdAt and updatedAt fields
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);

export default Book;