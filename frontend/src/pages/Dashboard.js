// Element Components
import Navbar from "../components/Navbar"
import Test from "../components/Test"
import SummaryNormal from "../components/SummaryNormal"
import TableUserAllTests from "../components/TableUserAllTests"
import TableAllTests from "../components/TableAllTests"
import TableAllUsers from "../components/TableAllUsers"
import SummaryAdmin from "../components/SummaryAdmin"

// Hooks
import { useState } from "react"
import { useHistory } from "react-router-dom"

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

    // Set user summary of dashboard
    const setUserSummary = () => {
        if(userData){
            const { userType } = JSON.parse(userData).userInfo
            if(userType === 'normal'){
                return <SummaryNormal/>
            }
            else{
                return <SummaryAdmin/>
            }
        }
    }

    return (
        <>
            <Navbar updateState={updateState} currState={display}/>
            {display === "summary" && setUserSummary()}
            {display === "myAllTest" && <TableUserAllTests/>}
            {display === "allUsers" && <TableAllUsers/>}
            {display === "allTest" && <TableAllTests/>}
            {display === "newTest" && <Test/>}
        </>
    )
}

export default Dashboard
