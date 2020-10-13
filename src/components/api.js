import axios from 'axios';

//f5a254322465b9b5915f73bb34ff802a3f98f963
// https://blog-fullstack-react.herokuapp.com/ e9158754cb928f4e9ba9b956dd66a22bd44ce58a
let token = localStorage.getItem('token');

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
export default axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        headers: {
            'Authorization': `token ${token}`,
        },
    });

// export const api = () =>{

//     return axios.create({
//         baseURL: 'http://127.0.0.1:8000/'
//     });
// } 