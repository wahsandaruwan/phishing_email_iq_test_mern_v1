// Element Components
import { useState } from "react"
import InputBox from "../components/InputBox"
import SubmitBtn from "../components/SubmitBtn"
import axios from "axios"

const Home = () => {
    // Login states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    // Update email state
    const emailState = (newValue) => {
        setEmail(newValue)
    }

    // Update password state
    const passwordState = (newValue) => {
        setPassword(newValue)
    }

    // Login handler
    const loginHandler = async (e) => {
        e.preventDefault()
        try{
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            setLoading(true)

            const details = await axios.post('http://localhost:3300/api/users/login', {
                email,
                password
            },
            config)
            console.log(details)
            // Save data in local storage
            // localStorage.setItem('userData', JSON.stringify(data))

            setLoading(false)
        }catch(err){
            setError(error)
        }
    }

    return (
        <>
            <section className="hero">
                <div className="overlay"></div>
                <div className="hero-txt">
                    <h1 className="heading-txt">Free Phishing IQ Test</h1>
                    <p className="desc-txt">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque accusamus excepturi dolor id natus, ipsum blanditiis tempore magnam eum. Animi vel ea laborum porro culpa est recusandae odio dolores blanditiis hic aliquid totam aliquam nihil reprehenderit quia placeat sunt voluptates modi, quisquam rerum eius, nam consequatur autem. Voluptas, doloremque eius!
                    </p>
                    <ul className="points">
                        <li>Accusamus excepturi quia placeat sunt</li>
                        <li>Kliquam nihil porro culpa est recusandae</li>
                        <li>Recusandae odio voluptates modi</li>
                        <li>Blanditiis hic tempore magnam eum</li>
                    </ul>
                </div>
                <div className="login-form">
                    <form>
                        <h2>Login to Start...</h2>
                        <InputBox type="text" loginState={emailState} place="Enter Your User Name..."/>
                        <InputBox type="password" loginState={passwordState} place="Enter Your Password..."/>
                        <SubmitBtn loginFunc={loginHandler} txt="Login"/>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Home
