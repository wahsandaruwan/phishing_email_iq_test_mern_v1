// Element Components
import Question from "./Question"

const QuizWithHeading = () => {
    return (
        <>
            <h3>Phishing IQ Test</h3>
            <div className="prg">
                <label for="prg-bar">30%</label>
                <progress id="prg-bar" value="30" max="100"> 30% </progress>
            </div>
            <p className="ques">Is the image below of a real email or phishing email?</p>
            <Question/>
        </>
    )
}

export default QuizWithHeading
