import { useHistory } from "react-router-dom";

const Navbar = ({ updateState, currState }) => {
    // Set history
    const history = useHistory()

    // User data in local storage
    const userData = localStorage.getItem('userWithToken')
    const { firstName, userType } = JSON.parse(userData).userInfo

    // Logout handler
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.clear()
        history.push("/")
    }

    // Elements only for normal users
    const displayOnUserType = () => {
        if(userType === "normal"){
            return (
                <>
                    <li>
                    <a className={`${currState === "myAllTest" ? "active" : ""}`} onClick={() => updateState("myAllTest")}>My All Tests</a>
                    </li>
                    <li>
                        <a className={`${currState === "newTest" ? "active" : ""}`} onClick={() => updateState("newTest")}>New Test</a>
                    </li>
                </>
            )
        }
        else{
            return (
                <>
                    <li>
                    <a className={`${currState === "allTest" ? "active" : ""}`} onClick={() => updateState("allTest")}>All Tests</a>
                    </li>
                    <li>
                        <a className={`${currState === "allUsers" ? "active" : ""}`} onClick={() => updateState("allUsers")}>All Users</a>
                    </li>
                    <li>
                        <a className={`${currState === "allQuizes" ? "active" : ""}`} onClick={() => updateState("allQuizes")}>All Quizes</a>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <section className="nav">
                <ul className='menu-links'>
                    <li>
                        <a className={`${currState === "summary" ? "active" : ""}`} onClick={() => updateState("summary")}>Dashboard</a>
                    </li>
                    {displayOnUserType()}
                    <li>
                        <a href="#" onClick={(e) => logoutHandler(e)} className="lgo-btn">Logout</a>
                    </li>
                    <li style={{backgroundColor: "#fff", color: "#000", padding: "10px 25px", borderRadius: "8px"}}>
                        Welcome {firstName}
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Navbar
