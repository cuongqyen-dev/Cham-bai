import React, { useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

interface SubmissionFormProps {
  text: string;
  setText: (text: string) => void;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  text,
  setText,
  images,
  setImages,
  onSubmit,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-slate-800">
        <FileText className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Student Submission</h2>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the essay or assignment text here..."
          className="w-full flex-1 min-h-[200px] p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-slate-700 placeholder:text-slate-400"
          disabled={isLoading}
        />

        {/* Image Preview Area */}
        {images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative group flex-shrink-0">
                <img
                  src={img}
                  alt={`Upload ${idx + 1}`}
                  className="h-24 w-24 object-cover rounded-lg border border-slate-200"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
          <div>
             <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium"
              disabled={isLoading}
            >
              <ImageIcon className="w-4 h-4" />
              Upload Image/Photo
            </button>
          </div>

          <button
            onClick={onSubmit}
            disabled={isLoading || (!text && images.length === 0)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all
              ${isLoading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : (!text && images.length === 0) 
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg active:transform active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Grading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Grade Submission
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};