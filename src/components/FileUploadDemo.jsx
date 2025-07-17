"use client";

import React, { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import { useNavigate } from "react-router-dom";

export default function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);

    if (uploadedFiles.length > 0) {
      const fileName = uploadedFiles[0].name;

      // Simulate upload success and redirect
      setTimeout(() => {
        navigate("/upload-success", {
          state: { fileName },
        });
      }, 1000); // simulate delay
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl bg-[#1a1a1a] border border-neutral-700 shadow-md p-6 mb-10">
      <h2 className="text-xl font-semibold text-purple-300 mb-4">Upload Files</h2>
      <div className="bg-[#0f0f0f] border border-dashed border-neutral-600 dark:border-neutral-800 p-6 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>
      {files.length > 0 && (
        <div className="mt-4 text-sm text-white">
          <p className="mb-2">Selected Files:</p>
          <ul className="list-disc pl-5 space-y-1">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
