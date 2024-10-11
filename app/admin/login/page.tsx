"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === 'admin@example.com' && password === 'password') {
            router.push('/admin/dashboard');
        } else {
            alert('Incorrect credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border rounded w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 border rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default LoginPage;