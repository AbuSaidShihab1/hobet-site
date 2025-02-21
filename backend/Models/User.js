const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
    },
    player_id:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    currency:{
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:"user"
    },
    balance:{
        type:Number,
        default:0
    },
    deposit:{
        type:Number,
        default:0
    },
   withdraw:{
    type:Number,
    default:0
   },
   invest:{
    type:Number,
    default:0
   },
   win:{
    type:Number,
    default:0
   },
   loss:{
    type:Number,
    default:0
   },
   bonus:{
    type:Number,
    default:0
   },
   referralCode:{
    type:String,
   }
},{timestamps:true});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;