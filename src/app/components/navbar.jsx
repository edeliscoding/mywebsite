// "use client";

// import { AuthContext } from "@/context/AuthContext";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter, redirect } from "next/navigation";
// import {
//   useCallback,
//   useContext,
//   useEffect,
//   useReducer,
//   useRef,
//   useState,
// } from "react";
// import { toast } from "react-toastify";
// import { usePathname } from "next/navigation";
// // import { INITIAL_STATE, profileReducer } from "@/reducers/profileReducer";
// import { INITIAL_STATE, AuthReducer } from "@/reducers/authReducer";

// export default function Navbar() {
//   // const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   // const memoizedFunction = useCallback(() => {
//   //   const { user, loading, error } = useContext(AuthContext);
//   // }, [user]);
//   const { user, loading, error } = useContext(AuthContext);
//   const [open, setOpen] = useState(false);
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
//       href: "/addprofile",
//     },
//     {
//       id: 3,
//       name: "Dashboard",
//       href: "/dashboard",
//     },
//     // {
//     //   id: 4,
//     //   name: "Sign Out",
//     //   href: "/signout",
//     // },
//   ];

//   const handleLogin = async () => {
//     router.push("/login");
//   };
//   const handleLogout = async () => {
//     try {
//       const res = await axios.post("/api/auth/logout");
//       localStorage.setItem("currentuser", null);
//       // if (res.status === "200") {
//       dispatch({ type: "LOGOUT" });
//       //   router.refresh();
//       // }

//       // router.refresh();
//       // <Toaster position="top-center" reverseOrder={false} />;
//       // toast("Logout Successful");

//       router.push("/login");
//       router.refresh();
//       // redirect("/login");
//     } catch (error) {}
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const pathname = usePathname();
//   console.log(pathname);

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside, true);
//     return () => {
//       document.removeEventListener("click", handleClickOutside, true);
//     };
//   }, []);

//   const ref = useRef(null);

//   const handleClickOutside = (e) => {
//     if (ref.current && !ref.current.contains(e.target)) {
//       setOpen(false);
//     }
//   };
//   console.log("From Navbar", user);
//   return (
//     <div className="bg-gray-200 text-white p-4 mb-4 w-full">
//       <div className="container mx-auto flex justify-between items-center w-full">
//         <Link href="/">
//           <h1 className="text-gray-800 font-extrabold hidden md:block ">
//             Edel Profile Form Project
//           </h1>
//         </Link>
//         <div className="flex gap-4 text-gray-800 items-center">
//           <button className="p-2 text-orange border border-slate-300">
//             <Link href="/">Home</Link>
//           </button>
//           <button className="p-2 text-orange border border-slate-300">
//             <Link href="/addprofile">Add Profile</Link>
//           </button>
//           <button className="p-2 text-orange border border-slate-300">
//             <Link href="/dashboard">Dashboard</Link>
//           </button>
//           {/* {navLinks.map((navlink) => {
//             return (
//               <Link
//                 className="font-semibold"
//                 key={navlink.id}
//                 href={navlink.href}
//               >
//                 {navlink.name}
//               </Link>
//             );
//           })} */}
//           {user && (
//             <div
//               className="flex gap-2 items-center relative"
//               onClick={handleOpen}
//             >
//               {/* <button
//                 className="p-2 text-orange border border-slate-300"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button> */}
//               <img
//                 className="h-8 w-8 rounded-full bg-slate-800 ring-2"
//                 src="/blankprofile.png"
//               />
//               <span>{user.username}</span>
//               {open && (
//                 <div
//                   className="w-[130px] absolute p-3  top-10 border-2 border-sky-500 text-white text-6lg bg-gray-500  flex flex-col"
//                   ref={ref}
//                 >
//                   <button
//                     className="text-left mb-2 hover:bg-blue-500"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                   {/* <Link
//                     className="text-left mb-2 hover:bg-blue-500"
//                     href={`/editdashboard/${state._id}`}
//                   >
//                     Edit Profile
//                   </Link> */}
//                 </div>
//               )}
//             </div>
//           )}
//           {!user && (
//             <button
//               className="p-2 text-orange border border-slate-300"
//               onClick={handleLogin}
//             >
//               Sign In
//             </button>
//           )}
//           {/* {pathname === "/dashboard" ? (
//             <Link href={`/editdashboard/${state._id}`}>Edit Dashboard</Link>
//           ) : null} */}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { AuthContext } from "@/context/AuthContext";
import { AuthReducer, INITIAL_STATE } from "@/reducers/authReducer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useReducer, useRef, useState } from "react";

export default function Navbar() {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const { user, handleLogout } = useContext(AuthContext);
  // const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const navLinks = [
    // ...
  ];

  const handleLogin = () => {
    router.push("/login");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const pathname = useRouter().pathname;

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    // Update the UI when the user value changes
    console.log("User updated:", user);
  }, [user]);

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
          <h1 className="text-gray-800 font-extrabold hidden md:block">
            Edel Profile Form Project
          </h1>
        </Link>
        <div className="flex gap-4 text-gray-800 items-center">
          <button className="p-2 text-orange border border-slate-300">
            <Link href="/">Home</Link>
          </button>
          {/* <button className="p-2 text-orange border border-slate-300">
            <Link href="/addprofile">Add Profile</Link>
          </button> */}
          <button className="p-2 text-orange border border-slate-300">
            <Link href="/dashboard">Dashboard</Link>
          </button>
          {user ? (
            // <button
            //   className="text-left mb-2 hover:bg-blue-500"
            //   onClick={handleLogout}
            // >
            //   Logout
            // </button>
            <div
              className="flex gap-2 items-center relative"
              onClick={handleOpen}
            >
              <img
                className="h-8 w-8 rounded-full bg-slate-800 ring-2"
                src="/blankprofile.png"
              />
              <span>{user.username}</span>
              {open && (
                <div
                  className="w-[130px] absolute p-3  top-10 border-2 border-sky-500 text-white text-6lg bg-gray-500  flex flex-col"
                  ref={ref}
                >
                  <button
                    className="text-left mb-2 hover:bg-blue-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  {/* <Link
                    className="text-left mb-2 hover:bg-blue-500"
                    href={`/editdashboard/${state._id}`}
                  >
                    Edit Profile
                  </Link> */}
                </div>
              )}
            </div>
          ) : (
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
