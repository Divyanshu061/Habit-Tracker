"use client";
import React, { useState } from "react";
import { iconData } from "./IconData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function IconWindow({
  openIconWindow,
  setOpenIconWindow,
  iconSelected,
  setIsIconSelected,
}: {
  openIconWindow: boolean;
  setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  iconSelected: IconProp;
  setIsIconSelected: React.Dispatch<React.SetStateAction<IconProp>>;
}) {
  const [allIcon, setAllIcon] = useState(iconData);

  return (
    <div
      className={`z-50 w-[70%] left-1/2 transform -translate-x-1/2 p-4 rounded-md border flex flex-col gap-6 shadow-md bg-slate-200 ${
        openIconWindow ? "absolute" : "hidden"
      }`}
    >
      <FontAwesomeIcon
        icon={faClose}
        className="absolute top-8 right-4 cursor-pointer"
        onClick={() => {
          setOpenIconWindow(false);
        }}
      />
      <span className="font-bold text-lg bg-transparent mt-3">Choose Icon</span>
      <div className="border border-gray-200 p-5 flex flex-wrap gap-4 items-center rounded-md mb-5 transition-all ">
        {allIcon.map((icon, index) => {
          return (
            <FontAwesomeIcon
              key={index}
              className="border p-2 border-gray-300 rounded-md text-xl cursor-pointer hover:bg-blue-300 hover:p-3 transition-all duration-300 ease-in-out"
              height={50}
              width={50}
              icon={icon.faIcon}
              onClick={() => {
                setIsIconSelected(icon.faIcon);
                setOpenIconWindow(false);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
