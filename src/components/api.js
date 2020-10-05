import axios from 'axios';

// https://blog-fullstack-react.herokuapp.com/ e9158754cb928f4e9ba9b956dd66a22bd44ce58a
let token = 'f5a254322465b9b5915f73bb34ff802a3f98f963';

export default axios.create({
    baseURL: '',
    headers: {
        'Authorization': `token ${token}`,
        'Access-Control-Allow-Origin': '*',
    },
})