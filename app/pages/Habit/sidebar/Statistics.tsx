import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function Statistics() {
  const statisticInfo = [
    { id: 1, num: 7, subTitle: "Best streaks" },
    { id: 2, num: 10, subTitle: "Perfect Days" },
  ];

  return (
    <div className="flex flex-col mx-4 gap-6 justify-center mt-20 rounded-xl p-4  bg-slate-100">
      <span className="text-xl cursor-pointer hover:text-gray-500">
        Statistics
      </span>
      <div className=" relative pt-3">
        <ProgressBar progress={80} />
        <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-bold text-xl">80%</span>
          <span className="text-[11px]">Today's Work</span>
        </div>
      </div>
      <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
        {statisticInfo.map((item, index) => {
          return (
            <div className="flex items-center gap-3" key={index}>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="text-[12px]">
                <span className="flex flex-col font-bold">{item.num}</span>
                <span className="text-gray-500">{item.subTitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const data = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const color = ["#71bbf5", "#ff4343"];

  return (
    <>
      <PieChart
        width={200}
        height={160}
        margin={{ top: -20, right: 0, bottom: 40, left: 0 }}
      >
        <Pie
          data={data}
          dataKey="value"
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={-180}
          innerRadius={66}
          outerRadius={progress === 100 ? 80 : 78}
          paddingAngle={0}
          fill="#8884d8"
        >
          {data.map((entry, index) => {
            return (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            );
          })}
        </Pie>
      </PieChart>
    </>
  );
};
