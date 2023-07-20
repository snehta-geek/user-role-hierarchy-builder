import User from "../Models/user.js";

export const deleteUser = async(req,res) =>{
    try{
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    }catch (error) {
      console.error('Error deleting user', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
    }