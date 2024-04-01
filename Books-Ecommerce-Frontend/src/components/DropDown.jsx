import MenuItems from "./MenuItems";

// Hiển thị các SubMenu nếu có
// Sẽ tiền hành gọi MenuItems để render submenu
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  
  return (
    <ul className={`hidden font-medium text-[14px] w-full sm:absolute  sm:bg-[white] sm:w-[9rem]   dropdown sm:rounded-md sm:shadow-lg sm:ring-1 sm:ring-black sm:ring-opacity-5  ${dropdownClass} ${dropdown ? "show" : ""}  ${depthLevel == 1 ? "px-4 sm:px-0 space-y-2" : depthLevel == 2 ? "px-4 sm:px-0 sm:-mt-10 " : ""}`}>
      {" "}
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}{" "}
    </ul>

  );
};

export default Dropdown;
