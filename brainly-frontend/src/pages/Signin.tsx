import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { data, useNavigate } from "react-router-dom";


export function Signin() {

    
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate  = useNavigate();
    async function signin() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
    
            if (!username || !password) {
                alert("Username and Password are required!");
                return;
            }
    
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });
    
            // Correct way to access the token
            const jwt = response.data.token;  
            navigate("/dashboard");
            localStorage.setItem("token", jwt);
            console.log("JWT Token:", jwt);
            alert("You have Signed IN Successfully!");
    
        } catch (error) {
            console.error("Signin Error:", error);
            alert("Signin failed. Please try again.");
        }
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded-lg border p-10 shadow-md min-w-48">
       
        <Input ref={usernameRef} placeholder="Username"  />
        <Input ref={passwordRef} placeholder="Password"  />
        <div className="flex justify-center pt-4">
          <Button onClick={signin} loading={false} variant="primary" size="md" text="Signin" fullWidth={true}>
          </Button>
        </div>
      </div>
    </div>
  );
}
