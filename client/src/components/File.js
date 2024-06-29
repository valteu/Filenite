import React, { useState } from 'react';
import pb from '../pocketbase/pocketbase';
import ReactPlayer from 'react-player';
import { Document, Page, pdfjs } from 'react-pdf';
import FileMenu from './FileMenu';
import defaultFileIcon from '../resources/file_icon.png';
import './styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const File = ({ file, onFileDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getUrl = (file) => {
    let url = pb.files.getUrl(file, file.file);
    url += '?download=1';
    return url;
  }

  const isImage = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  };

  const isVideo = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'ogg'].includes(extension);
  };

  const isAudio = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return ['mp3', 'wav', 'ogg'].includes(extension);
  };

  const isPDF = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return extension === 'pdf';
  };

  const isText = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    return ['txt', 'md'].includes(extension);
  };

  const renderPreview = (file) => {
    const url = getUrl(file);

    if (isImage(file.file)) {
      return <img className="file-preview" src={url} alt={file.name} />;
    } else if (isVideo(file.file)) {
      return <ReactPlayer url={url} controls width="100%" height="100%" />;
    } else if (isAudio(file.file)) {
      return <audio controls src={url} />;
    } else if (isPDF(file.file)) {
      return (
        <Document file={url} onLoadError={console.error} onSourceError={console.error}>
          <Page pageNumber={1} />
        </Document>
      );
    } else if (isText(file.file)) {
      return <iframe src={url} title={file.name} width="100%" height="100%"></iframe>;
    } else {
      return <img className="file-preview" src={defaultFileIcon} alt="File icon" />;
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="file-tile">
      {renderPreview(file)}
      <div className="file-name-menu">
        <span>{file.name}</span>
        <button onClick={toggleMenu} className="menu-button">⋮</button>
        {menuOpen && <FileMenu file={file} onFileDelete={onFileDelete} onClose={closeMenu} />}
      </div>
    </div>
  );
};

export default File;
