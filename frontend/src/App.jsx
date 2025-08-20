import { Route, Routes } from "react-router-dom"
import HomeScreen from "./screens/HomeScreen.jsx"
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import LoginScreen from "./screens/LoginScreen.jsx"
import RegisterScreen from "./screens/RegisterScreen.jsx"
import Header from "./components/Header.jsx"
import { Container } from "react-bootstrap"
import { ToastContainer } from 'react-toastify';

import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductAddScreen from "./screens/Admin/ProductAddScreen.jsx"
import ProductEditScreen from "./screens/Admin/ProductEditScreen.jsx"

import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

                        <Route path="/product/:id" element={<ProductScreen/>}/>

            <Route path="/admin/productlist" element={<ProductListScreen/>}/>

            <Route path="/admin/addProduct" element={<ProductAddScreen/>}/>
            <Route path="/admin/edit/:id" element={<ProductEditScreen/>}/>
          </Routes>
        </Container>
      </main>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
