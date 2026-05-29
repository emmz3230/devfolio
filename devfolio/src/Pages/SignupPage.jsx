import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/apiBlog";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { styles } from "@/ui_components/styles";
import { CheckIcon, EyeOffIcon, EyeIcon, XIcon } from "@/ui_components/Icons";
import { Link } from "react-router-dom";


const RULES = [
    { id: "lower", label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
    { id: "min", label: "Minimum 8 characters", test: (v) => v.length >= 8 },
    { id: "upper", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { id: "num", label: "At least one number", test: (v) => /[0-9]/.test(v) },
];



const SignupPage = () => {
    const { register, handleSubmit, formState, reset, watch } = useForm();
    const { errors } = formState;

    const password = watch("password");

    const mutation = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: () => {
            toast.success("You have successfully created an account!!!");
            reset();
        },

        onError: (err) => {
            toast.error(err.message);
        },
    });

    function onSubmit(data) {
        mutation.mutate(data);
        // console.log(data)
    }

    const [passwordCheck, setPasswordCheck] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const ruleResults = RULES.map((r) => ({ ...r, pass: r.test(passwordCheck) }));
    const allRulesPass = ruleResults.every((r) => r.pass);



    return (
        <form
            className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
                <h3 className="font-semibold text-2xl">SignUp Form</h3>
                <p>Create your account to get started!</p>
            </div>


            <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="dark:text-[97989F]">
                    email
                </Label>
                {errors?.email?.message && (<small className="text-red-700">{errors.email.message}</small>)}
                <Input
                    type="text"
                    id="email"
                    placeholder="Enter email"
                    {...register("email",
                        {
                            required: "email is required",
                            minLength: {
                                value: 3,
                                message: "email must be at least 3 characters",
                            },
                        })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
            </div>


            <div className="flex flex-col gap-1">
                <Label htmlFor="username" className="dark:text-[97989F]">
                    Username
                </Label>
                {errors?.username?.message && (<small className="text-red-700">{errors.username.message}</small>)}
                <Input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    {...register("username",
                        {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Username must be at least 3 characters",
                            },
                        })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="first_name">First Name</Label>
                {errors?.first_name?.message && (
                    <small className="text-red-700">{errors.first_name.message}</small>
                )}
                <Input
                    type="text"
                    id="first_name"
                    placeholder="Enter first name"
                    {...register("first_name", {
                        required: "Firstname is required",
                        minLength: {
                            value: 3,
                            message: "Firstname must be at least 3 characters",
                        },
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="last_name">Last Name</Label>
                {errors?.last_name?.message && (
                    <small className="text-red-700">{errors.last_name.message}</small>
                )}
                <Input
                    type="text"
                    id="last_name"
                    placeholder="Enter last name"
                    {...register("last_name", {
                        required: "Lastname is required",
                        minLength: {
                            value: 3,
                            message: "Lastname must be at least 3 characters",
                        },
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                {errors?.password?.message && (
                    <small className="text-red-700">{errors.password.message}</small>
                )}
                <div className="relative w-[300px]">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                            onChange: (e) => setPasswordCheck(e.target.value)
                        })}
                        className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full pr-10"
                        value={passwordCheck}
                        autoComplete="password"
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
            </div>


            <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                {errors?.confirmPassword?.message && (
                    <small className="text-red-700">
                        {errors.confirmPassword.message}
                    </small>
                )}
                <div className="relative w-[300px]">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirm password"
                        {...register("confirmPassword", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                        className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        style={styles.eyeBtn}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>

            <ul style={styles.ruleList} aria-label="Password requirements">
                {ruleResults.map((r) => (
                    <li key={r.id} style={styles.rule(r.pass)}>
                        {r.pass ? <CheckIcon color="#1D9E75" /> : <XIcon />}
                        <span>{r.label}</span>
                    </li>
                ))}
            </ul>






            <div className="w-full flex items-center justify-center flex-col my-4">
                <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                    {mutation.isPending ? (
                        <>
                            {" "}
                            <SmallSpinner />{" "}
                            <small className="text-[16px]">Creating user...</small>{" "}
                        </>
                    ) : (
                        <small className="text-[16px]">Signup</small>
                    )}
                </button>
                <p className="text-[14px]">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </form>
    );
};

export default SignupPage;


