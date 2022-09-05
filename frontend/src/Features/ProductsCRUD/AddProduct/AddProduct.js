import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, FormButton } from "../../../Shared";
import { useSelector } from "react-redux";

const AddProductPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    title: "",
    categories: "",
    description: "",
    price: 0,
    rentPrice: 0,
    rentType: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    productInfo.categories = productInfo.categories.join(",");
    console.log(productInfo);
    const addProduct = await axios.post("/api/products", productInfo, {
      headers: {
        "Content-Type": "application/json",
        Bearer: `${JSON.parse(localStorage.getItem("user")).token}`,
      },
    });
    console.log(addProduct.data);
    navigate("/");
  };
  const handleCategory = (e) => {
    const selected = [];
    for (let i = 0; i < e.target.selectedOptions.length; i++) {
      selected.push(e.target.selectedOptions.item(i).value);
    }
    setProductInfo({ ...productInfo, categories: selected });
  };
  return (
    <>
      <Form>
        <h3>Add Product</h3>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={productInfo.title}
            onChange={(e) =>
              setProductInfo({ ...productInfo, title: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="categories">Categories:</label>
          <select name="cars" id="cars" multiple onChange={handleCategory}>
            <option value="Electronics">Electronics</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Toy">Toy</option>
            <option value="Food">Food</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="6"
            cols="50"
            value={productInfo.description}
            onChange={(e) =>
              setProductInfo({ ...productInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={productInfo.price}
            onChange={(e) =>
              setProductInfo({ ...productInfo, price: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="rentPrice">Rent Price:</label>
          <input
            type="number"
            id="rentPrice"
            value={productInfo.rentPrice}
            onChange={(e) =>
              setProductInfo({ ...productInfo, rentPrice: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="rentType">Rent Type:</label>
          <select
            name="cars"
            id="cars"
            onChange={(e) =>
              setProductInfo({ ...productInfo, rentType: e.target.value })
            }
          >
            <option value="Per Day">Per Day</option>
            <option value="Per Hour">Per Hour</option>
          </select>
        </div>
        <FormButton type="submit" onClick={handleSubmit}>
          Add
        </FormButton>
      </Form>
    </>
  );
};

export default AddProductPage;
