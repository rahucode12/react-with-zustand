
import LoginForm from '../_component/Login/Login';

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}