import React, { useState, useCallback } from 'react';
import axios from 'axios';
import PhotosTable from './PhotosTable';
import PhotoMetaData from './PhotoMetaData';

import './App.css';
import { Photo } from './types';

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
      <div>
        <label>Search query:</label>
        <input value={searchQuery} onChange={(event) => {
          updateSearchQuery(event.target.value)
        }} />
        <button onClick={submitForm}>Submit</button>
      </div>

      <PhotosTable photos={photos} onPreviewClick={(photo: Photo) => updateCurrentPhoto(photo)} />
      <PhotoMetaData photo={currentPhoto} />
    </div>
  );
}

export default App;
