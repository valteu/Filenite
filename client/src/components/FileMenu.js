import React, { useState } from 'react';
import { shareFileWithUser, deleteFile } from '../pocketbase/pocketbase';
import { mapToUserId } from '../pocketbase/adminClient';
import './fileMenu.css';

const FileMenu = ({ file, onFileDelete, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleFileShare = async (e) => {
    e.preventDefault();
    try {
      const userId = await mapToUserId(email);
      await shareFileWithUser(file.id, userId);
      alert('File shared successfully');
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileDeletion = async () => {
    try {
      await deleteFile(file.id);
      onFileDelete(file.id);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="file-menu-popup">
      <button className="close-button" onClick={onClose}>X</button>
      <form onSubmit={handleFileShare}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button type="submit">Share</button>
      </form>
      <button onClick={handleFileDeletion}>Delete</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileMenu;
