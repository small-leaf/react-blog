import styled from "styled-components";
import React, { useState, useEffect } from "react";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import Header from "../Header";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Root = styled.div`
  padding-top: 64px;
`;
const checkToken = () => {
  return getAuthToken();
};
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = checkToken();
    if (token) {
      getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
    }
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
