import { useHistory } from "react-router-dom";

const Navbar = ({ updateState, currState }) => {
    // Set history
    const history = useHistory()

    // User data in local storage
    const userData = localStorage.getItem('userWithToken')

    // Logout handler
    const loginHandler = (e) => {
        e.preventDefault();
        localStorage.clear()
        history.push("/")
    }

    // Elements only for normal users
    const onlyNormal = () => {
        if(userData){
            const { userType } = JSON.parse(userData).userInfo
            if(userType === "normal"){
                return <li>
                    <a className={`${currState === "newTest" ? "active" : ""}`} onClick={() => updateState("newTest")}>New Test</a>
                </li>
            }
        }
    }

    return (
        <>
            <section className="nav">
                <ul className='menu-links'>
                    <li>
                        <a className={`${currState === "summary" ? "active" : ""}`} onClick={() => updateState("summary")}>Dashboard</a>
                    </li>
                    <li>
                        <a className={`${currState === "allTest" ? "active" : ""}`} onClick={() => updateState("allTest")}>All Tests</a>
                    </li>
                    {onlyNormal()}
                    <li>
                        <a href="#" onClick={(e) => loginHandler(e)} className="lgo-btn">Logout</a>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Navbar
