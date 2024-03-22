import { React } from 'react'
import MenuItems from './MenuItems';


const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  console.log(depthLevel)
  return (
    <ul className={`hidden bg-red-100 sm:bg-[white] text-[14px] rounded-[4px] sm:shadow-lg sm:border-2 sm:border-solid  sm:shadow-neutral-500 static sm:absolute dropdown  ${dropdownClass} ${dropdown ? "show" : ""}  `}>
      {" "}
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}{" "}
    </ul>

  );
}

export default Dropdown;

