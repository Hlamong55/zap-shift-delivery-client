import { Link } from "react-router";
import { FaLock, FaHome } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white relative overflow-hidden">

      {/* Animated Background Circles */}
      {/* <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse top-10 left-10"></div> */}
      {/* <div className="absolute w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-ping bottom-20 right-20"></div> */}

      {/* Lock Icon Animation */}
      <FaLock className="text-7xl  animate-bounce text-secondary" />

      {/* Error Code */}
      <h1 className="text-[120px] font-extrabold  text-primary">
        403
      </h1>

      {/* Message */}
      <h2 className="text-4xl font-bold mt-2 text-secondary">
        Access Forbidden
      </h2>

      <p className="text-lg mt-3 text-secondary/70 text-center max-w-md">
        You don’t have permission to access this page. Admin access required.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-secondary transition"
      >
        <FaHome /> Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;