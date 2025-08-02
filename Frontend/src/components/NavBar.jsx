import { Link, useRouterState} from '@tanstack/react-router';
import {useSelector} from "react-redux";

const NavBar = () => {

  const {isAuthenticated} = useSelector((state) => state.auth);

  const router = useRouterState();
const currentPath = router.location.pathname;

  return (
    <div>
      {/* Simple Navigation */}
      <nav className="bg-white shadow-lg p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-500">URL Shortener</h1>
          <div className="space-x-4">
            {/* <Link to ="/" className="px-3 py-1 rounded text-gray-600 hover:text-blue-500 hover:cursor-pointer">Home</Link> */}

            {!isAuthenticated &&(<div><Link 
            to="/" 
            className={`px-3 py-1 rounded ${currentPath === '/' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}
            >
            Home
           </Link>
            
            <Link to ="/register" className={`px-3 py-1 rounded ${currentPath === '/register' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}>Register</Link>

            <Link to ="/login" className={`px-3 py-1 rounded ${currentPath === '/login' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}>Login</Link></div> )}  


             {isAuthenticated &&(<div><Link 
            to="/" 
            className={`px-3 py-1 rounded ${currentPath === '/' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}
            >
            Home
           </Link>
            
            <Link to ="/dashboard" className={`px-3 py-1 rounded ${currentPath === '/dashboard' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}>DashBoard</Link>

            <Link to ="/logout" className={`px-3 py-1 rounded ${currentPath === '/logout' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}>Logout</Link></div> )}                  

          </div>
        </div>
      </nav>
    </div>
  )
};

export default NavBar;
