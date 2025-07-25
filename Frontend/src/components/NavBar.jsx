import { Link, useRouterState} from '@tanstack/react-router';

const NavBar = () => {

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

            <Link 
            to="/" 
            className={`px-3 py-1 rounded ${currentPath === '/' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}
            >
            Home
           </Link>
            
            <Link to ="/register" className={`px-3 py-1 rounded ${currentPath === '/register' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}>Register</Link>

            <Link to ="/login" className={`px-3 py-1 rounded ${currentPath === '/login' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}>Login</Link>            

              {/* className={`px-3 py-1 rounded ${currentPage === 'home' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`} */}
            {/* > */}
              {/* Home
            </button> */}
            {/* <button
              onClick={() => setCurrentPage('register')}
              className={`px-3 py-1 rounded ${currentPage === 'register' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`}
            >
              Register
            </button> */}
            {/* <button */}
              {/* onClick={() => setCurrentPage('login')} */}
              {/* className={`px-3 py-1 rounded ${currentPage === 'login' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500 hover:cursor-pointer'}`} */}
            {/* > */}
              {/* Login */}
            {/* </button> */}
          </div>
        </div>
      </nav>
    </div>
  )
};

export default NavBar;
