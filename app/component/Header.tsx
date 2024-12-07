"use client";

import Image from "next/image";
import logo from "/public/images/logo.png";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { userId } = useAuth();
  return (
    <header className="p-4">
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="mt-2">
          <Image src={logo} alt="logo" width={150} />
        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex gap-4">
            {userId ? (
              <li>
                <Link
                  href="/dashboard"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <a
                    href="/sign-up"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
                  >
                    Sign Up
                  </a>
                </li>
                <li>
                  <a
                    href="/sign-in"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
                  >
                    Sign In
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
