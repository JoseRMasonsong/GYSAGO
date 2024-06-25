import { Content } from 'rsuite'
import { DiamondsFour } from "phosphor-react";
import './styles/home.css'

export default function Overview() {
    return (
        <div classsName="home">
            <h1 className="homeHeader">Overview Page</h1>
            <Content>
                <div className='homeContent'>
                    <div className='homeContentBullet'><DiamondsFour size={25}/></div>
                    <div className="homeContentText">
                    Our team plans to develop a web-based application by replicating an online shopping system like that of Amazon. We will develop a functional UI and relative database system to record a users account, shopping history, item orders, along with tracking reviews, ratings, and purchases to provide product suggestions based on user searches that will be connected based on keywords attached to the products. 
                    </div>
                </div>
                <div className='homeContent'>
                    <div className='homeContentBullet'><DiamondsFour size={25}/></div>
                    <div className="homeContentText">
                    In tandem with the UI, we are establishing a sophisticated and efficient database system. This system will be designed to comprehensively record and manage users' accounts, meticulously track their shopping history, manage item orders seamlessly, and maintain a repository for reviews, ratings, and purchase information. This holistic approach to data management ensures that our application not only provides an immersive shopping experience but also empowers users with the ability to track and analyze their interactions over time.
                    </div>
                </div>
            </Content>
        </div>
    )
}