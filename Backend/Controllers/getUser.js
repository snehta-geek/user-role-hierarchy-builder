import User from "../Models/user.js";

export const getUserById = async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        .populate('personalDetails')
        .populate('userRole');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    }catch (error) {
        console.error('Error retrieving user', error);
        res.status(500).json({ error: 'Failed to retrieve user' });
      }
    }