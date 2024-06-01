import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupRoute from './routes/SignupRoute';
import LoginRoute from './routes/LoginRoute';
import UploadRoute from './routes/UploadRoute';
import FilesRoute from './routes/FilesRoute';
import ProtectedRoute from './ProtectedRoute'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<ProtectedRoute element = {<SignupRoute />}/>} />
        <Route path="/upload" element={<ProtectedRoute element = {<UploadRoute />}/>} />
        <Route path="/files" element={<ProtectedRoute element = {<FilesRoute />}/>} />
        <Route path="/" element={<ProtectedRoute element = {<FilesRoute />}/>} />
        <Route path="*" element={<Navigate to = "files"/>}/>
      </Routes>
    </Router>
  );
};

export default App;