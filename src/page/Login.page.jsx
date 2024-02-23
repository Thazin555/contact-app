import React, { useEffect, useState } from "react";
import {
  ContainerComponents,
  FormComponents,
  ButtonComponents,
  ErrorComponents,
  LoadingComponents,
  PreventComponents,
} from "../components";
import { useNavigate } from "react-router-dom";
import useApi from "../hook/useApi";
import { Login } from "../service/auth.service";
import { useSelector, useDispatch } from "react-redux";
import { LoginAction } from "../store/action/auth.action";
import LoginImg from "../img/login.svg";
import { login, processing } from "../store/slice/auth.slice";

const LoginPage = () => {
  const nav = useNavigate();
  const { loading, error, data, auth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  // console.log(data);
  // console.log(loading, error, data, auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) =>
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));

  // useEffect(() => {
  //   if (data) {
  //     nav("/home");
  //   }
  // }, [data, nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // LoginAction(dispatch, formData);
    dispatch(processing()); // loading true
    const res = await Login(formData);
    dispatch(login(res.data));
    if (res.data) {
      nav("/home");
    }
  };

  return (
    <PreventComponents fail={"/home"} check={localStorage.getItem("auth")}>
      <ContainerComponents>
        {loading ? (
          <LoadingComponents />
        ) : (
          <div className="flex h-screen">
            <div className="w-[70%] flex items-center justify-center bg-gradient bg-gradient-to-tr">
              <img src={LoginImg} className="w-[600px]" alt="img" />
            </div>
            <div className="Center w-[40%] relative">
              <div className=" w-4/6 h-auto p-4">
                <div className="badge">Welcome back</div>
                <h1 className="auth-heading">Login your account</h1>

                {error && <ErrorComponents>{error}</ErrorComponents>}

                <form className="space-y-5 mt-10" onSubmit={handleSubmit}>
                  <FormComponents
                    value={formData.email}
                    onChange={handleInputChange}
                    name={"email"}
                    type={"email"}
                    // label={"Enter Your Email"}
                    placeholder="Email"
                  />
                  <FormComponents
                    value={formData.password}
                    onChange={handleInputChange}
                    name={"password"}
                    type={"password"}
                    placeholder={"Password"}
                    // label={"Password"}
                  />
                  <ButtonComponents style={"!rounded-full !mt-7"} type="submit">
                    Login
                  </ButtonComponents>
                </form>
                <p className="auth-text">
                  Don't have an account? Please register &nbsp;
                  <button
                    className="font-semibold underline"
                    onClick={() => nav("/register")}
                  >
                    here!
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </ContainerComponents>
    </PreventComponents>
  );
};

export default LoginPage;
