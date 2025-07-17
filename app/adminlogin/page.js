"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const admin = { email: "admin@gmail.com", password: "123" };
    const [canedit, setCanedit] = useState(false);

    useEffect(() => {
        // This code only runs on the client side
        if (localStorage.getItem('isadminlogined')) {
            router.push('/food');
        }
    }, [router]);

    const login = (e) => {
        e.preventDefault();
        console.log('hi');
        console.log(email);
        console.log(password);
        
        localStorage.removeItem('isadminlogined');
        localStorage.removeItem('canedit');
        
        if (email === admin.email && password === admin.password) {
            localStorage.setItem('isadminlogined', 'true');
            setCanedit(true);
            localStorage.setItem('canedit', 'true');
            router.push('/food');
        } else {
            alert('Wrong Password. Cannot login');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Login</h1>
                <form onSubmit={login} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
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
                            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-semibold cursor-pointer"
                        >
                            Login
                        </button>
                        <button
                            type="reset"
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