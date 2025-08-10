import { Link } from "react-router";

export default function FooterComponent(){
    return(
        <>
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
        </>
    )
}