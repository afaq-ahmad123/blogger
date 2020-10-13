import axios from 'axios';

let token = localStorage.getItem('token');

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export default axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        headers: {
            'Authorization': `token ${token}`,
        },
    });
