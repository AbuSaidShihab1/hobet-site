const express=require("express");
const UserModel = require("../Models/User");
const transaction_model = require("../Models/Transactionmodel");
const admin_route=express();

// ========================users===================================
admin_route.get("/all-users",async(req,res)=>{
    try {
       const all_users=await UserModel.find();
       if(!all_users){
           return res.send({success:false,message:"Users Not found!"})   
       }
       res.send({success:true,message:"Active users",data:all_users})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/active-users",async(req,res)=>{
    try {
       const active_user=await UserModel.find({status:"active"});
       if(!active_user){
           return res.send({success:false,message:"Active Users Not found!"})   
       }
       res.send({success:true,message:"Active users",data:active_user})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/banned-users",async(req,res)=>{
    try {
       const banned_user=await UserModel.find({status:"banned"});
       if(!banned_user){
           return res.send({success:false,message:"Banned Users Not found!"})   
       }
       res.send({success:true,message:"Active users",data:banned_user})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/single-user-details/:id",async(req,res)=>{
    try {
       const user_detail=await UserModel.findOne({_id:req.params.id});
       if(!user_detail){
           return res.send({success:false,message:"User Not found!"})   
       }
       res.send({success:true,message:"Ok",data:user_detail})
    } catch (error) {
        console.log(error)
    }
});
// ========================users=================================


// ========================deposit-transactions=============================
admin_route.get("/pending-deposit",async(req,res)=>{
    try {
        const pending_deposit=await transaction_model.find().sort({ createdAt: -1 });
        if(!pending_deposit){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:pending_deposit})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/successful-deposit",async(req,res)=>{
    try {
        const success_deposit=await transaction_model.find({status:"success"}).sort({ createdAt: -1 });
        if(!success_deposit){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:success_deposit})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/all-deposits",async(req,res)=>{
    try {
        const all_deposit=await transaction_model.find().sort({ createdAt: -1 });
        if(!all_deposit){
            return res.send({success:false,message:"Transaction not found!"})
        };
        res.send({success:true,data:all_deposit})
    } catch (error) {
        console.log(error)
    }
});


module.exports=admin_route;