import { matchedData, validationResult } from "express-validator"
import { User } from "../models/user.js"
import jwt from "jsonwebtoken"
import { hashPassword } from "../helpers/hash-password.js"
import { comparePassword } from "../helpers/compare-password.js"

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

        const hashedPassword = hashPassword(password)

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })
        //console.log(newUser)

        await newUser.save()

        return res.status(201).send(newUser)

    } catch(error) {
        return res.status(500).json({message: error.message})
    }
}


export const login = async (req, res) => {

    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = matchedData(req)

        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        if(!comparePassword(password, user.password)) {
            return res.status(400).json({message: "Bad crediantials"})
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email
        }, process.env.JWT_SEC)


        res.status(200).send({token: token})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }


}