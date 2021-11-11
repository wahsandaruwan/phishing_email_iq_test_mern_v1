// Element Components
import SubmitBtn from "./SubmitBtn"

const QuizStart = ({onQuizStart}) => {
    return (
        <>
            <div className="quiz-start-end">
                <h3>Phishing IQ Test</h3>
                <div>
                    <SubmitBtn clickFunc={onQuizStart} txt="Start the Quiz"/>
                </div>
            </div>
        </>
    )
}

export default QuizStart
