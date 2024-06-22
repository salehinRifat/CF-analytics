import {
    createBrowserRouter

} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Analytics from "../Pages/Analytics/Analytics";
import MainLayOut from "../Layouts/MainLayOut";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'analytics',
                element: <Analytics></Analytics>
            }
        ]
    },
]);
export default router;