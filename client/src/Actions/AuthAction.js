import * as AuthApi from '../API/AuthRequest.js';
import axios from "axios";

export const logIn = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        dispatch({ type: "AUTH_SUCCESS" });
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
};

export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor', {
        headers: {Authorization: token}
    })
    return res
};

export const getAUser = (res) => {
    return {
        type: "GET_USER",
        payload: {
            user: res.data,
        }
    }
}