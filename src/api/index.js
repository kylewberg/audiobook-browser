import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`
});

export default {
    getAudiobooks(offset, limit, searchTerm) {
        if(searchTerm) {
            return API.get(`audiobooks/title/^${searchTerm}/?limit=${limit}&offset=${offset}&format=json`);
        } else {
            return API.get(`audiobooks/?limit=${limit}&offset=${offset}&format=json`);
        }
    },    
    getAudiobook(id) {
        return API.get(`audiobooks/id/${id}/?&extended=1&format=json`);
    }
};