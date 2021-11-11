import SubmitBtn from "./SubmitBtn"

const QuizStart = ({onQuizStart}) => {
    return (
        <>
            <div className="quiz-start">
                <SubmitBtn clickFunc={onQuizStart} txt="Start the Quiz"/>
            </div>
        </>
    )
}

export default QuizStart
