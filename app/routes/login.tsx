import React, { useEffect, useState } from 'react';
import { Form } from "react-router";
import axios from "axios";
//import LoginDetails from "src/backend/access_database";

interface user{
    userName: string;
    password: string;
    email: string;
    money: 0.00;
};
     
export default function Login(this: any){
    return (
        <>
            <div className = "flex w-full h-screen">
                <div className = "w-full flex items-center justify-center lg:w-1/2">
                    <div className ="bg-white px-10 py-20 rounded-3xl border-3 border-gray-300">
                        <form action="#" method="POST" className="space-y-6">
                        <h1 className ="text-5xl font-semibold"> Welcome back!</h1>
                        <p className ="font-medium text-lg text-gray-700 mt-4"> Sign in to your account</p>
                        <div className = "mt-8">
                            <div>
                                <label className="text-lg font-medium"> Email </label>
                                <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        <div>
                            <label className="text-lg font-medium"> Password </label>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <div className="mt-8 flex justify-between items-center ">
                            <div>
                                <input 
                                    type="checkbox"
                                    id="remember"
                                />
                                <label className = "ml-2 font-medium text-base" htmlFor="remember"> Remember for 30 days </label>
                            </div>
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> Forgot password?</a>
                        </div>
                        <div className = "mt-8 flex flex-col gap-y-4 ">
                            <button
                                type="submit" 
                                className = "active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2.5 rounded-xl bg-violet-500 text-white text-lg font-bold"                            
                            > 
                             Sign in
                            </button>

                            <button  className="flex items-center justify-center border-2 border-b-gray-400 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl"> 
                            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Sign in with Google">
                                <title>Google logo</title>
                                <path d="M12 2a10 10 0 1 0 7.07 17.07l-2.91-2.37A6.5 6.5 0 1 1 18.5 12h-6.5v3.5h10A10 10 0 0 0 12 2z" fill="#4285F4"/>
                                <path d="M3.15 7.14l2.83 2.07A6.5 6.5 0 0 1 12 5.5c1.71 0 3.25.63 4.45 1.65l2.87-2.22A10 10 0 0 0 12 2a10 10 0 0 0-8.85 5.14z" fill="#34A853"/>
                                <path d="M12 22a9.93 9.93 0 0 0 7-2.77l-2.91-2.37A6.48 6.48 0 0 1 12 18.5a6.48 6.48 0 0 1-5.97-4.14l-2.88 2.23A10 10 0 0 0 12 22z" fill="#FBBC05"/>
                                <path d="M21.5 12c0-.83-.08-1.63-.24-2.41H12v4.91h5.35a4.6 4.6 0 0 1-2 3.03l2.91 2.37A9.96 9.96 0 0 0 21.5 12z" fill="#EA4335"/>
                            </svg>
                                Sign in with Google
                            </button>
                        </div>
                            <div className="mt-8 flex justify-center items-center">
                                <p className="font-medium-text-base"> Don't have an account?</p>
                                <button className="text-violet-500 text-base font-medium ml-2"> 
                                    
                                <a href = "signupform"> Sign up</a>
                                </button>
                            </div>
                            </div>
                        </form>
                </div>
                        <Form />
                    </div>
                    <div className = "hidden relative lg:flex items-center justify-center h-full w-1/2 bg-gray-200">
                        <div className = "w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"> </div>
                        <div className = "w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
                    </div>
                </div>
        </>
    );
}