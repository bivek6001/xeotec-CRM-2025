import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleLogin = async () => {
    setError("");
    try {
      const response = await authService.login({ email, password });

      if (response.status === 200) {
        setIsOtpSent(true); // Show OTP input
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    try {
      const response = await authService.verifyOtp({ email, otp });

      if (response.status === 200) {
        navigate("/super-admin-dashboard"); // Redirect on success
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Super Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isOtpSent ? (
              <>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {!isOtpSent ? (
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button className="w-full" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
