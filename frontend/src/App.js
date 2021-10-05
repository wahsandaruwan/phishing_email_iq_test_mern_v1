// Page Commponents
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"

// Router
import {BrowserRouter, Route, Switch} from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App
