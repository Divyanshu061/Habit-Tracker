"use client";
import { useAuth } from "@clerk/nextjs";
import logo from "/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaListUl } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { IoLayers } from "react-icons/io5";

export default function Sidebar() {
  const { userId, signOut } = useAuth();
  const handleLogout = () => {
    signOut(); // Sign out user
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 border-r-2 flex flex-col justify-between p-10">
      {/* Logo */}
      <div className="flex justify-center mt-2">
        <Image src={logo} alt="logo" width={200} />
      </div>
      <nav className="flex flex-col gap-6 items-center justify-center flex-grow mb-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-500"
        >
          <FaListUl size={14} />
          All Habit
        </Link>
        <Link
          href="/statistics-all"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-500"
        >
          <IoIosStats />
          Statistics
        </Link>
        <Link
          href="/area"
          className="flex items-center gap-2 text-lg text-gray-700 hover:text-blue-500 pr-6"
        >
          <IoLayers />
          Area
        </Link>
      </nav>
      <div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700 transition duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
