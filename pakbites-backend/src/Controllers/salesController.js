const Sales = require("../Models/salesModel");


module.exports.getAllSales = async(req,res)=>{
    try {
        const allSales = await Sales.find();
        if(!allSales){
            return res.status(404).json({success:false,message:"sales not found"})
        }
        return res.status(200).json({success:true,message:"sales found successfully",sales:allSales}) 
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}