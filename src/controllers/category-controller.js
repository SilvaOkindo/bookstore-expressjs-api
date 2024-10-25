import { matchedData, validationResult } from "express-validator"
import { Category } from "../models/category.js"

export const createCategory = async (req, res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {name, description, slug} = matchedData(req)

        const findCategory = await Category.findOne({name})

        if(findCategory) {
            return res.status(400).json({message: "Category already exists."})
        }

        const imageUrl = req.file ? req.file.path : null; 

        console.log(imageUrl)

        const newCategory = new Category({name, description, slug, imageUrl})

        await newCategory.save()

        return res.status(201).send(newCategory)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const getCategories = async (req, res) => {
    const categories = await Category.find()

    res.status(200).send(categories)
}

export const getCategoryById = async (req, res) => {
    const {id} = req.params

    try {

        const category = await Category.findById(id)

        if(!category) {
            return res.status(404).json({message: "category not found"})
        }

        return res.status(200).send(category)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteCategory = async (req, res) => {
    const {id} = req.params

    try {

        const category = await Category.findByIdAndDelete(id)

        if(!category) {
            return res.status(404).json({message: "category not found"})
        }

        return res.status(200).send(category)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCategory = async (req, res) => {
    const {id} = req.params

    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const data = matchedData(req)

        const category = await Category.findByIdAndUpdate(
            {_id:id},
            {$set: data},
            {$new: true}
        )

        if(!category) {
            return res.status(404).json({message: "category not found"})
        }

        return res.status(200).send({message: "Category updated"})
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


// TODO: get book