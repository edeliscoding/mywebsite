"use client";

import React, { useReducer, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { INITIAL_STATE, profileReducer } from "@/reducers/profileReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import upload from "../helpers/upload";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [state, dispatch] = useReducer(profileReducer, INITIAL_STATE);

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSocial = (e) => {
    dispatch({
      type: "CHANGE_SOCIAL",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleSkill = (e) => {
    const val = e.target[0].value;
    console.log("val", val);
    e.preventDefault();
    dispatch({
      type: "ADD_SKILL",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleEmail = (e) => {
    dispatch({
      type: "TOGGLE_EMAIL",
    });
  };
  const handleEmailInput = (e) => {};
  const handleUpload = async () => {
    setUploading(true);
    try {
      const avatar = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { avatar, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = (work) => {
    dispatch({ type: "CLEAR_WORK", payload: work });
  };

  const handleWork = (e, index) => {
    e.preventDefault();
    const newWork = {
      workTitle: "",
      jobDuty: "",
      startDate: "",
      endDate: "",
    };
    dispatch({ type: "ADD_WORK", payload: newWork });
  };

  // chat gpt
  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_WORK",
      payload: {
        index,
        work: { ...state.workHistory[index], [name]: value },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("From Handle Submit", state);
    mutation.mutate(state);
    router.push("/dashboard");
    // router.push("/");
  };

  console.log(state);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (profile) => {
      return axios.post("/api/users", profile);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(["myGigs"]);
    },
  });

  return (
    <div className="bg-gray-800">
      <div className="container max-w-6xl mx-auto">
        {/* <Navbar /> */}
        <div className="sections flex gap-8">
          <div className="info w-1/2 flex flex-col">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={state.title}
              className="p-2 text-gray-900 rounded-md mb-3"
              name="title"
              placeholder="e.g. I will do something Im really good at"
              onChange={handleChange}
            />
            <label className="mt-2 rounded-md" htmlFor="">
              Profile Category
            </label>
            <select
              name="category"
              id="cat"
              onChange={handleChange}
              className="p-2 text-gray-900 rounded-md"
            >
              <option value="personal">Personal</option>
              <option value="business">Business</option>
              <option value="both">Both</option>
              {/* <option value="music">Music</option> */}
            </select>
            <div className="images mb-3">
              <div className="imagesInputs mt-3 flex flex-col mb-3">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label className="mt-2 rounded-md" htmlFor="">
                  Upload Images
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button
                onClick={handleUpload}
                className="p-2 bg-white text-gray-800 mt-3 rounded-md"
              >
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label className="mt-2" htmlFor="">
              Tell Us About Yourself
            </label>
            <textarea
              name="aboutMe"
              className="p-2 text-gray-900 rounded-md mb-3"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="8"
              onChange={handleChange}
            ></textarea>
            <label className="mt-2" htmlFor="">
              Add Skill
            </label>
            <form action="" className="add mb-3" onSubmit={handleSkill}>
              <input
                className="p-2 text-gray-900 rounded-md"
                type="text"
                placeholder="e.g. page design"
              />
              <button className="ml-2 bg-gray-500 p-2 rounded-md" type="submit">
                add
              </button>
            </form>
            <div className="addedFeatures">
              {state?.skills?.map((f) => (
                <div className="item bg-gray-500 mt-2 rounded-md" key={f}>
                  <button
                    className="flex items-center pl-2"
                    onClick={() =>
                      dispatch({ type: "REMOVE_SKILL", payload: f })
                    }
                  >
                    {f}
                    <span className="inline-block  p-2 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <button
              className="p-3 bg-gray-50 mt-3 text-gray-900 rounded-md"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
          <div className="details w-1/2 flex flex-col rounded-md">
            <label htmlFor="">Your Website</label>
            <input
              type="text"
              className="p-2 text-gray-900 rounded-md mb-3"
              name="website"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            {/* <label className="mt-2" htmlFor="">
              Short Description
            </label>
            <textarea
              className="p-2"
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea> */}
            {/* <label className="mt-2" htmlFor="">
              Facebook
            </label>
            <input
              className="p-2 text-gray-900"
              type="text"
              value={state.socialMedia.facebook}
              name="facebook"
              onChange={handleSocial}
            />
            <label className="mt-2" htmlFor="">
              Linkedin
            </label>
            <input
              className="p-2 text-gray-900"
              type="text"
              name="linkedin"
              value={state.socialMedia.linkedin}
              onChange={handleSocial}
            />
            <label className="mt-2" htmlFor="">
              Instagram
            </label>
            <input
              className="p-2 text-gray-900"
              type="text"
              value={state.socialMedia.instagram}
              onChange={handleSocial}
              name="instagram"
            /> */}

            {/* </label>
            chat GPT CODE */}

            <div>
              <label className="mt-4 rounded-md" htmlFor="">
                Work History
              </label>
              {/* <form onSubmit={handleWork}>
                <button className="ml-2 bg-gray-500 p-2" type="submit">
                  Add Another
                </button>
              </form> */}
              {state?.workHistory?.map((work, index) => (
                <div key={index}>
                  <form action="" className="add flex flex-col gap-3">
                    <input
                      name="workTitle"
                      className="p-2 text-gray-900 rounded-md mb-3"
                      type="text"
                      placeholder="title"
                      value={work.workTitle}
                      onChange={(e) => handleWorkChange(e, index)}
                    />
                    <textarea
                      name="jobDuty"
                      className="p-2 text-gray-900 rounded-md mb-3"
                      type="text area"
                      placeholder="job duties or responsibilities"
                      cols="0"
                      rows="8"
                      value={work.jobDuty}
                      onChange={(e) => handleWorkChange(e, index)}
                    />
                    <div className="flex w-full gap-6 items-center justify-center">
                      <span>Start Date</span>
                      <input
                        className="p-2 text-gray-900 rounded-md"
                        type="date"
                        placeholder=""
                        name="startDate"
                        value={work.startDate}
                        onChange={(e) => handleWorkChange(e, index)}
                      />
                      <span>End Date</span>
                      <input
                        className="p-2 text-gray-900 rounded-md mb-3"
                        type="date"
                        placeholder=""
                        name="endDate"
                        value={work.endDate}
                        onChange={(e) => handleWorkChange(e, index)}
                      />
                    </div>
                  </form>

                  <div className="flex gap-4 my-3 rounded-md">
                    <form onSubmit={handleWork}>
                      <button
                        className="ml-2 bg-gray-500 p-2 rounded-md mb-3"
                        type="submit"
                      >
                        Add Another Work history
                      </button>
                    </form>
                    {state.workHistory.length > 1 && (
                      <button
                        className="ml-2 bg-gray-500 p-2 rounded-md"
                        onClick={() => handleClear(work)}
                      >
                        Clear Workhistory
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* {state?.workHistory?.map((work) => (
              <div>
                <form
                  action=""
                  className="add flex flex-col gap-3"
                  // onSubmit={handleWork}
                >
                  <input
                    name="workTitle"
                    className="p-2 text-gray-900"
                    type="text"
                    placeholder="title"
                  />
                  <textarea
                    name="jobDuty"
                    className="p-2 text-gray-900"
                    type="text area"
                    placeholder="job duties or responsibilities"
                    cols="0"
                    rows="8"
                  />
                  <div className="flex w-5/6 gap-6">
                    <span>Start Date</span>
                    <input
                      className="p-2 text-gray-900"
                      type="date"
                      placeholder=""
                      name="startDate"
                    />
                    <span>End Date</span>
                    <input
                      className="p-2 text-gray-900"
                      type="date"
                      placeholder=""
                      name="endDate"
                    />
                  </div>
                </form>
                <div className="flex gap-4 my-3">
                  <form onSubmit={handleWork}>
                    <button className="ml-2 bg-gray-500 p-2" type="submit">
                      Add Another
                    </button>
                  </form>
                  {state.workHistory.length > 1 && (
                    <button
                      className="ml-2 bg-gray-500 p-2"
                      onClick={() => handleClear(work)}
                    >
                      Clear Workhistory
                    </button>
                  )}
                </div>
              </div>
            ))} */}
            {/* <form
              action=""
              className="add flex flex-col gap-3"
              onSubmit={handleWork}
            >
              <input
                name="workTitle"
                className="p-2 text-gray-900"
                type="text"
                placeholder="title"
              />
              <textarea
                name="jobDuty"
                className="p-2 text-gray-900"
                type="text area"
                placeholder="job duties or responsibilities"
                cols="0"
                rows="8"
              />
              <div className="flex w-5/6 gap-6">
                <span>Start Date</span>
                <input
                  className="p-2 text-gray-900"
                  type="date"
                  placeholder=""
                />
                <span>End Date</span>
                <input
                  className="p-2 text-gray-900"
                  type="date"
                  placeholder=""
                />
              </div>
              <button className="ml-2 bg-gray-500 p-2" type="submit">
                Add Another
              </button>
            </form> */}
            {/* <h1>Contact Me</h1> */}
            <div className="toggle mt-4 flex gap-2 rounded-md">
              <label className="rounded-md" htmlFor="">
                Email Me
              </label>
              <label className="switch rounded-md">
                <input
                  type="checkbox"
                  onChange={handleEmail}
                  checked={state.contactMe}
                />
                {/* <input type="checkbox" /> */}
                <span className="slider round"></span>
              </label>
              {state.contactMe && (
                <input
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="joe@gmail.com"
                  className="p-2 text-gray-900 rounded-md"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
