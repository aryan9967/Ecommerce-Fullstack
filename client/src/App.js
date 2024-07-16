import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import Profile from "./pages/user/Profile.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard/Dashboard.jsx";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPasssword from "./pages/Auth/ForgotPassword.jsx";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDasboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import Users from "./pages/Admin/Users.jsx";
import Products from "./pages/Admin/Products.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import Search from "./pages/Search.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Categories from "./pages/Categories.jsx";
import CategoryProduct from "./pages/CategoryProduct.jsx";
import Header from "./components/Layout/Header.jsx";
import RegisterSeller from "./pages/Auth/RegisterSeller.jsx";
import LoginSeller from "./pages/Auth/LoginSeller.jsx";
import Cart from "./pages/Cart.jsx";
import ManageProducts from "./pages/user/Dashboard/ManageProducts.jsx";
import CreateProduct from "./pages/user/Dashboard/CreateProduct.jsx";
import LoginUser from "./pages/Auth/LoginUser.jsx";
import RegisterUser from "./pages/Auth/RegisterUser.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import DashboardEditProfile from "./pages/user/Dashboard/DashboardEditProfile.jsx";
import DashboardOrders from "./pages/user/Dashboard/DashboardOrders.jsx";
import DashboardAddress from "./pages/user/Dashboard/DashboardAddress.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:pid" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard">
          <Route path="profile" element={<Dashboard />} />
          <Route path="edit_profile" element={<DashboardEditProfile />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="address" element={<DashboardAddress />} />
          <Route path="manage_products" element={<ManageProducts />} />
          <Route path="create-product" element={<CreateProduct />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register/seller" element={<RegisterSeller />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login/seller" element={<LoginSeller />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;