const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    is_admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const admin_model = mongoose.model('Admin', adminSchema);
module.exports = admin_model;