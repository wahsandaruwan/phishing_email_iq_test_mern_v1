const Navbar = ({ updateState, currState }) => {
    // Elements only for normal users
    const onlyNormal = () => {
        const { userType } = JSON.parse(localStorage.getItem('userWithToken')).userInfo
        if (userType === "normal") {
            return <li>
                <a className={`${currState === "newTest" ? "active" : ""}`} onClick={() => updateState("newTest")}>New Test</a>
            </li>
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
                        <a className="lgo-btn">Logout</a>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Navbar
