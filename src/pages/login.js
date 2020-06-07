import React from "react";
import { useState } from "react";
import "../App.css";
import Header from "../layout/header";
import actionLogin from "../actions/actionLogin";
import history from "../history";
import tool from "../actionCreators/actions";
import actionReg from "../actions/actionReg";
import { connect } from "react-redux";
import store from "../reducers/store";
const LoginPage = (p) => {
  tool.setPlay(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [eyeClass, setEyeClass] = useState(true);
  const [passType, setPassType] = useState(true);
  const isValid = () => login.length > 3 && password.length > 3 && login.length <= 11 
  return (
    <div className="login-box">
      <form>
        <input
          className="input-login form-control"
          placeholder="Type your login here"
          onChange={(e) => setLogin(e.target.value)}
        />
        <div className="eye">
          <input
            type={passType ? "password" : "text"}
            className="input-login form-control"
            placeholder="Type your password here"
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={eyeClass ? "fa fa-eye-slash" : "fa fa-eye"}
            style={{ color: "#671ca0", "font-size": "20px" }}
            onMouseDown={() => {
              setEyeClass(!eyeClass);
              setPassType(!passType);
            }}
          />
        </div>
        <button
          disabled={!isValid()}
          onClick={async (e) => {
            var res = await actionReg(login, password, e);
            e.preventDefault();
            if (res) {
              history.push("/");
            }
          }}
          style={{ 'background-color': 'rgb(103, 28, 160)'}}
          className="btn  btn-primary login-btn"
        >
          Register
        </button>
        <button
          disabled={!isValid()}
          onClick={async (e) => {
            var res = await actionLogin(login, password, e);
            e.preventDefault();
            if (res) {
              history.push("/");
            }
          }}
          style={{ 'background-color': 'rgb(103, 28, 160)'}}
          className="btn  btn-primary login-btn"
        >
          Login
        </button>
        <h2>{p.status ? `${p.status}` : ""}</h2>
      </form>
    </div>
  );
};
const CLoginPage = connect((s) => {
  console.log(s.login);
  return { status: s.login.loginStatus };
})(LoginPage);
export default CLoginPage;
