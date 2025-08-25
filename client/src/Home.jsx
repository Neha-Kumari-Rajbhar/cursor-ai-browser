import React, { useState } from "react";
import axios from "axios";
import CodePreview from "./components/CodePreview";
import { parseLLMResponse } from "./utils/parseLLMResponse";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState({});
  const generateCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/generate", {
        prompt,
      });
      const parsedFiles = parseLLMResponse(response.data.code);
      setFiles(parsedFiles);
    } catch (error) {
      console.log("error generating code", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-5xl w-full ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Code Generator
        </h1>
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Describe the website you want..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
          <button
            onClick={generateCode}
            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Generate Code
          </button>
        </div>
        {Object.keys(files).length > 0 && (<CodePreview files={files} />
        )}
        
      </div>
    </div>
  );
};
export default Home;
