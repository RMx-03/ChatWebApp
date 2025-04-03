import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [currentState, setCurrentState] = useState("Sign Up");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            let response;
            if (currentState === "Sign Up") {
                response = await axios.post("/api/auth/signup", {
                    fullName: userName,
                    email,
                    password,
                });
            } else {
                response = await axios.post("/api/auth/login", {
                    email,
                    password,
                });
            }
            
            console.log("Success:", response.data);
            // You can store user details in localStorage/sessionStorage or state
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-[#001030]" >
            <div className="flex flex-col md:flex-row items-center justify-evenly w-full max-w-4xl p-6">                
                <form 
                    onSubmit={handleSubmit}
                    className="bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col gap-5 w-full max-w-sm"
                >
                    <h2 className="text-xl font-semibold text-gray-800">{currentState}</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    
                    {/* Username (Only for Sign Up) */}
                    {currentState === "Sign Up" && (
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Username"
                            className="p-2 border border-gray-300 rounded-md outline-blue-500"
                            required
                        />
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="p-2 border border-gray-300 rounded-md outline-blue-500"
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="p-2 border border-gray-300 rounded-md outline-blue-500"
                        required
                    />

                    {/* Submit Button */}
                    <button type="submit" className="p-3 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition">
                        {currentState === "Sign Up" ? "Create Account" : "Login Now"}
                    </button>

                    {/* Terms & Conditions */}
                    <div className="flex items-center text-sm text-gray-500">
                        <input type="checkbox" className="mr-2" required />
                        <p>Agree to the terms of use and privacy policy.</p>
                    </div>

                    {/* Toggle Login/Signup */}
                    <div className="text-sm text-gray-600">
                        {currentState === "Sign Up" ? (
                            <p>
                                Already have an account?{" "}
                                <span onClick={() => setCurrentState("Login")} className="text-blue-500 font-medium cursor-pointer">Click here</span>
                            </p>
                        ) : (
                            <p>
                                Don&apos;t have an account?{" "}
                                <span onClick={() => setCurrentState("Sign Up")} className="text-blue-500 font-medium cursor-pointer">Click here</span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
