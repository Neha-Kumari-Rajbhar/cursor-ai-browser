// import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c"

// export function parseLLMResponse(text){

//     const reject=/```(\w+)?\n([\s\S]*?)```/
//     const match=text.match(reject)

//     if(match){
//         return {
//             language:match[1]||"javascript",
//             code:match[2].trim()
//         }
//     }

//     return{
//     language:"javascript",
//     code:text
//     }
// }

// export function parseLLMResponse(text) {
//   // Match all ```lang ... ```
//   const regex = /```(\w+)?\n([\s\S]*?)```/g;
//   let match;
//   const files = {};

//   while ((match = regex.exec(text)) !== null) {
//     const language = match[1] || "javascript";
//     let codeBlock = match[2].trim();

//     // Detect file name (e.g., // App.js at top of block)
//     const fileNameMatch = codeBlock.match(/^\/\/\s*(.+)$/m);
//     let fileName = "/App.js"; // default

//     if (fileNameMatch) {
//       fileName = "/" + fileNameMatch[1].replace(/^src\//, "").trim();
//       codeBlock = codeBlock.replace(fileNameMatch[0], "").trim();
//     }

//     // Save into files object
//     files[fileName] = { code: codeBlock, language };
//   }

//   return files;
// }

// export function parseLLMResponse(text) {
//   const regex = /```(\w+)?\n([\s\S]*?)```/g;
//   let match;
//   const files = {};

//   while ((match = regex.exec(text)) !== null) {
//     const languageHint = match[1] || "javascript";
//     let codeBlock = match[2].trim();

//     // Detect filename (like // App.js OR /* src/index.css */)
//     const fileNameMatch =
//       codeBlock.match(/^\/\/\s*(.+)$/m) || codeBlock.match(/^\/\*\s*(.+)\s*\*\//m);

//     let fileName = "/App.js"; // default
//     if (fileNameMatch) {
//       fileName = "/" + fileNameMatch[1].replace(/^src\//, "").trim();
//       codeBlock = codeBlock.replace(fileNameMatch[0], "").trim();
//     }

//     // Detect language by extension
//     let language = languageHint;
//     if (fileName.endsWith(".css")) language = "css";
//     if (fileName.endsWith(".json")) language = "json";
//     if (fileName.endsWith(".html")) language = "html";
//     if (fileName.endsWith(".js") || fileName.endsWith(".jsx")) language = "javascript";

//     // Save to Sandpack format
//     files[fileName] = { code: codeBlock, language };
//   }

//   return files;
// }

// export function parseLLMResponse(text) {
//   const regex = /```(\w+)?\n([\s\S]*?)```/g;
//   let match;
//   const files = {};

//   while ((match = regex.exec(text)) !== null) {
//     const languageHint = match[1] || "javascript";
//     let codeBlock = match[2].trim();

//     // Detect filename (like // App.js OR /* src/index.css */)
//     const fileNameMatch =
//       codeBlock.match(/^\/\/\s*(.+)$/m) ||
//       codeBlock.match(/^\/\*\s*(.+)\s*\*\//m);

//     let fileName;
//     if (fileNameMatch) {
//       fileName = "/" + fileNameMatch[1].replace(/^src\//, "").trim();
//       codeBlock = codeBlock.replace(fileNameMatch[0], "").trim();
//     } else {
//       // Choose default file depending on language
//       if (languageHint === "css") fileName = "/index.css";
//       else if (languageHint === "html") fileName = "/index.html";
//       else fileName = "/App.js"; // default for JS/JSX
//     }

//     // Detect language by extension
//     let language = languageHint;
//     if (fileName.endsWith(".css")) language = "css";
//     if (fileName.endsWith(".json")) language = "json";
//     if (fileName.endsWith(".html")) language = "html";
//     if (fileName.endsWith(".js") || fileName.endsWith(".jsx"))
//       language = "javascript";

//     // Save to Sandpack format
//     files[fileName] = { code: codeBlock, language };
//   }

//   return files;
// }

// utils/parseLLMResponse.js
export function parseLLMResponse(text) {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  const files = {};

  while ((match = regex.exec(text)) !== null) {
    const languageHint = match[1] || "javascript";
    let codeBlock = match[2].trim();

    // detect inline filename comment like // App.js OR /* src/index.css */
    const fileMatch = codeBlock.match(/^(?:\/\/|\/\*)\s*(.*?)\s*(?:\*\/)?\n/);

    let filename;
    if (fileMatch) {
      filename = fileMatch[1].trim();
      codeBlock = codeBlock.replace(fileMatch[0], "").trim(); // remove filename comment
    } else {
      // default naming based on language
      if (languageHint === "css") {
        filename = "index.css";
      } else if (languageHint === "html") {
        filename = "index.html";
      } else {
        filename = "App.js";
      }
    }

     // Detect language by extension
    let language = languageHint;
    if (filename.endsWith(".css")) language = "css";
    if (filename.endsWith(".json")) language = "json";
    if (filename.endsWith(".html")) language = "html";
    if (filename.endsWith(".js") || filename.endsWith(".jsx"))
      language = "javascript";

    files[filename] = codeBlock;
  }

  

  return files;
}

