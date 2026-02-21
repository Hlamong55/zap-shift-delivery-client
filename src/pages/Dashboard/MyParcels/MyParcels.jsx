import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteParcel = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        axiosSecure.delete(`/parcels/${id}`)
        .then((res) => {
            // console.log(res.data)

            // refetch the data in the ui
            refetch();

          if (res.data.deleteCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
            
          }
        });

      }
    });
  };



  return (
    <div className="text-center text-5xl font-bold text-secondary mt-5">
      <h2>My All Parcels: {parcels.length}</h2>
      <div className="overflow-x-auto py-5 mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-base">
              <th>SL No.</th>
              <th>Percel Name</th>
              <th>Receiver Address</th>
              <th>Total Cost</th>
              <th>Payment</th>
              <td>Delivery Status</td>
              <th className="pl-22">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.receiverAddress}, {parcel.receiverDistrict}
                </td>
                <td>{parcel.cost}</td>
                <td>
                    {
                        parcel.paymentStatus === 'paid' ? 
                        <span className="btn btn-sm text-green-600 font-bold">Paid</span>
                        : <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="btn btn-sm btn-primary text-black hover:scale-3d hover:text-red-600">Pay</button>
                        </Link>
                    }
                </td>
                <td></td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-outline btn-success">View</button>
                  <button className="btn btn-sm btn-outline btn-warning">Edit</button>
                  <button
                    onClick={() => handleDeleteParcel(parcel._id)}
                    className="btn btn-sm btn-outline text-red-500 hover:text-white hover:bg-red-500"
                  >
                    Cancel
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

export default MyParcels;
