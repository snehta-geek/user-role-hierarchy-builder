import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username : { type : String, required : true},
    password : { type :String, required : true},
    personalDetails : { type :  mongoose.Schema.Types.ObjectId, ref : 'PersonalDetails'},
    userRole : { type :  mongoose.Schema.Types.ObjectId, ref : 'UserRole'},
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      

});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log("befor--hash---", this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log("after--hash---", this.password);
        next();
    }

})
const User = mongoose.model('User', userSchema);
export default User;