import User from "../Models/user.js";

export const getManagers = async (req, res) => {
    try {
        let getManagerList = await User.find()
            .populate({
                path: 'userRole',
                match: { roleName: 'Manager' }
            })
            .populate('personalDetails')
        getManagerList = getManagerList.filter(val => val.userRole && val.userRole !== null)
        console.log("getManagerList--", getManagerList);

        if (!getManagerList) {
            return res.status(404).json({ error: 'Manager not found' });
        }

        res.status(200).json(getManagerList);
    } catch (error) {
        console.error('Error retrieving Manager', error);
        res.status(500).json({ error: 'Failed to retrieve Manager' });
    }
}