import React, { useEffect, useState } from "react";
import {
  ButtonComponents,
  ContainerComponents,
  ErrorComponents,
  FormComponents,
  LoadingComponents,
  PreventComponents,
} from "../components";
import { useNavigate } from "react-router-dom";
import { Register } from "../service/auth.service";
import useApi from "../hook/useApi";
import { useSelector, useDispatch } from "react-redux";
import { RegisterAction } from "../store/action/auth.action";
import RegisterImg from "../img/register.svg";
import { processing, register } from "../store/slice/auth.slice";

const RegisterPage = () => {
  const nav = useNavigate();
  const { loading, error, data, auth } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  // console.log(data);

  // console.log(store);

  // const { handleDealApi, loading, error, data } = useApi(Register);
  // console.log(data);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    // console.log(data);
    if (data) {
      nav("/");
    }
  }, [data, nav]);

  const handleInputChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(processing());
    const res = await Register(formData);
    dispatch(register(res.data));
    // RegisterAction(dispatch, formData);
    // handleDealApi(formData);
    // console.log(res);
  };

  return (
    <PreventComponents check={localStorage.getItem("auth")} fail={"/home"}>
      <ContainerComponents>
        {loading ? (
          <LoadingComponents />
        ) : (
          <div className="flex h-screen">
            <div className="w-[60%] flex items-center justify-center ">
              <img src={RegisterImg} className="w-[600px]" alt="img" />
            </div>
            <div className="Center w-[40%] relative">
              <div className="w-4/6 h-auto p-4">
                <h1 className="auth-heading">Register your account</h1>
                {error && <ErrorComponents>{error}</ErrorComponents>}
                <form className="space-y-5 mt-10" onSubmit={handleSubmit}>
                  <FormComponents
                    value={formData.name}
                    onChange={handleInputChange}
                    // label={"Enter Username"}
                    type={"text"}
                    name={"name"}
                    placeholder={"Username"}
                  />
                  <FormComponents
                    value={formData.email}
                    onChange={handleInputChange}
                    // label={"Enter Your Email"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Email"}
                  />
                  <FormComponents
                    value={formData.password}
                    onChange={handleInputChange}
                    // label={"Enter Your Password"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                  />
                  <FormComponents
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    // label={"Enter Your Confirm Password"}
                    type={"password"}
                    name={"password_confirmation"}
                    placeholder={"Confirm password"}
                  />
                  <ButtonComponents
                    type={"submit"}
                    style={"!rounded-full !mt-7"}
                  >
                    Register
                  </ButtonComponents>
                </form>
                <p className="auth-text">
                  Already have an account? Please login &nbsp;
                  <button
                    onClick={() => nav("/")}
                    className="font-semibold underline"
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

export default RegisterPage;
