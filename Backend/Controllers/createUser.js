import PersonalDetails from "../Models/personalDetails.js";
import User from "../Models/user.js";
import UserRole from "../Models/userRole.js";

export const userSignup = async(req,res) =>{
    try{
        const { username, password, personalDetails, userRole, reporteeId } = req.body;

        // Create personal details
        const newPersonalDetails = await PersonalDetails.create(personalDetails);
    console.log("newPersonalDetails---",newPersonalDetails);
        // Create user role
        const newUserRole = await UserRole.create(userRole);
        console.log("newUserRole---",newUserRole);

        // Create user
        const newUser = new User({
          username,
          password,
          personalDetails: newPersonalDetails._id,
          userRole: newUserRole._id,
        });
    
        await newUser.save();

        if (userRole.roleName === 'Manager') {
            // User is a Manager, no reporting manager assigned
          } else if (userRole.roleName === 'Lead') {
            // User is a Lead, assign reporting manager
            if (reporteeId) {
              const manager = await User.findById(reporteeId);
              console.log("manager---",manager);
              if (!manager) {
                return res.status(404).json({ error: 'Manager not found' });
              }
              newUser.reportingManager = manager._id;
              await newUser.save();
            } else {
              return res.status(400).json({ error: 'Reporting manager ID is required for Lead role' });
            }
          } else if (userRole.roleName === 'Developer') {
            // User is a Developer, assign reporting lead
            if (reporteeId) {
              const lead = await User.findById(reporteeId);
              console.log("lead---",lead);

              if (!lead) {
                return res.status(400).json({ error: 'Invalid Reporting Lead' });
              }
              newUser.reportingManager = lead._id;
              await newUser.save();
            } else {
              return res.status(400).json({ error: 'Reporting lead ID is required for Developer role' });
            }
          } else {
            return res.status(400).json({ error: 'Invalid Role' });
          }
      
        res.status(201).json(newUser);
    }
    catch(error){
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}