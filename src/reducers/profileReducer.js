"use client";

// if (typeof window !== "undefined") {
//   const localStore = localStorage.getItem("currentUser")._id || null,
// }

export const INITIAL_STATE = {
  userId: null,
  title: "",
  images: [],
  category: "",
  aboutMe: "",
  avatar: "",
  socialMedia: {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    dribble: "",
    youtube: "",
    tiktok: "",
  },
  website: "",
  skills: [],
  contactMe: false,
  email: "",
  workHistory: [
    {
      workTitle: "",
      jobDuty: "",
      startDate: Date,
      endDate: Date,
    },
  ],
};

export const profileReducer = (state, action) => {
  console.log("pinned dispatched", action);
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "CHANGE_SOCIAL":
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          [action.payload.name]: action.payload.value,
        },
      };
    case "GET_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    case "TOGGLE_EMAIL":
      return {
        ...state,
        contactMe: !state.contactMe,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        avatar: action.payload.avatar,
        images: action.payload.images,
      };
    // case "ADD_WORKHISTORY":
    //   // return {
    //   //   ...state,
    //   //   workHistory: [
    //   //     ...state.workHistory,
    //   //     { [action.payload.name]: [action.payload.value] },
    //   //   ],
    //   // };
    //   return {
    //     ...state,
    //     workHistory: [...state.workHistory, action.payload],
    //   };
    case "ADD_WORK":
      return {
        ...state,
        workHistory: [...state.workHistory, action.payload],
      };
    case "UPDATE_WORK":
      return {
        ...state,
        workHistory: state.workHistory.map((work, index) =>
          index === action.payload.index ? action.payload.work : work
        ),
      };
    case "CLEAR_WORK":
      return {
        ...state,
        workHistory: state.workHistory.filter(
          (work) => work !== action.payload
        ),
      };
    case "CLEAR_WORK":
      return {
        ...state,
        workHistory: state.workHistory.splice(1),
      };
    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((skill) => skill !== action.payload),
      };
    default:
      return state;
  }
};
