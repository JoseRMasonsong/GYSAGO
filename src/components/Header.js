import { Navbar, Nav } from 'rsuite';
import { ShoppingCart } from "phosphor-react";

export default function Header() {

    return (
        <Navbar>
            <Navbar.Brand href="/"><p className="brand">GYSAGO</p></Navbar.Brand>
            <Nav pullRight>
                <Nav.Item href="/cart"><ShoppingCart size={30}/></Nav.Item>
                <Nav.Item href="/shop-all">Shop All</Nav.Item>
                <Nav.Item href="/profile">Profile</Nav.Item>
                <Nav.Item href="/sign-in">Sign-In</Nav.Item>
            </Nav>
        </Navbar>
    )
}