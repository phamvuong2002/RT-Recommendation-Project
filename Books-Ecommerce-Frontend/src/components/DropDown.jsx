import MenuItems from './MenuItems';

// Hiển thị các SubMenu nếu có
// Sẽ tiền hành gọi MenuItems để render submenu
const Dropdown = ({ submenus, dropdown, depthLevel, _source = 'search' }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  return (
    <ul
      className={`font-medium pt-2 pl-3 text-[13px] w-full text-black depth-${depthLevel} ${dropdownClass} ${dropdown ? 'show' : 'hidden'}  `}
    >
      {' '}
      {submenus.map((submenu, index) => (
        <MenuItems
          items={submenu}
          key={index}
          depthLevel={depthLevel}
          _source={_source}
        />
      ))}{' '}
    </ul>
  );
};

export default Dropdown;
