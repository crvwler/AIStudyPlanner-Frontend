import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Registering with:", formData);
        // TODO: Implement API call for registration
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border mb-3"
                    value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" className="w-full p-2 border mb-3"
                    value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" className="w-full p-2 border mb-3"
                    value={formData.password} onChange={handleChange} />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    Register
                </button>
                <p className="mt-2 text-sm">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
