"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Habit } from "./HabitWindow";

export default function TimePicker({
  onClose,
  habitItem,
  setHabitItem,
}: {
  onClose: () => void;
  habitItem: Habit;
  setHabitItem: React.Dispatch<React.SetStateAction<Habit>>;
}) {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minRef = useRef<HTMLInputElement>(null);

  const [timeValue, setTimeValue] = useState([
    { text: "11", isSelected: true },
    { text: "00", isSelected: false },
  ]);
  const [meridiem, setMeridiem] = useState([
    { text: "AM", isSelected: true },
    { text: "PM", isSelected: false },
  ]);

  function updateMeridiemTime(clickIndex: number) {
    setMeridiem((prevMeridiem) =>
      prevMeridiem.map((item, index) => ({
        ...item,
        isSelected: index === clickIndex,
      }))
    );
  }

  function updateTimeValue(clickIndex: number) {
    setTimeValue((prevTimeValue) =>
      prevTimeValue.map((item, index) => ({
        ...item,
        isSelected: index === clickIndex,
      }))
    );
  }

  function updateTimeValueText(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const curr = e.target.value;
    const parseVal = parseInt(curr, 10);

    if (
      (/^\d*$/.test(curr) && parseVal >= 0 && parseVal <= 59) ||
      curr === ""
    ) {
      setTimeValue((prevTimeValue) => {
        const updated = [...prevTimeValue];
        updated[index].text = curr;
        return updated;
      });
    }
  }

  function saveTime() {
    const meridiemSelect = meridiem.find((item) => item.isSelected)?.text;
    const selectTimeFormat =
      timeValue[0].text + ":" + timeValue[1].text + " " + meridiemSelect;

    const copyHabit = { ...habitItem };
    copyHabit.notification = selectTimeFormat;
    copyHabit.isNotification = true;
    setHabitItem(copyHabit);
    onClose();
  }

  function handleOnBlur(idx: number) {
    setTimeValue((prevTimeValue) => {
      const updated = [...prevTimeValue];
      const currText = updated[idx].text;
      if (currText === "") {
        updated[idx].text = "00";
      } else if (currText.length === 1) {
        updated[idx].text = "0" + currText;
      }
      return updated;
    });
  }

  useEffect(() => {
    if (timeValue[0].isSelected) {
      hoursRef.current?.focus();
    } else if (timeValue[1].isSelected) {
      minRef.current?.focus();
    }
  }, [timeValue]);

  useEffect(() => {
    function getCurrTime() {
      const now = new Date();
      let currHour = now.getHours();
      const currMin = now.getMinutes().toString().padStart(2, "0");
      const AmPm = currHour >= 12 ? "PM" : "AM";

      currHour = currHour % 12;
      currHour = currHour ? currHour : 12;
      const formatHour = currHour.toString().padStart(2, "0");

      setTimeValue([
        { text: formatHour, isSelected: false },
        { text: currMin, isSelected: false },
      ]);

      setMeridiem((prevMeridiem) =>
        prevMeridiem.map((item) => ({
          ...item,
          isSelected: item.text === AmPm,
        }))
      );
    }

    getCurrTime();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] p-7 rounded-lg shadow-lg relative">
        <span className="font-bold flex justify-between items-center text-gray-800">
          <span>Select Time</span>
          <FontAwesomeIcon
            height={20}
            width={20}
            icon={faClose}
            className="cursor-pointer hover:text-gray-600"
            onClick={onClose}
          />
        </span>
        <div className="flex gap-8 mt-9">
          <div className="flex gap-2 justify-center items-center">
            <input
              type="text"
              ref={hoursRef}
              value={timeValue[0]?.text}
              onChange={(e) => updateTimeValueText(e, 0)}
              onBlur={() => handleOnBlur(0)}
              readOnly={!timeValue[0]?.isSelected}
              onClick={() => updateTimeValue(0)}
              className="w-[80px] text-[40px] p-2 rounded-md text-center outline-none bg-gray-100 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
              placeholder="12"
            />
            <span className="text-2xl font-bold text-gray-700">:</span>
            <input
              type="text"
              ref={minRef}
              value={timeValue[1]?.text}
              onChange={(e) => updateTimeValueText(e, 1)}
              onBlur={() => handleOnBlur(1)}
              readOnly={!timeValue[1]?.isSelected}
              onClick={() => updateTimeValue(1)}
              className="w-[80px] text-[40px] p-2 rounded-md text-center outline-none bg-gray-100 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
              placeholder="00"
            />
          </div>
          <div className="flex flex-col gap-3">
            {meridiem.map((item, idx) => (
              <span
                key={idx}
                onClick={() => updateMeridiemTime(idx)}
                className={`text-lg flex justify-center items-center w-[80px] h-[45px] rounded-md cursor-pointer ${
                  item.isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
        <button
          className="w-full mt-10 py-3 rounded-md bg-blue-600 text-white text-lg hover:bg-blue-700"
          onClick={saveTime}
        >
          Save
        </button>
      </div>
    </div>
  );
}
