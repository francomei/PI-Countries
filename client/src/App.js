import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import AddActivity from "./components/AddActivity/AddActivity";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/detail/:id" component={CountryDetail} />
          <Route path="/activities" component={AddActivity} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
