import React, { useEffect, useState } from "react";
import { ButtonComponents, FormComponents } from "../components";
// import { addNewContact, editContact } from "../service/contact.service";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Img from "../img/contact2.svg";
import {
  useCreateContactMutation,
  useEditContactMutation,
} from "../store/services/endpoints/contact.endpoint";

const ContactAddPage = () => {
  const [fun, postData] = useCreateContactMutation();

  const [edit, { isError, isLoading, data }] = useEditContactMutation();
  console.log(isError, isLoading, data);

  const nav = useNavigate();
  const location = useLocation();
  // console.log(location);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (location.state?.edit) {
      const { id, name, phone, email, address } = location.state.data;
      // console.log(location.state.data);
      setFormData({ name, phone, email, address });
    } else {
      setFormData({ name: "", phone: "", email: "", address: "" });
    }
  }, [location]);

  const handleInputChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (location.state?.edit) {
      // res = await editContact(location.state.id, formData);
      res = await edit(location.state.id, formData);
    } else {
      res = await fun(formData);
    }
    // console.log(res);
    if (res) {
      nav("/home");
    }
    // console.log(formData);
  };

  return (
    <div className="flex h-full">
      <div className="flex items-center h-full w-[50%] px-12 py-10">
        <div className="w-full h-auto bg-white shadow-lg shadow-purple-400 px-12 py-10 rounded-md">
          <h1 className="auth-heading text-center !mb-10">
            {location.state?.edit ? "Edit Your Contact" : "Create Your Contact"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormComponents
              value={formData.name}
              onChange={handleInputChange}
              // label={"Name"}
              type={"text"}
              name={"name"}
              placeholder={"Name"}
            />
            <FormComponents
              value={formData.phone}
              onChange={handleInputChange}
              // label={"Phone"}
              type={"text"}
              name={"phone"}
              placeholder={"Phone"}
            />
            <FormComponents
              value={formData.email}
              onChange={handleInputChange}
              // label={"Email"}
              type={"email"}
              name={"email"}
              placeholder={"Email"}
            />
            <FormComponents
              value={formData.address}
              onChange={handleInputChange}
              // label={"Address"}
              type={"text"}
              name={"address"}
              placeholder={"Address"}
            />
            <ButtonComponents type={"submit"} style={"!rounded-full !mt-7"}>
              {location.state?.edit ? "Edit Contact" : "Save Contact"}
            </ButtonComponents>
          </form>
        </div>
      </div>
      <div className="w-[50%] py-14">
        <img src={Img} alt="" />
      </div>
    </div>
  );
};

export default ContactAddPage;
