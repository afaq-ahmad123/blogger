import axios from 'axios';

let token = localStorage.getItem('token');

// http://127.0.0.1:8000/

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export default axios.create({
        baseURL: 'https://blog-fullstack-react.herokuapp.com/',
        headers: {
            'Authorization': `token ${token}`,
        },
    });
