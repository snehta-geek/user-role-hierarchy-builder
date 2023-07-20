import PersonalDetails from "../Models/personalDetails.js";
import User from "../Models/user.js";
import bcrypt from "bcrypt";


export const updateUserDetails = async (req, res) => {
  try {
    const { username, oldPassword, newPassword, personalDetails } = req.body;

    const getUser = await User.findOne({ _id: req.body.uId })
    if (!getUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("getUser---", getUser);

    const existingPersonalDetails = await PersonalDetails.findOne({ _id: getUser.personalDetails })
    console.log("newPersonalDetails---", existingPersonalDetails);
    existingPersonalDetails.fullName = personalDetails.fullName || existingPersonalDetails.fullName
    existingPersonalDetails.email = personalDetails.email || existingPersonalDetails.email
    existingPersonalDetails.mobileNumber = personalDetails.mobileNumber || existingPersonalDetails.mobileNumber

    await existingPersonalDetails.save();
    if (newPassword !== null && newPassword !== '') {
      const isPwdMatch = await bcrypt.compare(oldPassword, getUser.password);
      console.log("isPwdMatch-----", isPwdMatch);
      if (isPwdMatch) {
        getUser.password = newPassword ;
      }
    }

    getUser.username = username || getUser.username;
    // getUser.password = getUser.password;

    const updatedUser = await getUser.save();
    res.status(200).json(updatedUser);

    // const updatedUser = await User.findByIdAndUpdate(
    //   req.body.uId,
    //   { username, password },
    //   { new: true }
    // );
  
      
      
    }catch (error) {
  console.error('Error updating user', error);
  res.status(500).json({ error: 'Failed to update user' });
}
    }