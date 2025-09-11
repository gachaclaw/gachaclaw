import React, { useEffect, useState } from 'react';
import { Form, redirect, useNavigate, type MetaFunction } from "react-router";
import axios from "axios";
import type { Route } from './+types/login';
import { toast } from 'react-toastify';
//import LoginDetails from "src/backend/access_database";
import { useAuth } from "src/context/UserContext";
import { useCurrency, CurrencyProvider } from "src/context/CurrencyContext"
import { fetchUserStats } from "src/context/fetchUserStats";
import { clearUserStorage, setUserStorage } from "src/context/storage";


interface userType{
    userName: string;
    password: string;
    email: string;
    money: 0.00;
    prizes_won: number;
};

export const meta: MetaFunction = () => {
    return [
        { title: "GachaClaw React Router App"},
        { name: "description", content: "GachaClaw metafunction."}
    ]
}

// checks if the user is already logged in 
export async function loader({ request }: Route.LoaderArgs){
    /*
    const userId = await getUserId(request);
    if (userId){
        return redirect("/");
    }
    */
}

export async function action({ request }: Route.ActionArgs){
    try{
        const formData = await request.formData();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        // checks user credentials
    }catch(e){
        console.log(`error: ${e}`)
    }
}

const URL = `${import.meta.env.VITE_API_URL}/api/auth/login/`;

const Login = (props: any) => {
    let navigate = useNavigate();
    //const { isLoggedIn, setIsLoggedIn, setName, setEmail } = props;
    const { isLoggedIn, setIsLoggedIn, setName, setEmail } = useAuth();
    /*
    useEffect(() => {
        if (isLoggedIn) navigate("profile");
    });
    */
    const { setCurrency, setPrizesWon, resetContext, setGamesPlayed, setCreditsSpent } = useCurrency();
    const { setProfilePictureUrl } = useAuth();
    
    useEffect(() => {
      clearUserStorage();
      setIsLoggedIn(false);
      setEmail("");
      setName("");
      resetContext?.(); // Reset currency context when entering login page
    }, []);

    const handleLogin = async (ev: any) => {
  ev.preventDefault();
  const email = ev.target.email.value;
  const password = ev.target.password.value;
  const formData = { email, password };

  try {
    const res = await axios.post(URL, formData);
    const data = res.data;

    if (data.success === true) {
      toast.success(data.message);

      // Fetch user stats
      const {
        credits,
        prizes_won,
        games_played,
        credits_spent,
      } = await fetchUserStats(email);

      // Store stats in localStorage
      setUserStorage({
        email,
        username: data.username,
        authToken: data.token,
        profilePictureUrl: data.avatar_url,
        prizes_won,
        credits,
        games_played,
        credits_spent,
      });

      if (data.avatar_url) {
        localStorage.setItem("profilePictureUrl", data.avatar_url);
        setProfilePictureUrl(data.avatar_url);
      }

      // Update context with all stats
      setIsLoggedIn(true);
      setEmail(email);
      setCurrency(credits);
      setPrizesWon(prizes_won);
      setGamesPlayed(games_played);
      setCreditsSpent(credits_spent);

      // Redirect
      navigate("/");
      console.log("User is successfully logged in");
    } else {
      toast.error("Unable to get data: " + data.message);
    }
  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Login request failed.");
  }
};

    return (
      <>
        <div className="flex w-full h-screen">
          <div className="w-full flex items-center justify-center lg:w-1/2">
            <div className="bg-white px-10 py-20 rounded-3xl border-3 border-gray-300">
              <form onSubmit={handleLogin} className="space-y-6">
                <h1 className="text-5xl font-semibold"> Welcome back!</h1>
                <p className="font-medium text-lg text-gray-700 mt-4">
                  {" "}
                  Sign in to your account
                </p>
                <div className="mt-8">
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
                      <input type="checkbox" id="remember" />
                      <label
                        className="ml-2 font-medium text-base"
                        htmlFor="remember"
                      >
                        {" "}
                        Remember for 30 days{" "}
                      </label>
                    </div>
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-8 flex flex-col gap-y-4 ">
                    <button
                      type="submit"
                      className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2.5 rounded-xl bg-violet-500 text-white text-lg font-bold"
                    >
                      Sign in
                    </button>

                    <button className="flex items-center justify-center border-2 border-b-gray-400 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Sign in with Google"
                      >
                        <title>Google logo</title>
                        <path
                          d="M12 2a10 10 0 1 0 7.07 17.07l-2.91-2.37A6.5 6.5 0 1 1 18.5 12h-6.5v3.5h10A10 10 0 0 0 12 2z"
                          fill="#4285F4"
                        />
                        <path
                          d="M3.15 7.14l2.83 2.07A6.5 6.5 0 0 1 12 5.5c1.71 0 3.25.63 4.45 1.65l2.87-2.22A10 10 0 0 0 12 2a10 10 0 0 0-8.85 5.14z"
                          fill="#34A853"
                        />
                        <path
                          d="M12 22a9.93 9.93 0 0 0 7-2.77l-2.91-2.37A6.48 6.48 0 0 1 12 18.5a6.48 6.48 0 0 1-5.97-4.14l-2.88 2.23A10 10 0 0 0 12 22z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M21.5 12c0-.83-.08-1.63-.24-2.41H12v4.91h5.35a4.6 4.6 0 0 1-2 3.03l2.91 2.37A9.96 9.96 0 0 0 21.5 12z"
                          fill="#EA4335"
                        />
                      </svg>
                      Sign in with Google
                    </button>
                  </div>
                  <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium-text-base">
                      {" "}
                      Don't have an account?
                    </p>
                    <button
                      onClick={() => navigate("/signupform")}
                      className="text-violet-500 text-base font-medium ml-2 transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-110"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <Form />
          </div>
          <div className="hidden relative lg:flex items-center justify-center h-full w-1/2 bg-gray-200">
            <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce">
              {" "}
            </div>
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
          </div>
        </div>
      </>
    );
}

export default Login;