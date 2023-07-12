import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";


export default function Login() {
  return (
    <div className="min-h-screen bg-bgColor bg-image-login text-light">
      <div className="wrapper">
        <p className="font-semibold text-2xl px-3 mb-2 pt-6">Doheny.</p>

        <div className="flex items-center gap-4 m-auto min-h-screen md:max-w-[90vw] md:flex-row flex-col-reverse p-6 justify-around h-full">
          <div className="rounded-lg self-start mt-32">
            <p className="text-5xl font-bold max-w-[32rem] mb-6">
              Introducing Global Payroll you can run in your sleep
            </p>
            <p className="text-xl max-w-[30rem] mb-5">
              Pay team members hired throgh your own entities in 90+ countries
              with Global payroll
            </p>
            <Link
              className="inline-flex items-center gap-2 text-xl font-medium"
              to="/"
            >
              <p>Learn more</p> <FiArrowRight className="text-xl" />
            </Link>
          </div>
          {/* // ? LOGIN */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
