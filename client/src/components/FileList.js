import React, { useEffect, useState } from 'react';
import { getOwnFileList, getSharedFileList } from '../pocketbase/pocketbase';
import File from './File';
import './styles.css'; // Ensure this CSS file is imported

const FileList = () => {
  const [ownFiles, setOwnFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('own'); // State to manage active tab

  useEffect(() => {
    const fetchOwnFiles = async () => {
      try {
        const result = await getOwnFileList();
        setOwnFiles(result);
      } catch (error) {
        console.error("Error fetching own files:", error);
        setError(error.message);
      }
    };

    fetchOwnFiles();
  }, []);
  
  useEffect(() => {
    const fetchSharedFiles = async () => {
      try {
        const result = await getSharedFileList();
        setSharedFiles(result);
      } catch (error) {
        console.error("Error fetching shared files:", error);
        setError(error.message);
      }
    };

    fetchSharedFiles();
  }, []);

  const handleFileDelete = (fileId) => {
    setOwnFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
    setSharedFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
  };

  return (
    <div>
      <div className="tabs">
        <button 
          onClick={() => setActiveTab('own')} 
          className={activeTab === 'own' ? 'active' : ''}
        >
          My Files
        </button>
        <button 
          onClick={() => setActiveTab('shared')} 
          className={activeTab === 'shared' ? 'active' : ''}
        >
          Shared Files
        </button>
      </div>
      {activeTab === 'own' && (
        <>
          <h2>My Files</h2>
          <div className="file-grid">
            {ownFiles.map((file) => (
              <File key={file.id} file={file} onFileDelete={handleFileDelete} />
            ))}
          </div>
        </>
      )}
      {activeTab === 'shared' && (
        <>
          <h2>Shared Files</h2>
          <div className="file-grid">
            {sharedFiles.map((file) => (
              <File key={file.id} file={file} onFileDelete={handleFileDelete} isShared />
            ))}
          </div>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileList;
