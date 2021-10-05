const Navbar = ({updateState, currState}) => {
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
                    <li>
                        <a className={`${currState === "newTest" ? "active" : ""}`} onClick={() => updateState("newTest")}>New Test</a>
                    </li>
                    <li>
                        <a className="lgo-btn">Logout</a>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Navbar
