import { useState, useEffect, useRef, useInsertionEffect } from "react";
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

  if (params.has('categories', 'all')) {
    params.set('categories', '')
  }

  let hasCate = params.has('categories')
  const [dropdown, setDropdown] = useState(false);

  let cateParam = []
  if (!hasCate) {
    cateParam = ['all']
    params.set('categories', 'all')

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


  const [isMenuOpen, setIsMenuOpen] = useState(true);


  const handleSelectCategory = (event) => {
    // console.log(items)
    // console.log(`${items.name_slug}-${depthLevel}`)
    // console.log(`${items.parent}-${depthLevel}`)
    // console.log(cateParam[depthLevel - 1])
    // console.log(cateParam)
    // console.log('true/false ', items.name_slug==cateParam[depthLevel] && items.parent==cateParam[depthLevel-1])
    // console.log(event.target.id)
    if (!event.target.checked) {
      cateParam.splice(depthLevel)
    } else {
      // cateParam[depthLevel] = items.id

      let currentLength = cateParam.length
      // cateParam.push(items.id)
      // console.log('current length & depth: ' + currentLength + ' ' + depthLevel)
      // reset lại - set = Level trên cùng

      if (currentLength < depthLevel + 1) {
        cateParam.push(items.name_slug)
      }
      else if (depthLevel + 1 < currentLength) {
        cateParam[depthLevel] = items.name_slug
        cateParam.splice(depthLevel + 1)
      }
      else if (currentLength === depthLevel + 1) {
        cateParam[depthLevel] = items.name_slug
      }

    }
    // console.log('true/false ', )
    // console.log(cateParam)
    // console.log(`${items.id}-${depthLevel}`)
    if (cateParam.length > 0) {
      // const searchParams = new URLSearchParams({ 'genre': cateParam });
      params.set('categories', cateParam)

      navigate(`/search?${params}`)
    } else {
      cateParam = ['all']
      params.set('categories', 'all')
      navigate(`/search?${params}`)
    }
  }


  return (
    <li
      className={`menu-items  font-inter text-black text-left pl-1 pb-2 sm:text-black `}>

      <div key={`${items.name_slug}-${depthLevel}`} className={`flex items-center `}>
        <input
          id={`filter-${items.name_slug}-${depthLevel}`}
          name={`${items.name_slug}`}
          defaultValue={items.name_slug}
          type="checkbox"
          aria-checked={true}
          onChange={handleSelectCategory}
          checked={cateParam[depthLevel] == items.name_slug}
          className="min-w-[15px] h-[15px] w-[15px] rounded-sm border-gray-300   accent-red-300"
        />
        <label
          htmlFor={`filter-${items.name_slug}-${depthLevel}`}
          className="ml-3 text-gray-500 text-[14px] sm:text-gray-600 hover:cursor-pointer"
        >
          {items.name}
        </label>
      </div>

      {items.submenu ? (
        <>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={items.name_slug==cateParam[depthLevel]}
          />
        </>
      ) : ""}

    </li>
    

  );
};

export default MenuItems;
