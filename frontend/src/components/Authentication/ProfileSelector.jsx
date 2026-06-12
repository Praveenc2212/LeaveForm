import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfileSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
          <LuUser className="text-gray-300 text-5xl sm:text-6xl" />
          <button
            type="button"
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full absolute -bottom-2 -right-2 shadow-md transition-colors duration-300"
            onClick={onChooseFile}
          >
            <LuUpload className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile preview"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <button
            type="button"
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full absolute -bottom-2 -right-2 shadow-md transition-colors duration-300"
            onClick={handleRemoveImage}
          >
            <LuTrash className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
