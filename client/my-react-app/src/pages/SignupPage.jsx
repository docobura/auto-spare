import React, { useState } from "react";

const InputField = ({ label, type, value, onChange }) => (
  <div className="mt-8 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
    <label htmlFor={`${type}Input`} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      id={`${type}Input`}
      placeholder={label}
      aria-label={label}
      value={value}
      onChange={onChange}
      className="px-5 py-10 w-full rounded-3xl bg-zinc-300"
    />
  </div>
);

const Button = ({ label, onClick }) => (
  <button
    type="submit"
    onClick={onClick}
    className="px-16 py-9 mt-20 ml-5 text-5xl text-center text-white whitespace-nowrap rounded-3xl bg-slate-600 max-md:px-5 max-md:mt-10 max-md:max-w-full max-md:text-4xl"
  >
    {label}
  </button>
);

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", { email, password, confirmPassword });
  };

  return (
    <main className="flex overflow-hidden flex-col text-3xl text-black bg-black">
      <section className="flex relative flex-col justify-center items-center px-20 py-28 w-full min-h-[1107px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8935c23d8b329f0aff14f959f0b2f4f2d27bc391b442b3e2601d470b51dd7370?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3"
          alt=""
          className="object-cover absolute inset-0 size-full"     <main className="flex overflow-hidden flex-col text-black bg-black"></main>
        />
        <form
          onSubmit={handleSubmit}
          className="flex relative flex-col items-center px-20 pt-16 pb-32 mb-0 w-full bg-white bg-opacity-50 max-w-[996px] rounded-[79px] max-md:px-5 max-md:pb-24 max-md:mb-2.5 max-md:max-w-full"
        >
          <div className="flex flex-col -mb-6 max-w-full w-[771px] max-md:mb-2.5">
            <h1 className="self-center text-8xl text-center max-md:max-w-full max-md:text-4xl">
              Sign up Form
            </h1>
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button label="Signup" onClick={handleSubmit} />
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignUpForm;
