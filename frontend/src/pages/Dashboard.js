// Element Components
import Navbar from "../components/Navbar"
import Test from "../components/Test"

// Hooks
import { useState } from "react"
import Summary from "../components/Summary";
import Table from "../components/Table";

const Dashboard = () => {    
    // Display different admin component
    const [display, setDisplay] = useState("allTest")
    // Update the state
    const updateState = (newState) => {
        setDisplay(newState)
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
