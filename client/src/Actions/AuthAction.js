import * as AuthApi from '../API/AuthRequest.js';

export const logIn = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data });
        navigate("../home", { replace: true });
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAIL" });
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data } = await AuthApi.signUp(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data });
        navigate("../home", { replace: true });
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAIL" });
    }
};


export const logout = () => async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
};

export const confirmEmail = (formData, navigate) => async (dispatch) => {
    dispatch({type: "UPDATING_START"});
    try {
        const {data} = await AuthApi.confirmEmail(formData);
        dispatch({type: "UPDATING_SUCCESS", data: data});
        navigate("../home", {replace: true});
    } catch (error) {
        console.log(error);
        dispatch({type: "UPDATING_FAIL"})
    }
}