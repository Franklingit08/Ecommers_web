import users from '../models/userModel.js';
import asyncHandler from "../middlewares/asyncHandler.js"
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    const userExists = await Users.findOne({ email: email })

    if (userExists) {
        return res.status(4400).json({ message: 'user already exists' })

    }

    const user = await Users.create({
        name,
        email,
        password: encryptedPassword
    })

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        return res.status(4400).json({ message: 'invalid user data' })
    }

})


const logoutuser = asyncHandler(async (req, res) => {

    let { email, password } = req.body
    const user = await Users.findOne({ email: email })

    if (user && await user.matchpassword(password)) {
        generateToken(res, user._id);

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        return res.status(400).json({ message: "invalid user data" });
    }

});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expiresIn: new Date(0)
    })
    res.status(200).json({ message: 'logout success' })
})


const loginUser = async () => { };


export {
    registerUser,
    loginUser,
    logoutuser
}