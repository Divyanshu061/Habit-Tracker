import { AreaType, useGlobalProvide } from "@/app/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function AreaContainer() {
  const { allAreaObject, selectedAreaStringObj } = useGlobalProvide();
  const { allArea } = allAreaObject;
  const { setSelectedAreaString } = selectedAreaStringObj;
  const [selectedArea, setSelectedArea] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const initialSelectionArea: { [key: number]: boolean } = {};
    allArea.forEach((_, index) => {
      initialSelectionArea[index] = false;
    });
    initialSelectionArea[0] = false;
    setSelectedArea(initialSelectionArea);
  }, []);

  const toggleSection = (index: number) => {
    const selectedArrayAsCopy = { ...selectedArea };
    Object.keys(selectedArrayAsCopy).forEach((key) => {
      selectedArrayAsCopy[parseInt(key)] = false;
    });
    selectedArrayAsCopy[index] = true;
    setSelectedAreaString(allArea[index].name);
    setSelectedArea(selectedArrayAsCopy);
  };

  return (
    <div className="p-5 rounded-md flex gap-4 items-center transition-all mt-5 text-sm">
      {allArea.map((area, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              toggleSection(index);
            }}
          >
            <SingleArea singleArea={area} isSelected={selectedArea[index]} />
          </div>
        );
      })}
    </div>
  );
}

function SingleArea({
  singleArea,
  isSelected,
}: {
  singleArea: AreaType;
  isSelected: boolean;
}) {
  return (
    <div
      className={`p-2 px-3 rounded-md flex gap-2 items-center cursor-pointer ${
        isSelected ? "bg-blue-400 text-white" : "text-gray-400"
      }`}
    >
      <FontAwesomeIcon icon={singleArea.icon} />
      <span>{singleArea.name}</span>
    </div>
  );
}
