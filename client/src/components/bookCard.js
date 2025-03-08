import React from "react";
import axios from "axios";


export default function BookCard({ setRen,id,title, author, synopsis}) {
  const handleDelete = async (key)=>{
    try {
       const res = await axios.delete("http://localhost:5000/books",{data : {key}})
       setRen((prev)=>!prev)
      
    } catch (error) {
     console.log(error.message)
    }
   }
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.author}>by {author}</p>
      <p style={styles.synopsis}>{synopsis}</p>
      <button style={styles.deleteButton} onClick={()=>handleDelete(id)}>
        Delete
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "12px",
    maxWidth: "300px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  author: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  synopsis: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "12px",
  },
  deleteButton: {
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
