"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Admin credentials (in a real app, these should be from a secure backend)
    const admin = {
        email: "admin@gmail.com",
        password: "123" // In production, use proper password hashing
    };

    // Check if already logged in (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('islogined')) {
            router.push('/food');
        }
    }, [router]);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic validation
        if (!email || !password) {
            alert('Please enter both email and password');
            setIsLoading(false);
            return;
        }

        // Clear any existing auth
        localStorage.removeItem('islogined');
        localStorage.removeItem('canedit');

        // Authentication check
        if (email === admin.email && password === admin.password) {
            // Set auth flags (in a real app, use proper session tokens)
            localStorage.setItem('islogined', 'true');
            
            // Redirect to protected page
            router.push('/food');
        } else {
            alert('Invalid credentials. Please try again.');
        }

        setIsLoading(false);
    }

    const handleReset = () => {
        setEmail("");
        setPassword("");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Admin Login</h1>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-semibold cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg font-semibold"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;