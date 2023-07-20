import User from "../Models/user.js";
import mongoose from "mongoose";

export const getReporteesBasedonUser = async (req, res) => {
  try {
    console.log("req.params.id---",req.params.id);
    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'reportingManager',
          foreignField: '_id',
          as: 'reporteeDetails'
        }
      },
      { $unwind: '$reporteeDetails' },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'reporteeDetails.personalDetails',
          foreignField: '_id',
          as: 'reporteePersonalDetails'

        }
      },
      { $unwind: '$reporteePersonalDetails' },
      {
        $lookup: {
          from: 'userroles',
          localField: 'reporteeDetails.userRole',
          foreignField: '_id',
          as: 'reporteeRole'

        }
      },
      { $unwind: '$reporteeRole' },

      {
        $project: {
          reporteeId: '$reporteeDetails._id',
          reporteeName: '$reporteeDetails.username',
          reporteeRole: '$reporteeRole.roleName',
          reporteeDetails: '$reporteePersonalDetails',
        }
      }
    ])
      // .populate('personalDetails')
      // .populate('userRole');
console.log("user----",user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error('Error retrieving user', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}