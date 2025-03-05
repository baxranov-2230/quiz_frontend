import axios from "axios";
// import { getCurrentUser } from "./AuthService/LoginApi";
const API_URL = "http://127.0.0.1:8000";
import axiosInstance from "./axiosinstance";  

export const GetAllDepartment = async () => {
  const allDepartment = await axiosInstance.get(`${API_URL}/department-get-all`);
  return allDepartment.data;
};

export const CreateDepartmentApi = async (departmentDate) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/department-create`, {
      name: departmentDate.name,
      faculty_id: departmentDate.facultyId,
    });

    return await response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.response.data.detail);
  }
};
export const DeleteDepartment = async (departmentId) => {
  const Department = await axiosInstance.delete(
    `${API_URL}/department-delete/${departmentId}`
    // {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token.access_token}`
    //   },
    // }
  );
  return Department.data;
};

// export const detailFaculty = async (facultyId) => {
//   const faculty = await axios.get(`${API_URL}/faculty-get/${facultyId}`, {});
//   return faculty.data;
// };

// export const UpdateFacultyApi = async (facultyDate) => {
//   const response = await axios.put(
//     `${API_URL}/faculty-update/${facultyDate?.facultyId}`,
//     {
//       name: facultyDate.name,
//     }
//   );
//   return response.data;
// };
