import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "category"},
    publishedDate: {type: Date, default: Date.now()},
    ISBN: {type: String, required: true},
    summary: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    coverImageUrl: {type: String, required: true}

}, {timestamps: true})


export const Book = mongoose.model("Book", bookSchema)