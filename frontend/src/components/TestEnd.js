// Element Components
import SubmitBtn from "./SubmitBtn"

import {useState, useEffect} from 'react'
import {formatTime} from '../utils/timeformat'

const TestEnd = ({results, data, onReset, time}) => {
    // Result state
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [recommendation, setRecommendation] = useState('')

    // Add test data handler
    const addTestHandler = (correct) => {
        // Set recommendation
        if(correct >= 8 && correct <= 10){
            setRecommendation("Great job, Keep defending!")
        }
        else if(correct >= 5 && correct < 8){
            setRecommendation("Good job, But you can do better!")
        }
        else{
            setRecommendation("Not enough, Re-do the test!")
        }
    }

    // Finalize test
    useEffect(() => {
        // Set correct answers
        let correct = 0
        results.forEach((result, index) => {
            if(result.a === data[index].quizAns){
                correct++
            }
        })
        setCorrectAnswers(correct)

        // Add test to db
        addTestHandler(correct)
    }, [])

    return (
        <>
            <div className="quiz-start-end">
                <h3>Your Results</h3>
                <p>{correctAnswers} of 10</p>
                <p><strong>{Math.floor((correctAnswers / 10) * 100)}%</strong></p>
                <p><strong>Your time : </strong> {formatTime(time)}</p>
                <p><strong>{recommendation}</strong></p>
                <div>
                    <SubmitBtn clickFunc={onReset} txt="Try Again"/>
                </div>
            </div>
        </>
    )
}

export default TestEnd
