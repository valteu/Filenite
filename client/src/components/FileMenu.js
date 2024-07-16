import React, { useState, useEffect, useRef } from 'react';
import pb, { shareFileWithUser, deleteFile } from '../pocketbase/pocketbase';
import { mapToUserId } from '../pocketbase/adminClient';
import './fileMenu.css';

const FileMenu = ({ file, onFileDelete, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const menuRef = useRef(null); // Reference to the file menu

  useEffect(() => {
    const generateToken = async () => {
      const token = await pb.files.getToken();
      setToken(token);
    };

    generateToken();
  }, []);

  useEffect(() => {
    // Function to handle clicks outside of the menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getUrl = (file) => {
    let url = pb.files.getUrl(file, file.file, { token });
    return url;
  };

  const handleDownload = () => {
    const url = getUrl(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = file.file;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

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
    <div className="file-menu-popup" ref={menuRef}>
      <button className="close-button" onClick={onClose}>X</button>
      <button onClick={handleDownload}>
        {"Download: " + file.name}
      </button>
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
