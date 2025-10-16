import PrimaryButton from "../ui/Button/PrimaryButton";
import { logout } from "../../services/AuthService";
import { RiLogoutBoxRLine } from "@remixicon/react";

const Navbar = () => {

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="fixed w-full z-5 flex justify-end items-center py-3 px-4 sm:px-20 xl:px-32">
        <PrimaryButton
            variant="outline"
            icon={<RiLogoutBoxRLine />}
            onClick={handleLogout}
        />
    </div>
  )
}

export default Navbar
