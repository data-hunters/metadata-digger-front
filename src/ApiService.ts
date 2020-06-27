import axios from 'axios';

interface GetPhotosParameters {
  searchQuery?: string;
  facets: string[];
  perPage: number;
}

const ApiService = {
  getPhotos: (params: GetPhotosParameters) => {
    return axios.post('http://localhost:8080/api/v1/photos', {
      text_query: params.searchQuery,
      facets: params.facets,
      per_page: params.perPage,
    });
  },
};

export default ApiService;
