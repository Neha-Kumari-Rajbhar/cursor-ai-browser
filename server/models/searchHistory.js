import mongoose from "mongoose";

const searchHistorySchema=new mongoose.Schema({
    prompt:{
        type:String,
        required:true
    },
    // language:{
    //     type:String,
    // },
    code:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("searchHistory" ,searchHistorySchema)