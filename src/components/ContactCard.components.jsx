import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { deleteContact } from "../service/contact.service";

const ContactCardComponents = ({ data, handleDelete }) => {
  const nav = useNavigate();
  const handleRedirect = () => {
    nav(`/home/contact/${data.id}`);
  };

  const handleEdit = () => {
    // console.log(data.id);
    nav("/home/add", { state: { edit: true, data, id: data.id } });
  };

  return (
    <div className="w-full h-auto px-7 py-5 text-left rounded-lg bg-gradient text-white shadow hover:bg-gradient-hover duration-200 flex items-center">
      <button className="w-full" onClick={handleRedirect}>
        <div className="flex text-sm font-[500]">
          <div className="w-[28%]">
            <p className="flex items-center gap-2 mb-2">
              <FaUser />
              Name
            </p>
            <p className="flex w-full items-center gap-2">
              <FaSquarePhone />
              Phone
            </p>
          </div>
          <div className="text-left">
            <h1 className="mb-2">: {data.name}</h1>
            <p>: {data.phone}</p>
          </div>
        </div>
      </button>
      <div className="flex items-center gap-3">
        <button
          onClick={handleEdit}
          className="border-2 border-yellow-300 rounded-full p-1.5"
        >
          <CiEdit style={{ strokeWidth: "0.5px", color: "#fde047" }} />
        </button>
        <button
          onClick={handleDelete.bind(this, data.id)}
          className="border-2 border-red-500 rounded-full p-1.5"
        >
          <CiTrash style={{ strokeWidth: "0.5px", color: "#dc2626" }} />
        </button>
      </div>
    </div>
  );
};

export default ContactCardComponents;
