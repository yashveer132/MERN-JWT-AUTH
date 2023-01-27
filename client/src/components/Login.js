import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("Please Enter Your Email");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email");
    } else if (password === "") {
      alert("Enter Your Password");
    } else if (password.length < 6) {
      alert("Password must be atleast 6 characters");
    } else {
      // console.log("User Logged in Successfully");

      const data = await fetch("http://localhost:8009/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dash");
        setInpval({
          ...inpval,
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data" style={{ background: "coral" }}>
          <div className="form_header">
            <h1>Log In to Continue</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={setVal}
                value={inpval.email}
                placeholder="Enter your Email"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  onChange={setVal}
                  value={inpval.password}
                  placeholder="Enter your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <b>
              {" "}
              <p style={{ color: "black" }}>
                Dont Have an Account?{" "}
                <NavLink to="/register" style={{ color: "black" }}>
                  Sign Up
                </NavLink>
              </p>
            </b>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
