import * as DonatesApi from "../API/DonateRequest";

export const getAllDonate = (id) => async (dispatch) => {
  dispatch({ type: "GETALLDONATES_START" });
  try {
    const { data } = await DonatesApi.getAllDonate();
    dispatch({ type: "GETALLDONATES_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GETALLDONATES_FAIL" });
  }
};

export const postDonate = (data) => async (dispatch) => {
  dispatch({type: "POSTDONATE_START"});
  try {
    const newDonate = await DonatesApi.postDonate(data);
    dispatch({type: "POSTDONATE_SUCCESS", data: newDonate.data});
  } catch (error) {
    console.log(error)
    dispatch({type: "POSTDONATE_FAIL"})
  }
}