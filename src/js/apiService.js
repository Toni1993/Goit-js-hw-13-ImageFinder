import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';

const apiKey = '12475399-4c4a9fda188af0fb2a838d7fc';


export async function apiService(searchQuery, page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}${searchQuery}&page=${page}&per_page=12&key=${apiKey}`
    );
    if (response.status == 200) return response.data;
    throw new Error('error fetching data');
  } catch (error) {
    console.error(error);
  }
}
