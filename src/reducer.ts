import { AppliedFilter, AppState, Filter, FilteringState, GraphPlacement, GraphType } from './types';
import { Action } from './actions';

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'finishRequest':
      return {
        ...state,
        photos: action.photos,
        facets: action.facets,
        currentPhoto: undefined,
        filteringState: setPossibleFilters(state.filteringState, action.possibleFilters),
        requestInProgress: false,
      };
    case 'changeGraphType':
      return { ...state, graphs: copyGraphs(state.graphs, action.whichGraph, action.newGraphType) };
    case 'selectPhoto':
      return { ...state, currentPhoto: action.newPhoto };
    case 'deselectPhoto':
      return { ...state, currentPhoto: undefined };
    case 'startSearch':
      return { ...state, searchQuery: action.searchQuery, requestInProgress: true };
    case 'applyFilter':
      return {
        ...state,
        filteringState: applyNewFilter(state.filteringState, action.fieldName, action.selectedValues),
        requestInProgress: true,
      };
  }
}

function setPossibleFilters(filteringState: FilteringState, possibleFilters: Filter[]) {
  return { ...filteringState, possibleFilters: possibleFilters };
}

function applyNewFilter(filteringState: FilteringState, newFilterFieldName: string, newFilterValues: string[]) {
  const newFilter: AppliedFilter = { field_name: newFilterFieldName, selected_values: newFilterValues };
  const newAppliedFilters = filteringState.appliedFilters
    .filter((e) => e.field_name !== newFilterFieldName)
    .concat([newFilter]);
  return { ...filteringState, appliedFilters: newAppliedFilters };
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
