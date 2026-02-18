import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import riderImg from "../../assets/agent-pending.png";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const serviceCenters = useLoaderData();
  const allRegions = serviceCenters.map((c) => c.region);
  const regions = [...new Set(allRegions)];
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const handleRider = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Application has Submitted. We will Contact you soon",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  // for district call back
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  return (
    <div className="min-h-screen bg-white py-12 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4">
          Be a Rider
        </h1>
        <p className="text-gray-600">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From <br /> personal packages to business shipments — we
          deliver on time, every time.
        </p>

        <hr className="border-gray-300 my-8" />

        <form onSubmit={handleSubmit(handleRider)} className="space-y-8">
          {/* Section heading */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Tell us about yourself
            </h2>
          </div>

          {/* Sender & Receiver block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sender */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-medium mb-2 block">Your Name</label>
                  <input
                    {...register("riderName")}
                    placeholder="Your Name"
                    defaultValue={user?.displayName}
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">Your Email</label>
                  <input
                    {...register("riderEmail")}
                    placeholder="Your Email"
                    defaultValue={user?.email}
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-medium mb-2 block">Your Address</label>
                  <input
                    {...register("riderAddress")}
                    placeholder="Address"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Sender Contact No
                  </label>
                  <input
                    {...register("riderContact")}
                    placeholder="Sender Contact No"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* nid + driving licence */}
              <div className="mb-4 space-y-4">
                <label className="font-medium mb-2 block">NID No.</label>
                <input
                  {...register("riderNid")}
                  placeholder="Your NID No"
                  className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                />

                <label className="font-medium mb-2 block">
                  Driving Licence No.
                </label>
                <input
                  {...register("riderLicence")}
                  placeholder="Your Driving Licence No"
                  className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                />
              </div>

              <div className="mb-4 space-y-4">
                {/* Region */}
                <label className="font-medium mb-2 block">Your Region</label>
                <select
                  defaultValue="Select your region"
                  {...register("riderRegion")}
                  className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white"
                >
                  <option disabled={true}>Select your region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* District */}
                <label className="font-medium mb-2 block">Your District</label>
                <select
                  defaultValue="Select your district"
                  {...register("riderDistrict")}
                  className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white"
                >
                  <option disabled={true}>Select your district</option>
                  {districtsByRegion(riderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-primary hover:bg-green-500 hover:text-white transition font-semibold text-black"
                >
                  Apply as a Rider
                </button>
              </div>
            </div>

            {/* img side */}
            <div className="flex">
              <img src={riderImg} alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rider;
