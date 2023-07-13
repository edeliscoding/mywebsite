"use client";

import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/navigation";
import { toast } from "react-toastify";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React from "react";

// const Navbar = () => {
//   const router = useRouter();

//   const navLinks = [
//     {
//       id: 1,
//       name: "Home",
//       href: "/",
//     },

//     {
//       id: 2,
//       name: "Add",
//       href: "/myfiles",
//     },
//     {
//       id: 3,
//       name: "Dashboard",
//       href: "/dashboard",
//     },
//     {
//       id: 4,
//       name: "My Uploads",
//       href: "/myuploads",
//     },
//   ];

//   // const pathname = usePathname();
//   // console.log(pathname);

//   return (
//     <div className="w-full bg-slate-800 p-6 h-20">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {navLinks.map((navlink) => {
//           return <p className="text-white">{navlink.id}</p>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
export default function Navbar() {
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
          <button
            className="p-2 text-orange border border-slate-300"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="p-2 text-orange border border-slate-300"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
