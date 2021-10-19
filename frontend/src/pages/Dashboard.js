// Element Components
import Navbar from "../components/Navbar"
import Test from "../components/Test"

// Hooks
import { useState } from "react"
import Summary from "../components/Summary";
import Table from "../components/Table";
import { useHistory } from "react-router-dom";

const Dashboard = () => {   
    // Display different admin component
    const [display, setDisplay] = useState("summary")

    // Set history
    const history = useHistory()

    // Update the state
    const updateState = (newState) => {
        setDisplay(newState)
    }

    // Redirect to home if user not logged in
    const userData = localStorage.getItem('userWithToken')
    if(!userData){
        history.push("/")
    } 

    return (
        <>
            <Navbar updateState={updateState} currState={display}/>
            {display === "summary" && <Summary/>}
            {display === "myAllTest" && <Table/>}
            {display === "newTest" && <Test/>}
        </>
    )
}

export default Dashboard
