import { Link } from "react-router";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-secondary to-primary text-secondary relative overflow-hidden">

      {/* Floating Glow Circles */}
      <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-ping bottom-20 right-20"></div>

      {/* Content */}
      <div className="flex flex-col items-center text-center z-10">
        <FaExclamationTriangle className="text-8xl text-secondary mb-2 animate-bounce" />

        <h1 className="text-[130px] font-extrabold text-secondary drop-shadow-lg">
          404
        </h1>

        <h2 className="text-4xl font-bold mt-2">
          Oops! Page Not Found
        </h2>

        <p className="text-lg mt-3 font-semibold max-w-lg">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="mt-8 flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-secondary transition duration-300 shadow-lg"
        >
          <FaHome /> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;