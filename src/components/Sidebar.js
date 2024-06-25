import React from 'react';
import { Sidenav, Nav } from 'rsuite';

const barstyles = {
  width: 240,
  display: 'flex'
}

const CustomSidenav = ({ appearance, openKeys, onOpenChange }) => {
  return (
    <div style={barstyles}>
      <Sidenav
        appearance={appearance}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Sidenav.Body>
          <Nav >
          <Nav.Menu href="/department/1" title="Apparel">
              <div className="sub-categories">
                <Nav.Item href="/department/1/2">Mens</Nav.Item>
                <Nav.Item href="/department/1/3">Womens</Nav.Item>
                <Nav.Item href="/department/1/4">Boys</Nav.Item>
                <Nav.Item href="/department/1/5">Girls</Nav.Item>
                <Nav.Item href="/department/1/6">Jewelry</Nav.Item>
                <Nav.Item href="/department/1/7">Watches</Nav.Item>
              </div>
            </Nav.Menu>
            <Nav.Menu href="/department/2" title="Electronics">
              <div className="sub-categories">
                <Nav.Item href="/department/2/8">TV & Video</Nav.Item>
                <Nav.Item href="/department/2/9">Computers</Nav.Item>
                <Nav.Item href="/department/2/10">Audio</Nav.Item>
                <Nav.Item href="/department/2/11">Video Game Consoles</Nav.Item>
                <Nav.Item href="/department/2/12">Video Games</Nav.Item>
                <Nav.Item href="/department/2/13">Cell Phones</Nav.Item>
              </div>
            </Nav.Menu>
            <Nav.Menu href="/department/3" title="Home Goods">
              <div className="sub-categories">
                <Nav.Item href="/department/3/14">Kitchen & Dining</Nav.Item>
                <Nav.Item href="/department/3/15">Bedroom</Nav.Item>
                <Nav.Item href="/department/3/16">Bathroom</Nav.Item>
                <Nav.Item href="/department/3/17">Garden & Outdoor</Nav.Item>
                <Nav.Item href="/department/3/18">Home Decor</Nav.Item>
              </div>
            </Nav.Menu>
            <Nav.Menu href="/department/4" title="Outdoors & Sports">
              <div className="sub-categories">
                <Nav.Item href="/department/4/19">Camping & Hiking</Nav.Item>
                <Nav.Item href="/department/4/20">Fishing</Nav.Item>
                <Nav.Item href="/department/4/21">Skating</Nav.Item>
                <Nav.Item href="/department/4/22">Cycling</Nav.Item>
                <Nav.Item href="/department/4/23">Fitness</Nav.Item>
                <Nav.Item href="/department/4/24">Golf</Nav.Item>
              </div>
            </Nav.Menu>
            <Nav.Menu href="/department/5" title="Toys, Kids & Baby">
              <div className="sub-categories">
                <Nav.Item href="/department/5/25">Toys & Games</Nav.Item>
                <Nav.Item href="/department/5/26">Baby</Nav.Item>
                <Nav.Item href="/department/5/27">Diapering</Nav.Item>
                <Nav.Item href="/department/5/28">Furniture</Nav.Item>
                <Nav.Item href="/department/5/29">Safety</Nav.Item>
              </div>
            </Nav.Menu>
            <Nav.Menu href="/department/6" title="Automotive">
              <div className="sub-categories">
                <Nav.Item href="/department/6/30">Fluid Maintenance</Nav.Item>
                <Nav.Item href="/department/6/31">Cleaning Care</Nav.Item>
                <Nav.Item href="/department/6/32">Accessories</Nav.Item>
                <Nav.Item href="/department/6/33">Tires & Wheels</Nav.Item>
                <Nav.Item href="/department/6/34">Tools & Equipment</Nav.Item>
                <Nav.Item href="/department/6/35">Your Garage</Nav.Item>
              </div>
            </Nav.Menu>
            <Nav.Menu href="/department/7" title="Pets">
              <div className="sub-categories">
                <Nav.Item href="/department/7/36">Cat Food</Nav.Item>
                <Nav.Item href="/department/7/37">Cat Supplies</Nav.Item>
                <Nav.Item href="/department/7/38">Dog Food</Nav.Item>
                <Nav.Item href="/department/7/39">Dog Supplies</Nav.Item>
                <Nav.Item href="/department/7/40">Fish & Aquatic</Nav.Item>
                <Nav.Item href="/department/7/41">Small Animals & Birds</Nav.Item>
              </div>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default function Sidebar () {
  const [openKeys, setOpenKeys] = React.useState(['']);
  const [activeKey, setActiveKey] = React.useState(['']);

  return (
    <>
      <CustomSidenav
        activeKey={activeKey}
        openKeys={openKeys}
        onSelect={setActiveKey}
        onOpenChange={setOpenKeys}
      />
    </>
  );
};
