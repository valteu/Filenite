import React, { useEffect, useState } from 'react';
import pb, { shareFileWithUser } from '../pocketbase/pocketbase';

const FileList = () => {
    
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const result = await pb.collection('files').getFullList({});
      setFiles(result);
    };

    fetchFiles();
  }, []);

  
  const getUrl = (file) =>{
    let url = pb.files.getUrl(file, file.file); //{'token': pb.files.getToken}
    //url += '?download=1';
    return url;
  }

  const handleUserAdd = async(fileId, userId) => {
    try {
      await shareFileWithUser(fileId, userId);
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
        {files.map((file) => (
          <li key={file.id}>
            <div className="file">
              {isImage(file.file) && <img className="file-list-img" src={getUrl(file)} alt={file.name} />}
              <div className="file-description">
                <a 
                  href= {getUrl(file)} //append ?download=1 here to automatically download instead of previewing
                  download={file.file}
                >
                  {file.name}
                </a>
                <button onClick={() => handleUserAdd(file.id, "sp5xggk4o58brte")}>addUser</button>
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
