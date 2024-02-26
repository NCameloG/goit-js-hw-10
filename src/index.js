import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
// Function to populate breed select options
function populateBreeds(breeds) {
  breedSelect.innerHTML = '';

  // Create default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Choose a cat';
  breedSelect.appendChild(defaultOption);

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

// Function to display cat information
function displayCat(cat) {
  const catImage = document.createElement('img');
  catImage.src = cat[0].url;

  const breedName = document.createElement('h2');
  breedName.textContent = cat[0].breeds[0].name;

  const description = document.createElement('p');
  description.textContent = cat[0].breeds[0].description;

  const temperament = document.createElement('p');
  temperament.textContent = cat[0].breeds[0].temperament;

  catInfo.innerHTML = '';
  catInfo.appendChild(catImage);
  catInfo.appendChild(breedName);
  catInfo.appendChild(description);
  catInfo.appendChild(temperament);

  catInfo.style.display = 'block';
}

// Event listener for breed select change
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

    // If the default option is selected, do nothing
    if (!selectedBreedId) {
      catInfo.style.display = 'none';
      return;
    }

  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(displayCat)
    .catch(err => {
      Notiflix.Notify.failure('An error occurred while fetching cat data.');
      console.error('Error:', err);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

// Fetch breeds when the page loads
window.addEventListener('DOMContentLoaded', () => {
  loader.style.display = 'block';

  fetchBreeds()
    .then(populateBreeds)
    .catch(err => {
      error.style.display = 'block';
      console.error('Error:', err);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});