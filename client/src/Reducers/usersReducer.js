const usersReducer = (state = { users: [], loading: false, error: false, updateLoading: false }, action) => {
    switch (action.type) {
        case "RETREIVINGUSERS_START":
            return { ...state, loading: true, error: false };
        case "RETREIVINGUSERS_SUCCESS":
            return { ...state, users: action.data, loading: false, error: false };
        case "RETREIVINGUSERS_FAIL":
            return { ...state, loading: false, error: true };

        case "EDITUSER_START":
            return {...state, loading: true, updateLoading: true};
        case "EDITUSER_SUCCESS":
            return {...state, users: state.users.map(user => user._id === action.data._id ? {...user, ...action.data} : user), loading: false, updateLoading: false};
        case "EDITUSER_FAIL":
            return {...state, loading: false, error: true, updateLoading: false};

        case "ADDNEWUSER_SUCCESS":
            console.log([...state.users, action.data]);
            return {...state, users: [...state.users, action.data], error: false, loading: false};
        default:
            return state;
    }
};
  
export default usersReducer;