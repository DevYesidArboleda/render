import User from "../models/user.model.js"
import bcrypt  from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js"
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    const {email, password, username} = req.body;

    try{

        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["el email ya esta en uso"])

        const passwordHash  =  await bcrypt.hash(password, 10)

        const newUser = new User({
            
            email, 
            password: passwordHash,
            username,
        })
    
        const userSaved = await newUser.save()    

        const token = await createAccessToken({id:userSaved._id})

        res.cookie('token', token)

        res.json({
            id:userSaved._id,
            username:userSaved.username,
            email:userSaved.email,
            createdAt:userSaved.createdAt,
            updatedAt:userSaved.updatedAt,
        }) 
    }catch(error){
        res.status(500).json( { message: error.message })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{

        const userFound = await User.findOne({ email });

        if (!userFound)
        return res.status(400).json({
          message: ["The email does not exist"],
        });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
        return res.status(400).json({
            message: ["The password is incorrect"],
        });
        }


        const token = await createAccessToken({
            id: userFound._id,
          });

        res.cookie('token', token)

        res.json({
            id:userFound._id,
            username:userFound.username,
            email:userFound.email,
            createdAt:userFound.createdAt,
            updatedAt:userFound.updatedAt,
        }) 
    }catch(error){
        res.status(500).json( { message: error.message })
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };

  export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    
    if(!userFound) return res.status(400).json({message: "user bir found"});
    
    return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt,
    })
  }

  export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };

  export const updateUser = async (req, res) => {
    try {
      const { username, email, date } = req.body;
      const userUpdated = await User.findOneAndUpdate(
        { _id: req.params.id },
        { username, email, date },
        { new: true }
      );
      return res.json(userUpdated);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };