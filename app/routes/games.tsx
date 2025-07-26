import { Outlet } from "react-router";
import { useState, useRef, useEffect } from 'react';
import PongGameWebGLBuild from "src/webgl";
import { useCurrency, CurrencyProvider } from "src/context/CurrencyContext";
import PongGame from "./pong-game";


const gameLaunchers = [

    {
        id: 'pong',
        color: 'bg-green-500 hover:bg-green-600',
        name: 'Pong',
        cost: 5,
        component: <PongGame />
    },
    {
        id: 'flappy',
        color: 'bg-blue-500 hover:bg-blue-600',
        name: 'Flappy Bird',
        cost: 5,
        component: <PongGame />
    },
    {
        id: 'breakout',
        color: 'bg-red-500 hover:bg-red-600',
        name: 'Breakout',
        cost: 5,
        component: <PongGame />
    },
    {
        id: 'tetris',
        color: 'bg-yellow-500 hover:bg-yellow-600',
        name: 'Tetris',
        cost: 5,
        component: <PongGame />
    },
    {
        id: 'agario',
        color: 'bg-purple-500 hover:bg-purple-600',
        name: 'Aragio',
        cost: 5,
        component: <PongGame />
    }


]



function GameButton({game, onClick}: { game: typeof gameLaunchers[0], onClick: () => void} )
{
    const { currency } = useCurrency();

    return (
        <div
            onClick={onClick}
            className={`${game.color} rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 
                hover:scale-105 flex flex-col items-center justify-center 
                text-white font-bold text-xl h-40`}
        >
             <span>{game.name}</span>
            <span className="text-sm mt-2">Cost: {game.cost} coins</span>

        </div>
    );
}

export default function Games(){
    const [activeGame, setActiveGame] = useState<typeof gameLaunchers[0] | null>(null);
    const { currency, setCurrency } = useCurrency();

    const handleGameClick = (game: typeof gameLaunchers[0]) => {  
      setActiveGame(game);
    };

    return (
        <div className="min-h-screen w-full p-4">
            <div className="mx-auto w-full max-w-screen-2xl 2xl:max-w-none 2xl:px-12">
                <div className="relative top-4 left-4/4 transform -translate-x-1/2 z-50 w-fit mb-10">
                    <div className="text-xl font-bold bg-yellow-500 text-white px-4 py-2 rounded-full">
                    Coins: {currency}
                    </div>

                </div>

                <div className="flex flex-col items-center w-full">
                    <div className="w-full max-w-4xl space-y-6">

                        {gameLaunchers.map((game) =>(
                            <GameButton
                            key={game.id}
                            game={game}
                            onClick={() => handleGameClick(game)}
                                />
                        ))}
                    </div>
                </div>


            </div>

           {activeGame && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] bg-gray-800 rounded-xl overflow-hidden">
                <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
                <div className="bg-yellow-600 text-white px-3 py-1 rounded-full flex items-center">
                     {currency}
                </div>
                <button
                    onClick={() => setActiveGame(null)}
                    className="bg-white/20 hover:bg-white/30 text-white 
                            rounded-full w-10 h-10 flex items-center justify-center
                            transition-all duration-200"
                >
                    ✕
                </button>
                </div>
                <div className="w-full h-full">
                {activeGame.component}
                </div>
            </div>
            </div>
        )} 
                
        </div>
    

    
    );
}