// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { registerUser } from "../features/authSlice";

// // const Register = () => {
// //   const [form, setForm] = useState({ fullName: "", email: "", password: "" });
// //   const dispatch = useDispatch();

// //   const submit = (e) => {
// //     e.preventDefault();
// //     dispatch(registerUser(form));
// //   };

// //   return (
// //     <form onSubmit={submit}>
// //       <input
// //         placeholder="Full Name"
// //         onChange={(e) => setForm({ ...form, fullName: e.target.value })}
// //       />
// //       <input
// //         placeholder="Email"
// //         onChange={(e) => setForm({ ...form, email: e.target.value })}
// //       />
// //       <input
// //         type="password"
// //         placeholder="Password"
// //         onChange={(e) => setForm({ ...form, password: e.target.value })}
// //       />
// //       <button>Register</button>
// //     </form>
// //   );
// // };

// // export default Register;


// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../features/authSlice";
// import { Mail, Lock, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [form, setForm] = useState({ fullName: "", email: "", password: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const submit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(form));
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Register
//         </h2>

//         <form onSubmit={submit} className="space-y-4">
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={(e) =>
//                 setForm({ ...form, fullName: e.target.value })
//               }
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-center mt-4 text-gray-600">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-blue-600 font-medium hover:underline cursor-pointer"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import { Mail, Lock, User, Eye, EyeOff, UserPlus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-green-600 from-green-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300" />
          </div>
          <h2 className="text-3xl font-bold  from-green-600 to-blue-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2">Join us today</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Full Name Input */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Full Name
            </label>
            <div className="relative transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white bg-opacity-50 shadow-sm transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Email Address
            </label>
            <div className="relative transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-50 shadow-sm transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
              Password
            </label>
            <div className="relative transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white bg-opacity-50 shadow-sm transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start text-sm">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                required
              />
              <span className="ml-2 text-gray-600 text-left">
                I agree to the{" "}
                <span className="text-green-600 hover:text-green-800 font-medium cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-green-600 hover:text-green-800 font-medium cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full py-3.5 rounded-xl text-white font-semibold transition-all duration-300 transform shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:shadow-xl hover:scale-105 active:scale-95"
            }`}
          >
            <div className="flex items-center justify-center">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <UserPlus className={`ml-2 w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </>
              )}
            </div>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold hover:text-green-800 cursor-pointer transition-colors hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Register;