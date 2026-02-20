import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white relative overflow-hidden">

      {/* Floating Circles Animation */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl animate-ping bottom-20 right-20"></div>

      {/* Content */}
      <h1 className="text-[150px] font-extrabold animate-bounce">404</h1>
      <h2 className="text-4xl font-bold mt-2">Oops! Page Not Found</h2>
      <p className="text-lg mt-3 text-white/80 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition"
      >
        <FaHome /> Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;