import React, { useEffect, useState } from "react";
import { deleteContact, getContactData } from "../service/contact.service";
import { ContactCardComponents, LoadingComponents } from "../components";
import ContactImg from "../img/contact.svg";
import { useGetContactQuery } from "../store/services/endpoints/contact.endpoint";

const ContactPage = () => {
  const { isError, isLoading, data, isSuccess } = useGetContactQuery();

  console.log(isError, isLoading, data, isSuccess);

  // const [items, setItems] = useState({
  //   loading: true,
  //   error: null,
  //   data: null,
  // });

  const [deleteItem, setDeleteItem] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     setItems((pre) => ({ ...pre, loading: true }));
  //     const res = await getContactData();
  //     if (res.error) {
  //       setItems((pre) => ({ ...pre, loading: false, error: res.msg }));
  //     } else {
  //       setItems((pre) => ({ ...pre, loading: false, data: res }));
  //     }

  //     // console.log(res);
  //   })();
  // }, [deleteItem]);

  const handleDelete = async (id) => {
    // console.log(id);
    await deleteContact(id);
    setDeleteItem((pre) => !pre);
  };
  return (
    <div>
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <>
          {isError ? (
            <h1>{isError.message}</h1>
          ) : (
            <>
              <div className="w-full h-full flex py-12">
                <div className="w-[50%] flex flex-col space-y-3 pe-10">
                  {data.contacts.data.map((i) => (
                    <ContactCardComponents
                      handleDelete={handleDelete}
                      key={i.id}
                      data={i}
                    />
                  ))}
                </div>
                <div className="w-[50%] flex items-start justify-center">
                  <img src={ContactImg} className="w-[85%]" alt="img" />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ContactPage;
