import React, { useState } from "react";

export default function Switch({  onSwitch ,category}) {
  const [left, setleft] = useState(0);
  const [selected, setSelected] = useState(0);
  const activeSwitch = (tab, index) => {
    setleft(index * 100);
    setTimeout(() => {
      setSelected(index);
    }, 300);
    onSwitch(tab, index);
  };
  return (
    <div className="bg-white  p-[4px] h-[35px] flex items-center rounded-[20px]">
      <div className=" h-full flex items-center relative">
        {category.map((tab, index) => (
          <span
            key={index}
            className={`w-[100px] font-semibold h-full rounded-[20px] flex items-center  text-[14px] z-[1] cursor-pointer transition-colors ease-linear duration-300 justify-center ${
              selected === index ? "text-white" : "text-[#04152d]"
            } `}
            onClick={() => activeSwitch(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="h-[30px] w-[100px] rounded-[20px] bg-gradient-to-br from-pink-500 to-orange-400 absolute left-0 transition-[left] duration-200 ease-[cubic-bezier(0.88,-0.35,0.565,1.35)]"
          style={{ left }}
        ></span>
      </div>
    </div>
  );
}
