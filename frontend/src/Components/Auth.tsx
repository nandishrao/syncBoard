import { useState } from "react";
import axios from "axios";
import BASE_URL from "../Constants/constants"

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handelSignUp =()=>{

  }
  const HandelLogin = async()=>{
    try{
      const res = await axios.post(BASE_URL + "/register" ,
         {name ,email,passowrd},
         {});

    }catch(err){
      alert("something went wrong")
    }
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "30px",
          border: "1px solid #eee",
          borderRadius: "8px",
          textAlign: "center"
        }}
      >
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <form>
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0"
              }}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0"
            }}
          />

          <button
           onClick={isSignup ? handelSignUp : HandelLogin}
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer"
            }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
        </p>

        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            border: "none",
            background: "none",
            color: "#4f46e5",
            cursor: "pointer"
          }}
        >
          {isSignup ? "Login here" : "Signup here"}
        </button>
      </div>
    </div>
  );
};

export default Auth;