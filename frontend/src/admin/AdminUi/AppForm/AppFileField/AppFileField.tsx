import React, { forwardRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface FileInputWithPreviewProps {
  id: string;
  label: string;
  onFileChange: (files: File[] | null) => void;
  previewUrl?: string[];
  error?: string;
  name: string;
}

const FileInputWithPreview = forwardRef<
  HTMLInputElement,
  FileInputWithPreviewProps
>(({ id, label, onFileChange, previewUrl = [], error, name }, ref) => {
  const [preview, setPreview] = useState<string[]>(previewUrl || []);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files || [];
    const filePreviews = Array.from(newFiles).map((file) => URL.createObjectURL(file));
    setPreview((prev) => {
      const updatedPreview = [...prev, ...filePreviews];
      console.log("Updated preview:", updatedPreview);
      return updatedPreview;
    });

    setFiles((prev) => {
      const updatedFiles = [...prev, ...Array.from(newFiles)];
      onFileChange(updatedFiles); // Trigger callback here
      return updatedFiles;
    });
  };

  

  const handleRemoveFile = (index: number) => {
    const updatedPreview = preview.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);

    URL.revokeObjectURL(preview[index]);

    setPreview(updatedPreview);
    setFiles(updatedFiles);

    onFileChange(updatedFiles);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <input
        type="file"
        id={id}
        className="hidden"
        onChange={handleFileChange}
        ref={ref}
        name={name}
        multiple
      />
      <label
        htmlFor={id}
        className="cursor-pointer bg-primary text-white py-2 px-4 rounded text-center"
      >
        {label}
      </label>

      {preview.length > 0 ? (
        <div className="flex flex-wrap gap-4 w-full justify-start px-4">
          {preview.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
              <button
                className="text-white absolute top-0 -right-2 bg-red-500 rounded-full hover:scale-110 transform transition duration-300 ease-in-out"
                onClick={() => handleRemoveFile(index)}
                type="button"
              >
                <IoMdCloseCircle />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-gray-500 italic">No image selected</span>
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});

export default FileInputWithPreview;
