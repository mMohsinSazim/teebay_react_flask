import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomePage } from "./Pages/HomePage";
import { SignUpPage } from "./Pages/SignUpPage";
import { LoginPage } from "./Pages/LoginPage";
import { Navbar } from "./Shared";
import { AddProductPage } from "./Pages/AddProductPage";
import { UpdateProductPage } from "./Pages/UpdateProductPage";
import Error from "./Pages/Error";
import ProtectedRoutePage from "./Pages/ProtectedRoutePage/ProtectedRoutePage";
import ProtectedRouteForAuth from "./Pages/ProtectedRoutePage/ProtectedRouteForAuth";
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="sign-up"
            element={
              <ProtectedRouteForAuth user={user}>
                <SignUpPage />
              </ProtectedRouteForAuth>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRouteForAuth user={user}>
                <LoginPage />
              </ProtectedRouteForAuth>
            }
          />
          <Route
            path="add-product"
            element={
              <ProtectedRoutePage user={user}>
                <AddProductPage />
              </ProtectedRoutePage>
            }
          />
          <Route
            path="update-product/:productId"
            element={
              <ProtectedRoutePage user={user}>
                <UpdateProductPage />
              </ProtectedRoutePage>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
