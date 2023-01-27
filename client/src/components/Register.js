import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

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

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword } = inpval;

    if (fname === "") {
      alert("Please Enter Your Name");
    } else if (email === "") {
      alert("Please Enter Your Email");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email");
    } else if (password === "") {
      alert("Enter Your Password");
    } else if (password.length < 6) {
      alert("Password must be atleast 6 characters");
    } else if (cpassword === "") {
      alert("Confirm Your Password");
    } else if (cpassword.length < 6) {
      alert("Password must be atleast 6 characters");
    } else if (password !== cpassword) {
      alert("Password and Confirm Password donot Match");
    } else {
      // console.log("User Registration Successfully Done");

      const data = await fetch("http://localhost:8009/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      // console.log(res);

      if (res.status === 201) {
        alert("User Registration Done");
        setInpval({
          ...inpval,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data" style={{ background: "coral" }}>
          <div className="form_header">
            <h1>SIGN UP</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={setVal}
                value={inpval.fname}
                placeholder="Enter your Name"
              />
            </div>
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
            <div className="form_input">
              <label htmlFor="password"> Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  onChange={setVal}
                  value={inpval.cpassword}
                  placeholder="Confirm your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={addUserdata}>
              Sign Up
            </button>
            <b>
              {" "}
              <p style={{ color: "black" }}>
                Already Have an Account?{" "}
                <NavLink to="/" style={{ color: "black" }}>
                  Log In
                </NavLink>
              </p>{" "}
            </b>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
