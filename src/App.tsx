import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/booking/:id">
        <Booking />
      </Route>
      <Route exact path="/payment">
        <Payment />
      </Route>
      <Route exact path="/confirmation">
        <Confirmation />
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  </Router>
);

export default App;
