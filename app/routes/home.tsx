import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import GameBoxComponent from "src/components/GameBoxComponent";
import { Link } from "react-router";
import Hero from "src/common/Hero";
import { useState } from "react";
import FooterComponent from "src/common/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GachaClaw Home Page" },
    { name: "description", content: "Welcome to GachaGang!" },
  ];
}

//let [loggedIn, setLoggedIn] = useState(false);

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Test" };
}

export default function Home( ) {
  return (
    <>
    <div className="scroll-smooth">
    <img src="/logos/playclawmachines.png" className="md:w-3/4 mx-auto"></img>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
             incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                 qui officia deserunt mollit anim id est laborum.
             </p>
        </div>
      </section>
    </div>

    <div className="rounded md:mx-24 my-8">
      <section id="contact-us" className="md:w-3/4 mx-auto">
        <div className = "p-6 text-center">
          <h1 className="font-bold p-6 opacity-90"> Contact us</h1>
          <p className = "text-sm p-6 opacity-90"> 
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
             Quisque faucibus ex sapien vitae pellentesque sem placerat.
              In id cursus mi pretium tellus duis convallis. Tempus leo eu
               aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                 integer nunc posuere. Ut hendrerit semper vel class aptent taciti
                  sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. 
             </p>
        </div>
      </section>
    </div>
      <FooterComponent />
    </div>
    </>
  );
}
