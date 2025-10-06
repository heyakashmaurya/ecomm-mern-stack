import User from "../models/userModel.js"


export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(404).json({message: "User is not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`getCurrentUser error ${error.message}`})
    }
}
export const getCurrentAdmin = async (req, res) => {
    try {
        const adminEmail = req.email
        
        if(!adminEmail){
            return res.status(404).json({message: "User is not found"})
        }
        return res.status(200).json({
            email: adminEmail,
            role:"admin"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`getcurrentadmin  error ${error.message}`})
    }
}