"use client";
import { AreaType, useGlobalProvide } from "@/app/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function AllAreaContainer() {
  const { allAreaObject: { allArea } } = useGlobalProvide();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  }
  return (
    <div className="w-full mt-5 p-6 flex flex-col gap-6 rounded-md">
      {allArea.map((singleArea, index) => {
        return (
          <div key={index}>
            <AreaCard singleArea={singleArea} />
          </div>
        );
      })}
    </div>
  );
}

function AreaCard({ singleArea }: { singleArea: AreaType }) {
  const { allAreaObject } = useGlobalProvide();
  const { allArea, setAllArea } = allAreaObject;

  const handleDelete = () => {
    if (
      confirm(`Are you sure you want to delete the area: ${singleArea.name}?`)
    ) {
      setAllArea(allArea.filter((area) => area.id !== singleArea.id));
    }
  };

  return (
    <div className="flex justify-between p-4 rounded-md shadow-md bg-white hover:bg-gray-100 transition-all">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={singleArea.icon}
          className="text-blue-500 text-xl"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{singleArea.name}</span>
          <span className="text-gray-700 text-sm">Habit</span>
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 transition-all"
      >
        Delete
      </button>
    </div>
  );
}
