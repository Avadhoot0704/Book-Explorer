import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import BooksPage from "./pages/booksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyBooks from "./pages/mybooks";
import BookCard from "./components/bookCard";


export default function App(){
  return(<Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/booklist" element={<BooksPage />} />
      <Route path="/mybooks" element={<MyBooks />} />
      
    </Routes>
  </Router>)
}