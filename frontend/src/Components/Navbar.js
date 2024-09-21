import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const onSearch = () => {
    navigate('/search', {state:{query}})
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const handleLogoClick = () =>{
    // window.scrollTo(0,0)
    navigate('/')
  }

  return (
    <div className="bg-[#3371D1] pb-6 text-white p-2 flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center px-3">
        <div className=" flex items-center" onClick={handleLogoClick}>
          <div className=" h-20">
            <img className=" h-full" src="/recSysLogo.png" alt="Logo"/>
          </div>
          <div>
          <h1 className="text-3xl">RecShorts</h1>
          <p className="italic hidden lg:block">
            A smart intelligent news recommendation site
          </p>
          </div>
          
        </div>

        <div className="flex items-baseline">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-1 text-black mt-4 lg:mt-0 rounded-lg"
            value={query} // Bind the input to the query state
            onChange={handleInputChange} // Handle input changes
            onKeyPress={handleKeyPress}
          />
          <button onClick={()=>onSearch()} className="bg-green-500 ml-2 px-2 py-1 rounded-lg hover:bg-green-600">
            Search
          </button>
        </div>
      </div>
  );
}
