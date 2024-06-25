import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Header from './Header'
import Home from '../pages/Home'
import Overview from '../pages/Overview'
import Objective from '../pages/Objective'
import ClassRelation from '../pages/ClassRelation'
import MainConcepts from '../pages/MainConcepts'
import Pros from '../pages/Pros'
import Cons from '../pages/Cons'
import Sidebar from './Sidebar'
import ShopAll from '../pages/ShopAll'
import Department from '../pages/Department'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import './Router.css'
import '../pages/styles/home.css'
import { Footer } from 'rsuite'

export default function Router() {

    const Layout = () => {
        return (
          <div className='rootMain'>
            <div className='rootHeader'>
                <Header />
                <Outlet/>
            </div>
          </div>
        )
    }

    const Shop = () => {
        return (
            <div className="shop">
                <Sidebar />
                <Outlet />
            </div>
        )
    }

    const HomePage = () => {
        return (
            <div className="homePage">
                <Home />
                <Outlet />
                <Footer > Created By: Alexander Kincaid, Jose Masonsong, Ethan Glover</Footer>
            </div>
        )
    }

    const BrowserRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element={<Layout/>}>
                        <Route path="/" element={<HomePage/>}>
                            <Route path="overview" element={<Overview />}/>
                            <Route path="objective" element={<Objective />}/>
                            <Route path="class-relation" element={<ClassRelation />}/>
                            <Route path="main-concepts" element={<MainConcepts />}/>
                            <Route path="pros" element={<Pros />}/>
                            <Route path="cons" element={<Cons />}/>
                        </Route>
                        <Route path="" element={<Shop />}>
                            <Route path="shop-all" element={<ShopAll />}/>
                            <Route path="department/:cat_id/:sub_cat_id" element={<Department />}/>
                        </Route>
                        <Route path="cart" element={<Cart />}/>
                        <Route path="profile" element={<Profile />}/>
                        <Route path="sign-up" element={<SignUp />}/>
                        <Route path="sign-in" element={<SignIn />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRoutes/>
    )
}