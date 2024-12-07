"use client";
import React, {
  useEffect,
  useRef,
  memo,
  useState,
  SetStateAction,
} from "react";
import { IoMdClose } from "react-icons/io";
import IconWindow from "./Icons/IconWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faClose,
  faClosedCaptioning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimePicker from "./TimePicker";
import HabitWindowArea from "./HabitWindow/HabitArea";
import { AreaType, useGlobalProvide } from "@/app/Context";
import toast from "react-hot-toast";
import addNewHabit from "@/app/utils/newHabit";

type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

export type completedDaysType = {
  _id: string;
  date: string;
};

export type Habit = {
  _id: string;
  name: string;
  icon: IconProp;
  frequency: FrequencyType[];
  notification: string;
  isNotification: boolean;
  area: AreaType[];
  completedDays: completedDaysType[];
};
type RepeatOption = {
  name: string;
  isSelected: boolean;
};

type InputsAndIconProps = {
  onUpdateHabit: (inputText: string) => void;
  habitName: string;
  setOpenIconWindow: React.Dispatch<SetStateAction<boolean>>;
  iconSelected: IconProp;
};

type DaysOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

const HeaderMemo = memo(Header);
const InputMemo = memo(InputsAndIcon);

export default function HabitWindow({ onClose }: { onClose: () => void }) {
  const [habitItem, setHabitItem] = useState<Habit>({
    _id: "",
    name: "",
    icon: faClose,
    frequency: [{ type: "", days: ["M"], number: 1 }],
    notification: "8:00 AM",
    isNotification: false,
    area: [{ id: "0", icon: faClosedCaptioning, name: "Area" }],
    completedDays: [{ _id: "1", date: "" }],
  });
  const [openIconWindow, setOpenIconWindow] = useState(false);
  const [iconSelected, setIsIconSelected] = useState<IconProp>(habitItem.icon);

  useEffect(() => {
    const copyHabit = { ...habitItem };
    copyHabit.icon = iconSelected;
    setHabitItem(copyHabit);
  }, [iconSelected]);

  const onUpdateHabit = (inputText: string) => {
    setHabitItem((prev) => ({ ...prev, name: inputText }));
  };

  function changeRepeatOption(repeatOptions: RepeatOption[]) {
    const filterSelected = repeatOptions.filter((singleOption) => {
      return singleOption.isSelected;
    });
    if (filterSelected.length === 0) {
      console.warn("No repeat option selected");
      return;
    }
    const optionName = filterSelected[0].name;
    const copyHabitItem = { ...habitItem };
    copyHabitItem.frequency[0].type = optionName;
    setHabitItem(copyHabitItem);
  }

  function onChangeDaysOption(allDays: DaysOption[]) {
    const selectDays = allDays
      .filter((singleDay) => singleDay.isSelected)
      .map((day) => day.name);
    const copyHabitItem = { ...habitItem };
    copyHabitItem.frequency[0].days = selectDays;
    setHabitItem(copyHabitItem);
  }

  function updateReminderTime(time: string) {
    const copyHabit = { ...habitItem };
    copyHabit.notification = time;
    setHabitItem(copyHabit);
  }

  function getSelectedItem(selectedArea: AreaType) {
    const copyHabit = { ...habitItem };
    copyHabit.area = [selectedArea];
    setHabitItem(copyHabit);
  }

  return (
    <div className="top-[3%] left-1/2  transform -translate-x-1/2 w-[60%] z-50 p-10 rounded-md shadow-xl absolute bg-white">
      <IconWindow
        openIconWindow={openIconWindow}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
        setIsIconSelected={setIsIconSelected}
      />
      <HeaderMemo onClose={onClose} />
      <InputMemo
        onUpdateHabit={onUpdateHabit}
        habitName={habitItem.name}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
      />
      <Repeat
        onChangeOption={changeRepeatOption}
        onChangeDaysOption={onChangeDaysOption}
        habitItem={habitItem}
        setHabitItem={setHabitItem}
      />
      <HabitWindowArea onChange={getSelectedItem} />
      <SaveButton habit={habitItem} />
    </div>
  );
}

function Header({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-xl">Add Habit</span>
      <IoMdClose onClick={onClose} className="cursor-pointer" />
    </div>
  );
}

function InputsAndIcon({
  onUpdateHabit,
  habitName,
  setOpenIconWindow,
  iconSelected,
}: InputsAndIconProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function updateHabit(e: React.ChangeEvent<HTMLInputElement>) {
    onUpdateHabit(e.target.value);
  }

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="opacity-80 font-semibold">Habit Name</span>
      <div className="flex gap-4 justify-between items-center">
        <input
          ref={inputRef}
          value={habitName}
          onChange={updateHabit}
          className="border w-full border-gray-200 outline-none p-4 rounded-md text-[13px]"
          placeholder="Enter habit..."
        />
        <FontAwesomeIcon
          icon={iconSelected}
          onClick={() => setOpenIconWindow(true)}
          height={30}
          width={30}
          className="border border-gray-400  rounded-md cursor-pointer p-4"
        />
      </div>
    </div>
  );
}

