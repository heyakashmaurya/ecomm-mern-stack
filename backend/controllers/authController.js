import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";


export const  register = async (req, res ) => {
    try {
        const {name , email , password } = req.body 
        const existUser = await User.findOne({email})

        if (existUser){
            return res.status(400).json({message: "User already existed"})
        }

        if (!validator.isEmail(email)){
            return res.status(400).json({message: "Please enter valid Email"})
        }
        if (password.length < 8 ){
            return res.status(400).json({message: " Password Must be 8 characters"})
        }
        let hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email , password: hashPassword}); 
        let token = await genToken(user._id);

        res.cookie("token" , token , {
            httpOnly:true, 
            sameSite: "strict", 
            secure:false,
            maxAge:7*24*60*60*1000
        })
        
        // return res.status(201).json({message: "Register Successfully"})
        return res.status(201).json(user)

    } catch (error) {
        console.log("register error")
        return res.status(500).json({message:`register error ${error}`})
    }
}

export const login = async (req , res) => {
    try {
        const {email, password} = req.body;
        
        let user = await User.findOne({email});

        if (!user){
            return res.status(404).json({message: "user not found"})
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
           return res.status(401).json({message: "Email or Password is incorrect"})
        }

        let token = await genToken(user._id);
        res.cookie("token" , token , {
            httpOnly:true, 
            sameSite: "strict", 
            secure:false,
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json({message:"Loggedin Successfully"})
    } catch (error) {
        console.log("login error")
        return res.status(500).json({message:`login error ${error.message}`})
    }
}

export const logout = async (req, res) => {
    try {
         res.clearCookie("token",{
      httpOnly: true,
      sameSite: "None", // Set to 'Lax' or 'Strict' if not using cross-site cookies
      secure: true       // Required if using HTTPS
    })
        return res.status(200).json({message: "Logout Successfully"})

    } catch (error) {
        console.log("logOut error")
        return res.status(500).json({message: `Logout error ${error}`})
    }
}


export const googleLogin = async (req, res ) => {
    try {
        const {name , email} = req.body;
        let user = await User.findOne({email});

        const dummyPassword = await bcrypt.hash("google-auth-no-password", 10);

        if (!user){
            user = await User.create({
                name, email,password: dummyPassword
            })
        }

        let token = await genToken(user._id);
        res.cookie("token" , token , {
            httpOnly:true, 
            sameSite: "strict", 
            secure:false,
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)

    } catch (error) {
        console.error("googleLogin error:", error);
        return res.status(500).json({ message: `googleLogin error: ${error.message}` });
    }
} 

export const adminLogin = async (req, res) => {
    try {
        let {email , password } = req.body ;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            let token = await genToken1(email);
        res.cookie("token" , token , {
            httpOnly:true, 
            sameSite: "strict", 
            secure:false,
            maxAge:1*24*60*60*1000
        })
        return res.status(200).json(token)
        }
        res.status(400).json({message: "Invalid Credentials"})

    } catch ( error ) {
        console.error("Admin login error:", error);
        return res.status(500).json({ message: `adminlogin error: ${error.message}` });
    }
}