import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#03346E] sm:px8 px-4 py-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 object-contain" />
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6EACDA] text-[#E2E2B6] px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:px-8 px-4 py-8 w-full bg-[#021526] min-h-[calc(100vh - 73px)]">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create-post" element={<CreatePost />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
