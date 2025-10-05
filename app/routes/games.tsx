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



function GameButton({game, onClick, isFavorited, onToggleFavorite}: { 
    game: typeof gameLaunchers[0], 
    onClick: () => void,
    isFavorited: boolean,
    onToggleFavorite: () => void
} )
{
    const { currency } = useCurrency();

    return (
        <div className="relative">
            <div
                onClick={onClick}
                className={`${game.color} rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 
                    hover:scale-105 flex flex-col items-center justify-center 
                    text-white font-bold text-xl h-40`}
            >
                 <span>{game.name}</span>
                <span className="text-sm mt-2">Cost: {game.cost} coins</span>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
                className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white 
                    rounded-full w-8 h-8 flex items-center justify-center
                    transition-all duration-200"
            >
                {isFavorited ? '★' : '☆'}
            </button>
        </div>
    );
}

export default function Games(){
    const [activeGame, setActiveGame] = useState<typeof gameLaunchers[0] | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { currency, setCurrency } = useCurrency();

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('gameFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
        setIsLoaded(true);
    }, []);

    // Save favorites to localStorage whenever favorites change (but only after initial load)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('gameFavorites', JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const handleGameClick = (game: typeof gameLaunchers[0]) => {  
      setActiveGame(game);
    };

    const toggleFavorite = (gameId: string) => {
        setFavorites(prev => 
            prev.includes(gameId) 
                ? prev.filter(id => id !== gameId)
                : [...prev, gameId]
        );
    };

    // Separate games into favorites and regular games
    const favoriteGames = gameLaunchers.filter(game => favorites.includes(game.id));
    const regularGames = gameLaunchers.filter(game => !favorites.includes(game.id));

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
                        {/* Favorites Section */}
                        {favoriteGames.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white mb-4">Favorites</h2>
                                <div className="space-y-4">
                                    {favoriteGames.map((game) => (
                                        <GameButton
                                            key={game.id}
                                            game={game}
                                            onClick={() => handleGameClick(game)}
                                            isFavorited={true}
                                            onToggleFavorite={() => toggleFavorite(game.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Regular Games Section */}
                        {regularGames.length > 0 && (
                            <div>
                                {favoriteGames.length > 0 && (
                                    <h2 className="text-2xl font-bold text-white mb-4">All Games</h2>
                                )}
                                <div className="space-y-4">
                                    {regularGames.map((game) => (
                                        <GameButton
                                            key={game.id}
                                            game={game}
                                            onClick={() => handleGameClick(game)}
                                            isFavorited={false}
                                            onToggleFavorite={() => toggleFavorite(game.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
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