import axios from "axios";
import { useState, useEffect } from "react";
import { Form } from "react-router";

export default function SignUpForm(){

  const [postsData, setPostsData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const endpoint = `${import.meta.env.VITE_API_URL}/posts/`;

  const fetchData = async() => {
    console.log("Fetching from django server");
    try{
      const response = await axios.get(endpoint);
      console.log(response);
      const {data} = response;
      setPostsData(data);
      return data;
    }
    catch (error){
      console.log(`Cannot fetch endpoint because of : ${error}`)
    }
  }

  const handleSendData = async() => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      window.alert(`${error}`)
      return;
    }
    const body = { username, email, password, money: 0 };

    try {
      const response = await axios.post(endpoint, body);
      if(response){
        console.log(response);
        //setRefresh(prevState => !prevState);
        window.alert(`User has been created with username: ${username}, email: ${email}`);
      }
    } catch (error) {
      console.error("Failed to post data:", error);
    }
  }

  useEffect(() =>{
    fetchData();
  }, [refresh]);
  // refresh is in dependency array

  /* USE IN THE FUTURE TO FETCH DATA!
  const [data, setData] = useState([])
  useEffect(() => {
      console.log(import.meta.env.VITE_API_URL);
      async function fetchData(){
        try{
          const response = await fetch(`${import.meta.env.VITE_API_URL}posts/`);
          if(!response.ok){
            throw new Error("Network response failed to establish a connection");
          }
          const result = await response.json();
          console.log(result);
          setData(result);
        }catch(error){
          console.error("Error fetching data: ", error)
        }
      }

      fetchData();
  }, []);

//       <ul>
//        {postsData?.map(el => <li key={el?.id} {el?.username} test</li> TODO: ADD AN ID HERE TO MAKE UNIQUE KEYS )}
//     </ul>
  
  */

  useEffect(() => {
  if (confirmPassword && password !== confirmPassword) {
    setError("Passwords do not match.");
  } else {
    setError("");
  }
}, [password, confirmPassword]);

  return (
          <>
            <div className = "flex w-full h-screen">
                <div className = "w-full flex items-center justify-center lg:w-1/2">
                    <div className ="bg-white px-10 py-20 rounded-3xl border-3 border-gray-300">
                        <form id = "registrationForm" onSubmit={handleSendData} className="space-y-6">
                        <h1 className ="text-5xl font-semibold">Create a new account!</h1>
                        <p className ="font-medium text-lg text-gray-700 mt-4 text-center"> Or<a href="login" className="text-violet-500 text-base font-medium ml-2 transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-110"> login to your account </a></p>
                        <div className = "mt-8">
                            <div className="mb-4">
                                <label className="text-lg font-medium"> Email </label>
                                <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className = "mb-4">
                                <label className="text-lg font-medium"> Username </label>
                                <input
                                id="Username"
                                name="username"
                                type="username"
                                placeholder="Enter your username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        <div className="mb-4">
                            <label className="text-lg font-medium"> Password </label>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                          <div className="mb-4">
                            <label className="text-lg font-medium"> Confirm your password </label>
                            <input
                            id="confirm-password"
                            name="Confirm your password"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <div className = "mt-8 flex flex-col gap-y-4 " onClick={handleSendData}>
                            <button
                                type="submit" 
                                className = "active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2.5 rounded-xl bg-violet-500 text-white text-lg font-bold"                            
                            > 
                             Create Account
                            </button>

                            <button  className="flex items-center justify-center border-2 border-b-gray-400 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl"> 
                            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Sign in with Google">
                                <title>Google logo</title>
                                <path d="M12 2a10 10 0 1 0 7.07 17.07l-2.91-2.37A6.5 6.5 0 1 1 18.5 12h-6.5v3.5h10A10 10 0 0 0 12 2z" fill="#4285F4"/>
                                <path d="M3.15 7.14l2.83 2.07A6.5 6.5 0 0 1 12 5.5c1.71 0 3.25.63 4.45 1.65l2.87-2.22A10 10 0 0 0 12 2a10 10 0 0 0-8.85 5.14z" fill="#34A853"/>
                                <path d="M12 22a9.93 9.93 0 0 0 7-2.77l-2.91-2.37A6.48 6.48 0 0 1 12 18.5a6.48 6.48 0 0 1-5.97-4.14l-2.88 2.23A10 10 0 0 0 12 22z" fill="#FBBC05"/>
                                <path d="M21.5 12c0-.83-.08-1.63-.24-2.41H12v4.91h5.35a4.6 4.6 0 0 1-2 3.03l2.91 2.37A9.96 9.96 0 0 0 21.5 12z" fill="#EA4335"/>
                            </svg>
                                Sign up with Google
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