const mongoose=require('mongoose');

const myLocationSchema=new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    place:{type:String,required:true},
    longi:{type:Number,required:true},
    latti:{type:Number,required:true}
});
const MyLocationModel=mongoose.model('MyLocation',myLocationSchema);

module.exports=MyLocationModel;