const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false , isLoggedIn: false}, action) => {
    switch (action.type) {
        case "AUTH_START":
            return {...state, loading: true, error: false };
        case "AUTH_SUCCESS":    
            return {...state, loading: false, error: false, isLoggedIn: true };
        case "AUTH_FAIL":
            return {...state, loading: false, error: true, isLoggedIn: false };

        case "UPDATING_START":
            return {...state, updateLoading: true , error: false}
        case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authData: action.data.activeUser, updateLoading: false, error: false}
        case "UPDATING_FAIL":
            return {...state, updateLoading: true, error: true}

        case "GET_USER":
            return {...state, authData: action.payload.user}
  
        case "LOG_OUT":
            localStorage.clear();
            return {...state,  authData: null,isLoggedIn: false }
  
        default:
        return state;
    }
};
  
export default authReducer;