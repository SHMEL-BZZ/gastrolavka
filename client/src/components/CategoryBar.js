import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const CategoryBar = observer(() => {
    const { dish } = useContext(Context);
    return (
        <div className="category-list">
            {dish.categories.map(category => (
                <div
                    key={category.id}
                    className={`category-list-item ${category.id === dish.selectedCategory.id ? 'active' : ''}`}
                    onClick={() => {
                        dish.setSelectedCategory(category);
                        dish.setPage(1);
                    }}
                >
                    {category.name}
                </div>
            ))}
        </div>
    );
});

export default CategoryBar;