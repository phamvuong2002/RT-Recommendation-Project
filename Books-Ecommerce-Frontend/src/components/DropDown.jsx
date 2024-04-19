import MenuItems from "./MenuItems";
import { useLocation, useNavigate } from "react-router-dom";
// Hiển thị các SubMenu nếu có
// Sẽ tiền hành gọi MenuItems để render submenu
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
 
  return (
    <ul className={`font-medium pt-2 pl-3 text-[13px] w-full text-black  ${dropdownClass} ${dropdown ? "show" : "hidden"}  `}>
      {" "}
      {submenus.map((submenu, index) => (

        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />

      ))}{" "}
    </ul>

  );
};

export default Dropdown;
