import React from 'react';
import FileList from '../components/FileList';
import FileUpload from '../components/FileUpload';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';

const FilesRoute = () => {
  return (
  <div>
      <FileUpload />
      <FileList />
      <Logout />
  </div>
  );
};

export default FilesRoute;
