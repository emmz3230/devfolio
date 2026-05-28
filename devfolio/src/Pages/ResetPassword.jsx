// import React, { useState } from 'react'
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link } from 'react-router-dom';

// const ResetPassword = () => {
//     // const { register, handleSubmit, formState } = useForm();
//     // const { errors } = formState;



//     return (
//         <div>
//             <div className="flex flex-col gap-2 justify-center items-center mb-2">
//                 <h3 className="font-semibold text-2xl">Reset Password</h3>
//                 <p className="text-[14px]">Enter the code sent to your Email to reset password  </p    >
//             </div>

//             <div className="flex flex-col gap-1">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                     type="Email"
//                     id="email"
//                     placeholder="Enter your email"
//                     className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px]  w-[300px]"
//                 />
//             </div>

//             <div className="w-full flex items-center justify-center flex-col my-4">
//                 <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
//                     <small className="text-[16px]"><Link to="/signin">Submit</Link></small>
//                 </button>

//             </div>
//         </div>
//     )

// }

// export default ResetPassword











import { useState, useRef, useCallback } from "react";

const RULES = [
    { id: "lower", label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
    { id: "min", label: "Minimum 8 characters", test: (v) => v.length >= 8 },
    { id: "upper", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { id: "num", label: "At least one number", test: (v) => /[0-9]/.test(v) },
];

const OTP_LENGTH = 6;

export default function ResetPassword({ email = "info@pixsellz.io", onSubmit, onCancel }) {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [otpVerified, setOtpVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputRefs = useRef([]);

    // ── OTP handlers ──────────────────────────────────────────────────────────

    const verifyOtp = useCallback((digits) => {
        // Replace with real API call
        return digits.join("").length === OTP_LENGTH;
    }, []);

    const handleOtpChange = (index, value) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);
        setOtpVerified(verifyOtp(next));
        if (digit && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const digits = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH)
            .split("");
        const next = Array(OTP_LENGTH)
            .fill("")
            .map((_, i) => digits[i] ?? "");
        setOtp(next);
        setOtpVerified(verifyOtp(next));
        const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);
        inputRefs.current[focusIndex]?.focus();
    };

    // ── Derived state ──────────────────────────────────────────────────────────

    const ruleResults = RULES.map((r) => ({ ...r, pass: r.test(password) }));
    const allRulesPass = ruleResults.every((r) => r.pass);
    const canSubmit = otpVerified && allRulesPass;

    // ── Submit ─────────────────────────────────────────────────────────────────

    const handleSubmit = () => {
        if (!canSubmit) return;
        onSubmit?.({ otp: otp.join(""), password });
    };

    // ── Render ─────────────────────────────────────────────────────────────────

    // OTP inputs: insert a separator dot after index 2
    const otpSlots = otp.reduce((acc, val, i) => {
        if (i === 3) acc.push(<span key="dot" style={styles.dot}>·</span>);
        acc.push(
            <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                style={styles.otpInput}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onPaste={handleOtpPaste}
                aria-label={`Digit ${i + 1}`}
            />
        );
        return acc;
    }, []);

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>Reset password</h2>
            <p style={styles.subtitle}>
                Enter the code sent to <strong>{email}</strong> to reset your password.
            </p>

            {/* OTP row */}
            <div style={styles.otpRow}>{otpSlots}</div>

            {/* Verified status */}
            <div style={styles.verifiedRow} aria-live="polite">
                {otpVerified && (
                    <>
                        <CheckIcon color="#1D9E75" />
                        <span style={styles.verifiedText}>Code verified</span>
                    </>
                )}
            </div>

            <hr style={styles.divider} />

            {/* Password field */}
            <label style={styles.fieldLabel} htmlFor="new-password">
                New password
            </label>
            <div style={styles.pwWrap}>
                <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    style={styles.pwInput}
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={styles.eyeBtn}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>

            {/* Rules checklist */}
            <ul style={styles.ruleList} aria-label="Password requirements">
                {ruleResults.map((r) => (
                    <li key={r.id} style={styles.rule(r.pass)}>
                        {r.pass ? <CheckIcon color="#1D9E75" /> : <XIcon />}
                        <span>{r.label}</span>
                    </li>
                ))}
            </ul>

            {/* Actions */}
            <div style={styles.btnRow}>
                <button type="button" onClick={onCancel} style={styles.cancelBtn}>
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    style={styles.submitBtn(canSubmit)}
                >
                    Reset password
                </button>
            </div>
        </div>
    );
}

// ── Inline styles ────────────────────────────────────────────────────────────

const styles = {
    card: {
        maxWidth: 380,
        margin: "2rem auto",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: "2rem 1.75rem",
        fontFamily: "'DM Sans', sans-serif",
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        color: "#111827",
        margin: "0 0 6px",
    },
    subtitle: {
        fontSize: 14,
        color: "#6b7280",
        margin: "0 0 1.25rem",
        lineHeight: 1.5,
    },
    otpRow: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        marginBottom: "0.75rem",
    },
    otpInput: {
        width: 44,
        height: 48,
        border: "1px solid #d1d5db",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 600,
        color: "#111827",
        outline: "none",
        background: "#fff",
    },
    dot: {
        fontSize: 20,
        color: "#9ca3af",
        userSelect: "none",
    },
    verifiedRow: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        minHeight: 24,
        marginBottom: "1rem",
    },
    verifiedText: {
        color: "#1D9E75",
        fontWeight: 500,
    },
    divider: {
        border: "none",
        borderTop: "1px solid #f3f4f6",
        margin: "0 0 1.25rem",
    },
    fieldLabel: {
        display: "block",
        fontSize: 13,
        fontWeight: 500,
        color: "#374151",
        marginBottom: 6,
    },
    pwWrap: {
        position: "relative",
        marginBottom: 0,
    },
    pwInput: {
        width: "100%",
        boxSizing: "border-box",
        height: 42,
        border: "1px solid #d1d5db",
        borderRadius: 10,
        padding: "0 42px 0 12px",
        fontSize: 14,
        color: "#111827",
        background: "#fff",
        outline: "none",
    },
    eyeBtn: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#9ca3af",
        padding: 0,
        display: "flex",
        alignItems: "center",
    },
    ruleList: {
        listStyle: "none",
        padding: 0,
        margin: "12px 0 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    rule: (pass) => ({
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: pass ? "#1D9E75" : "#9ca3af",
    }),
    btnRow: {
        display: "flex",
        gap: 10,
    },
    cancelBtn: {
        flex: 1,
        height: 40,
        background: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: 10,
        cursor: "pointer",
        fontSize: 14,
        color: "#374151",
        fontWeight: 500,
    },
    submitBtn: (active) => ({
        flex: 2,
        height: 40,
        background: active ? "#1D9E75" : "#f3f4f6",
        border: "none",
        borderRadius: 10,
        cursor: active ? "pointer" : "not-allowed",
        fontSize: 14,
        color: active ? "#fff" : "#9ca3af",
        fontWeight: 500,
        transition: "background 0.15s, color 0.15s",
    }),
};

// ── Tiny SVG icons ────────────────────────────────────────────────────────────

function CheckIcon({ color = "currentColor" }) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8l3.5 3.5L13 5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 5l6 6M11 5l-6 6" stroke="#d1d5db" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}
