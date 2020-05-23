import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PhotosTable from './PhotosTable';
import PhotoMetaData from './PhotoMetaData';

import './App.css';
import { Photo, Facets, GraphState, GraphType, GRAPH_TYPES } from './types';
import Navbar from './layout/Navbar';
import FileUplaoder from './FileUploader';
import GraphContainer from './GraphContainer';

const App: React.FC = () => {
  const [photos, updatePhotos] = useState<Photo[]>([]);
  const [currentPhoto, updateCurrentPhoto] = useState<Photo | null>(null);
  const [currentFacets, updateFacets] = useState<Facets>({});
  const [leftGraphState, updateLeftGraph] = useState<GraphState | null>(null);
  const [rightGraphState, updateRightGraph] = useState<GraphState | null>(null)

  const handleSearchSubmit = useCallback((searchQuery: string) => {
    axios.post('http://localhost:8080/api/v1/photos', { text_query: searchQuery, facets: GRAPH_TYPES }).then((response) => {
      updatePhotos(response.data.photos);
      updateFacets(response.data.facets);
    });
  }, []);

  useEffect( () => {
    async function fetchInitalData() {
      await axios.post('http://localhost:8080/api/v1/photos', { facets: GRAPH_TYPES }).then((response) => {
        let facets = response.data.facets

        updatePhotos(response.data.photos);
        updateFacets(facets);

        updateLeftGraph(updateGraphState("tag_names", facets));
        updateRightGraph(updateGraphState("labels", facets));
      });
    }
    fetchInitalData();
  }, []);

  let updateGraphState = (graphType: GraphType, facets: Facets = currentFacets) : GraphState => {
    return { graphType: graphType, values: facets[graphType] };
  }


  return (
    <div className="App">
      <Navbar onSubmitSearch={handleSearchSubmit} />

      <div className="container">
        <FileUplaoder onUploadCompleted={() => { }} />
      </div>

      {currentPhoto && (
        <div className="container">

          <div className="row">
            <div className="col-sm-12">
              <button className="btn btn-primary" onClick={() => { updateCurrentPhoto(null) }}>back</button>
            </div>
            <PhotoMetaData photo={currentPhoto} />
          </div>
        </div>
      )}
      {!currentPhoto && (
        <ContentContainer className="container">
          <div className = "row">
            {leftGraphState && ( 
            <div className="col-sm-6">
              <GraphContainer graphState={leftGraphState} changeType={(gt) => updateLeftGraph(updateGraphState(gt))} />
            </div> 
            )}
            {rightGraphState && (
            <div className="col">
              <GraphContainer graphState={rightGraphState} changeType={(gt) => updateRightGraph(updateGraphState(gt))} />
            </div> 
            )}
          </div>
          <div className="row">
            <div className="col-sm">
              <PhotosTable photos={photos} onPreviewClick={(photo: Photo) => updateCurrentPhoto(photo)} />
            </div>
          </div>
        </ContentContainer>
      )}
    </div>
  );
}

const ContentContainer = styled.div`
  // display: flex;
  margin-top: 50px;
`

export default App;
