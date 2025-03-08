import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/bookCard";

export default function MyBooks() {
    const [books, setBooks] = useState([]);
    const [ren, setRen] = useState(false);

    async function fetchBooks() {
        try {
            const res = await axios.get("http://localhost:5000/books", { withCredentials: true });
            setBooks(res.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [ren]);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Books</h2>
            <div style={styles.bookList}>
                {books.map((book) => (
                    <BookCard 
                        key={book._id}  
                        id={book._id}
                        title={book.name} 
                        author={book.author} 
                        synopsis={book.synopsis} 
                        setRen={setRen}
                    />
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
        textAlign: "center",
    },
    bookList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "1000px",
        justifyContent: "center",
    },
};
