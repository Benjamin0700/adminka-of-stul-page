import React, { useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    imgUrl: "",
    text: "",
    description: "",
    cost: "",
    category: "",
  });

  const [categories] = useState(["Coffees", "Chairs", "Tables"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.text || !product.category || !product.cost) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/chairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          cost: parseFloat(product.cost),
        }),
      });

      if (response.ok) {
        alert("Mahsulot muvaffaqiyatli qo'shildi!");
        setProduct({
          imgUrl: "",
          text: "",
          description: "",
          cost: "",
          category: "",
        });
      } else {
        alert("Xatolik yuz berdi, iltimos qayta urinib ko'ring!");
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-5">Mahsulot Qo'shish</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Rasm URL:</label>
          <input
            type="text"
            name="imgUrl"
            value={product.imgUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Mahsulot rasmi URL"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Nomi:</label>
          <input
            type="text"
            name="text"
            value={product.text}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Mahsulot nomi"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Izoh:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Mahsulot haqida qisqacha izoh"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Narxi:</label>
          <input
            type="number"
            name="cost"
            value={product.cost}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Mahsulot narxi"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Kategoriya:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Tanlang</option>
            {categories
              .filter((category) => category !== "Coffees") 
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Mahsulotni Qo'shish
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
