import * as actionTypes from './actions/actionTypes';

const initialState = {
    data: ['new'],
    list: ['list'],
    selected: {},
    user: {},
    token: null,
    edit: false,
}

function Reducer(state=initialState, action){
    switch(action.type){
        case 'Data':
            return Object.assign({}, state, {
                data: action.data
            });
        case 'addUser':
            return Object.assign({}, state, {
                user: action.data
            });
        case 'AddSelected':
            return Object.assign({}, state, {
                selected: action.data
            })
        case 'edit':
            return Object.assign({}, state, {
                edit: action.data
            })
        case actionTypes.AUTH_START: 
            return Object.assign({}, state, {
                error: null,
                loading: true
            })
        case actionTypes.AUTH_SUCCESS: 
            console.log('success login');
            return Object.assign({}, state, {
                token: action.token,
                error: null,
                loading: false
            })
        case actionTypes.AUTH_FAIL: 
            return Object.assign({}, state, {
                error: action.error,
                loading: false
            });
        case actionTypes.AUTH_LOGOUT: 
            return Object.assign({}, state, {
                token: null
            });
        default:
            return state
    }
}

export default Reducer;

