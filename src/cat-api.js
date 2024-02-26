import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_cNrKa5VtAOD0SVgVvpK410evFyH67NJDyIPPUBabqJYxu9NjgpEaNCJLmNT1E74s';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}