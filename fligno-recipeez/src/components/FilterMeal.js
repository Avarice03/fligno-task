import React from "react";

function FilterMeal({ categories, filterMeal, meal }) {
  // Pass the parameters to filter function in recipes
  const selectedCategory = (e) => {
    filterMeal(e.target.value);
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
        {meal}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            value="Meal Type"
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

export default FilterMeal;
