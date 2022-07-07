import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AddPage from './pages/AddPage/AddPage';
import HomePage from './pages/HomePage/HomePage';
import NotLoggedPage from './pages/NotLoggedPage/NotLoggedPage';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Footer from './components/Footer/Footer';

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
      <Footer />
    </div>
  );
}

export default App;
