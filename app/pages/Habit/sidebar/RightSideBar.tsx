"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Statistics from "./Statistics";

export default function RightSideBar() {
  return (
    <div className="fixed right-0 top-0 w-[18%] h-screen bg-white flex flex-col items-center">
      <UserProfile />
      <Statistics />
    </div>
  );
}

function UserProfile() {
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-9">
      <UserButton />
      <div>{user ? <span>{user?.fullName}</span> : <span>Not found</span>}</div>
    </div>
  );
}
