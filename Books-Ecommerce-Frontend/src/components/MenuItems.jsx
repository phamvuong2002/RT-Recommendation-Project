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
  console.log(params)
  let hasGenre = params.has('genre')
  const [dropdown, setDropdown] = useState(false);

  let genreParam = ['']
  if (!hasGenre) {
    // console.log('no genre')
    genreParam = ['']
  } else {
    genreParam = params.get('genre').split(',')
    // depthLevel=(genreParam.length-1)
    // console.log(genreParam)
  } 

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        console.log(ref.current)
        setDropdown(false);
      }
    };

  }, [dropdown]);


  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleSelectCategory = () => {
    console.log(depthLevel)
    let currentLength = genreParam.length
    console.log('current length & depth: ' + currentLength + ' ' + depthLevel)
    // reset lại - set = Level trên cùng
    if (currentLength < depthLevel + 1) {
      console.log(depthLevel + ' ' + currentLength)
      genreParam.push(items.value)
    }
    else if (depthLevel + 1 < currentLength) {
      genreParam[depthLevel] = items.value
      genreParam.splice(depthLevel + 1)
    }
    else if (currentLength == depthLevel + 1) {
      console.log('in update')
      genreParam[depthLevel] = items.value
    }
    
    console.log(`include ${genreParam.includes(items.value)}`)
    console.log('genre param')
    console.log(genreParam)
    console.log(genreParam.length)
  

    if (genreParam.length > 0) {
      // const searchParams = new URLSearchParams({ 'genre': genreParam });
      params.set('genre',genreParam)
      console.log('search params to navigate: ' + params)
      navigate(`/search?${params}`)
    } else {
      navigate(`/search`)
    }
  }


  return (
    <li
      className={`menu-items  font-inter text-black text-left pl-1 pb-2 sm:text-black hover:cursor-pointer  sm:hover:text-[red] $`}
    >
      <div key={items.value} className="flex items-center ">
        <input
          id={`filter-${items.id}`}
          name={`${items.id}`}
          defaultValue={items.value}
          type="checkbox"
          aria-checked={true}
          onChange={handleSelectCategory}
          checked={genreParam.includes(items.value)}
          className="min-w-[15px] h-[15px] w-[15px] rounded-sm border-gray-300  accent-red-300"
        />
        <label
          htmlFor={`filter-${items.id}`}
          className="ml-3 text-gray-500 text-[14px] sm:text-gray-600"
        >
          {items.name}
        </label>
      </div>
      {items.submenu  ? (
        <>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={genreParam.includes(items.value)}
          />
        </>
      ) : ""}

    </li>

  );
};

export default MenuItems;
