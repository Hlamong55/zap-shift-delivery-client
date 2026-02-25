import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { SlShield } from "react-icons/sl";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to make ${user.displayName} an Admin?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, make Admin!",
  }).then((result) => {
    if (result.isConfirmed) {
      const roleInfo = { role: "Admin" };

      axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.displayName} is now an Admin`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  });
};

  const handleRemoveAdmin = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Remove Admin role from ${user.displayName}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, remove Admin!",
  }).then((result) => {
    if (result.isConfirmed) {
      const roleInfo = { role: "user" };

      axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.displayName} is no longer Admin`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  });
};

  return (
    <div>
      <h2 className="text-5xl font-bold text-center text-secondary mt-5">
        Manage Users: {users.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  {user.role === "Admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn rounded-xl bg-red-400"
                    >
                      <SlShield size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn rounded-xl bg-green-400"
                    >
                      <FaUserShield size={18} />
                    </button>
                  )}
                </td>

                <td>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
