import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ImUserCheck } from "react-icons/im";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Rider Status is: ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleRApprove = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "Rejected");
  };



  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch(); // 🔄 AUTO REFRESH AFTER DELETE
            Swal.fire({
              title: "Deleted!",
              text: "Rider has been removed.",
              icon: "success",
              timer: 1800,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };



  return (
    <div>
      <h2 className="text-5xl mt-5 font-bold text-center text-secondary">
        Total Riders Approval: {riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th className="pl-16">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>
                  {rider.riderAddress}, {rider.riderDistrict}
                </td>
                <td>
                  <p
                    className={`${
                      rider.status === "approved"
                        ? "text-green-600"
                        : rider.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}>
                    {rider.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleRApprove(rider);
                    }}
                    className="btn btn-soft btn-success"
                  >
                    {" "}
                    <ImUserCheck size={20} />
                  </button>

                  <button
                    onClick={() => {
                      handleRejection(rider);
                    }}
                    className="btn btn-soft btn-warning"
                  >
                    <IoPersonRemoveSharp size={20} />
                  </button>

                  <button
                    onClick={() => {
                        handleDelete(rider._id)
                    }} className="btn btn-soft btn-error">
                    <FaTrashCan size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
