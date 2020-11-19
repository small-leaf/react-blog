import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { register, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";

const ErrorMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: red;
`;

const Form = styled.form`
  margin: 50px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 62px 72px; ;
`;

const InputWrapper = styled.div`
  margin-top: 23px;

  input {
    width: 350px;
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
    border-radius: 20px;
    outline: transparent;
  }
`;
const InputLabel = styled.div`
  font-size: 14px;
  margin-left: 21px;
`;

const SubmitButton = styled.button`
  margin: 53px auto;
  width: 400px;
  height: 56px;
  outline: transparent;
  background-color: gray;
  border-radius: 20px;
  border: 1px solid gray;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;

const RegisterPage = () => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, nickname, password);
    setErrorMessage(null);
    register(username, nickname, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((res) => {
        if (res.ok === 0) {
          setAuthToken(null);
          return setErrorMessage(res.message);
        }
        setUser(res.data);
        history.push("/");
      });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputLabel>USERNAME</InputLabel>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>NICKNAME</InputLabel>
        <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>PASSWORD</InputLabel>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputWrapper>
      <SubmitButton>註冊</SubmitButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
};

export default RegisterPage;
