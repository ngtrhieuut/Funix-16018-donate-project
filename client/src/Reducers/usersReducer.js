const usersReducer = (state = { users: [], loading: false, error: false, updateLoading: false }, action) => {
    switch (action.type) {
        case "RETREIVINGUSERS_START":
            return { ...state, loading: true, error: false };
        case "RETREIVINGUSERS_SUCCESS":
            return { ...state, users: action.data, loading: false, error: false };
        case "RETREIVINGUSERS_FAIL":
            return { ...state, loading: false, error: true };
  
        default:
            return state;
    }
};
  
export default usersReducer;