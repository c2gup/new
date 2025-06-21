import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Test credentials data
  const testCredentials = [
    {
      role: "Instructor",
      email: "teachertest@gmail.com",
      password: "123456"
    },
    
    {
      role: "Student",
      email: "Studenttest@gmail.com",
      password: "123456"
    }
  ];

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  };

  // Copy to clipboard with toast notification
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied!`, {
      position: "bottom-center",
      style: {
        background: '#1e293b',
        color: '#f8fafc',
      }
    });
  };

  // Auto-fill form with test credentials
  const autoFillCredentials = (cred) => {
    setFormData({
      email: cred.email,
      password: cred.password
    });
    toast.success(`${cred.role} credentials filled!`, {
      position: "bottom-center",
      style: {
        background: '#1e293b',
        color: '#f8fafc',
      }
    });
  };

  return (
    <div className="relative">
      {/* Test Credentials Section - Always Visible */}
      <div className="mb-6 p-4 bg-richblack-800 rounded-lg border border-richblack-700">
        <h3 className="text-richblack-5 font-medium mb-3">Test Credentials</h3>
        
        <div className="space-y-3">
          {testCredentials.map((cred, index) => (
            <div key={index} className="bg-richblack-700 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-yellow-50 font-medium">{cred.role}</span>
                <button
                  onClick={() => autoFillCredentials(cred)}
                  className="text-xs bg-yellow-50 text-richblack-900 py-1 px-2 rounded hover:bg-yellow-100"
                >
                  Auto-fill
                </button>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-richblack-100">Email:</span>
                <div className="flex items-center gap-2">
                  <span className="text-richblack-5">{cred.email}</span>
                  <button 
                    onClick={() => copyToClipboard(cred.email, "Email")}
                    className="text-richblack-100 hover:text-yellow-50"
                  >
                    <AiOutlineCopy size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-richblack-100">Password:</span>
                <div className="flex items-center gap-2">
                  <span className="text-richblack-5">{cred.password}</span>
                  <button 
                    onClick={() => copyToClipboard(cred.password, "Password")}
                    className="text-richblack-100 hover:text-yellow-50"
                  >
                    <AiOutlineCopy size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full"
          />
        </label>
        
        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="form-style w-full !pr-10"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>
        </label>
        
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;