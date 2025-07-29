import { Outlet } from "react-router";

export default function Dashboard(){
    return (
    <div className="text-amber-950"> 
        {" "}
        Hey, welcome to the dashboard page. <Outlet />
        
    </div>
    );
}