function SaveButton({ habit }: { habit: Habit }) {
  const { allHabitObject } = useGlobalProvide();
  const { allHabit, setAllHabit } = allHabitObject;

  function checkNewHabit() {
    if (habit.name.trim() === "") {
      return toast.error("Habit is empty");
    }
    const habitExist = allHabit.some(
      (singleHabit) => singleHabit.name === habit.name
    );
    if (!habitExist) {
      addNewHabit({ allHabit, setAllHabit, newHabit: habit });
    } else {
      return toast.error("Habit is still empty");
    }
    console.log("Total Habit : ", allHabit);
  }

  return (
    <div className="w-full flex justify-center mt-9">
      <button
        className="p-2 w-[20%] rounded-md bg-blue-500 text-white transition-all hover:bg-blue-600 hover:w-[100%]"
        onClick={checkNewHabit}
      >
        Add
      </button>
    </div>
  );
}

function Repeat({
  onChangeOption,
  onChangeDaysOption,
  habitItem,
  setHabitItem,
}: {
  onChangeOption: (repeatOptions: RepeatOption[]) => void;
  onChangeDaysOption: (allDays: DaysOption[]) => void;
  habitItem: Habit;
  setHabitItem: React.Dispatch<SetStateAction<Habit>>;
}) {
  const [repeatOptions, setRepeatOptions] = useState([
    { name: "Daily", isSelected: false },
    { name: "Weekly", isSelected: false },
    { name: "Monthly", isSelected: false },
  ]);

  const days: DaysOption[] = [
    { id: 1, name: "Ma", isSelected: false },
    { id: 2, name: "Tu", isSelected: false },
    { id: 3, name: "We", isSelected: false },
    { id: 4, name: "Th", isSelected: false },
    { id: 5, name: "Fr", isSelected: false },
    { id: 6, name: "Sa", isSelected: false },
    { id: 7, name: "Su", isSelected: false },
  ];

  const [allDays, setAllDays] = useState<DaysOption[]>(days);

  function changeOptions(indexClicked: number) {
    const updateOptions = repeatOptions.map((singleOption, index) => ({
      ...singleOption,
      isSelected: index === indexClicked ? true : false,
    }));
    setRepeatOptions(updateOptions);
    onChangeOption(updateOptions);
  }

  useEffect(() => {
    onChangeDaysOption(allDays);
  }, [allDays]);

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="font-semibold text-[17px]">Repeat</span>
      <div className="flex gap-2 mt-2 items-center">
        {repeatOptions.map((singleOption, index) => {
          return (
            <button
              key={index}
              onClick={() => changeOptions(index)}
              className={`p-2 px-3 rounded-md border cursor-pointer text-black border-gray-300 
                hover:bg-blue-100 hover:text-blue-500 
                ${
                  singleOption.isSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:text-blue-500"
                }`}
            >
              {singleOption.name}
            </button>
          );
        })}
      </div>
      <DailyOption allDays={allDays} setAllDays={setAllDays} />
      <Reminder habitItem={habitItem} setHabitItem={setHabitItem} />
    </div>
  );
}

function DailyOption({
  allDays,
  setAllDays,
}: {
  allDays: DaysOption[];
  setAllDays: React.Dispatch<React.SetStateAction<DaysOption[]>>;
}) {
  function selectedDay(singleDayIndex: number) {
    const selectedCount: number = allDays.filter(
      (singleDay) => singleDay.isSelected
    ).length;

    const updateAllDays = allDays.map((singleDay, index) => {
      if (
        selectedCount == 1 &&
        singleDay.isSelected === true &&
        index === singleDayIndex
      ) {
        return singleDay;
      }
      return index === singleDayIndex
        ? { ...singleDay, isSelected: !singleDay.isSelected }
        : singleDay;
    });
    setAllDays(updateAllDays);
  }

  useEffect(() => {
    const updateSelectDay = allDays.map((singleDay) => {
      return { ...singleDay, isSelected: false };
    });
    updateSelectDay[0].isSelected = true;
    setAllDays(updateSelectDay);
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-4">
      <span className="font-medium opacity-85">On these days</span>
      <div className="flex gap-3 w-full">
        {allDays.map((singleDays, singleDayIndex) => {
          return (
            <span
              onClick={() => selectedDay(singleDayIndex)}
              key={singleDayIndex}
              className={`p-2 px-3 rounded-md select-none cursor-pointer border 
                transition-all duration-300 
                ${
                  singleDays.isSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:text-blue-500"
                }`}
            >
              {singleDays.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Reminder({
  habitItem,
  setHabitItem,
}: {
  habitItem: Habit;
  setHabitItem: React.Dispatch<SetStateAction<Habit>>;
}) {
  const [openTimeClicker, setOpenTimeClicker] = useState(false);
  const [isOn, setIsOn] = useState(false);

  function updateToggle() {
    setIsOn((prev) => !prev);
  }

  function handleOpenTimeClicker() {
    setOpenTimeClicker(true);
  }

  function handleCloseTimeClicker() {
    setOpenTimeClicker(false);
  }

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-[17px]">Daily Notification</span>
        <div
          onClick={updateToggle}
          className={`w-16 h-[30px] rounded-full flex items-center px-1 cursor-pointer transition-colors ${
            isOn ? "bg-blue-500" : "bg-slate-400"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
              isOn ? "translate-x-8" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
      {isOn && (
        <div className="flex justify-between p-4 m-2 mt-8 rounded-md bg-slate-200">
          <span>Select Time</span>
          <div
            className="flex gap-2 items-center cursor-pointer select-none"
            onClick={handleOpenTimeClicker}
          >
            <span>{habitItem.notification}</span>
            <FontAwesomeIcon height={12} width={12} icon={faChevronDown} />
          </div>
        </div>
      )}
      {openTimeClicker && (
        <TimePicker
          onClose={handleCloseTimeClicker}
          habitItem={habitItem}
          setHabitItem={setHabitItem}
        />
      )}
    </div>
  );
}
