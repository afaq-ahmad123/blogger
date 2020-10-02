import axios from 'axios';


let token = 'e9158754cb928f4e9ba9b956dd66a22bd44ce58a';
export default axios.create({
    baseURL: 'https://blog-fullstack-react.herokuapp.com/',
    headers: {
        'Authorization': `token ${token}`,
        'Access-Control-Allow-Origin': '*',
    },
})