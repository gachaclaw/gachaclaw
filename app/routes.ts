import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"), 
    route("about","routes/about.tsx"),
    route("post/:postId", "routes/post.tsx"),
    route("ponggame", "routes/pong-game.tsx"),
    route("login", "routes/login.tsx"),
    route("games", "routes/games.tsx"),

    // nested routes
    route("dashboard", "routes/dashboard.tsx", /*child route array*/[
        route("finances", "routes/finanes.tsx"),
        route("personal-info", "routes/personal-info.tsx")
    ]),
] satisfies RouteConfig;
