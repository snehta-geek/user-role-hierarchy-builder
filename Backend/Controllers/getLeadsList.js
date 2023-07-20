import User from "../Models/user.js";

export const getLeads = async(req,res) =>{
    try{
        let getLeadsList = await User.find()
        .populate({
            path: 'userRole',
            match: { roleName: 'Lead' }
        })
        .populate('personalDetails')
        getLeadsList = getLeadsList.filter(val => val.userRole && val.userRole !== null)

      if (!getLeadsList) {
        return res.status(404).json({ error: 'Lead not found' });
      }
  
      res.status(200).json(getLeadsList);
    }catch (error) {
        console.error('Error retrieving Lead', error);
        res.status(500).json({ error: 'Failed to retrieve Lead' });
      }
    }