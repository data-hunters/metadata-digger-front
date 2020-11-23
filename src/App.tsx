import React, { useCallback, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import PhotosTable from './PhotosTable';
import PhotoMetaData from './PhotoMetaData';

import './App.css';
import { AppState, GRAPH_PLACEMENTS, GRAPH_TYPES, GraphState, GraphType } from './types';
import Navbar from './layout/Navbar';
import GraphContainer from './GraphContainer';
import { reducer } from './reducer';
import Actions from './actions';
import ApiService from './ApiService';
import PhotoMap from './PhotoMap';
import Filters from './Filters';

const INITIAL_STATE: AppState = {
  currentPhoto: undefined,
  photos: [],
  facets: {},
  filteringState: { appliedFilters: [], possibleFilters: [] },
  graphs: { left: GraphType.FILE_TYPE, right: GraphType.CAMERA_MODEL },
  searchQuery: undefined,
  requestInProgress: true,
};

const DEFAULT_PER_PAGE = 100;
const App: React.FC = () => {
  const [
    { currentPhoto, photos, facets, filteringState, graphs, searchQuery, requestInProgress },
    dispatch,
  ] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    makeRequest();
  }, [searchQuery, filteringState.appliedFilters]);

  useEffect(() => {
    document.title = 'Metadata Digger Web UI';
  }, []);

  const makeRequest = async () => {
    ApiService.getPhotos({
      facets: GRAPH_TYPES.map((v) => v as string),
      perPage: DEFAULT_PER_PAGE,
      searchQuery: searchQuery,
      filters: filteringState.appliedFilters,
    }).then((response) => {
      dispatch(Actions.finishRequest(response.data.photos, response.data.facets, response.data.possible_filters));
    });
  };

  const getGraphState = (graphType: GraphType): GraphState | null => {
    const graphFacets = facets[graphType];

    if (graphFacets) return { graphType: graphType, values: graphFacets };
    else return null;
  };

  const submitFilter = (filterName: string, selected: Set<string>): void => {
    console.log(`submitting: ${filterName} selected ${Array.from(selected).join(' ')}`);
    dispatch(Actions.applyFilter(filterName, Array.from(selected)));
  };

  const handleSearchSubmit = (query: string): void => {
    dispatch(Actions.startSearch(query));
  };

  return (
    <div className="App">
      <Navbar onSubmitSearch={handleSearchSubmit} />

      {currentPhoto && (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch(Actions.deselectPhoto());
                }}
              >
                back
              </button>
            </div>
            <PhotoMetaData photo={currentPhoto} />
          </div>
        </div>
      )}
      {!currentPhoto && (
        <ContentContainer className="container">
          <div className="row">
            {GRAPH_PLACEMENTS.map((gp) => {
              const state = getGraphState(graphs[gp]);
              return (
                state && (
                  <div className="col" key={gp}>
                    <GraphContainer graphState={state} changeType={(gt) => dispatch(Actions.changeGraphType(gp, gt))} />
                  </div>
                )
              );
            })}
          </div>
          <div className="row">
            <PhotoMap photos={photos} selectPhoto={(p) => dispatch(Actions.selectPhoto(p))} />
          </div>
          <div className="row">
            <Filters
              appliedFilters={filteringState.appliedFilters}
              possibleFilters={filteringState.possibleFilters}
              onSubmit={submitFilter}
              requestInProgress={requestInProgress}
            />
          </div>
          <div className="row">
            <div className="col-sm">
              <PhotosTable photos={photos} onPreviewClick={(photo) => dispatch(Actions.selectPhoto(photo))} />
            </div>
          </div>
        </ContentContainer>
      )}
    </div>
  );
};

const ContentContainer = styled.div`
  margin-top: 50px;
`;

export default App;
