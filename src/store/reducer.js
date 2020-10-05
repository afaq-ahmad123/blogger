

const initialState = {
    data: ['new'],
    list: ['list'],
    selected: {},
    user: {},
    edit: false,
}

function Reducer(state=initialState, action){
    if(action.type === 'Data'){
        return Object.assign({}, state, {
            data: action.data
        });
    }
    else if(action.type === 'addUser'){
        return Object.assign({}, state, {
            user: action.data
        });
    }
    else if(action.type === 'AddSelected'){
        return Object.assign({}, state, {
            selected: action.data
        })
    }
    else if(action.type === 'edit'){
        return Object.assign({}, state, {
            edit: action.data
        })
    }
    else{
        return Object.assign({}, state);
    }
}

export default Reducer;

