import Sidebar from "../component/Sidebar";
import AllAreaContainer from "./components/AllAreaContainer";
import AllAreaTopBar from "./components/AllAreaTopBar";

export default function () {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-100 w-full ml-64">
        <AllAreaTopBar />
        <AllAreaContainer />
      </div>
    </div>
  );
}
