const express=require("express");
const UserModel = require("../Models/User");
const transaction_model = require("../Models/Transactionmodel");
const user_route=express();

// -------------------------after-play-------------------------------
user_route.put("/after-play-minus-balance",async(req,res)=>{
    try {
        const {betAmount,player_id}=req.body;
        console.log(req.body)
        const find_user=await UserModel.findOne({player_id:player_id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        // const update_user_balance=await UserModel.findByIdAndUpdate({_id:find_user._id});
        find_user.balance-=betAmount;
        res.send({success:true,message:"Ok"})
        find_user.save();
    } catch (err) {
        console.log(err)
    }
});
// ------------------after-win--------------------------
user_route.put("/after-wind-add-balance",async(req,res)=>{
    try {
        const {winAmount,player_id}=req.body;
        console.log(req.body)
        const find_user=await UserModel.findOne({player_id:player_id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        // const update_user_balance=await UserModel.findByIdAndUpdate({_id:find_user._id});
        find_user.balance+=winAmount;
        res.send({success:true,message:"Ok"})
        find_user.save();
    } catch (err) {
        console.log(err)
    }
});
// -------------------------after-withdraw-------------------------------
user_route.put("/after-withdraw-minus-balance",async(req,res)=>{
    try {
        const {amount,player_id}=req.body;
        console.log(req.body)
        const find_user=await UserModel.findOne({player_id:player_id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        // const update_user_balance=await UserModel.findByIdAndUpdate({_id:find_user._id});
        find_user.balance-=amount;
        res.send({success:true,message:"Ok"})
        find_user.save();
    } catch (err) {
        console.log(err)
    }
});
// -------------create-transations--------------------
user_route.post("/create-transaction",async(req,res)=>{
    try {
         const {transiction,payment_type,amount,payment_method,status,customer_id}=req.body;
          // Check if any required field is missing
          console.log(req.body)
  if (!payment_type || !amount || !payment_method || !status || !customer_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: payment_type, amount, payment_method, status, customer_id",
    });
  }
  console.log(req.body)

         const find_customer=await UserModel.findOne({_id:customer_id});
         if(!find_customer){
            return res.send({success:false,message:"Customer did not find!"})
         }
         const create_transaction=new transaction_model({customer_name:find_customer.name,customer_email:find_customer.email,payment_type,amount,payment_method,status,customer_id});
         if(!create_transaction){
            return res.send({success:false,message:"Something went wrong!"})
         }
         // const update_user_balance=await UserModel.findByIdAndUpdate({_id:find_user._id});
         if(status=="success"){
            find_customer.balance+=amount;
            find_customer.save();
         }

         create_transaction.save();
    } catch (error) {
        console.log(error)
    }
})
// --------------single-user-transaction-data---------------------
user_route.get("/single-user-transactions/:id",async(req,res)=>{
    try {
        const transaction_data=await transaction_model.find({customer_id:req.params.id}).sort({ createdAt: -1 });
        if(!transaction_data){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:transaction_data})
    } catch (error) {
        console.log(error)
    }
});
module.exports=user_route;
