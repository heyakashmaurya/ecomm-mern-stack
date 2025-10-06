import jwt from "jsonwebtoken"

export const  genToken = async (userId) => {
    try {
        let token =  jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"})
        return token ;
    } catch (error) {
        console.log("Token error")
    }
}

export const  genToken1 = async (email) => {
    try {
        let token =  jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        return token ;
    } catch (error) {
        console.log("gentoken1 error")
    }
}