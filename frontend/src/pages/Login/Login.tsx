import { useState } from "react"
import Form from "../../components/Form/Form";
import { Col } from "react-bootstrap";
import Input from "../../components/Input/Input";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { useAuth } from "../../providers/AuthProvider";

const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState<string>('careers@fidenz.com');
  const [password, setPassword] = useState<string>('Pass#fidenz');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors: {email?: string; password?: string;} = {};

    if (!email) {
        newErrors.email = "Email is required";
    }

    if (!password) {
        newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    } 

    try {
      await loginUser({email, password});
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Form onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>
        <Col md={6} className="mb-20">
            <Input
              label='Email'
              type='email'
              placeHolder='example@gmail.com'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
        </Col>
        <Col md={6}>
            <Input
                label='Password'
                type='password'
                placeHolder='Password@123'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
            />
        </Col>
        <div className="auth-btn">
          <PrimaryButton variant="active" text={isLoading ? "Logging in..." : "Login"} type="submit" />
        </div>
      </Form>
    </div>
  );
};

export default Login;
