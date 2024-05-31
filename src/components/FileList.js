import React, { useEffect, useState } from 'react';
import pb from '../pocketbase/pocketbase';

const FileList = () => {
    
    const [files, setFiles] = useState([]);
  

  useEffect(() => {
    const fetchFiles = async () => {
      const userId = pb.authStore.model.id;
      const result = await pb.collection('posts').getFullList({});
      setFiles(result);
    };

    fetchFiles();
  }, []);

  

  const getUrl = (file) =>{
    let url = pb.files.getUrl(file, file.file, pb.files.getToken);
    url += '?download=1';
    return url;
  }

  return (
    <div>
      <h2>My Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a 
                href= {getUrl(file)} //append ?download=1 here to automatically download instead of previewing
                download={file.file}
            >
                {file.file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
