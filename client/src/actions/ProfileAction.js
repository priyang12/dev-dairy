// import {
//   ADD_EDUCATION,
//   ADD_PROFILE,
//   LOAD_PROFILE,
//   PROFILE_ERROR,
//   SET_LOADING,
//   ADD_EXPERIENCE,
//   GET_PROFILES,
//   CLEAR_ERRORS,
//   CLEAR_PROFILE,
//   UPDATE_PROFILE,
// } from "./types";
// import axios from "axios";

// // Add Profile
// export const AddProfile = (data) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const res = await axios.post("/api/profile", data, config);
//     dispatch({
//       type: ADD_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.msg;
//     console.log(errors);
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: errors,
//     });
//   }
// };

// //Add education
// export const AddEducation = (data) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const res = await axios.post("/api/profile/education", data, config);
//     dispatch({
//       type: ADD_EDUCATION,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.msg;

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: errors,
//     });
//   }
// };
// //Add Experience
// export const AddExperience = (data) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const res = await axios.post("/api/profile/experience", data, config);

//     dispatch({
//       type: ADD_EXPERIENCE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.msg;

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: errors,
//     });
//   }
// };

// //Get Profile
// export const loadProfile = (id) => async (dispatch) => {
//   try {
//     dispatch(setLoading());
//     const res = await axios.get(`/api/profile/user/id/${id}`);
//     dispatch({
//       type: LOAD_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response;

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: errors,
//     });
//   }
// };

// //Get all profiles
// export const GetProfiles = () => async (dispatch) => {
//   try {
//     dispatch(setLoading());
//     const res = await axios.get("/api/profile/all");

//     dispatch({
//       type: GET_PROFILES,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: error,
//     });
//   }
// };

// //Delete Experience
// export const DeleteExperience = (id) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const res = await axios.delete(`/api/profile/experience/${id}`);
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response;
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: errors,
//     });
//   }
// };

// //Delete Education
// export const DeleteEducation = (id) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const res = await axios.delete(`/api/profile/education/${id}`);
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response;
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: errors,
//     });
//   }
// };

// //clear error
// export const clearErrors = () => async (dispatch) =>
//   dispatch({ type: CLEAR_ERRORS });
// //clear Profile
// export const clearProfile = () => async (dispatch) =>
//   dispatch({ type: CLEAR_PROFILE });
// //loading

// export const setLoading = () => async (dispatch) => {
//   dispatch({ type: SET_LOADING });
// };
