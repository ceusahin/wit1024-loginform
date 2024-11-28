import Login from "./components/Login";
import Success from "./components/Success";
import Error from "./components/Error";
import "./App.css";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
        <Route exact path="/error">
          <Error />
        </Route>
      </Switch>
    </>
  );
}

export default App;
