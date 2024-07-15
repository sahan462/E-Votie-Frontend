import KeycloakService from "../services/KeycloakService.jsx";
import RenderWhenAnonymous from "../utilities/RenderWhenAnonymous.jsx";
import RenderWhenAuthenticated from "../utilities/RenderWhenAuthenticated.jsx";
import { AuthContext } from "../Auth/AuthProvider.jsx";
import {useContext, useEffect} from "react";

export const Navbar = () => {
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        console.log("App component rendered. Is authenticated:", isAuthenticated);
    }, [isAuthenticated]);
    return (
        <div className="h-20 flex grow z-10 sticky left-0 right-0 top-0 border-b-2 ">
            <div className="navbar  bg-[#f8f8f8]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"/>
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">E Votie</a>
                </div>
                <div className="navbar-center">
                    {/* <a className="btn btn-ghost text-xl">E Votie</a> */}
                </div>
                <div className="navbar-end">
                    <RenderWhenAnonymous>
                        <button className="btn btn-ghost btn-square" onClick={() => KeycloakService.doLogin()}>
                            Log in
                        </button>
                    </RenderWhenAnonymous>
                    <RenderWhenAuthenticated>
                        <button className="btn btn-ghost btn-square" onClick={() => KeycloakService.doLogout()}>
                            Log out
                        </button>
                    </RenderWhenAuthenticated>
                    <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}