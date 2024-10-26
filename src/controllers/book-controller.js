import { matchedData, validationResult } from "express-validator"
import {User} from "../models/user.js"
import { Book } from "../models/book.js"

export const addBook = async (req, res) => {

    const userId = req.user.id

    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({succuss: false, errors: errors.array()})
        }

        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({succuss: false, message: "User not found"})
        }

        const coverImageUrl = req.file.path
        const data = matchedData(req)

        const newBook = new Book({...data, author: userId, coverImageUrl: coverImageUrl})

        await newBook.save()

        return res.status(201).send(newBook)

        
    } catch (error) {
        return res.status(500).json({succuss: true, message: error.message})
    }
    
}


export const getBooks = async (req, res) => {

    const {filter} = req.query

    

    const books = await Book.find()

    return res.status(200).send({succuss: false, books})
}


export const getBook = async (req, res) => {
    const {id} = req.params

    try {

        const book = await Book.findById(id)

        if(!book) {
            return res.status(400).json({message: "Book not found"})
        }

        return res.status(200).json(book)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const deleteBook = async (req, res) => {
    const {id} = req.params

    try {

        const book = await Book.findByIdAndDelete(id)

        if(!book) {
            return res.status(400).json({message: "Book not found"})
        }

        return res.status(200).json(book)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const updateBook = async (req, res) => {
    const {id} = req.params

    try {

        const book = await Book.findByIdAndUpdate(
            {_id: id},
            {$set: req.body},
            {new: true}
        )

        if(!book) {
            return res.status(400).json({succuss: true, message: "Book not found"})
        }

        return res.status(200).json(book)
        
    } catch (error) {
        return res.status(500).json({succuss: false, message: error.message})
    }
}

export const getBooksByCategory = async (req, res) => {
    const {categoryId} = req.params

    if (!categoryId) {
        return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    try {
        const books = await Book.find({category: categoryId})

        if(books.length === 0) {
            return res.status(404).json({succuss: true, message: "Books not found"})
        }

        return res.status(200).send(books)
    } catch(error) {
        return res.status(500).json({
            succuss: false,
            message: error.message
        })
    }
}



// admin only can change publication status
export const verifyPublication = async (req, res) => {
    const {id} = req.params

    try {

        const book = await Book.findById(id)

        if(!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }

        book.isPublished = !book.isPublished

        await book.save()

        return res.status(200).json({
            success: true,
            book
        })
        
    } catch (error) {
        return res.status(500).json({
            succuss: false,
            message: error.message
        })
    }
    
}

