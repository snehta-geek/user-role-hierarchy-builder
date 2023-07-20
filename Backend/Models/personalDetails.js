import mongoose from "mongoose";

const personalDetailSchema = new mongoose.Schema({
    fullName : { type : String, required : true},
    email : { type :String, unique: true, trim: true, lowercase: true, match : /^\S+@\S+\.\S+$/},
    mobileNumber : { type: String, required: true , validate : {
            validator : function(number){
                    return /^[0-9]*$/.test(number);
                },
                message : (props) => `${props.value} is not a valid mobile number!`
            },
        }

});

const PersonalDetails = mongoose.model('PersonalDetails', personalDetailSchema);
export default PersonalDetails;