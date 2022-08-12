import axios from 'axios';

const apiKey = '27765666-f36d4e8f43b84ddc8df8dc023';
const baseUrl = 'https://pixabay.com/api/';

export const getImages = ({ searchQuery, page }) =>
  axios
    .get(
      `${baseUrl}?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data.hits);
