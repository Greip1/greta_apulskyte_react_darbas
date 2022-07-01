import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddPage from './pages/AddPage';
import HomePage from './pages/HomePage';
import NotLoggedPage from './pages/NotLoggedPage';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={'/register'}>
          <RegisterPage />
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <ProtectedRoute path={'/home'}>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path={'/add'}>
          <AddPage />
        </ProtectedRoute>

        <Route path={'*'}>
          <NotLoggedPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
