"use client";
import CompleteSection from "./CompleteSection";
import HabitTracker from "./HabitContainer";
import HabitWindow from "./HabitWindow";
import RightSideBar from "./sidebar/RightSideBar";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AreaContainer from "./AreaContainer";

export default function AllHabit() {
  const [showHabitWindow, setShowHabitWindow] = useState(false);

  const toggleHabitWindow = () => {
    setShowHabitWindow((prev) => !prev);
  };

  return (
    <div className="w-full flex">
      <Toaster />
      {showHabitWindow && (
        <HabitWindow key="habitWindow" onClose={toggleHabitWindow} />
      )}
      <div className="w-[85%] ml-5 mr-[24%] m-5">
        <HabitTopBar />
        <AreaContainer />
        <HabitTracker onNewHabitClick={toggleHabitWindow} />
        <CompleteSection />
      </div>
      <RightSideBar />
    </div>
  );
}

function HabitTopBar() {
  return (
    <div className="bg-white p-5 rounded-md flex justify-between">
      <div className="flex flex-col">
        <span className="text-xl">
          <span className="font-bold">Hi There</span>
          <span className="font-light">, Me</span>
        </span>
        <span className="font-light text-[14px] text-gray-600">
          Welcome back!
        </span>
      </div>
      <div className="w-[50%] flex gap-3 justify-between">
        <SearchBar />
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="w-[75%]">
      <div className="flex gap-3 items-center p-3 bg-slate-100 rounded-3xl">
        <CiSearch />
        <input
          className="outline-none text-[14px] font-light bg-slate-100 w-full"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
