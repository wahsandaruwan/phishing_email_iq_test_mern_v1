// Element Components
import SubmitBtn from "./SubmitBtn"

const QuizStart = ({onQuizStart}) => {
    return (
        <>
            <div className="quiz-start-end">
                <div>
                    <SubmitBtn clickFunc={onQuizStart} txt="Start the Quiz"/>
                </div>
            </div>
        </>
    )
}

export default QuizStart
