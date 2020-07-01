import React, { useCallback, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import PhotosTable from './PhotosTable';
import PhotoMetaData from './PhotoMetaData';

import './App.css';
import { Photo, Facets, GraphState, GraphType, GRAPH_TYPES, AppState, GraphPlacement, GRAPH_PLACEMENTS } from './types';
import Navbar from './layout/Navbar';
import GraphContainer from './GraphContainer';
import { reducer } from './reducer';
import { Action } from './actions';
import ApiService from './ApiService';
import PhotoMap from './PhotoMap';

const INITIAL_STATE: AppState = {
  currentPhoto: undefined,
  photos: [],
  facets: {},
  graphs: { left: "file_type", right: "md_exif_ifd0_model" }
}

function updateDate(photos: Photo[], facets: Facets): Action {
  return { type: "updateData", photos: photos, facets: facets }
}

function changeGraphType(whichGrap: GraphPlacement, newGraphType: GraphType): Action {
  return { type: "changeGraphType", whichGraph: whichGrap, newGraphType: newGraphType }
}

function selectPhoto(newPhoto: Photo): Action {
  return { type: "selectPhoto", newPhoto: newPhoto }
}

const deselectPhoto: Action = { type: "deselectPhoto" }

const DEFAULT_PER_PAGE = 100
const App: React.FC = () => {
  const [{currentPhoto, photos, facets, graphs}, dispatch] = useReducer(reducer, INITIAL_STATE)
  const handleSearchSubmit = useCallback((searchQuery: string) => {makeRequest(searchQuery)}, []);

  useEffect( () => { makeRequest(undefined)}, []);
  useEffect( () => { document.title = "Metadata Digger Web UI"}, []);

  const makeRequest = async (searchQuery?: string) => {
    ApiService.getPhotos({facets: GRAPH_TYPES, perPage: DEFAULT_PER_PAGE, searchQuery: searchQuery}).then((response) => {
      dispatch(updateDate(response.data.photos, response.data.facets));
    });
  }

  let getGraphState = (graphType: GraphType) : GraphState | null => {
    let graphFacets = facets[graphType]

    if(graphFacets) return { graphType: graphType, values: graphFacets };
    else return null  
  }


  return (
    <div className="App">
      <Navbar onSubmitSearch={handleSearchSubmit} />

      {currentPhoto && (
        <div className="container">

          <div className="row">
            <div className="col-sm-12">
              <button className="btn btn-primary" onClick={() => { dispatch(deselectPhoto) }}>back</button>
            </div>
            <PhotoMetaData photo={currentPhoto} />
          </div>
        </div>
      )}
      {!currentPhoto && (
        <ContentContainer className="container">
          <div className = "row">
            {GRAPH_PLACEMENTS.map( (gp) => {
              let state = getGraphState(graphs[gp])
              return(state && (<div className="col" key={gp}>
                <GraphContainer  graphState={state} changeType={(gt) => dispatch(changeGraphType(gp, gt))} />
              </div>))
            })}
          </div>
          <div className="row">
            <PhotoMap photos={photos} selectPhoto={p => dispatch(selectPhoto(p))}/>
          </div>
          <div className="row">
            <div className="col-sm">
              <PhotosTable photos={photos} onPreviewClick={(photo) => dispatch(selectPhoto(photo))} />
            </div>
          </div>
        </ContentContainer>
      )}
    </div>
  );
}

const ContentContainer = styled.div`
  margin-top: 50px;
`

export default App;
