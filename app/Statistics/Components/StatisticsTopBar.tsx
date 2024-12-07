import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatisticsBoard from "./StatisticsBoard";

export default function StatisticsTopBar() {
  return (
    <div className="p-6 rounded-md flex flex-col justify-between items-center transition-all">
      <div className="">
        <span className="text-xl font-bold">Statistics</span>
        <FontAwesomeIcon
          icon={faBars}
          className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
        />
      </div>
      <StatisticsBoard />
    </div>
  );
}
