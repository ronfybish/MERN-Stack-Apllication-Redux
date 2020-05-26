const User=require('../models/User')


module.exports={
    getAuthUser:async(req,res)=>{
        try {
            let user=await User.findById(req.user.id).select('-password')
            await user.save()
            res.status(200).json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).json({msg:'Server Error **getUser**'})
        }
    }
}