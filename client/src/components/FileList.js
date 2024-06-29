import React, { useEffect, useState } from 'react';
import { getOwnFileList, getSharedFileList } from '../pocketbase/pocketbase';
import File from './File';
import './styles.css'; // Ensure this CSS file is imported

const FileList = () => {
  const [ownFiles, setOwnFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await getOwnFileList();
        setOwnFiles(result);
      } catch (error) {
        console.error("Error fetching own files:", error);
        setError(error.message);
      }
    };

    fetchFiles();
  }, []);
  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = await getSharedFileList();
        setSharedFiles(result);
      } catch (error) {
        console.error("Error fetching shared files:", error);
        setError(error.message);
      }
    };

    fetchFiles();
  }, []);

  const handleFileDelete = (fileId) => {
    setOwnFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
    setSharedFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
  };

  return (
    <div>
      <h2>My Files</h2>
      <div className="file-grid">
        {ownFiles.map((file) => (
          <File key={file.id} file={file} onFileDelete={handleFileDelete} />
        ))}
      </div>
      <h2>Shared Files</h2>
      <div className="file-grid">
        {sharedFiles.map((file) => (
          <File key={file.id} file={file} onFileDelete={handleFileDelete} />
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileList;
