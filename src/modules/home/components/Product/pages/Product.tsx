import React, { useState } from 'react';
import MenuItem from "@/modules/admin/components/Home/components/MenuItem";
import ActionsHome from "../components/ActionsHome";
import Pagination from '../components/PaginationMenu';
import { MenuItem as MenuItemType, menuItems } from '../components/MenuData';

const ITEMS_PER_PAGE = 9;

export default function Product() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);

  const currentItems = menuItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addToCart = (item: MenuItemType) => {
    console.log("id: ", item.id);
  };

  return (
    <div>
      <ActionsHome />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] px-6 py-4 mx-auto">
        {currentItems.map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={addToCart} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
