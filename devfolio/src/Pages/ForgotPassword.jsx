import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { sendPasswordResetRequest } from "../services/apiBlog";

// Arrow Left SVG Icon
const ArrowLeftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

// Orange Envelope SVG Icon
const OrangeEnvelopeIcon = () => (
    <div className="w-16 h-16 rounded-full bg-[#FFF5EE] dark:bg-[#2C211A] flex items-center justify-center mb-2 shadow-sm">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    </div>
);

const ForgotPassword = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // 1 = Forgot Password form, 2 = Check email confirmation
    const [submittedEmail, setSubmittedEmail] = useState("");

    async function onSubmit(data) {
        setIsLoading(true);
        try {
            await sendPasswordResetRequest(data.email);
            setSubmittedEmail(data.email);
            toast.success("Reset link sent to " + data.email);
            setStep(2);
        } catch (error) {
            toast.error(error.message || "Failed to send reset link. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleResend = async () => {
        try {
            toast.info("Resending reset link to " + submittedEmail);
            await sendPasswordResetRequest(submittedEmail);
            toast.success("Reset link resent!");
        } catch (error) {
            toast.error(error.message || "Failed to resend reset link.");
        }
    };


    if (step === 1) {
        return (
            <div className="md:px-16 px-8 py-8 flex flex-col mx-auto my-12 
                items-center w-[360px] md:w-[400px] rounded-lg bg-[#FFFFFF] shadow-xl 
                dark:text-white dark:bg-[#141624]">

                {/* Back button */}
                <Link to="/signin" className="self-start flex items-center gap-1.5 text-gray-500 hover:text-gray-700 dark:text-[#97989F] dark:hover:text-white mb-6 text-[14px] transition-colors">
                    <ArrowLeftIcon />
                    <span>Back</span>
                </Link>

                <div className="flex flex-col gap-2 justify-center items-center mb-6 text-center w-full">
                    <h3 className="font-semibold text-2xl">Forgot Password</h3>
                    <p className="text-[14px] text-gray-500 dark:text-[#97989F] leading-relaxed">
                        No worries! Enter your email address below, and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full items-center">
                    <div className="flex flex-col gap-1 w-[300px]">
                        <Label htmlFor="email" className="dark:text-[#97989F] font-medium text-[13px]">
                            Email
                        </Label>
                        {errors?.email?.message && (
                            <small className="text-red-700">{errors.email.message}</small>
                        )}
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px] rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#4B6BFB] text-white w-[300px] h-[40px] rounded-md flex items-center justify-center gap-2 hover:bg-[#3b5bdb] transition-colors font-medium mt-2"
                    >
                        {isLoading ? (
                            <>
                                <SmallSpinner />
                                <span className="text-[14px]">Submitting...</span>
                            </>
                        ) : (
                            <span className="text-[14px]">Submit</span>
                        )}
                    </button>
                </form>
            </div>
        );
    }

    // Step 2: Check Email Page
    return (
        <div className="md:px-16 px-8 py-8 flex flex-col mx-auto my-12 
            items-center w-[360px] md:w-[400px] rounded-lg bg-[#FFFFFF] shadow-xl 
            dark:text-white dark:bg-[#141624] text-center">

            <OrangeEnvelopeIcon />

            <div className="flex flex-col gap-2 justify-center items-center mb-6 mt-4 w-full">
                <h3 className="font-semibold text-2xl">Check your email</h3>
                <p className="text-[14px] text-gray-500 dark:text-[#97989F] leading-relaxed max-w-[280px]">
                    We sent a password reset link to your email. Please check your inbox.
                </p>
            </div>

            <div className="flex flex-col gap-4 w-full items-center mt-2">
                <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4B6BFB] text-white w-[300px] h-[40px] rounded-md flex items-center justify-center hover:bg-[#3b5bdb] transition-colors font-medium text-[14px]"
                >
                    Open Gmail
                </a>

                <p className="text-[13px] text-gray-500 dark:text-[#97989F]">
                    Didn't received the email ?{" "}
                    <button onClick={handleResend} className="text-[#FF6B00] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer">
                        Resend
                    </button>
                </p>

                {/* Demonstration Button to easily test the next page */}
                {/* <button
                    onClick={() => navigate("/reset-password", { state: { email: submittedEmail } })}
                    className="mt-6 border border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-500 text-gray-400 dark:text-gray-500 text-[12px] py-1.5 px-3 rounded bg-transparent transition-colors cursor-pointer"
                >
                    Demo: Go to Reset Password Screen →
                </button> */}
            </div>
        </div>
    );
};

export default ForgotPassword;