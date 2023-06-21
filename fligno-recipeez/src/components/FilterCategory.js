import React from "react";
import { useNavigate } from "react-router-dom";

function FilterCategory({
  categories,
  label,
  filterCategory,
  category,
  cuisine,
}) {
  // Pass the parameters to filter function in recipes
  const navigate = useNavigate();
  const selectedCategory = (e) => {
    if (label === "Category") {
      filterCategory(e.target.value, cuisine);
      navigate(`/recipes?category=${e.target.value}&cuisine=${cuisine}`);
    }

    if (label === "Cuisine") {
      filterCategory(category, e.target.value);
      navigate(`/recipes?category=${category}&cuisine=${e.target.value}`);
    }
  };

  // List each category in the dropdown menu
  const dropdownItems = categories.map((categoryName) => {
    return (
      <li key={categoryName}>
        <button
          className="dropdown-item"
          value={categoryName}
          onClick={selectedCategory}
        >
          {categoryName}
        </button>
      </li>
    );
  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-danger dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {label}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            value=""
            className="dropdown-item"
            onClick={selectedCategory}
          >
            All
          </button>
        </li>
        {dropdownItems}
      </ul>
    </div>
  );
}

export default FilterCategory;
