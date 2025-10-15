import { useState } from "react"
import Form from "../../components/Form/Form";

const Login = () => {
  const [email, setEmail] = useState<string>('careers@fidenz.com');
  const [password, setPassword] = useState<string>('Pass#fidenz');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {email?: string; password?: string;} = {};

    if (!email) {
        newErrors.email = "Email is required";
    }

    if (!password) {
        newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        setErrors({});
    }
  };

  return (
    <div className="auth-container">
      <Form onSubmit={handleSubmit}></Form>
    </div>
  )
}

export default Login
