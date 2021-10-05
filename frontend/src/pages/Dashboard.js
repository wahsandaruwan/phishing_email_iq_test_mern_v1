// Element Components
import Navbar from "../components/Navbar"
import Test from "../components/Test"

// Hooks
import { useState } from "react"
import Summary from "../components/Summary";

const Dashboard = () => {
    // Display different admin component
    const [display, setDisplay] = useState("summary")
    // Update the state
    const updateState = (newState) => {
        setDisplay(newState)
    }
    return (
        <>
            <Navbar updateState={updateState} currState={display}/>
            {display === "newTest" && <Test/>}
        </>
    )
}

export default Dashboard
