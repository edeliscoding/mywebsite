"use client";

import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/navigation";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { INITIAL_STATE, profileReducer } from "@/reducers/profileReducer";

export default function Navbar() {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);
  const { user, loading, error } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
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
      router.refresh();
      dispatch({ type: "LOGOUT" });
      // router.refresh();
      // <Toaster position="top-center" reverseOrder={false} />;
      // toast("Logout Successful");
      router.push("/login");
    } catch (error) {}
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
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
          <button className="p-2 text-orange border border-slate-300">
            <Link href="/">Home</Link>
          </button>
          <button className="p-2 text-orange border border-slate-300">
            <Link href="/addprofile">Add Profile</Link>
          </button>
          <button className="p-2 text-orange border border-slate-300">
            <Link href="/dashboard">Dashboard</Link>
          </button>
          {/* {navLinks.map((navlink) => {
            return (
              <Link
                className="font-semibold"
                key={navlink.id}
                href={navlink.href}
              >
                {navlink.name}
              </Link>
            );
          })} */}
          {user && (
            <div
              className="flex gap-2 items-center relative"
              onClick={handleOpen}
            >
              {/* <button
                className="p-2 text-orange border border-slate-300"
                onClick={handleLogout}
              >
                Logout
              </button> */}
              <img
                className="h-8 w-8 rounded-full bg-slate-800 ring-2"
                src="/blankprofile.png"
              />
              <span>{user.username}</span>
              {open && (
                <div
                  className="absolute p-3 top-10 border-2 border-sky-500 text-white text-6lg bg-gray-500"
                  ref={ref}
                >
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
          {!user && (
            <button
              className="p-2 text-orange border border-slate-300"
              onClick={handleLogin}
            >
              Sign In
            </button>
          )}
          {/* {pathname === "/dashboard" ? (
            <Link href={`/editdashboard/${state._id}`}>Edit Dashboard</Link>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}
