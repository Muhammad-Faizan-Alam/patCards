'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email || !password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res.error) {
            setError(res.error);
        } else {
            router.push("/");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                maxWidth: "400px",
                width: "100%",
                padding: "32px",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
                background: "#fff"
            }}>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: "24px",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#2563eb",
                    letterSpacing: "1px"
                }}>Login</h1>
                {error && (
                    <div style={{
                        background: "#fee2e2",
                        color: "#b91c1c",
                        padding: "10px",
                        borderRadius: "6px",
                        marginBottom: "18px",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "18px" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, color: "#374151" }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border 0.2s",
                                background: "#f9fafb"
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, color: "#374151" }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border 0.2s",
                                background: "#f9fafb"
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: loading ? "#93c5fd" : "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            cursor: loading ? "not-allowed" : "pointer",
                            marginBottom: "10px",
                            transition: "background 0.2s"
                        }}
                    >
                        {loading ? (
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg style={{ marginRight: 8 }} width="20" height="20" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="#fff"
                                        strokeWidth="4"
                                        style={{ opacity: 0.25 }}
                                    />
                                    <path
                                        fill="#fff"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    >
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 12 12"
                                            to="360 12 12"
                                            dur="0.8s"
                                            repeatCount="indefinite"
                                        />
                                    </path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <div style={{ textAlign: "center", marginTop: "18px" }}>
                    <span style={{ color: "#6b7280" }}>Don't have an account? </span>
                    <a
                        href="/signup"
                        style={{
                            color: "#2563eb",
                            fontWeight: "bold",
                            textDecoration: "underline",
                            cursor: "pointer"
                        }}
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    )
}

export default page