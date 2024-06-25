import { Content } from 'rsuite'
import { DiamondsFour } from "phosphor-react";
import './styles/home.css'

export default function Objective() {
    return (
        <div classsName="home">
            <h1 className="homeHeader">Objective Page</h1>
            <Content>
                <div className='homeContent'>
                    <div className='homeContentBullet'><DiamondsFour size={25}/></div>
                    <div className="homeContentText">
                    The presentation communicates the thoughtfulness behind our decisions, especially in the development of a user interface that seamlessly blends aesthetic appeal with intuitive functionality. The heart of our application lies in the meticulous construction of a relative database system. We not only showcase our commitment to data management but also the pivotal role of a robust database in realizing the functionalities of recording user accounts, tracking shopping history, managing item orders, and providing product suggestions. Therefore, becomes a conduit to emphasize the critical intersection of technology and user experience. It is a dynamic opportunity to communicate the 'why' behind our project, its significance, differentiators, and potential impact. 
                    </div>
                </div>
            </Content>
        </div>
    )
}