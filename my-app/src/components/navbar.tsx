"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authToken = Cookies.get("Authorization");
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="navbar bg-gradient-to-r from-blue-500 to-purple-600 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link href={"/"} passHref>
          <h1 className="text-2xl font-bold text-white cursor-pointer">Clone Cold Steel</h1>
        </Link>
        <div className="hidden lg:flex space-x-4 ml-8">
          <Link href={"/products"} className="text-white hover:text-gray-200 transition duration-300">Product</Link>
          {isLoggedIn && <Link href={"/wishlist"} className="text-white hover:text-gray-200 transition duration-300">Wishlist</Link>}
        </div>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? 
          <LogoutButton /> : 
          <Link href={"/login"} className="text-white text-lg font-semibold border border-white rounded-md py-2 px-6 hover:bg-white hover:text-blue-500 transition duration-300">Login</Link>
        }
      </div>
    </div>
  );  
}
