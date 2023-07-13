// "use client";

// import React, { useReducer, useState } from "react";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import { INITIAL_STATE, profileReducer } from "@/reducers/profileReducer";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import upload from "../helpers/upload";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function EditProfile() {
//   const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

//   const [singleFile, setSingleFile] = useState(undefined);
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const router = useRouter();
//   // const dispatch = useDispatch();

//   const handleChange = (e) => {
//     dispatch({
//       type: "CHANGE_INPUT",
//       payload: { name: e.target.name, value: e.target.value },
//     });
//   };

//   const handleSocial = (e) => {
//     dispatch({
//       type: "CHANGE_SOCIAL",
//       payload: { name: e.target.name, value: e.target.value },
//     });
//   };
//   const handleSkill = (e) => {
//     const val = e.target[0].value;
//     console.log("val", val);
//     e.preventDefault();
//     dispatch({
//       type: "ADD_SKILL",
//       payload: e.target[0].value,
//     });
//     e.target[0].value = "";
//   };

//   const handleUpload = async () => {
//     setUploading(true);
//     try {
//       const avatar = await upload(singleFile);
//       const images = await Promise.all(
//         [...files].map(async (file) => {
//           const url = await upload(file);
//           return url;
//         })
//       );
//       setUploading(false);
//       dispatch({ type: "ADD_IMAGES", payload: { avatar, images } });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     mutation.mutate(state);
//     router.push("/dashboard");
//     // router.push("/");
//   };

//   console.log(state);

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (profile) => {
//       return axios.post("/api/users", profile);
//     },
//     onSuccess: () => {
//       // queryClient.invalidateQueries(["myGigs"]);
//     },
//   });

//   return (
//     <div className="max-w-5xl mx-auto items-center bg-white p-4">
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-12">
//           <div className="border-b border-gray-900/10 pb-12">
//             <h2 className="text-base font-semibold leading-7 text-gray-900">
//               Profile
//             </h2>
//             <p className="mt-1 text-sm leading-6 text-gray-600">
//               This information will be displayed publicly so be careful what you
//               share.
//             </p>

//             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//               <div className="sm:col-span-4">
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Title
//                 </label>
//                 <div className="mt-2">
//                   <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                     {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
//                     <input
//                       onChange={handleChange}
//                       type="text"
//                       name="title"
//                       id="title"
//                       autoComplete="title"
//                       className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                       placeholder="Content Creator"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="col-span-full">
//                 <label
//                   htmlFor="about"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   About Me
//                 </label>
//                 <div className="mt-2">
//                   <textarea
//                     onChange={handleChange}
//                     id="about"
//                     name="aboutMe"
//                     rows={3}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     defaultValue={""}
//                   />
//                 </div>
//                 <p className="mt-3 text-sm leading-6 text-gray-600">
//                   Write a few sentences about yourself.
//                 </p>
//               </div>
//               <div className="flex">
//                 <div className="w-1/2">
//                   <label
//                     htmlFor="photo"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Profile Avatar
//                   </label>
//                   <div className="mt-2 flex items-center gap-x-3">
//                     <UserCircleIcon
//                       className="h-12 w-12 text-gray-300"
//                       aria-hidden="true"
//                     />
//                     {/* <button
//                     type="button"
//                     className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                   >
//                     Change
//                   </button> */}
//                     <input
//                       type="file"
//                       onChange={(e) => setSingleFile(e.target.files[0])}
//                     />
//                   </div>
//                 </div>
//                 <div className="w-1/2">
//                   <label
//                     htmlFor="photo"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Images
//                   </label>
//                   <div className="mt-2 flex items-center gap-x-3">
//                     <UserCircleIcon
//                       className="h-12 w-12 text-gray-300"
//                       aria-hidden="true"
//                     />
//                     <input
//                       type="file"
//                       multiple
//                       onChange={(e) => setFiles(e.target.files)}
//                     ></input>
//                   </div>

//                  {/* both uploads */}
//                  <button
//                   className="bg-gray-800 text-white p-2"
//                   onClick={handleUpload}
//                  >
//                   {uploading ? "uploading" : "Upload"}
//                  </button>
//                  </div>
//                  {/* end of Upload button */}

//                  <div className="col-span-full">
//                  <div className="w-1/2">
//               <label>
//                   FaceBook
//                   </label>

//                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
//                   <input
//                     onChange={handleSocial}
//                     type="text"
//                     name="facebook"
//                     id="title"
//                     autoComplete="title"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Content Creator"
//                     />
//                   </div>
//                </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Instagram
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
//                   <input
//                     onChange={handleSocial}
//                     type="text"
//                     name="instagram"
//                     id="title"
//                     autoComplete="title"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Content Creator"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Youtube
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
//                   <input
//                     onChange={handleSocial}
//                     type="text"
//                     name="youtube"
//                     id="title"
//                     autoComplete="title"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Content Creator"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Twitter
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
//                   <input
//                     onChange={handleSocial}
//                     type="text"
//                     name="twitter"
//                     id="title"
//                     autoComplete="title"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Content Creator"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-4 col-span-full">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Website
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
//                   <input
//                     onChange={handleChange}
//                     type="text"
//                     name="website"
//                     id="title"
//                     autoComplete="title"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Content Creator"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <label className="text-gray-900" htmlFor="">
//                 Add Features
//               </label>
//               <form
//                 action=""
//                 className="add text-gray-900"
//                 onSubmit={handleSkill}
//               >
//                 <input
//                   className="p-3"
//                   type="text"
//                   placeholder="e.g. page design"
//                 />
//                 <button className="bg-gray-800 text-white p-2" type="submit">
//                   add
//                 </button>
//               </form>
//               <div className="addedFeatures">
//                 {state?.skills?.map((skill) => (
//                   <div className="item" key={skill}>
//                     <button
//                       onClick={() =>
//                         dispatch({ type: "REMOVE_FEATURE", payload: skill })
//                       }
//                     >
//                       {skill}
//                       <span>X</span>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* <div className="sm:col-span-4 col-span-full">
//                 <label className="bg-gray-800 p-1" htmlFor="skills">
//                   Skills
//                 </label>
//                 <form action="" className="flex gap-2" onSubmit={handleSkill}>
//                   <input
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     type="text"
//                     placeholder="e.g. page design"
//                     name="skills"
//                     id="skills"
//                   />
//                   <button
//                     className="text-white bg-gray-800 py-1 px-2"
//                     type="submit"
//                   >
//                     Add
//                   </button>
//                 </form>
//                  <div className="addedFeatures">
//                   {state.skills.map((skill) => (
//                     <div className="item bg-gray-800 text-white" key={skill}>
//                       <button
//                         className="bg-red text-white"
//                         onClick={() =>
//                           dispatch({ type: "REMOVE_SKILL", payload: skill })
//                         }
//                       >
//                         {skill}
//                         <span>X</span>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>   */}
//           </div>
//         </div>

//         <div className="mt-6 flex items-center justify-end gap-x-6">
//           {/* <button
//             type="button"
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             Cancel
//           </button> */}
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Create
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
