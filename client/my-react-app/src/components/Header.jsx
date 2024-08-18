import { useAuth } from "./Auth/AuthContext";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const { userRole, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const handleDashboardClick = (e) => {
      e.preventDefault();   
      if (userRole === "Admin") {
        navigate("/admin-dashboard");
      }
    };
  
    const handleLogout = () => {
      logout();
      navigate("/login");
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <header className="fixed top-4 left-0 right-0 z-50 py-2 px-4 w-[90%] mx-auto bg-white rounded-lg shadow-md">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-lg text-black hover:text-orange-400">
            <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
            <div className="text-lg">AutoSavy</div>
          </Link>
          <div className="flex items-center">
            <Link to="/shop" className="px-4 text-black hover:text-orange-400">
              Shop
            </Link>
            <Link to="/servicing" className="px-4 text-black hover:text-orange-400">
              Servicing
            </Link>
            <Link to="/reviews" className="px-4 text-black hover:text-orange-400">
              Reviews
            </Link>
            <Link to="/cart" className="px-4 text-black hover:text-orange-400">
              Cart
            </Link>
            {userRole === "Admin" ? (
              <a
                href="#"
                onClick={handleDashboardClick}
                className="px-1 text-black hover:text-orange-400"
              >
                Dashboard
              </a>
            ) : (
              <div className="relative px-0">
                <button
                  onClick={toggleDropdown}
                  className="text-black hover:text-orange-400 bg-transparent border-none cursor-pointer"
                >
                  myAutoSavy
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-sm hover:bg-orange-700"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/my-reviews"
                      className="block px-4 py-2 text-sm hover:bg-orange-700"
                    >
                      My Reviews
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div className="px-3">
              {userRole ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 text-lg text-white bg-orange-500 rounded-lg shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-3 text-lg text-white bg-orange-500 rounded-lg shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  };

  
export default Header