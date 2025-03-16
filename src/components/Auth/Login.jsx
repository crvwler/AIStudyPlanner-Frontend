import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in with:", { email, password });
        // TODO: Implement authentication logic
        navigate("/dashboard");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input type="email" placeholder="Email" className="w-full p-2 border mb-3"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full p-2 border mb-3"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
                <p className="mt-2 text-sm">
                    Don't have an account? <a href="/register" className="text-blue-500">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
