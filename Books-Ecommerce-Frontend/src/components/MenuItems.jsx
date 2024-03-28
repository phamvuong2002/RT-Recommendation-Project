import { useState, useEffect, useRef } from "react";
import Dropdown from "./DropDown";

import { HiChevronRight, HiChevronDown, HiChevronUp } from "react-icons/hi2";
const MenuItems = ({ items, depthLevel }) => {

  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };


  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setDropdown((prev) => !prev)
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <li
      className={`menu-items font-inter text-white text-left sm:text-center sm:text-black min-w-[8rem] sm:hover:text-[red] hover:cursor-pointer `}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}

    >
      <a href={items.path} className={`hidden sm:block hover:bg-red-300 sm:hover:bg-white text-white font-inter px-[15px] sm:px-0 sm:hover:text-[red] sm:text-black py-[0.7rem] `}>
        <div>{items.title}
          <HiChevronRight className={`${depthLevel > 0 && items.submenu ? "hidden sm:inline-block " : "hidden"}`} />
         
        </div>
      </a>

      <div className="flex sm:hidden a_and_button place-items-center  hover:bg-red-300 py-3 text-base">
        <a href={items.path} className={`block text-white font-inter px-[15px]  `}>
          <div>{items.title}
          </div>
        </a>  
        <button aria-haspopup="menu" aria-expanded={dropdown ? "true" : "false"} onClick={toggleSubMenu} className={`
          ${depthLevel >=0 && items.submenu ? "block items-center sm:hidden static w-4 h-4 " : "hidden"}`}>
          {
            isMenuOpen ? <HiChevronUp className="w-4 h-4 text-white " /> : <HiChevronDown className="w-4 h-4 text-white " />
          }

        </button>
      </div>
      {items.submenu ? (
        <>

          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />


          <div
            className="hidden sm:block text-center  "
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            <Dropdown
              depthLevel={depthLevel}
              submenus={items.submenu}
              dropdown={dropdown}
            />
          </div>
        </>
      ) : ""}

    </li>

  );
};

export default MenuItems;
