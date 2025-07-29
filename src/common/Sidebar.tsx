import { NavLink } from "react-router";
import Navbarcomponent from "src/components/NavbarComponent";

const test = () => {
    return(
        <div className = "flex relative bg-color justify-center">
        <NavLink to ="/" style = {({isActive, isPending, isTransitioning}) => 
            ({color: isActive?"red": "blue"})}> 
            Home    
        </NavLink>

        <NavLink to ="/about" style = {({isActive, isPending, isTransitioning}) => 
            ({color: isActive?"red": "blue"})}> 
            About   
        </NavLink>    
        
        <NavLink to ="/dashboard" style = {({isActive, isPending, isTransitioning}) => 
            ({color: isActive?"red": "blue"})}> 
            Dashboard       
        </NavLink>    
        
        <NavLink to ="/ponggame" style = {({isActive, isPending, isTransitioning}) => 
            ({color: isActive?"red": "blue"})}> 
            PongGame     
        </NavLink>

        <NavLink to ="/post/6" style = {({isActive, isPending, isTransitioning}) => 
            ({color: isActive?"red": "blue"})}> 
            Post6    
        </NavLink>  
        </div>  
    )
}

const Sidebar = () => {
    return(
    <>
    <div className="">

        <div className="relative flex flex-col flex-wrap md:flex-row bg-blend-color bg-purple-300">    
            <a className = "flex items-center ml-4 md:ml-14" href="/"> 
                <img src="/logos/navbarlogo.png" className="w-40"></img>
            </a>
                <Navbarcomponent navLinkString="/" navString="Home"></Navbarcomponent>
                <Navbarcomponent navLinkString="/about" navString="About"></Navbarcomponent>
                <Navbarcomponent navLinkString="/dashboard" navString="Dashboard"></Navbarcomponent>
                <Navbarcomponent navLinkString="/ponggame" navString="PongGame"></Navbarcomponent>
                <Navbarcomponent navLinkString="/login" navString="Login"></Navbarcomponent>
                <Navbarcomponent navLinkString="/games" navString="Games"></Navbarcomponent>
        </div>
    </div>
    </>
    );
};





export default Sidebar;