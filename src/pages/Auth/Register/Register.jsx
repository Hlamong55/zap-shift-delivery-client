import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, signinGoogle, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // register
  const handleRegister = (data) => {
    // console.log('After register', data);

    // 1. declare image from input
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // navigate(location?.state || '/');

        // 2.store image and get photoURL
        const formDate = new FormData();
        formDate.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formDate).then((res) => {
          const photoURL = res.data.data.url;

          // 4. create user in the  database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Drag me!",
                icon: "success",
                draggable: true,
              });
            }
          });

          // 3.update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("User Profile Updated");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // google sign in
  const handleGoogleSignIn = () => {
    signinGoogle()
      .then((result) => {
        console.log(result.user);

        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user created in the database", res.data);
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-md mt-10">
      <h1 className="text-5xl font-extrabold mb-2">Create an Account</h1>
      <p className="font-semibold mb-6">Register with ZapShift</p>

      {/* <div className=" mb-6">
                <FaUserCircle className="text-6xl text-gray-400" />
            </div> */}

      <form onSubmit={handleSubmit(handleRegister)}>
        {/* name + photo */}
        <label className="font-semibold">Photo</label>
        <input
          type="file"
          {...register("photo", { required: true })}
          placeholder="Your Photo"
          className="file-input w-full my-2 border border-gray-300"
        />
        {errors.photo && (
          <p className="text-red-500 text-sm">Photo is required</p>
        )}

        <label className="font-semibold">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="input w-full my-2 border border-gray-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Name is required</p>
        )}

        {/* Email */}
        <label className="font-semibold">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input w-full my-2 border border-gray-300"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}

        {/* Password */}
        <label className="font-semibold ">Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
          className="input w-full my-2 border border-gray-300"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500 text-sm">
            Password must be 6 characters or more
          </p>
        )}
        {/* Register Button */}
        <button className="w-full py-2.5 rounded-md mt-4 bg-primary hover:bg-green-500 hover:text-white transition font-bold text-lg">
          Register
        </button>

        <p className="mt-4 text-gray-700 text-center">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-green-700 font-medium  cursor-pointer underline"
          >
            Login
          </Link>
        </p>

        {/* OR */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-4 text-gray-500">Or</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full border border-gray-300 py-2.5 rounded-md flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-400 hover:text-gray-100"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-lg font-bold ">Register with Google</span>
        </button>
      </form>
    </div>
  );
};

export default Register;
