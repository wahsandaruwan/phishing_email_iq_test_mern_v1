// Element Components
import Navbar from "../components/Navbar"
import Test from "../components/Test"

// Hooks
import { useState } from "react"
import Summary from "../components/Summary";
import Table from "../components/Table";
import { Redirect } from "react-router-dom";

const Dashboard = ({authorized}) => {   
    // Display different admin component
    const [display, setDisplay] = useState("summary")
    // Update the state
    const updateState = (newState) => {
        setDisplay(newState)
    }

    // Redirect to home if user not logged in
    const userData = localStorage.getItem('userWithToken')
    if(!userData){
        return <Redirect to="/"/>
    } 

    return (
        <>
            <Navbar updateState={updateState} currState={display}/>
            {display === "summary" && <Summary/>}
            {display === "allTest" && <Table/>}
            {display === "newTest" && <Test/>}
        </>
    )
}

export default Dashboard
