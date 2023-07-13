"use client";

import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const navLinks = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },

    {
      id: 2,
      name: "Add",
      href: "/addprofile",
    },
    {
      id: 3,
      name: "Dashboard",
      href: "/dashboard",
    },
    // {
    //   id: 4,
    //   name: "Sign Out",
    //   href: "/signout",
    // },
  ];

  const handleLogin = async () => {
    router.push("/login");
  };
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      dispatch({ type: "LOGOUT" });
      // <Toaster position="top-center" reverseOrder={false} />;
      // toast("Logout Successful");
      router.push("/login");
    } catch (error) {}
  };

  return (
    <div className="bg-gray-200 text-white p-4 mb-4 w-full">
      <div className="container mx-auto flex justify-between items-center w-full">
        <Link href="/">
          <h1 className="text-gray-800 font-extrabold hidden md:block ">
            Edel Profile Form Project
          </h1>
        </Link>
        <div className="flex gap-4 text-gray-800 items-center">
          {navLinks.map((navlink) => {
            return (
              <Link
                className="font-semibold"
                key={navlink.id}
                href={navlink.href}
              >
                {navlink.name}
              </Link>
            );
          })}
          {user && (
            <>
              <button
                className="p-2 text-orange border border-slate-300"
                onClick={handleLogout}
              >
                Logout
              </button>
              <img
                className="h-8 w-8 rounded-full bg-slate-800 ring-2"
                src="/blankprofile.png"
              />
              <span>{user.username}</span>
            </>
          )}
          {!user && (
            <button
              className="p-2 text-orange border border-slate-300"
              onClick={handleLogin}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
