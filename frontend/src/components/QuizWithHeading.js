// Element Components
import Question from "./Question"

import {useState, useEffect} from 'react'

const QuizWithHeading = ({data, onAnswerUpdate, numOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep}) => {
    // Progress bar state
    const [progress, setProgress] = useState(10)

    // Update progress bar handler
    const setProgressBarHandler = () => {
        console.log('object')
        setProgress(progress+10)
    }

    return (
        <>
            <h3>Phishing IQ Test</h3>
            <div className="prg">
                <label for="prg-bar">{progress}%</label>
                <progress id="prg-bar" value={progress} max="100"> {progress}% </progress>
            </div>
            <p className="ques">Is the image below of a real email or phishing email?</p>
            <Question data={data} onAnswerUpdate={onAnswerUpdate} numOfQuestions={numOfQuestions} activeQuestion={activeQuestion} onSetActiveQuestion={onSetActiveQuestion} onSetStep={onSetStep} setProgress={setProgressBarHandler}/>
        </>
    )
}

export default QuizWithHeading
