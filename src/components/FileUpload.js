import React, { useState } from 'react';
import pb from '../pocketbase/pocketbase';


const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user', pb.authStore.model.id);

      try {
        await pb.collection('posts').create(formData);
        alert('File uploaded successfully');
      } catch (error) {
        alert('File upload failed');
      }
    }
  };

  return (
    <form onSubmit={handleFileUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
