"use client";
import { FilterContext } from "@/provider/FilterContextProvider";
import React, { useContext, useState } from "react";

function AddCreative({ colors, handleAddCreative,handleCloseCreativeModal }: any) {

  const { setFilterValue} = useContext(FilterContext)

    
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleDone = () => {
    if (title == "" || subtitle == "" || backgroundColor == "") {
      setErrorMessage("Please fill the all fields");
      return;
    }
    let creativeObject = {
      title,
      subtitle,
      backgroundColor,
    };
    handleAddCreative(creativeObject);
    setErrorMessage("");
    setTitle("");
    setSubtitle("");
    setBackgroundColor("");
    setFilterValue((state:any)=>({...state, backgroundColorValue:"",textValue:""}))
  };

  const handleColor = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <div className="p-3 mx-3">
      <div className="flex flex-row justify-between mb-4 ">
        <h2 className="text-2xl font-medium">Creative Creation</h2>
        <button className="text-2xl font-medium" onClick={handleCloseCreativeModal}>X</button>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        placeholder="title"
      />
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="border p-2 rounded mt-3"
        placeholder="subtitle"
      />

      <div className="mt-5">
        <p>Background color</p>
        <div className="flex flex-row my-2">
          {colors !== undefined &&
            colors.map((color: string) => (
              <div
                onClick={() => handleColor(color)}
                className={`h-9 w-9 rounded-full flex flex-row items-center justify-center mr-3 `}
                style={{ backgroundColor: backgroundColor == color ? "black" : "white" }}
              >
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color}}></div>
              </div>
            ))}
        </div>
      </div>
      <p className="text-red-500">{errorMessage}</p>
      <button onClick={handleDone} className="border p-1 px-2 rounded mt-5">
        Done
      </button>
    </div>
  );
}

export default AddCreative;
