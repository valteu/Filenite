import React from 'react';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';
import pb from '../pocketbase/pocketbase'
const FilesRoute = () => {
  pb.collection('files').subscribe('*', function (e) {
    window.location.reload();
  }, { /* other options like expand, custom headers, etc.  */});
  return (
  <div>
      <FileUpload />
      <FileList />
      <Logout />
  </div>
  );
};

export default FilesRoute;
