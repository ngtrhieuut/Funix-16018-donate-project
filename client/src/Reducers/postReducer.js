const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
  ) => {
    switch (action.type) {
      case "UPLOAD_START":
        return { ...state, error: false, uploading: true };
      case "UPLOAD_SUCCESS":
        return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
      case "UPLOAD_FAIL":
        return { ...state, uploading: false, error: true };

      case "RETREIVING_START":
        return { ...state, loading: true, error: false };
      case "RETREIVING_SUCCESS":
        return { ...state, posts: action.data, loading: false, error: false };
      case "RETREIVING_FAIL":
        return { ...state, loading: false, error: true };

      case "UPDATEPOST_START":
        return {...state, uploading: true , error: false}
      case "UPDATEPOST_SUCCESS":
        return {...state, posts: state.posts.map(post => post._id === action.data._id ? action.data : post), uploading: false, error: false}
      case "UPDATEPOST_FAIL":
        return {...state, uploading: true, error: true}

      case "DELETEPOST_START":
        return { ...state, loading: true, error: false };
      case "DELETEPOST_SUCCESS":
        return { ...state, posts: state.posts.filter(post => post._id !== action.data.id), loading: false, error: false };
      case "DELETEPOST_FAIL":
        return {...state, uploading: true, error: true}
      default:
        return state;
    }
  };
  
  export default postReducer;