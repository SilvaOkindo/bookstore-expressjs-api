import { matchedData, validationResult } from "express-validator"
import { User } from "../models/user.js"

export const registerUser = async (req, res) => {

    console.log(req.body.password)
   
    try{

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {firstName, lastName, email, password, confirmPassword} = matchedData(req)

        //console.log(password, confirmPassword, "passwords")


        if(password !== confirmPassword) {
            return res.status(400).json({message: "password did not match"})
        }

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })

        //console.log(newUser)

        await newUser.save()

        return res.status(201).send(newUser)

    } catch(error) {
        return res.status(500).json({message: error.message})
    }
}


export const login = async (req, res) => {
    
}



export const updateUser = async (req, res) => {

}