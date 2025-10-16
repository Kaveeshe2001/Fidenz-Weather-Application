import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import PrimaryButton from "../ui/Button/PrimaryButton";
import { logout } from "../../services/AuthService";
import { RiLogoutBoxRLine } from "@remixicon/react";
import Search from "../ui/Search/Search";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="fixed w-full z-5 bg-[rgba(var(--primary-color3-opc),0.06)] flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
        <img 
          src={logo} 
          alt="logo" 
          className="w-20 sm:w-35 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <div className="flex items-center gap-5">
            <div className="hidden sm:block">
                <Search />
            </div>
            <PrimaryButton
                text="Logout"
                variant="outline"
                icon={<RiLogoutBoxRLine />}
                onClick={handleLogout}
            />
        </div>
    </div>
  )
}

export default Navbar
