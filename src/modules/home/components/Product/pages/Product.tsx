import MenuItem from "@/modules/admin/components/Home/components/MenuItem";
import ActionsHome from "../components/ActionsHome";
import { MenuItem as MenuItemType, menuItems } from '../components/MenuData';
export default function Product() {
    const addToCart = (item: MenuItemType) => {
        console.log("id: ",item.id)
      };
  return (
    <div>
    <ActionsHome />
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] px-6 py-4 mx-auto">
    
    {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onAddToCart={addToCart}
        />
      ))}
    </div>
    </div>
  );
}