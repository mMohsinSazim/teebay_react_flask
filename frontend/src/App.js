import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Navbar from "./Shared/Componenets/Navbar";
import AddProductPage from "./Pages/AddProductPage/AddProductPage";
import UpdateProductPage from "./Pages/UpdateProductPage/UpdateProductPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route
            path="update-product/:productId"
            element={<UpdateProductPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
