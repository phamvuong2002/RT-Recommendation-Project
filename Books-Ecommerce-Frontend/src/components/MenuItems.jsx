import React from 'react'
import { useState, useEffect, useRef } from "react";

import Dropdown from './DropDown';

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

  return (
    <li
      className={`menu-items text-center text-black font-medium min-w-[8rem] hover:text-red-500 hover:font-semibold hover:cursor-pointer`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}

    >
      {items.submenu ? (
        <>
          <button
            className="text-center py-[0.7rem] px-[1rem] "
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? (

              <span> &raquo; </span>
            ) : (
              <span className="arrow" />
            )}{" "}
          </button>{" "}

          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />{" "}
        </>
      ) : (
        <a href={items.path} className="block hover:text-[red] text-black py-[0.7rem] ">
          <div className="">{items.title} </div> </a>
      )}{" "}
    </li>

  )
}

export default MenuItems;