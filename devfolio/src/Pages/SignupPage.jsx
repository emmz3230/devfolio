import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser, updateProfile } from "@/services/apiBlog";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { styles } from "@/ui_components/styles";
import { CheckIcon, EyeOffIcon, EyeIcon, XIcon } from "@/ui_components/Icons";
import { Link } from "react-router-dom";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import InputError from "@/ui_components/InputError";
import { Textarea } from "@/components/ui/textarea";


const RULES = [
    { id: "lower", label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
    { id: "min", label: "Minimum 8 characters", test: (v) => v.length >= 8 },
    { id: "upper", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { id: "num", label: "At least one number", test: (v) => /[0-9]/.test(v) },
];



const SignupPage = ({ updateForm, userInfo, toggleModal }) => {

    const queryClient = useQueryClient();

    const { register, handleSubmit, formState, reset, watch } = useForm({ defaultValues: userInfo ? userInfo : " " });
    const { errors } = formState;

    const password = watch("password");

    const updateProfileMutation = useMutation({
        mutationFn: (data) => updateProfile(data),
        onSuccess: () => {
            toast.success("Profile updated successfully!")
            toggleModal()
            queryClient.invalidateQueries({ queryKey: ["users", userInfo?.username] })
        },

        onError: (err) => {
            toast.error(err.message)
        }
    })

    const mutation = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: () => {
            toast.success("You have successfully created an account!!!");
            reset();
        },

        onError: (err) => {
            toast.error("An error occurred");
        },
    });

    function onSubmit(data) {
        if (updateForm) {
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            formData.append("job_title", data.job_title);
            formData.append("bio", data.bio);

            if (data.profile_picture && data.profile_picture[0]) {
                formData.append("profile_picture", data.profile_picture[0])
            }

            updateProfileMutation.mutate(formData)

        } else {
            mutation.mutate(data);
        }
        // console.log(data)
    }

    const [passwordCheck, setPasswordCheck] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const ruleResults = RULES.map((r) => ({ ...r, pass: r.test(passwordCheck) }));
    const allRulesPass = ruleResults.every((r) => r.pass);



    return (
        <form
            className={`${updateForm && "h-[90%] overflow-auto"} "md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]"`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-2 justify-center items-center mb-2">
                <h3 className="font-semibold text-2xl">{updateForm ? "Update Profile Form" : "SignUp Form"}</h3>
                <p>{updateForm ? "You can tell us more about you" : "Create your account to get started!"}</p>
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
                {errors?.first_name?.message && (
                    <InputError message={errors.first_name.message} />
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="last_name">Last Name</Label>

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
                {errors?.last_name?.message && (
                    <InputError message={errors.last_name.message} />
                )}
            </div>
            {updateForm && <div>
                <Label htmlFor="job_title" className="dark:text-[97989F]">
                    Job Title
                </Label>
                <Input
                    type="text"
                    id="job_title"
                    placeholder="Enter Job Title"
                    {...register("job_title", {
                        required: "Your job title is required",
                        minLength: {
                            value: 3,
                            message: "Your job title must be at least 3 characters",
                        },
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
                />
                {errors?.job_title?.message && (
                    <InputError error={errors.job_title.message} />
                )}
            </div>}

            {updateForm && <div>
                <Label htmlFor="content">Bio</Label>
                <Textarea
                    id="content"
                    placeholder="Tell us more about you"
                    {...register("bio", {
                        required: "Your bio is required",
                        minLength: {
                            value: 10,
                            message: "The content must be at least 10 characters",
                        },
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[300px] text-justify"
                />
                {errors?.bio?.message && (
                    <InputError error={errors.bio.message} />
                )}
            </div>}

            {updateForm && <div className="w-full">
                <Label htmlFor="profile_picture">Profile Picture</Label>
                <Input
                    type="file"
                    id="picture"
                    {...register("profile_picture", {
                        required: false,
                    })}
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
                />

                {/* {errors?.profile_picture?.message && (
          <InputError error={errors.profile_picture.message} />
        )} */}
            </div>}




            {!updateForm && <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>

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
                    {errors?.password?.message && (
                        <InputError message={errors.password.message} />
                    )}
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        style={styles.eyeBtn}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>}


            {updateForm || <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                    {errors?.confirmPassword?.message && (
                        <InputError message={errors.confirmPassword.message} />
                    )}
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        style={styles.eyeBtn}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>}

            {!updateForm && <ul style={styles.ruleList} aria-label="Password requirements">
                {ruleResults.map((r) => (
                    <li key={r.id} style={styles.rule(r.pass)}>
                        {r.pass ? <CheckIcon color="#1D9E75" /> : <XIcon />}
                        <span>{r.label}</span>
                    </li>
                ))}
            </ul>}






            <div className="w-full flex items-center justify-center flex-col my-4">
                {updateForm ?
                    <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                        {updateProfileMutation.isPending ? (
                            <>
                                {" "}
                                <SmallSpinner />{" "}
                                <SmallSpinnerText text="Updating  user..." />{" "}
                            </>
                        ) : (
                            <SmallSpinnerText text="Update user profile" />
                        )}
                    </button>
                    :
                    <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                        {mutation.isPending ? (
                            <>
                                {" "}
                                <SmallSpinner />{" "}
                                <SmallSpinnerText text="Creating user..." />{" "}
                            </>
                        ) : (
                            <SmallSpinnerText text="Create Account" />
                        )}
                    </button>}
                <p className="text-[14px]">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </form>
    );
};

export default SignupPage;


