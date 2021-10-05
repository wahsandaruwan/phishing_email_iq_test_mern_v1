// Page Commponents
import Home from "./pages/Home"

// Router
import {BrowserRouter, Route, Switch} from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App
