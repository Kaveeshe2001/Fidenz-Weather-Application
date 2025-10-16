import { useState } from "react"
import { Col } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";
import Input from "../../components/ui/Input/Input";
import Form from "../../components/ui/Form/Form";
import PrimaryButton from "../../components/ui/Button/PrimaryButton";
import { initialLoginAPI, verifyMfaAPI } from "../../services/AuthService";

const Login = () => {
  const { handleFinalLogin } = useAuth();
  const [email, setEmail] = useState<string>('mr.kswaduge@gmail.com');
  const [password, setPassword] = useState<string>('Pass#fidenz');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  //for 2 step flow
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaToken, setMfaToken] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInitialLogin = async (e: React.FormEvent) => {
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
      const response = await initialLoginAPI({ email, password });

      if (response) {
          if (response.mfaRequired) {
          setMfaToken(response.mfaToken);
          setMfaRequired(true);
        } else if (response.token) {
          handleFinalLogin(response.token);
        }
      }
    } catch (error) {
      console.error("Initial login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //Call new service for verify-mfa api
      const finalTokenResponse = await verifyMfaAPI({ mfaToken, otp });

      if (finalTokenResponse?.access_token) {
        handleFinalLogin(finalTokenResponse);
      }
    } catch (error) {
      console.error("MFA verification failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {!mfaRequired ? (
        <Form onSubmit={handleInitialLogin}>
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
      ) : (
        //OTP verification
        <Form onSubmit={handleMfaSubmit}>
          <h2 className="auth-title">Enter Verification Code</h2>
          <Col>
            <Input
              label='OTP'
              type='text'
              placeHolder='One-Time Password'
              id='otp'
              name={otp}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Col>
          <div className="auth-btn">
            <PrimaryButton variant="active" text={isLoading ? "Verifying..." : "Verify"} type="submit" />
          </div>
        </Form>
      )}
    </div>
  );
};

export default Login;
