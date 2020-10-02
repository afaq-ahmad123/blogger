

const initialState = {
    data: ['new'],
    list: ['list'],
    selected: {},
    username: null
}

function Reducer(state=initialState, action){
    if(action.type === 'Data'){
        console.log(action.data);
        return Object.assign({}, state, {
            data: action.data
        });
    }
    else if(action.type === 'AddS'){
        // console.log(action.data);
        return Object.assign({}, state,{
            selected: action.data
        })
    }
    else{
        return Object.assign({}, state);
    }
}

export default Reducer;

