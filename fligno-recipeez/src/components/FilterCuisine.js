import React from "react";

function FilterCuisine({ categories, filterCuisine, cuisine }) {
  // Pass the parameters to filter function in recipes
  const selectedCategory = (e) => {
    filterCuisine(e.target.value);
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
        {cuisine}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            value="Cuisine"
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

export default FilterCuisine;
