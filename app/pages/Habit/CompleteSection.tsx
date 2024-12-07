import { useGlobalProvide } from "@/app/Context";
import HabitCart from "./HabitCart";

export default function CompleteSection() {
  const { allFilterObj, selectCurrDayObj } = useGlobalProvide();
  const { allFilterHabit } = allFilterObj;
  const { selectCurrDate } = selectCurrDayObj;

  // Filter completed habits for the current day
  console.log(allFilterHabit);
  const completedHabits = allFilterHabit.filter((habit) =>
    habit.completedDays.some((day) => day.date === selectCurrDate)
  );

  return (
    <div className="bg-white mt-7 p-8 rounded-md">
      <span className="font-bold text-lg mb-2">Completed</span>
      <div className="mt-4 opacity-50">
        {completedHabits.length > 0 ? (
          completedHabits.map((singleHabit, index) => (
            <HabitCart key={index} singleHabit={singleHabit} />
          ))
        ) : (
          <div>No completed habits for today.</div>
        )}
      </div>
    </div>
  );
}
