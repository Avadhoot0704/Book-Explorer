import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookSearchCard from '../components/bookSearchCard.js';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notf, setNotf] = useState(false);
  const navigate = useNavigate();

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px 16px',
      fontFamily: "'Poppins', sans-serif",
      textAlign: 'center',
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      minHeight: '100vh',
      borderRadius: '12px',
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '32px',
      color: '#fff',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#ff6b6b',
      color: 'white',
      padding: '10px 16px',
      border: 'none',
      borderRadius: '25px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: '0.3s',
    },
  };

  const fetchBooks = async (query = searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data.items || []);
      if(data.items === 0){
        setNotf(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      navigate('/'); 
    } catch (error) {
      alert('Error logging out');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  const handleMyList = () => {
    navigate('/mybooks');
  };

  const handleAddToList = async (book) => {
    try {
      const name = book.volumeInfo.title;
      const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
      const synopsis = book.volumeInfo.description || 'No description available';
      const res = await axios.post(
        'http://localhost:5000/books',
        { name, author, synopsis },
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.status === 401 ? 'Login to add books' : error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Book Explorer 📚</h1>

      {/* Buttons: My List & Logout */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={handleMyList}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#ff4757')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#ff6b6b')}
        >
          My List
        </button>
        <button
          style={{ ...styles.button, backgroundColor: '#3742fa' }}
          onClick={handleLogout}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2f3eea')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3742fa')}
        >
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', maxWidth: '500px', margin: '0 auto 32px auto' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books..."
          style={{
            flex: '1',
            padding: '12px 16px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '25px 0 0 25px',
            outline: 'none',
            boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.2)',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#6a11cb',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '0 25px 25px 0',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: '0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#5514b4')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#6a11cb')}
        >
          🔍 Search
        </button>
      </form>

      {/* Loading / Error Messages */}
      {isLoading && <p style={{ color: '#fff', padding: '20px', fontSize: '18px', fontWeight: '500' }}>📖 Searching for books...</p>}
      {error && <p style={{ color: '#e63946', padding: '20px', fontWeight: '600' }}>⚠️ {error}</p>}

      {/* Books Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', padding: '20px' }}>
        {books.map((book) => (
          <BookSearchCard key={book.id} book={book} handleAddToList={handleAddToList} />
        ))}
      </div>

      
      {!isLoading && notf ? <p style={{ color: '#fff', padding: '20px', fontSize: '18px', fontWeight: '500' }}>🚫 No books found. Try a different search term.</p>:<p></p>}
    </div>
  );
};

export default BooksPage;
