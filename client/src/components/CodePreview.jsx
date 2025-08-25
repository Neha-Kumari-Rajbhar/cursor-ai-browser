import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

const CodePreview = ({ files }) => {
  return (
    <div className="mt-6">
      <div className="p-4 rounded-2xl shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Live Code & Preview
        </h2>
        <Sandpack
          key={JSON.stringify(files)} // ✅ force remount when files change
          template="react"
          files={{
            
            ...Object.fromEntries(
              Object.entries(files).map(([filename, { code }]) => [
                filename,
                code,
              ])
            ),
          }}
          customSetup={{
            dependencies: {
              "react-router-dom": "latest",
              "@heroicons/react": "latest",
            },
          }}
          options={{
            showConsole: true,
            showTabs: true,
            showLineNumbers: true,
            editorHeight: 700,
            classes: {
              "sp-wrapper": "rounded-xl border border-gray-200 shadow-md",
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodePreview;


