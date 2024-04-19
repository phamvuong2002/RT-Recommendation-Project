import { useState, useEffect, useRef } from "react";
import Dropdown from "./DropDown";
import { useLocation, useNavigate } from "react-router-dom";


// 1. Lấy Genre param 
// 1.1 Có --> Set lại giá trị
// 1.2 Không --> Set usestate
// 2. Tạo search param với giá trị mới
// 2.1 Xem chỉnh lại giá trị checked của checkbox
// 3. Navigate

const MenuItems = ({ items, depthLevel }) => {
  const navigate = useNavigate()


  let params = new URLSearchParams(document.location.search);

  let hasCate = params.has('categories')
  const [dropdown, setDropdown] = useState(false);

  let cateParam = []
  if (!hasCate) {

    cateParam = []
  } else {
    cateParam = params.get('categories').split(',')

  }

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        // console.log(ref.current)
        setDropdown(false);
      }
    };

  }, [dropdown]);


  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleSelectCategory = () => {

    let currentLength = cateParam.length
    // console.log('current length & depth: ' + currentLength + ' ' + depthLevel)
    // reset lại - set = Level trên cùng
    if (currentLength < depthLevel + 1) {
      cateParam.push(items.id)
    }
    else if (depthLevel + 1 < currentLength) {
      cateParam[depthLevel] = items.id
      cateParam.splice(depthLevel + 1)
    }
    else if (currentLength === depthLevel + 1) {
      cateParam[depthLevel] = items.id
    }
    console.log(cateParam)
    if (cateParam.length > 0) {
      // const searchParams = new URLSearchParams({ 'genre': cateParam });
      params.set('categories', cateParam)

      navigate(`/search?${params}`)
    } else {
      navigate(`/search`)
    }
  }

  return (
    <li
      className={`menu-items  font-inter text-black text-left pl-1 pb-2 sm:text-black hover:cursor-pointer  hover:text-[red]`}>
      <div key={items.id} className={`flex items-center `}>
        <input
          id={`filter-${items.id}`}
          name={`${items.id}`}
          defaultValue={items.id}
          type="checkbox"
          aria-checked={true}
          onChange={handleSelectCategory}
          checked={cateParam[depthLevel] == items.id}
          className="min-w-[15px] h-[15px] w-[15px] rounded-sm border-gray-300  accent-red-300"
        />
        <label
          htmlFor={`filter-${items.id}`}
          className="ml-3 text-gray-500 text-[14px] sm:text-gray-600"
        >
          {items.name}
        </label>
      </div>

      {items.submenu ? (
        <>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={cateParam[depthLevel] == items.id}
          />
        </>
      ) : ""}

    </li>

  );
};

export default MenuItems;
