import React from "react"
import { Link } from 'react-router-dom'
import './styles/home.css'

export default function Home() {
    return (
        <div>
            <h1 className="homeHeader">About Us</h1>
            <div className="homeLinks">
                <Link to="/overview" className="homeLinkObject"> Overview</Link>
                <Link to="/objective" className="homeLinkObject"> Objective</Link>
                <Link to="/class-relation" className="homeLinkObject"> Class Relationship</Link>
                <Link to="/main-concepts" className="homeLinkObject"> Main Concepts</Link>
                <Link to="/pros" className="homeLinkObject"> Pros</Link>
                <Link to="/cons" className="homeLinkObject"> Cons</Link>
            </div>
        </div>
    )
}