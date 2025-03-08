import React from 'react';

const BookSearchCard = ({ book, handleAddToList }) => {
  const { title, authors, description, imageLinks } = book.volumeInfo;

  const styles = {
    card: {
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      textAlign: 'left',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 15px rgba(0,0,0,0.25)',
    },
    coverContainer: {
      height: '260px',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cover: {
      height: '100%',
      objectFit: 'cover',
      width: '100%',
    },
    info: {
      padding: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px',
      color: '#222',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    author: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '8px',
    },
    description: {
      fontSize: '14px',
      color: '#333',
      marginBottom: '12px',
    },
    button: {
      backgroundColor: '#ff4d6d',
      color: 'white',
      padding: '8px 12px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
  };

  return (
    <div
      style={styles.card}
      onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
      onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.card)}
    >
      <div style={styles.coverContainer}>
        {imageLinks?.thumbnail ? (
          <img src={imageLinks.thumbnail} alt={title} style={styles.cover} />
        ) : (
          <div style={{ color: '#aaa' }}>No cover available</div>
        )}
      </div>
      <div style={styles.info}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.author}>by {authors ? authors.join(', ') : 'Unknown Author'}</p>
        <p style={styles.description}>{description ? description.slice(0, 120) + '...' : 'No description available.'}</p>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#e63946')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#ff4d6d')}
          onClick={() => handleAddToList(book)}
        >
          Add to list
        </button>
      </div>
    </div>
  );
};

export default BookSearchCard;
