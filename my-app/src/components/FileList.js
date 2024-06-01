import React, { useEffect, useState } from 'react';
import pb, { fetchProtectedFile, shareFileWithUser } from '../pocketbase/pocketbase';

const FileList = () => {
    
  const [files, setFiles] = useState([]);
  

  useEffect(() => {
    const fetchFiles = async () => {
      const result = await pb.collection('files').getFullList({});
      setFiles(result);
    };

    fetchFiles();
  }, []);

  
  const handleClick = (url) => {
    fetchProtectedFile(url);
  };
  const getUrl = (file) =>{
    let url = pb.files.getUrl(file, file.file, {'token': pb.files.getToken});
    url += '?download=1';
    return url;
  }
  const handleUserAdd = (fileId, userId) => {
    shareFileWithUser(fileId, userId);
  };

  return (
    <div>
      <h2>My Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <div>
              <button onClick={() => handleClick(getUrl(file))}>{file.name}</button>
              <button onClick={() => handleUserAdd (file.id, "sp5xggk4o58brte")}>addUser</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;