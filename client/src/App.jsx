import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/index.jsx";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import {Toaster} from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {useSelector} from "react-redux";
import Loader from "./components/Loader.jsx";

function App() {
    const {loader} = useSelector(state => state.loaderReducer)

  return (
    <>
        <Toaster position={'top-center'} reverseOrder={false}/>
        {loader? <Loader/> : null}
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
