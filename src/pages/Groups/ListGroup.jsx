import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DeleteGroup, GetAllGroup } from "../../Api/GroupApi";

function ListGroup() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const { isError, isSuccess, isLoading, data, error, refetch } = useQuery({
    queryKey: ["list-group"],
    queryFn: GetAllGroup,
  });

  const groupMutation = useMutation({
    mutationKey: ["group-delete"],
    mutationFn: DeleteGroup,
    onSuccess: (data) => {
      toast.success(data.message || "Group muvaffaqiyatli o'chirildi");
      setIsModalOpen(null);
    },
    onError: (error) => {
      toast.error(error.message || "Xatolik yuz berdi");
    },
  });

  const handleDeleteClick = (groupId) => {
    setIsModalOpen(groupId); // Modalni ochish
  };

  const deleteHandler = async (departmentId) => {
    groupMutation
      .mutateAsync(departmentId)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
  };
  const cancelDelete = () => {
    setIsModalOpen(null); // Modalni bekor qilish
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Kafedralar ro'yxati</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 text-gray-600">N</th>
                <th className="p-3 text-gray-600">Fakultet nomi</th>
                <th className="p-3 text-gray-600">Guruh nomi </th>
                <th className="p-3 text-gray-600 flex justify-center ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((group, index) => {
                return (
                  <tr className="border-t" key={group?.id}>
                    <td className="p-3 ">{index + 1}</td>
                    <td className="p-3 ">{group?.faculty_id}</td>
                    <td className="p-3 ">{group?.name}</td>

                    <td className="p-3">
                      <div className="flex justify-center">
                        <Link
                          className=" flex items-center justify-start   pr-8"
                          to={`/update-group/${group?.id}`}
                        >
                          <button>
                            <FaRegEdit className="text-2xl text-[#3697A5]" />
                          </button>
                        </Link>
                        <button
                          className="flex items-center justify-start  "
                          onClick={() => handleDeleteClick(group?.id)}
                        >
                          <MdDelete className="text-2xl text-red-600" />
                        </button>
                        {isModalOpen === group?.id && (
                          <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                              <h2 className="text-lg font-semibold mb-4">
                                Haqiqatan ham o‘chirmoqchimisiz?
                              </h2>
                              <p className="mb-6">
                                <span className="text-red-600">
                                  {group?.name || "Bu element"}
                                </span>{" "}
                                ni o‘chirishni tasdiqlaysizmi?
                              </p>
                              <div className="flex justify-end gap-4">
                                <button
                                  className="px-4 py-2 bg-gray-300 rounded "
                                  onClick={cancelDelete}
                                >
                                  Bekor qilish
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                  onClick={() => deleteHandler(group?.id)}
                                >
                                  O‘chirish
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListGroup;
