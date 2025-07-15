'use client';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';

const page = () => {
    const { data: session } = useSession();
    console.log("Session Data:", session);
    
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
        >
            <header
                style={{
                    width: "100%",
                    background: "rgba(31, 41, 55, 0.95)",
                    boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
                    padding: "24px 0 20px 0",
                    marginBottom: "40px",
                }}
            >
                <div
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 24px",
                    }}
                >
                    <div
                        style={{
                            color: "#fff",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                            fontFamily: "cursive",
                        }}
                    >
                        ☀️ MyApp
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                        {session ? (
                            <>
                                <span
                                    style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        background: "rgba(255,255,255,0.15)",
                                        padding: "6px 16px",
                                        borderRadius: "999px",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {session.user?.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: "linear-gradient(90deg, #f87171 0%, #fbbf24 100%)",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "999px",
                                        padding: "8px 22px",
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        transition: "background 0.2s",
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textDecoration: "underline",
                                        fontSize: "1rem",
                                        marginRight: "10px",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    Login
                                </a>
                                <a
                                    href="/signup"
                                    style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textDecoration: "underline",
                                        fontSize: "1rem",
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    Sign Up
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <main
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto",
                    background: "rgba(255,255,255,0.85)",
                    borderRadius: "18px",
                    boxShadow: "0 8px 32px rgba(251,191,36,0.15)",
                    padding: "48px 32px",
                    marginTop: "40px",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.2rem",
                        fontWeight: "bold",
                        color: "#be185d",
                        marginBottom: "18px",
                        fontFamily: "cursive",
                    }}
                >
                    {session
                        ? `Welcome back, ${session.user?.email?.split('@')[0] || 'User'}!`
                        : "Welcome to MyApp"}
                </h2>
                <p
                    style={{
                        color: "#92400e",
                        fontSize: "1.15rem",
                        marginBottom: "10px",
                        fontWeight: 500,
                    }}
                >
                    {session
                        ? "Enjoy your warm and beautiful dashboard."
                        : "Please login or sign up to continue."}
                </p>
            </main>
        </div>
    );
};

export default page;