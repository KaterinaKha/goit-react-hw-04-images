import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '29242273-1290a4e31f5d54df59a574a67';

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `${URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
