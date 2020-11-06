import { Photo, Facets, GraphType, GraphPlacement, Filter } from './types';

export type Action =
  | { type: 'updateData'; photos: Photo[]; facets: Facets; possibleFilters: Filter[] }
  | { type: 'changeGraphType'; whichGraph: GraphPlacement; newGraphType: GraphType }
  | { type: 'selectPhoto'; newPhoto: Photo }
  | { type: 'deselectPhoto' };

export const Actions = {
  updateDate: (photos: Photo[], facets: Facets, possibleFilters: Filter[]): Action => {
    return { type: 'updateData', photos: photos, facets: facets, possibleFilters };
  },
  changeGraphType: (whichGrap: GraphPlacement, newGraphType: GraphType): Action => {
    return { type: 'changeGraphType', whichGraph: whichGrap, newGraphType: newGraphType };
  },
  selectPhoto: (newPhoto: Photo): Action => {
    return { type: 'selectPhoto', newPhoto: newPhoto };
  },
  deselectPhoto: (): Action => {
    return { type: 'deselectPhoto' };
  },
};

export default Actions;
