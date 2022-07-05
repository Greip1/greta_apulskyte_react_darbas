import { Link } from 'react-router-dom';

export default function NotLoggedPage() {
  return (
    <div>
      <h2>Prisijunkite, noredami matyti turini</h2>
      <Link to={'/login'}>
        <button>Login</button>
      </Link>
    </div>
  );
}
