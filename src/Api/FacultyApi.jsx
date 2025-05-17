import axios from "axios";
// import { getCurrentUser } from "./AuthService/LoginApi";
const API_URL = "http://127.0.0.1:8000";
import axiosInstance from "./axiosinstance";

export const GetAllFaculty = async () => {
  const allFaculty = await axiosInstance.get(`${API_URL}/faculty-get-all`);
  return allFaculty.data;
};

export const CreateFacultyApi = async (facultyDate) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/faculty-create`, {
      name: facultyDate.name,
    });

    return await response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.response.data.detail);
  }
};
export const DeleteFaculty = async (facultyId) => {
  const Faculty = await axiosInstance.delete(
    `${API_URL}/faculty-delete/${facultyId}`
    // {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token.access_token}`
    //   },
    // }
  );
  return Faculty.data;
};

export const detailFaculty = async (facultyId) => {
  const faculty = await axiosInstance.get(
    `${API_URL}/faculty-get/${facultyId}`,
    {}
  );
  return faculty.data;
};

export const UpdateFacultyApi = async (facultyDate) => {
  const response = await axiosInstance.put(
    `${API_URL}/faculty-update/${facultyDate?.facultyId}`,
    {
      name: facultyDate.name,
    }
  );
  return response.data;
};
