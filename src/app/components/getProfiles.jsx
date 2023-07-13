// "use client";
// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import useSWR from "swr";

// export default function getProfiles() {
//   const fetcher = (...args) => fetch(...args).then((res) => res.json());
//   const { data, error, isLoading } = useSWR(
//     "http://localhost:3000/api/profile",
//     fetcher
//   );
//   console.log("From component data", data);
//   return <div>This is from getProfile Component</div>;
// }
