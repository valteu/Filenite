import React, { useEffect, useState } from 'react';
import pb, { shareFileWithUser, deleteFile, getOwnFileList, getSharedFileList } from '../pocketbase/pocketbase';
import { mapToUserId } from '../pocketbase/adminClient';

const FileList = () => {
    
  const [ownFiles, setOwnFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [fileId, setFileId] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const result = await getOwnFileList();
      setOwnFiles(result);
    };

    fetchFiles();
  }, []);
  
  useEffect(() => {
    const fetchFiles = async () => {
      const result = await getSharedFileList();
      setSharedFiles(result);
    };

    fetchFiles();
  }, []);
  
  const getUrl = (file) =>{
    let url = pb.files.getUrl(file, file.file); //{'token': pb.files.getToken}
    url += '?download=1';
    return url;
  }

  const handleFileShare = async(e) => {
    e.preventDefault();
    try {
      const userId = await mapToUserId(email);
      await shareFileWithUser(fileId, userId);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileDeletion = async(fileId) => {
    try {
      await deleteFile(fileId);
    } catch (error) {
      setError(error.message);
    }
  };


  const isImage = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png'].includes(extension);
  };

  return (
    <div>
      <h2>My Files</h2>
      <ul className="file-list">
        {ownFiles.map((file) => (
          <li key={file.id}>
            <div className="file">
              {isImage(file.file) && <img className="file-list-img" src={getUrl(file)} alt={file.name} />}
              <div className="file-description">
                <a 
                  href= {getUrl(file)} 
                  download={file.file}
                >
                  {"Download: " + file.name}
                </a>
                <form onSubmit={handleFileShare}>
                  <input type="id" value={email} onChange={(e) => {setEmail(e.target.value); setFileId(file.id)}} placeholder="Enter email of user" />
                  <button type="submit">share file</button>
                </form>
                <button onClick={() => handleFileDeletion(file.id)}>delete file</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2>Shared Files</h2>
      <ul className="file-list">
        {sharedFiles.map((file) => (
          <li key={file.id}>
            <div className="file">
              {isImage(file.file) && <img className="file-list-img" src={getUrl(file)} alt={file.name} />}
              <div className="file-description">
                <a 
                  href= {getUrl(file)} 
                  download={file.file}
                >
                  {"Download: " + file.name}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileList;
