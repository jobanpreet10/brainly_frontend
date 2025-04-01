import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function SignUp() {

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function signup(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/signup` , {
          username,
          password
    })
    navigate("/signin")
    alert("You have SignedUp")

  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded-lg border p-10 shadow-md min-w-48">
       
        <Input ref={usernameRef} placeholder="Username"  />
        <Input ref={passwordRef} placeholder="Password"  />
        <div className="flex justify-center pt-4">
          <Button onClick={signup} loading={false} variant="primary" size="md" text="SignUp" fullWidth={true}>
          </Button>
        </div>
      </div>
    </div>
  );
}
