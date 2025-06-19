import React from "react";

export default function CategoryFilter({ categories, selectedCategories, setSelectedCategories }) {
  return (
    <div style={{ margin: "20px 50px" }}>
      <label style={{ fontWeight: "bold" }}>Filter by Categories: </label>
      {categories.map((cat) => (
        <label key={cat.id} style={{ marginRight: 12 }}>
          <input
            type="checkbox"
            value={cat.id}
            checked={selectedCategories.includes(cat.id)}
            onChange={e => {
              const id = cat.id;
              setSelectedCategories(selectedCategories =>
                e.target.checked
                  ? [...selectedCategories, id]
                  : selectedCategories.filter(cid => cid !== id)
              );
            }}
          />
          {cat.name}
        </label>
      ))}
    </div>
  );
}