// Element Components
import SubmitBtn from "../components/SubmitBtn"

const Test = () => {
    return (
        <>
            <section className="test">
                <h3>Phishing IQ Test</h3>
                <div className="prg">
                    <label for="prg-bar">30%</label>
                    <progress id="prg-bar" value="30" max="100"> 30% </progress>
                </div>
                <p className="ques">Is the image below of a real email or phishing email?</p>
                <div className="options">
                    <div className="op">
                        <input type="radio" name="ans" id="rd1"/>
                        <label htmlFor="rd1">Real Email</label>
                    </div>
                    <div className="op">
                        <input type="radio" name="ans" id="rd2"/>
                        <label htmlFor="rd2">No Answer</label>
                    </div>
                    <div className="op">
                        <input type="radio" name="ans" id="rd3"/>
                        <label htmlFor="rd3">Phishing Email</label>
                    </div>
                </div>
                <div className="nxt-btn">
                    <SubmitBtn txt="Next"/>
                </div>
                <div className="image-box">
                    <img src="./images/sample.png" alt="" />
                </div>
            </section>
        </>
    )
}

export default Test
