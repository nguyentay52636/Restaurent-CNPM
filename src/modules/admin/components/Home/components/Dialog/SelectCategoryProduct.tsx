import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/lib/apis/categoriesApi";


export interface CategoryTab {
    id: string;
    name: string;
}

interface SelectCategoryProductProps {
    categories: CategoryTab[];
    activeCategory: string;
    onChange: (categoryId: string) => void;
}

export default function SelectCategoryProduct({
    categories,
    activeCategory,
    onChange,
}: SelectCategoryProductProps) {
    const [open, setOpen] = useState(true);
    const [localCategories, setCategories] = useState<CategoryTab[]>(categories);

    useEffect(() => {
        if (!open) return;
        getCategories()
            .then((res) => {
                const cats = res?.data || res;
                setCategories([
                    { id: 'all', name: 'Tất cả' },
                    ...cats.map((cat: any) => ({ id: cat.id.toString(), name: cat.name }))
                ]);
            })
            .catch(() => setCategories([{ id: 'all', name: 'Tất cả' }]));
    }, [open]);

    return (
        <Select value={activeCategory} onValueChange={onChange}>
            <SelectTrigger className="w-[220px] mb-4">
                <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
                {localCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
} 