import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getSingleContact } from "../service/contact.service";
import { LoadingComponents } from "../components";
import { FaUser } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowGoBackLine } from "react-icons/ri";

const DetailContactPage = () => {
  const { id } = useParams();
  //   console.log(id);

  const nav = useNavigate();

  const [items, setItems] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    (async () => {
      const res = await getSingleContact(id);
      //   console.log(res);
      if (res.error) {
        setItems((pre) => ({ ...pre, loading: false, error: res.msg }));
      } else {
        setItems((pre) => ({ ...pre, loading: false, data: res }));
      }
    })();
  }, [id]);

  return (
    <div>
      {items.loading ? (
        <LoadingComponents />
      ) : (
        <>
          {items.error ? (
            <h1>{items.error}</h1>
          ) : (
            <div className="w-[50%] mx-auto bg-white shadow-xl my-16 rounded-md">
              <h1 className="bg-purple-800 text-xl font-[500] text-white font-heading tracking-wide py-5 px-8 rounded-t-md flex items-center justify-between">
                Contact Details
                <button
                  onClick={() => nav("/home")}
                  className="border-2 rounded-full p-1.5"
                >
                  <RiArrowGoBackLine size={15} />
                </button>
              </h1>
              <div className="px-8 py-3 flex text-[15px] text-purple-900">
                <div className="w-[30%] divide-y divide-purple-300 font-[500]">
                  <p className="flex items-center gap-2 py-4">
                    <FaUser />
                    Name
                  </p>
                  <p className="flex items-center gap-2 py-4">
                    <FaSquarePhone />
                    Phone
                  </p>
                  <p className="flex items-center gap-2 py-4">
                    <MdEmail />
                    Email
                  </p>
                  <p className="flex items-center gap-2 py-4">
                    <FaLocationDot />
                    Address
                  </p>
                </div>
                <div className="w-[70%] divide-y divide-purple-300 font-semibold">
                  <p className="py-4">: {items.data.name}</p>
                  <p className="py-4">: {items.data.phone}</p>
                  <p className="py-4">
                    : {items.data.email ? items.data.email : "null"}
                  </p>
                  <p className="py-4">
                    : {items.data.address ? items.data.address : "null"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailContactPage;
