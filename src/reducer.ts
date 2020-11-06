import { AppState, Filter, FilteringState, GraphPlacement, GraphType } from './types';
import { Action } from './actions';

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'updateData':
      return {
        ...state,
        photos: action.photos,
        facets: action.facets,
        currentPhoto: undefined,
        filteringState: setPossibleFilters(state.filteringState, action.possibleFilters),
      };
    case 'changeGraphType':
      return { ...state, graphs: copyGraphs(state.graphs, action.whichGraph, action.newGraphType) };
    case 'selectPhoto':
      return { ...state, currentPhoto: action.newPhoto };
    case 'deselectPhoto':
      return { ...state, currentPhoto: undefined };
  }
}

function setPossibleFilters(filteringState: FilteringState, possibleFilters: Filter[]) {
  return { ...filteringState, possibleFilters: possibleFilters };
}

function copyGraphs(
  originalGraphs: Record<GraphPlacement, GraphType>,
  selectedGraph: GraphPlacement,
  newGraphType: GraphType,
): Record<GraphPlacement, GraphType> {
  const copy = Object.assign({}, originalGraphs);
  copy[selectedGraph] = newGraphType;
  return copy;
}
