import axios from "axios";
import { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router";

export default function SignUpForm(){
  let navigate = useNavigate();

  const [postsData, setPostsData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const endpoint = `${import.meta.env.VITE_API_URL}/api/posts/`;

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

  const handleSendData = async(ev: any) => {
    ev.preventDefault(); // ✅ prevent page reload

    console.log('handle send data called');
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      window.alert(`${error}`)
      return;
    }
    const body = {
      username,
      email,
      password,
      money: 0,
      phone: "",
      country: "",
    };
    try {
      const response = await axios.post(endpoint, body);
      if(response){
        console.log(response);
        //setRefresh(prevState => !prevState);
        window.alert(`User has been created with username: ${username}, email: ${email}. Please take out this crappy windows alert in the future and redirect to home page IF signed in.`);
        navigate('/login');      
        // to do in the future:
        // setIsLoggedIn(true);
        // navigate(profile? home page?)
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
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-6 py-10 rounded-3xl border-2 border-gray-300 max-w-md w-full">
          <form id="registrationForm" onSubmit={handleSendData} className="space-y-5">
            <h1 className="text-3xl font-semibold text-center">Create a new account!</h1>
            <p className="font-medium text-sm text-gray-700 text-center">
              Or
              <a
                href="/login"
                className="text-violet-500 ml-1 text-sm font-medium transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-105"
              >
                login to your account
              </a>
            </p>

            <div className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <button
                type="submit"
                className="py-2.5 rounded-lg bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition"
              >
                Create Account
              </button>

              <button className="flex items-center justify-center border border-gray-300 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a10 10 0 1 0 7.07 17.07l-2.91-2.37A6.5 6.5 0 1 1 18.5 12h-6.5v3.5h10A10 10 0 0 0 12 2z" fill="#4285F4" />
                  <path d="M3.15 7.14l2.83 2.07A6.5 6.5 0 0 1 12 5.5c1.71 0 3.25.63 4.45 1.65l2.87-2.22A10 10 0 0 0 12 2a10 10 0 0 0-8.85 5.14z" fill="#34A853" />
                  <path d="M12 22a9.93 9.93 0 0 0 7-2.77l-2.91-2.37A6.48 6.48 0 0 1 12 18.5a6.48 6.48 0 0 1-5.97-4.14l-2.88 2.23A10 10 0 0 0 12 22z" fill="#FBBC05" />
                  <path d="M21.5 12c0-.83-.08-1.63-.24-2.41H12v4.91h5.35a4.6 4.6 0 0 1-2 3.03l2.91 2.37A9.96 9.96 0 0 0 21.5 12z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
{/* - not sure what this is

      <div className="hidden lg:flex items-center justify-center w-1/2 h-full bg-gray-200 relative">
        <div className="w-40 h-40 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-white/10 backdrop-blur-lg" />
      </div>
*/}
    </div>
  </>
);
}