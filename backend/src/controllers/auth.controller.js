import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res) => {
    const { fullName,email,password } = req.body    
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Fill all the fields" });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" }); 
        }

        const existingUser = await User.findOne({email});

        if (existingUser) return res.status(400).json({ message: "User already exists with this email" });

        // pswd hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPswd = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPswd,
        });

        if (newUser) {
            await newUser.save();

            // generate jwt token
            const token = generateToken(newUser._id, res);
            
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                token,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error "});
    }
};

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPswdCorrect = await bcrypt.compare(password, user.password);
        if(!isPswdCorrect) {
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = generateToken(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export const logout = (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req,res) => {
    const userId = req.user._id;
    const { fullName, email, newPassword, profilePic} = req.body;
    try {  
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;

        if (newPassword && newPassword.length >= 6) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }
        
        if (profilePic) {
            const uploadRes = await cloudinary.uploader.upload(profilePic, {
                folder: "chatApp/profilePics",
            });
            user.profilePic = uploadRes.secure_url;
        }
        
        const updatedUser = await user.save();
        const token = generateToken(updatedUser._id, res);
        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            token,
        });
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal ServerError" });
    }
};