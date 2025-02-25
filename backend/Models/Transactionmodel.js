const mongoose=require("mongoose");

const transaction_schema=new mongoose.Schema({
    transiction:String,
     customer_id:{
        type:String,
        required:true
     },
     customer_name:{
        type:String,
        required:true
     },
     customer_email:{
        type:String,
        required:true
     },
        payment_type:{
            type:String,
            required:true
        },
        payment_method:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            required:true   
        }
},{timestamps:true});

const transaction_model=mongoose.model("Transaction",transaction_schema);

module.exports=transaction_model;