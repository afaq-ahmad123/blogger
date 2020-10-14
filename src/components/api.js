import axios from 'axios';

let token = localStorage.getItem('token');

// http://127.0.0.1:8000/
//https://blog-fullstack-react.herokuapp.com/

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export default axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        headers: {
            'Authorization': `token ${token}`,
        },
    });

export let api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})
