import { Login, Register } from "../../service/auth.service";

export const LoginAction = async (dispatch, formData) => {
  try {
    dispatch({ type: "process" });
    const res = await Login(formData);
    // console.log(res.data);
    if (res.data) {
      dispatch({ type: "login", payload: res.data });
    } else {
      dispatch({ type: "error", payload: res.msg });
    }
  } catch (e) {
    dispatch({ type: "error", payload: res.msg });
  }
};

export const RegisterAction = async (dispatch, formData) => {
  try {
    // console.log(formData);
    dispatch({ type: "process" });
    const res = await Register(formData);
    // console.log(res);
    console.log(res.data);
    if (res.data) {
      dispatch({ type: "register", payload: res.data });
    } else {
      dispatch({ type: "error", payload: res.msg });
    }
  } catch (e) {
    dispatch({ type: "error", payload: res.msg });
  }
};
