const API_URL = "http://127.0.0.1:8000";
import axiosInstance from "./axiosinstance";  

export const GetAllGroup = async () => {
  const allGroup= await axiosInstance.get(`${API_URL}/group-get-all`);
  return allGroup.data;
};

export const CreateGroupApi = async (groupDate) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/group-create`, {
        name: groupDate.name,
        faculty_id: groupDate.facultyId,
      });
  
      return await response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.response.data.detail);
    }
  };

  export const DeleteGroup = async (groupId) => {
    const Group = await axiosInstance.delete(
      `${API_URL}/group-delete/${groupId}`
      // {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token.access_token}`
      //   },
      // }
    );
    return Group.data;
  };

  export const detailGroup = async (groupId) => {
    const group = await axiosInstance.get(`${API_URL}/group-get/${groupId}`, {});
    return group.data;
  };
  
  export const UpdateGroupApi = async (groupDate) => {
    const response = await axiosInstance.put(
      `${API_URL}/group-update/${groupDate?.groupId}`,
      {
        name: groupDate.name,
        faculty_id: groupDate.facultyId,
      }
    );
    return response.data;
  };
  