const userFeedback = require("../Models/userFeedback");

module.exports.userFeedback = async (req,res)=>{
    const {fullName,gmail,subject,message}= req.body;
    try {
        const newFeedback= new userFeedback({fullName,gmail,subject,message})
        await newFeedback.save();
        return res.status(200).json({message:"We recieved your feedback. your got our reply ASAP."})
    } catch (error) {
        return res.status(500).json({Error:error.message})
    }

};

module.exports.getAllFeedback = async (req,res)=>{
    try {
        const feedbacks = await userFeedback.find();
        if(!feedbacks){
            return res.status(404).json({message:"Feedbacks not founds"})
        };
        return res.status(200).json({success:true,message:"Feedbacks found successfully",feedbacks});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports.deleteFeedback = async(req,res)=>{
    const {id}= req.params;
    try {
       const toDelete =  await userFeedback.findByIdAndDelete(id);
        
       if(!toDelete){
            return res.status(404).json({message:"Feedback not found"})
        }
       
        return res.status(200).json({message:"Feedback deleted successfully"})
    
    } catch (error) {
    
        return res.status(500).json({error:error.message})
    }

}