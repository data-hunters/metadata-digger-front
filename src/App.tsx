import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PhotosTable from './PhotosTable';
import PhotoMetaData from './PhotoMetaData';

import './App.css';
import { Photo } from './types';
import Navbar from './layout/Navbar';

const App: React.FC = () => {
  const [searchQuery, updateSearchQuery] = useState<string>("");
  const [photos, updatePhotos] = useState<Photo[]>([]);
  const [currentPhoto, updateCurrentPhoto] = useState<Photo | null>(null);

  const submitForm = useCallback(() => {
    axios.post('http://localhost:8080/api/v1/photos', { text_query: searchQuery }).then((response) => {
      updatePhotos(response.data.photos);
    });
  }, [searchQuery]);

  return (
    <div className="App">
      <Navbar />
      <div>
        <label>Search query:</label>
        <input value={searchQuery} onChange={(event) => {
          updateSearchQuery(event.target.value)
        }} />
        <button onClick={submitForm}>Submit</button>
      </div>
      <ContentContainer>
        <TableContainer>
          <PhotosTable photos={photos} onPreviewClick={(photo: Photo) => updateCurrentPhoto(photo)} />
        </TableContainer>
        <MetaContainer>
          <PhotoMetaData photo={currentPhoto} />
        </MetaContainer>
      </ContentContainer>

    </div>
  );
}

const ContentContainer = styled.div`
  display: flex;
  margin-top: 50px;
`

const TableContainer = styled.div`
  width: 50%;
`

const MetaContainer = styled.div`
  width: 50%;
`

export default App;
