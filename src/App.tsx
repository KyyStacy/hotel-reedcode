import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
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
        <ProtectedRoute exact path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/admin/dashboard" allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
        <ProtectedRoute exact path="/receptionist/dashboard" allowedRoles={['receptionist']}>
          <ReceptionistDashboard />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
