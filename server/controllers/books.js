import Book from "../models/book.js"


export const handleGetBooks = async (req,res)=>{
    try {
        const ID  = req.userId;
        
        const books = await Book.find({user:ID.trim()});
        
        res.status(200).json(books)

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const handleAddBooks = async (req,res)=>{
    
    try {
        const {name,author,synopsis} = req.body;
        const user = req.userId;
        
        const newBook = new Book({
            user,
            name,
            author,
            synopsis
        })

        await newBook.save();
        res.status(200).json({message:"book added successfully"});
     
    } catch (error) {
        res.status(500).json({error:error.message});
    }


}

export const handleDeleteBooks = async(req,res)=>{
    const {key} = req.body;
       
    try {
        
        const response = await Book.findOneAndDelete({_id:key.trim()})
        
        res.status(200).json({message:"book deleted"});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}