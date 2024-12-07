"use client";

import React, { useEffect, useState } from "react";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { IoMdMore } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Habit } from "./HabitWindow";
import { useGlobalProvide } from "@/app/Context";
import Checkbox from "@mui/material/Checkbox";
import { v4 as uuid } from "uuid";
import { getCurrDayName } from "@/app/utils/dateFunction";
import dynamic from "next/dynamic";

export function HabitMiddleValues() {
  const {
    allHabitObject,
    selectCurrDayObj,
    allFilterObj,
    selectedAreaStringObj,
  } = useGlobalProvide();
  const { allHabit } = allHabitObject;
  const { selectCurrDate } = selectCurrDayObj;
  const { selectedAreaString } = selectedAreaStringObj;
  const { allFilterHabit, setAllFilterHabit } = allFilterObj;

  useEffect(() => {
    const getTwoLetter = getCurrDayName(selectCurrDate).slice(0, 2);
    const filterHabitByFrq = allHabit.filter((singleHabit) => {
      console.log(singleHabit.frequency[0]?.days);
      const matchesFrequency = singleHabit.frequency[0]?.days.some(
        (day) => day.toLocaleLowerCase() === getTwoLetter.toLocaleLowerCase()
      );
      return matchesFrequency;
    });
    let filterByArea: Habit[] = [];
    if (selectedAreaString !== "All") {
      filterByArea = filterHabitByFrq.filter((habit) => {
        const normalizedAreas = Array.isArray(habit.area)
          ? habit.area.flatMap((item) => (Array.isArray(item) ? item : [item]))
          : [];
        const matchesArea = normalizedAreas.some((areaVal) => {
          const result = areaVal.name === selectedAreaString;
          return result;
        });
        console.log(matchesArea);
        return matchesArea;
      });
    } else {
      filterByArea = filterHabitByFrq;
    }
    console.log(filterByArea);
    setAllFilterHabit(filterByArea);
  }, [selectCurrDate, allHabit, selectedAreaString]);

  return (
    <div className="p-3">
      {allFilterHabit.length > 0 ? (
        allFilterHabit.map((singleHabit, index) => (
          <div key={index}>
            <HabitCart singleHabit={singleHabit} />
          </div>
        ))
      ) : (
        <div>
          {/* Render allHabit or some part of it */}
          {allHabit.length > 0 ? (
            allHabit.map((singleHabit, index) => (
              <div key={index}>
                <HabitCart singleHabit={singleHabit} />
              </div>
            ))
          ) : (
            <div>No habits to display.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function HabitCart({ singleHabit }: { singleHabit: Habit }) {
  const [areas, setAreas] = useState<
    { id: number; icon: JSX.Element; name: string }[]
  >([]);
  const { selectCurrDayObj, allHabitObject } = useGlobalProvide();
  const { setAllHabit, allHabit } = allHabitObject;
  const { selectCurrDate } = selectCurrDayObj;
  const [checked, setChecked] = useState(
    singleHabit.completedDays.some((day) => day.date === selectCurrDate)
  );

  function handleCheckBox(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setChecked(checked);

    if (checked) {
      checkHabit();
    } else {
      unCheckHabit();
    }
  }

  function checkHabit() {
    const completedDays = {
      _id: uuid(),
      date: selectCurrDate,
    };

    const updateHabit: Habit = {
      ...singleHabit,
      completedDays: [...singleHabit.completedDays, completedDays],
    };

    const updateAllHabit: Habit[] = allHabit.map((habit) => {
      if (habit._id === updateHabit._id) {
        return updateHabit;
      }
      return habit;
    });
    setAllHabit(updateAllHabit);
  }

  function unCheckHabit() {
    const updateHabit: Habit = {
      ...singleHabit,
      completedDays: singleHabit.completedDays.filter(
        (day) => day.date !== selectCurrDate
      ),
    };
    const updateAllHabit: Habit[] = allHabit.map((habit) => {
      if (habit._id === updateHabit._id) {
        return updateHabit;
      }
      return habit;
    });
    setAllHabit(updateAllHabit);
  }

  useEffect(() => {
    if (singleHabit.area && Array.isArray(singleHabit.area)) {
      const normalizedAreas = singleHabit.area.flatMap((item) =>
        Array.isArray(item) ? item : [item]
      );
      setAreas(normalizedAreas);
    }
  }, [singleHabit.area]);

  // Function to update the name of a specific area
  const updateArea = (index: number, newName: string) => {
    const updatedAreas = areas.map((area, i) =>
      i === index ? { ...area, name: newName } : area
    );
    setAreas(updatedAreas);
  };

  if (!singleHabit) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const isCompleted = singleHabit.completedDays.some(
      (day) => day.date === selectCurrDate
    );
    setChecked(isCompleted);
  }, [singleHabit, selectCurrDate, allHabit]);

  return (
    <div className="p-3">
      <div className="flex p-3 items-center justify-between border">
        <Checkbox
          icon={<RadioButtonUnchecked />}
          checked={checked}
          onChange={handleCheckBox}
        />
        <div className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-50">
          <div className="w-full">
            <div className="flex gap-2 justify-between">
              <div className="flex gap-2 items-center text-lg">
                <FontAwesomeIcon
                  icon={singleHabit.icon}
                  className="rounded-full w-4 h-4"
                  height={20}
                  width={20}
                />
                <span>{singleHabit.name}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {areas.map((singleArea, index) => (
                <span
                  key={index}
                  className="p-1 text-[12px] rounded-lg px-2 bg-blue-400 text-white cursor-pointer"
                  onClick={() => {
                    const newName = prompt(
                      `Update name for area: ${singleArea.name}`,
                      singleArea.name
                    );
                    if (newName) updateArea(index, newName);
                  }}
                >
                  {singleArea.name || "Unnamed Area"}
                </span>
              ))}
            </div>
          </div>
          <div className="w-10 flex items-center justify-center">
            <IoMdMore size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
