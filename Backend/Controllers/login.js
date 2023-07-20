import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async(req,res) =>{
    try{
        const user = await User.findOne({username: req.body.username});
       
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPwdMatch = await bcrypt.compare(req.body.password, user.password);
      if(!isPwdMatch){
        return res.status(404).json({ msg: "Given password is wrong" })
      }
      const token = await generateToken({id: user._id, userName: user.username, role: user.userRole})
      console.log("tkk----",token);
      res.status(200).json({success: true, data : {user,token}})
  
      
    }catch (error) {
        console.error('Error retrieving user', error);
        res.status(500).json({ error: 'Failed to Login user' });
      }
    }

    const generateToken = async(id,userName,role) =>{
        try{
            const token =jwt.sign({id,userName,role},process.env.JWT_SECRET_KEY,{
                expiresIn: "2h",

            })
            return token;
        } catch (err) {
            return (err);
          }

    }