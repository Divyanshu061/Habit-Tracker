"use client";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import HabitCart, { HabitMiddleValues } from "./HabitCart";
import { useGlobalProvide } from "@/app/Context";
import { useEffect } from "react";
import getFormateDate, {
  getCurrDayName,
  getDateString,
} from "@/app/utils/dateFunction";

export default function HabitTracker({
  onNewHabitClick,
}: {
  onNewHabitClick: () => void;
}) {
  return (
    <div className="mt-5 bg-white rounded-md p-5 h-[500px] flex flex-col gap-3">
      <HabitContainerTop onNewHabitClick={onNewHabitClick} />
      <HabitMiddleValues />
    </div>
  );
}

function HabitContainerTop({
  onNewHabitClick,
}: {
  onNewHabitClick: () => void;
}) {
  const { selectCurrDayObj, offSetDayObj } = useGlobalProvide();
  const { selectCurrDate, setSelectCurrDate } = selectCurrDayObj;
  const { offsetDay, setOffsetDay } = offSetDayObj;

  type Option = "next" | "prev";
  function updateDate(option: Option) {
    if (option === "next") {
      setOffsetDay((prev) => prev + 1);
    }
    if (option === "prev") {
      setOffsetDay((prev) => prev - 1);
    }
  }

  useEffect(() => {
    setSelectCurrDate(getDateString(new Date(), offsetDay));
  }, [offsetDay]);

  return (
    <div className="p-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div>
          <div className="font-bold text-lg">
            {getCurrDayName(selectCurrDate)}
          </div>
          <span className="font-light text-[12px]">
            {getFormateDate(selectCurrDate)}
          </span>
        </div>
        <div className="flex gap-1 ml-4">
          <div className=" cursor-pointer">
            <IoArrowBackCircleOutline
              size={22}
              onClick={() => updateDate("prev")}
            />
          </div>
          <div className=" cursor-pointer">
            <IoArrowForwardCircleOutline
              size={22}
              onClick={() => updateDate("next")}
            />
          </div>
        </div>
      </div>
      <button
        className="flex gap-2 items-center p-3 text-white rounded-md text-sm bg-blue-600"
        onClick={onNewHabitClick}
      >
        <FaPlus />
        <span>New Habit</span>
      </button>
    </div>
  );
}
