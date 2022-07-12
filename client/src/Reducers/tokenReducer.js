const tokenReducer = (state = {token: "", loading: false}, action) => {
    switch(action.type){
        case "GET_TOKEN":
            return {...state, token: action.payload}
        case "DELETE_TOKEN":
            return {...state, token: ""}
        default:
            return state
    }
}

export default tokenReducer;