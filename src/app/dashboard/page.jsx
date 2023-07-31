"use client";
import { INITIAL_STATE, profileReducer } from "@/reducers/profileReducer";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState, useReducer, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  // const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);
  const { user, loading, error } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/users");
      console.log(res.data);
      // setData(res.data.data);
      dispatch({ type: "GET_PROFILE", payload: res.data.data[0] });
    };
    getData();
  }, []);

  useEffect(() => {
    user === null ? router.push("/login") : router.push("/dashboard");
  }, [user]);

  // console.log("from useEffect", res.data);
  // const content = JSON.stringify(data);
  // const { title, avatar, aboutMe } = data;
  // const { workHistory, images, socialMedia, avatar } = data;
  // console.log("from dashboard", workHistory);
  const start = moment("2018-07-01T00:00:00.000Z").utc().format("MM/DD/YYYY");

  const dateConverted = (dateHere) => {
    return moment(dateHere).utc().format("MM/DD/YYYY");
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7 lg:pl-6">
          <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {state.title}
          </h1>
          <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {state.aboutMe}
          </p>
          <a
            href={`mailto:${state.email}`}
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Email Me
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href={`mailto:${state.email}`}
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            My Email
          </a>
          <Link
            className="inline-block ml-2 border border-zinc-500 p-2 rounded-lg hover:bg-gray-500"
            href={`/editdashboard/${state._id}`}
          >
            Edit this Page
          </Link>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex lg:justify-end pr-6">
          <img src={state.avatar} alt="mockup" />
        </div>
      </div>
      <div className="flex bg-slate-700 p-6 justify-around items-center gap-3">
        {state.skills.map((skill, index) => {
          return (
            <p className="text-2xl" key={skill}>
              {skill}
            </p>
          );
        })}
      </div>
      <h2 className="text-center text-3xl text-white font-extrabold mt-12">
        Work History
      </h2>
      <div className="cards mt-12 grid lg:grid-cols-3 gap-4 px-4">
        {state?.workHistory.map((work) => {
          return (
            <div
              class="max-w-sm h-[350px] flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={work}
            >
              <div class="p-2">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {work.workTitle}
                  </h5>
                </a>
              </div>
              <div className="p-2 flex-1">
                <p class="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  {work.jobDuty.substring(0, 370)}
                </p>
              </div>
              <div className="p-2 flex items-center">
                <span className="p-2 text-gray-500">
                  {dateConverted(work.startDate)}
                </span>
                -
                <span className="p-2 text-gray-500">
                  {dateConverted(work.endDate)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </div>
      <div className="p-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </div>
    </div>
  );
}
