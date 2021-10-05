// Element Components
import InputBox from "../components/InputBox"
import SubmitBtn from "../components/SubmitBtn"

const Home = () => {
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
                    <form action="">
                        <h2>Login to Start...</h2>
                        <InputBox type="text" place="Enter Your User Name..."/>
                        <InputBox type="password" place="Enter Your Password..."/>
                        <SubmitBtn txt="Login"/>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Home
