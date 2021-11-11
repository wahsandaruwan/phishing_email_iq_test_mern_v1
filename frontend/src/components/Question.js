// Element Components
import SubmitBtn from "../components/SubmitBtn"

const Question = () => {
    return (
        <>
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
        </>
    )
}

export default Question
