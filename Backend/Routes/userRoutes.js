import express from "express"
import { userSignup } from "../Controllers/createUser.js";
import { getUserById } from "../Controllers/getUser.js";
import { deleteUser } from "../Controllers/deleteUser.js";
import { updateUserDetails } from "../Controllers/updateUser.js";
import { getManagers } from "../Controllers/getManagerList.js";
import { getLeads } from "../Controllers/getLeadsList.js";
import { getReporteesBasedonUser } from "../Controllers/getReportee.js";
import { login } from "../Controllers/login.js";

const userRoute = express.Router();

userRoute.post('/signup',userSignup);
userRoute.post('/login',login);
userRoute.get('/user/:id',getUserById);
userRoute.post('/updateUser',updateUserDetails);
userRoute.delete('/user/:id',deleteUser);
userRoute.get('/get-managers',getManagers);
userRoute.get('/get-leads',getLeads);
userRoute.get('/get-reportees/:id',getReporteesBasedonUser);




export default userRoute;