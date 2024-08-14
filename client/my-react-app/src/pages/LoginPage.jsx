

import React from "react";

const InputField = ({ label, type }) => (
  <div className="w-full max-w-[752px] mt-14 max-md:mt-10">
    <label htmlFor={`${type}Input`} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      id={`${type}Input`}
      placeholder={label}
      className="px-5 py-7 w-full text-3xl rounded-3xl bg-zinc-300"
      aria-label={label}
    />
  </div>
);

const Button = ({ label }) => (
  <button
    type="submit"
    className="px-16 py-10 mt-24 max-w-full text-4xl text-center text-white whitespace-nowrap rounded-3xl bg-slate-600 w-[752px] max-md:px-5 max-md:mt-10"
  >
    {label}
  </button>
);

const LoginFormPage = () => {
  return (
    <main className="flex overflow-hidden flex-col text-black bg-black">
      <section className="flex relative flex-col justify-center items-center px-20 py-28 w-full min-h-[1080px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b31808bc3b17c846107d331197ee3bfd05f335d71853b53a1b5a0c666f2fab1a?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3"
          alt=""
          className="object-cover absolute inset-0 w-full h-full object-center"
        />
        <form className="flex relative flex-col items-end px-20 pt-16 pb-11 mb-0 w-full bg-white bg-opacity-50 max-w-[996px] rounded-[79px] max-md:px-5 max-md:mb-2.5 max-md:max-w-full">
          <h1 className="self-center text-8xl text-center max-md:max-w-full max-md:text-4xl">
            Login Form
          </h1>
          <InputField label="Email Address" type="email" />
          <InputField label="Password" type="password" />
          <Button label="Login" />
          <p className="self-center mt-36 ml-11 text-2xl text-blue-950 max-md:mt-10">
            No Account?{" "}
            <a href="#" className="text-indigo-500">
              Sign Up Here
            </a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default LoginFormPage;
