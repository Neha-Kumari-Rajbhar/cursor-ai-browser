import { GoogleGenAI } from "@google/genai";
// import readlineSync from 'readline-sync'
import dotenv from 'dotenv'
dotenv.config()

const History=[]
const ai=new GoogleGenAI({apiKey:process.env.APIKEY})


async function cursor(prompt) {
    History.push({
        role:'user',
        parts:[{text:prompt}]
    })
    
    const response= await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:History,
        config:{
            // systemInstruction:`
            // You are a frontend code generator.
            // -If user give ${prompt} give react.js code according to their requirement
            // -Make sure the react.js code you give as response always responsive frontend for all device
            // -If user asked anything except your work you should reply i can't help... you can told me what website you want to create
            // -If user mention any other language except react.js then your reply should be i can give only react code
            // - Do not add explanations, comments, markdown formatting, or extra text — only return react.js code.
            //     User task: ${prompt}
            // `
            systemInstruction:`
            You are a frontend code generator.

                - If the user gives ${prompt}, generate  React.js code according to their requirement, ensuring responsiveness by default.    
                - Always generate fully responsive React.js code that adapts to mobile, tablet, and desktop screens using modern CSS practices (Flexbox, Grid).
                -Try to give image url which actually work inplace of just dummy image link.
                - If the user asks anything unrelated to your work, reply exactly: "I can't help... you can tell me what website you want to create".
                - If the user mentions any language other than React.js, reply exactly: "I can give only React code".
                - Do not include explanations, comments, markdown formatting, or extra text. Output only clean, runnable React.js code.

            User task: ${prompt}`

        }
    })

    const code = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    History.push({
        role: 'model',
        parts: [{ text: code }]
    });

     return code;
}

export default cursor