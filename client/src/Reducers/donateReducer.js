const donateReducer = (
    state = { donates: [], loading: false, error: false, uploading: false },
    action
  ) => {
    switch (action.type) {
      case "POSTDONATE_START":
        return { ...state, error: false, uploading: true };
      case "POSTDONATE_SUCCESS":
        return { ...state, donates: [action.data, ...state.donates], uploading: false, error: false };
      case "POSTDONATE_FAIL":
        return { ...state, uploading: false, error: true };
      case "GETALLDONATES_START":
        return { ...state, loading: true, error: false };
      case "GETALLDONATES_SUCCESS":
        return { ...state, donates: action.data, loading: false, error: false };
      case "GETALLDONATES_FAIL":
        return { ...state, loading: false, error: true };
    //   case "UPDATEPOST_START":
    //     return {...state, uploading: true , error: false}
    //   case "UPDATEPOST_SUCCESS":
    //     return {...state, donates: [...state.donates, ...action.data], uploading: false, error: false}
    //   case "UPDATEPOST_FAIL":
    //     return {...state, uploading: true, error: true}
      default:
        return state;
    }
  };
  
  export default donateReducer;