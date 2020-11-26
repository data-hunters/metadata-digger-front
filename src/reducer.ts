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
    case 'removeValueFromFilter':
      return {
        ...state,
        filteringState: removeValueFromFilter(state.filteringState, action.fieldName, action.valueToBeRemoved),
      };
    case 'removeFilter':
      return {
        ...state,
        filteringState: removeAppliedFilter(state.filteringState, action.fieldName),
      };
  }
}

function setPossibleFilters(filteringState: FilteringState, possibleFilters: Filter[]) {
  return { ...filteringState, possibleFilters: possibleFilters };
}

function removeAppliedFilter(filteringState: FilteringState, fieldName: string) {
  const newFilters = filteringState.appliedFilters.filter((f) => f.field_name !== fieldName);
  return { ...filteringState, appliedFilters: newFilters };
}
function removeValueFromFilter(filteringState: FilteringState, fieldName: string, valueToBeRemoved: string) {
  const appliedFilter = filteringState.appliedFilters.find((f) => f.field_name === fieldName);

  if (appliedFilter) {
    const newValues = appliedFilter.selected_values.filter((v) => v !== valueToBeRemoved);
    if (newValues.length !== 0) return applyNewFilter(filteringState, fieldName, newValues);
    else return removeAppliedFilter(filteringState, fieldName);
  } else {
    throw new Error('Trying to remove a value from not applied filter');
  }
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
