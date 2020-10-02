import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact={true} path="/" component={Home} />
          </Switch>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
