import * as UsersApi from "../API/UsersRequest";

export const getAllUser = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVINGUSERS_START" });
  try {
    const { data } = await UsersApi.getAllUser();
    dispatch({ type: "RETREIVINGUSERS_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVINGUSERS_FAIL" });
  }
};