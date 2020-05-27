const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=${process.env.APP_API_KEY}`;
// please see email for contents of .env file!
const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.grid');

loadingImage.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  
  searchStart();
  search(searchTerm)
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = 'none';
    });
}

function searchStart() {
  loadingImage.style.display = '';
  imageSection.innerHTML = '';
}

function search(searchTerm) {
    let url = `${API_URL}&query=${searchTerm}`;
    return fetch(url)
        .then(response => response.json())
        .then(result => {
            return result.results;
        }
    );
}

function displayImages(images) {
    images.forEach(image => {
        const imageElement = document.createElement('img');
        imageElement.src = image.urls.regular;
        imageSection.appendChild(imageElement);
    });
}


