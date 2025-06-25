
import { Box } from '@mui/material';
import LoginForm from '../_component/Login/Login';

export default function LoginPage() {
  return (
  <Box display={"flex"}>
      <h1>Login</h1>
      <LoginForm />
    </Box>
  );
}