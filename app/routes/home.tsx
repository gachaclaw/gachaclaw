import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import GameBoxComponent from "src/components/GameBoxComponent";
import { Link } from "react-router";
import Sidebar from "src/common/Sidebar";
import Hero from "src/components/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GachaClaw Home Page" },
    { name: "description", content: "Welcome to GachaGang!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Test" };
}

export default function Home( ) {
  return (
    <>
    <div className="scroll-smooth">
    <img src="/logos/playclawmachines.png" className="w-fit h-fit md:w-3/4 mx-auto"></img>
    <Hero/>
    <h1 className="text-center text-gray-800 text-xl font-extrabold m-5 animate-bounce">  Featured</h1> 
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>
      <GameBoxComponent imgsrc="/logos/prizeTime.png" gameName = "cuddlykittens"/>


    <div className="rounded md:mx-24 my-8">
      <section id="us" className="md:w-3/4 mx-auto">
        <div className = "p-6 text-center">
          <h1 className="font-bold p-6 opacity-90"> About us</h1>
          <p className = "text-sm p-6 opacity-90">
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim 
            Murtaza muslim Murtaza muslim Murtaza muslim
             Murtaza muslim Murtaza muslim Murtaza muslim 
             Murtaza muslim Murtaza muslim Murtaza muslim 
             </p>
        </div>
      </section>
    </div>

    <div className="rounded md:mx-24 my-8">
      <section id="contact-us" className="md:w-3/4 mx-auto">
        <div className = "p-6 text-center">
          <h1 className="font-bold p-6 opacity-90"> Contact us</h1>
          <p className = "text-sm p-6 opacity-90"> 
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim  
            Murtaza muslim  Murtaza muslim  Murtaza muslim 
            Murtaza muslim Murtaza muslim Murtaza muslim
             Murtaza muslim Murtaza muslim Murtaza muslim 
             Murtaza muslim Murtaza muslim Murtaza muslim 
             </p>
        </div>
      </section>
    </div>

    <footer className="bg-dark-surface border-t border-white border-opacity-10 h-full text-white py-8 px-8 md:px-24">
      <div className="flex flex-col md:flex-row space-y-2">
        <div className="flex-1 mx-auto">
          <div className="flex items-center ml-4 md:ml-14">
            <img
							className="mr-4"
							src={	"/logos/main-logo.png"
							}
							alt="Logo"
							width="72"
							height="72"
						/>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 text-gray-900">
          <h2>Pages</h2>
					<div className="opacity-50 hover:opacity-90">
						<Link className="text-sm" to="/">
							Home
						</Link>
					</div>
					<div className="opacity-50 hover:opacity-90">
						<a className="text-sm" href="/about">
							About
						</a>
					</div>
					<div className="opacity-50 hover:opacity-90">
						<Link className="text-sm" to="/ponggame">
							Pong Game
						</Link>
					</div>
					<div className="opacity-50 hover:opacity-90">
						<Link className="text-sm" to="/login">
							Login
						</Link>
					</div>
        </div>
      </div>

    </footer>
    </div>
    </>
  );
}
