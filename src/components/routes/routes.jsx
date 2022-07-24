import Login from "../../pages/Login";
import StartBot from "../../pages/StartBot";
import Auction from "../../pages/Auction";
import AdminAuction from "../../pages/Admin/AdminAuction";
import AdminPanel from "../../pages/Admin/AdminPanel";
import AdminUsers from "../../pages/Admin/AdminUsers";
import NotFoundPage from "../../pages/NotFoundPage";

export const routes = {
    public_routes: [
        {
            exact: true,
            Element: Login,
            path: '/login'
        }
        // {
        //     exact: true,
        //     Element: NotFoundPage,
        //     path: '*'
        // }
    ],
    auth_routes: [
        {
            exact: true,
            Element: StartBot,
            path: '/'
        },
        {
            exact: true,
            Element: Auction,
            path: '/auction'
        }
    ],
    admin_routes: [
        {
            exact: true,
            Element: AdminPanel,
            path: '/admin/panel'
        },
        {
            exact: true,
            Element: AdminAuction,
            path: '/admin/auction'
        },
        {
            exact: true,
            Element: AdminUsers,
            path: '/admin/users'
        }
    ]
}