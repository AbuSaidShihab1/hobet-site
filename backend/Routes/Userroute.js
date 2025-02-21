const express=require("express");
const UserModel = require("../Models/User");
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
module.exports=user_route;
