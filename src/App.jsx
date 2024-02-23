import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ContactAddPage,
  ContactPage,
  DetailContactPage,
  HomePage,
  LoginPage,
  RegisterPage,
} from "./page";

const App = () => {
  return (
    <main className="h-screen bg-purple-50">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<ContactPage />} />
          <Route path="add" element={<ContactAddPage />}></Route>
          <Route path="contact/:id" element={<DetailContactPage />}></Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
