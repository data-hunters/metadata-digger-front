import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PhotosTable from './PhotosTable';
import PhotoMetaData from './PhotoMetaData';

import './App.css';
import { Photo } from './types';
import Navbar from './layout/Navbar';
import FileUplaoder from './FileUploader';

const App: React.FC = () => {
  const [photos, updatePhotos] = useState<Photo[]>([]);
  const [currentPhoto, updateCurrentPhoto] = useState<Photo | null>(null);
  const [fileUploaded, setFileUploaded] = useState<boolean>(JSON.parse(localStorage.getItem('fileUploaded') || "false"))

  const handleSearchSubmit = useCallback((searchQuery: string) => {
    axios.post('http://localhost:8080/api/v1/photos', { text_query: searchQuery }).then((response) => {
      updatePhotos(response.data.photos);
    });
  }, []);

  return (
    <div className="App">
      <Navbar onSubmitSearch={handleSearchSubmit} />
      {
        !fileUploaded &&
        <div className="container">
          <FileUplaoder onUploadCompleted={() => { setFileUploaded(true) }} />
        </div>
      }
      {fileUploaded && <ContentContainer className="container">
        <div className="row">
          <div className="col-sm">
            <PhotosTable photos={photos} onPreviewClick={(photo: Photo) => updateCurrentPhoto(photo)} />
          </div>
          <div className="col-sm">
            <PhotoMetaData photo={currentPhoto} />
          </div>
        </div>
      </ContentContainer>}
    </div>
  );
}

const ContentContainer = styled.div`
  display: flex;
  margin-top: 50px;
`

export default App;
