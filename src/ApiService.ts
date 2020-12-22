import axios from 'axios';
import { AppliedFilter } from './types';

interface Filter {
  field_name: string;
  values: string[];
}
interface GetPhotosParameters {
  searchQuery?: string;
  filters: AppliedFilter[];
  facets: string[];
  perPage: number;
}

const ApiService = {
  getPhotos: (params: GetPhotosParameters) => {
    return axios.post('http://localhost:8080/api/v1/photos', {
      text_query: params.searchQuery,
      facets: params.facets,
      per_page: params.perPage,
      filters: params.filters,
    });
  },
};

export default ApiService;
