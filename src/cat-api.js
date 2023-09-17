import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT_BREEDS = '/breeds';
const END_POINT_IMAGES_SEARCH = '/images/search';
const API_KEY = "live_FWEwBBwpghPkVPjFRXFOoMMwfcOaZ4GdLAv1X5Iyqs5fE0e77Kaq70b6BPDz8du1";
axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}${END_POINT_BREEDS}`)
    .then(response => {
      if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
    })
    }

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${END_POINT_IMAGES_SEARCH}?breed_ids=${breedId}`)
    .then(response => {
      if (response.data.length === 0) {
        throw new Error(response.status);
      }
      return response.data[0];
    })
    }
