"use client";
import { useGlobalProvide } from "@/app/Context";
import { Habit } from "@/app/pages/Habit/HabitWindow";
import { getCurrDayName } from "@/app/utils/dateFunction";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBorderAll,
  faChartSimple,
  faCheck,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { count } from "console";
import { useEffect, useState } from "react";

type StatisticsCard = {
  id: number;
  icon: IconProp;
  counter: number;
  text: string;
};

export default function StatisticsBoard() {
  const { allHabitObject } = useGlobalProvide();
  const { allHabit } = allHabitObject;
  const [statisticsCard, setStatisticsCard] = useState<StatisticsCard[]>([
    { id: 1, icon: faFaceSmile, counter: 5, text: "Total Habit" },
    { id: 2, icon: faBorderAll, counter: 3, text: "Total Perfect Day" },
    { id: 3, icon: faChartSimple, counter: 5, text: "Average per day" },
    { id: 4, icon: faCheck, counter: 13, text: "Best Streak" },
  ]);

  useEffect(() => {
    const dateCount: { [key: string]: number } = {};
    allHabit.forEach((habit) => {
      habit.completedDays.forEach((day) => {
        const date = day.date;
        if (date) {
          dateCount[date] = (dateCount[date] || 0) + 1;
        }
      });
    });

    let perfectCount = 0;
    const totalHabitEachDay: { [key: string]: number } = {};
    const uniqueDate = Object.keys(dateCount);

    uniqueDate.forEach((date) => {
      console.log("Processing date:", date);
      const getTwoLetter = getCurrDayName(date)?.slice(0, 2) || "";
      const numberOfHabitEachDay = allHabit.filter((singleHabit) =>
        singleHabit.frequency[0].days.some((day) => day === getTwoLetter)
      );
      totalHabitEachDay[date] = numberOfHabitEachDay.length;
    });

    for (const date in totalHabitEachDay) {
      if (totalHabitEachDay[date] === dateCount[date]) {
        perfectCount++;
      }
    }

    const totalCompleteDay = Object.values(dateCount).reduce(
      (total, count) => total + count,
      0
    );
    const avg = (totalCompleteDay / uniqueDate.length).toFixed(2);

    const copyCard = [...statisticsCard];
    copyCard[0].counter = allHabit.length;
    copyCard[1].counter = perfectCount;
    copyCard[2].counter = parseFloat(avg);

    setStatisticsCard(copyCard);
  }, [allHabit]);

  return (
    <div className="p-5 mt-4 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statisticsCard.map((card) => (
        <div
          key={card.id}
          className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex  items-center space-x-4">
            <div className="text-xl text-indigo-600">
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div>
              <div className="font-bold text-xl">{card.counter}</div>
              <div className="text-gray-500 text-sm">{card.text}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
