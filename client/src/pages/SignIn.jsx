import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { motion } from "framer-motion";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hidden: { y: "100vh", x: "-10%" },
    visible: {
      y: "-200px",
      x: "-10%",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };
  return (
    <div className="flex min-h-screen ">
      {/* Animated image on the left */}
      <div
        className="w-1/2 flex justify-center items-center bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimation.png')] bg-no-repeat bg-center bg-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="w-[500px] h-[100px] bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimationtext.png')] bg-no-repeat bg-center bg-contain"
          variants={variants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        />
      </div>

      {/* Sign-in form on the right */}
      <div className="w-1/2 flex flex-col justify-center p-3 bg-white text-black rounded-l-3xl">
        <h1 className="text-3xl text-center font-semibold mb-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            autoComplete="on"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
