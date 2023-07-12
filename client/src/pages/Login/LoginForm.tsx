import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { Validator } from "../../utils/validator/V-lib.js";
import { ToastOptions, toast } from "react-toastify";

export default function LoginForm() {
  const {
    showPassword,
    handleShowPassword,
    credentials,
    handleCredentials,
    handleSubmit
  } = useLogInForm();
  return (
    <div className="text-dark md:w-1/3 w-full mb-5 rounded-lg shadow-lg">
      <div className="bg-light rounded-lg shadow-lg p-6">
        <p className="text-3xl text-center font-bold p-2">Login</p>

        <Link
          className="border-2 mt-3 mb-5 border-gray-300 p-1 rounded-md flex text-center justify-center items-center gap-2"
          to="https://firebase.google.com/"
        >
          <FcGoogle className="text-3xl" />
          <p className="font-medium">Sign Up Using Google</p>
        </Link>

        <div className="flex items-center justify-center mb-3">
          <div className="border-b border-dark w-full" />
          <p className="mx-2 px-2">Or</p>
          <div className="border-b border-dark w-full" />
        </div>

        <p className="text-center font-semibold p-2">
          Log in using email address
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-5">
          <div>
            <input
              className="border-2 border-gray-300 p-2 py-3 rounded-md w-full"
              type="email"
              placeholder="Email Address"
              value={credentials.email}
              onChange={handleCredentials}
              name="email"
              id="email"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border-2 border-gray-300 p-2 py-3 rounded-md w-full"
              placeholder="Password"
              value={credentials.password}
              onChange={handleCredentials}
              name="password"
              id="password"
            />
            <span
              onClick={handleShowPassword}
              className="absolute right-3 cursor-pointer bottom-1/4 text-xl"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <Link
            className="text-right my-1 inline-block font-medium"
            to="https://firebase.google.com/"
          >
            Forgot Password?
          </Link>

          <Button>Login</Button>
        </form>

        <p className="font-medium my-3 text-center">
          Need to create an account? <Link to="/"> Sign Up </Link>
        </p>
      </div>
    </div>
  );
}

// ! ====== ! CONTROLLER ! ====== ! //
// ?? THIS IS CONTROLLER CAN BE EXPORTED TO ANOTHER FILE KEEPING THE VIEW SECTION MORE CONCISE AND CONSISTENT. SEPARATING THE UI FROM THE LOGIC IS MY METHOD
// ! ====== ! CONTROLLER ! ====== ! //
export const useLogInForm = () => {
  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // VALIDATE INPUTS WITH V-VALIDATOR
  const toastOpt: ToastOptions<{}> = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  };
  const V = new Validator("object");
  const { errors } = V;
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  V.rules = {
    email: { email: true, maxLength: 25 },
    password: { minLength: 5, maxLength: 25 }
  };

  const handleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    V.validate(credentials);
    if (errors.length > 0) {
      console.log(errors[0].toString().toUpperCase() + " ✅");
      toast.error(`${errors[0].toString().toUpperCase() } ❌`, toastOpt);
    }
  };

  return {
    handleShowPassword,
    showPassword,
    handleCredentials,
    credentials,
    handleSubmit
  };
};
