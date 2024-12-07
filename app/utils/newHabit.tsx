import React from "react";
import { Habit } from "../pages/Habit/HabitWindow";
import toast from "react-hot-toast";

export default function addNewHabit({
  allHabit,
  setAllHabit,
  newHabit,
}: {
  allHabit: Habit[];
  setAllHabit: React.Dispatch<React.SetStateAction<Habit[]>>;
  newHabit: Habit;
}) {
  try {
    setAllHabit([...allHabit, newHabit]);
    toast.success("Habit successfully created");
  } catch (e: any) {
    toast.error(e);
  }
}
