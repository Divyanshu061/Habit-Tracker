"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, {
  Dispatch,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import {
  faUser,
  faGraduationCap,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { Habit } from "./pages/Habit/HabitWindow";
import { textToIcon } from "./pages/Habit/Icons/IconData";
import { getDateString } from "./utils/dateFunction";
import { v4 as uuid } from "uuid";

export type AreaType = {
  id: string;
  icon: IconProp;
  name: string;
};

const GlobalContext = createContext<GlobalContextType>({
  allAreaObject: {
    allArea: [],
    setAllArea: () => {},
  },
  allHabitObject: {
    allHabit: [],
    setAllHabit: () => {},
  },
  selectCurrDayObj: {
    selectCurrDate: "",
    setSelectCurrDate: () => {},
  },
  offSetDayObj: {
    offsetDay: 0,
    setOffsetDay: () => {},
  },
  allFilterObj: {
    allFilterHabit: [],
    setAllFilterHabit: () => {},
  },
  selectedAreaStringObj: {
    selectedAreaString: "",
    setSelectedAreaString: () => {},
  },
  addNewArea: () => {},
});

type GlobalContextType = {
  allAreaObject: {
    allArea: AreaType[];
    setAllArea: Dispatch<SetStateAction<AreaType[]>>;
  };
  allHabitObject: {
    allHabit: Habit[];
    setAllHabit: Dispatch<SetStateAction<Habit[]>>;
  };
  selectCurrDayObj: {
    selectCurrDate: string;
    setSelectCurrDate: Dispatch<SetStateAction<string>>;
  };
  offSetDayObj: {
    offsetDay: number;
    setOffsetDay: Dispatch<SetStateAction<number>>;
  };
  allFilterObj: {
    allFilterHabit: Habit[];
    setAllFilterHabit: Dispatch<SetStateAction<Habit[]>>;
  };
  selectedAreaStringObj: {
    selectedAreaString: string;
    setSelectedAreaString: Dispatch<SetStateAction<string>>;
  };
  addNewArea: (name: string, icon: IconProp) => void;
};

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [allArea, setAllArea] = useState<AreaType[]>([
    { id: "1", icon: faUser, name: "All" },
    { id: "2", icon: faGraduationCap, name: "Study" },
    { id: "3", icon: faCode, name: "Code" },
  ]);

  const [allHabit, setAllHabit] = useState<Habit[]>([]);
  const [selectCurrDate, setSelectCurrDate] = useState<string>(() => {
    return getDateString(new Date());
  });
  const [selectedAreaString, setSelectedAreaString] = useState<string>("All");
  const [offsetDay, setOffsetDay] = useState(0);
  const [allFilterHabit, setAllFilterHabit] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const allHabitData: Habit[] = [
        {
          _id: uuid(),
          name: "Test",
          icon: textToIcon("faCode") as IconProp,
          frequency: [{ type: "Daily", days: ["M"], number: 1 }],
          notification: "",
          isNotification: false,
          area: [
            { id: uuid(), icon: faCode, name: "Code" },
            { id: uuid(), icon: faGraduationCap, name: "Study" },
          ],
          completedDays: [{ _id: uuid(), date: "03/06/24" }],
        },
      ];
      setTimeout(() => {
        setAllHabit(allHabitData);
      }, 1000);
    };

    fetchData();
  }, []);

  const addNewArea = (name: string, icon: IconProp) => {
    const newArea: AreaType = {
      id: uuid(),
      name,
      icon,
    };
    setAllArea((prev) => [...prev, newArea]);
  };

  return (
    <GlobalContext.Provider
      value={{
        allAreaObject: { allArea, setAllArea },
        allHabitObject: { allHabit, setAllHabit },
        selectCurrDayObj: { selectCurrDate, setSelectCurrDate },
        offSetDayObj: { offsetDay, setOffsetDay },
        allFilterObj: { allFilterHabit, setAllFilterHabit },
        selectedAreaStringObj: { selectedAreaString, setSelectedAreaString },
        addNewArea,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalProvide() {
  return useContext(GlobalContext);
}

export default GlobalContextProvider;
