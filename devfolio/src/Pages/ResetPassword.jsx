import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { styles } from "@/ui_components/styles";
import { EyeOffIcon, EyeIcon } from "@/ui_components/Icons";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { confirmPasswordReset } from "../services/apiBlog";

// Green Success Checkmark SVG Icon
const SuccessCheckmarkIcon = () => (
    <div className="w-16 h-16 rounded-full bg-[#EBF9F1] dark:bg-[#1A2F25] flex items-center justify-center mb-2 shadow-sm animate-bounce">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    </div>
);

const ResetPassword = () => {
    const { register, handleSubmit, formState, watch } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(3); // 3 = Create New Password, 4 = Success Screen
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    // Watch the first password to validate the repeat password
    const newPassword = watch("newPassword");

    async function onSubmit(data) {
        if (!uid || !token) {
            toast.error("Invalid or expired password reset link.");
            return;
        }
        setIsLoading(true);
        try {
            await confirmPasswordReset({
                uid,
                token,
                password: data.newPassword
            });
            toast.success("Password has been successfully updated!");
            setStep(4);
        } catch (error) {
            toast.error(error.message || "Failed to reset password. The link may have expired.");
        } finally {
            setIsLoading(false);
        }
    }


    if (step === 3) {
        return (
            <div className="md:px-16 px-8 py-8 flex flex-col mx-auto my-12 
                items-center w-[360px] md:w-[400px] rounded-lg bg-[#FFFFFF] shadow-xl 
                dark:text-white dark:bg-[#141624]">

                <div className="flex flex-col gap-2 justify-center items-center mb-6 text-center w-full">
                    <h3 className="font-semibold text-2xl">Create a New Password</h3>
                    <p className="text-[14px] text-gray-500 dark:text-[#97989F] leading-relaxed">
                        Enter your new password below to complete the reset process. Ensure it's strong and secure
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full items-center">

                    {/* New Password input */}
                    <div className="flex flex-col gap-1 w-[300px]">
                        <Label htmlFor="newPassword" className="dark:text-[#97989F] font-medium text-[13px]">
                            New Password
                        </Label>
                        <div className="relative w-[300px]">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                placeholder="Enter your password"
                                {...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 10,
                                        message: "Must be at least 10 characters"
                                    }
                                })}
                                className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full pr-10 rounded-lg"
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
                        {errors?.newPassword?.message ? (
                            <small className="text-red-700 font-medium text-[11px] mt-0.5">{errors.newPassword.message}</small>
                        ) : (
                            <p className="text-[12px] text-gray-400 dark:text-[#97989F] mt-0.5">Must be at least 10 characters.</p>
                        )}
                    </div>

                    {/* Repeat Password input */}
                    <div className="flex flex-col gap-1 w-[300px]">
                        <Label htmlFor="repeatPassword" className="dark:text-[#97989F] font-medium text-[13px]">
                            Repeat new Password
                        </Label>
                        <div className="relative w-[300px]">
                            <Input
                                type={showRepeatPassword ? "text" : "password"}
                                id="repeatPassword"
                                placeholder="Enter your password"
                                {...register("repeatPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) => value === newPassword || "Passwords do not match"
                                })}
                                className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full pr-10 rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => setShowRepeatPassword((s) => !s)}
                                style={styles.eyeBtn}
                                aria-label={showRepeatPassword ? "Hide password" : "Show password"}
                            >
                                {showRepeatPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {errors?.repeatPassword?.message && (
                            <small className="text-red-700 font-medium text-[11px] mt-0.5">{errors.repeatPassword.message}</small>
                        )}
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

    // Step 4: Success Message Page
    return (
        <div className="md:px-16 px-8 py-8 flex flex-col mx-auto my-12 
            items-center w-[360px] md:w-[400px] rounded-lg bg-[#FFFFFF] shadow-xl 
            dark:text-white dark:bg-[#141624] text-center">

            <SuccessCheckmarkIcon />

            <div className="flex flex-col gap-2 justify-center items-center mb-6 mt-4 w-full">
                <h3 className="font-semibold text-2xl max-w-[280px] leading-tight">Your password has been successfully reset!</h3>
                <p className="text-[14px] text-gray-500 dark:text-[#97989F] leading-relaxed max-w-[280px]">
                    ou can now log in with your new password. If you encounter any issues, please contact support
                </p>
            </div>

            <div className="flex flex-col gap-4 w-full items-center mt-2">
                <button
                    onClick={() => navigate("/signin")}
                    className="bg-[#4B6BFB] text-white w-[300px] h-[40px] rounded-md flex items-center justify-center hover:bg-[#3b5bdb] transition-colors font-medium text-[14px]"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
