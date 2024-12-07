"use client";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useGlobalProvide } from "@/app/Context";
import {
  faUser,
  faCode,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export default function AllAreaTopBar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="p-5 rounded-md flex justify-between items-center transition-all">
      <div className="flex gap-5 items-center">
        <span className="text-xl font-bold">Area</span>
        <button
          className="p-2 px-4 ml-4 rounded-md bg-blue-400 text-white"
          onClick={toggleModal}
        >
          Add Area
        </button>
      </div>
      <FontAwesomeIcon icon={faBars} className="m-2 w-[13px] cursor-pointer" />
      {isModalOpen && <AddAreaModal onClose={toggleModal} />}
    </div>
  );
}

function AddAreaModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = React.useState("");
  const [selectedIcon, setSelectedIcon] = React.useState(faUser);
  const { addNewArea } = useGlobalProvide();

  const handleAdd = () => {
    if (name.trim() === "") {
      alert("Area name cannot be empty.");
      return;
    }
    addNewArea(name, selectedIcon);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Area</h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Area Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Select Icon</label>
          <div className="flex gap-4">
            <button
              className={`p-2 border rounded-md ${
                selectedIcon === faUser ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedIcon(faUser)}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button
              className={`p-2 border rounded-md ${
                selectedIcon === faCode ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedIcon(faCode)}
            >
              <FontAwesomeIcon icon={faCode} />
            </button>
            <button
              className={`p-2 border rounded-md ${
                selectedIcon === faGraduationCap ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedIcon(faGraduationCap)}
            >
              <FontAwesomeIcon icon={faGraduationCap} />
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-400 text-white rounded-md"
            onClick={handleAdd}
          >
            Add Area
          </button>
        </div>
      </div>
    </div>
  );
}
