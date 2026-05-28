import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    // const { register, handleSubmit, formState } = useForm();
    // const { errors } = formState;



    return (
        <form className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 
    items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl 
    dark:text-white dark:bg-[#141624]">


            <div className="flex flex-col gap-2 justify-center items-center mb-2">
                <h3 className="font-semibold text-2xl">Forgot Password</h3>
                <p className="text-[14px] text-center">No Worries! Enter your email address below, and we'll send you a link to reset your password</p    >
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="dark:text-[97989F]">Email</Label>
                {/* {errors?.username?.message && (
                    <small className="text-red-700">{errors.username.message}</small>
                )} */}
                <Input
                    type="Email"
                    id="email"
                    placeholder="Enter your email"
                    className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px]  w-[300px]"
                />
            </div>

            <div className="w-full flex items-center justify-center flex-col my-4">
                <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                    <small className="text-[16px]"><Link to="/signin">Submit</Link></small>
                </button>

            </div>
        </form>
    )

}

export default ResetPassword