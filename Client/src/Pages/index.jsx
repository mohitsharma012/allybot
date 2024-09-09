import React from "react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const index = () => {
  const [isLogin, setisLogin] = useState(true);
  const [data, setData] = React.useState({
    name: "",
    email: "stayer.mohit@gmail.com",
    password: "123456789",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginStatusChange = () => {
    setisLogin(!isLogin);
    // make data empty
    setData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (isLogin) {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          }
        );

        const responseData = await response.json();
        toast(responseData.message);

        // redirect to dashboard
        if (responseData.success) {
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log(import.meta.env.VITE_BACKEND_URL + "/api/user/register");
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              password: data.password,
            }),
          }
        );
        const responseData = await response.json();
        toast(responseData.message);

        // redirect to login page
        setisLogin(true);
      } catch (error) {
        console.log(error);
        toast("Server is not responding");
      }
    }
  };
  console.log(data)

  return (
    <>
      <ToastContainer theme="dark" />

      <div className="min-h-screen flex flex-col bg-[url('index_background.jpg')] bg-center bg-cover w-full">
        <nav className="bg-black text-white text-center py-6 text-2xl font-mono font-bold">
          AllyBot
        </nav>

        {isLogin ? (
          <section
            id="signin_form_screen"
            className="flex flex-col m-auto text-white backdrop-blur-lg border w-11/12 sm:w-2/4 lg:w-[25rem] px-3 py-12 sm:px-8 sm:py-20 border-white rounded-xl"
          >
            <h3 className="m-auto font-bold font-mono text-4xl">Login</h3>
            <form
              method="post"
              className="flex flex-col gap-2 text-base m-auto w-full"
              onSubmit={handleSubmit}
            >
              <label >Email</label>
              <input
                required
                name="email"
                defaultValue={data.email}
                onChange={handleChange}
                placeholder="Enter your email"                
                type="email"
                className="bg-transparent border px-4 py-2 text-white border-white w-full rounded-lg"
              />

              <span>Password</span>
              <input
                required
                name="password"
                defaultValue={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                type="password"
                className="bg-transparent border px-4 py-2 text-white border-white w-full rounded-lg"
              />
              <button
                id="signup_submit_btn"
                className="bg-white text-black hover:bg-gray-200 py-2 my-5 rounded-lg"
              >
                Login
              </button>
            </form>
            <span className="m-auto text-sm mb-3 font-thin">
              Don't have an account?
            </span>
            <button
              onClick={handleLoginStatusChange}
              className="bg-transparent border hover:bg-gray-200 hover:text-black border-white text-white py-2 text-base rounded-lg"
            >
              Create New Account
            </button>
          </section>
        ) : (
          <section
            id="signup_form_screen"
            className="flex flex-col m-auto text-white backdrop-blur-lg border w-11/12 sm:w-2/4 lg:w-[25rem] px-3 py-12 sm:px-8 sm:py-20 border-white rounded-xl"
          >
            <h3 className="m-auto font-bold font-mono text-3xl">Signup</h3>
            <form
              method="post"
              className="flex flex-col m-auto w-full"
              onSubmit={handleSubmit}
            >
              <span>Name</span>
              <input
                required
                onChange={handleChange}
                name="name"
                placeholder="Enter your name"
                type="text"
                className="bg-transparent border px-4 py-2 text-white border-white w-full rounded-lg"
              />

              <span>Email</span>
              <input
                required
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
                type="email"
                className="bg-transparent border px-4 py-2 text-white border-white w-full rounded-lg"
              />

              <span>Password</span>
              <input
                required
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                type="password"
                className="bg-transparent border px-4 py-2 text-white border-white w-full rounded-lg"
              />

              <button
                id="signup_submit_btn"
                className="bg-white text-black hover:bg-gray-200 py-2 my-5 rounded-lg"
              >
                Create Account
              </button>
            </form>
            <span className="m-auto text-sm font-thin">
              Already have an account?
            </span>
            <button
              onClick={handleLoginStatusChange}
              className="bg-transparent border hover:bg-gray-200 hover:text-black border-white text-white py-2 text-base rounded-lg"
            >
              Signin
            </button>
          </section>
        )}
      </div>
    </>
  );
};

export default index;
