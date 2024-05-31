import React from 'react';
import FileList from '../components/FileList';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';

const FilesRoute = () => {
  return (
  <div>
      <FileList />
      <Logout />
  </div>
  );
};

export default FilesRoute;
