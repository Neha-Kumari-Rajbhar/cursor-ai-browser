
import cursor from "../genai.js"
import searchHistory from "../models/searchHistory.js"

const promptController=async(req,res)=>{
      try {
        const {prompt} =req.body

        if(!prompt || typeof prompt !='string')
            return res.status(400).json({
                error:"prompt required"
            })
        console.log("--Received prompt: ", prompt.slice(0,120))

// const code = "<h1>Hello World</h1>"

     const code=await cursor(prompt)
        //save to db
        if(!code) return res.status(500).json({
            error:"code is missing"
        })

        const history=new searchHistory({prompt,code})
        await history.save()
        res.status(201).send({
            success:true,
            message:'history saved',

            code,
            id:history._id
        })
        
      } catch (error) {
        console.error(`error:${error} in /generate`)
        return res.status(500).json({
            error:error.message || "server error"
        })
      }
}

const historyController=async(req,res)=>{
    try {
        const list=await searchHistory.find()
        .sort({createdAt:-1})
        .limit(20)

        return res.status(200).json({
            success:true,
            history:list
        })
    } catch (error) {
        return res.status(500).json({
            error:"can't fetch history"
        })
    }
}
export default {promptController , historyController}