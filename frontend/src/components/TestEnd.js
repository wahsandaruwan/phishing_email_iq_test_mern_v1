// Element Components
import SubmitBtn from "./SubmitBtn"

import {useState, useEffect} from 'react'
import {formatTime} from '../utils/timeformat'
import {currentDate} from '../utils/currentdate'
import {currentTime} from '../utils/currenttime'
import {useHistory} from "react-router"
import axios from "axios"

const TestEnd = ({results, data, onReset, timeDuration}) => {
    // Result state
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [recommendation, setRecommendation] = useState('')

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const user = JSON.parse(userData).userInfo
    const token = JSON.parse(userData).success

    // Configurations
    const configPost = {
        headers: {
            "Content-type": `application/json`,
            "Authorization": `Bearer ${token}`
        }
    }

    // Add test data handler
    const addTestHandler = async (correct) => {
        let recommendation = ''
        // Set recommendation
        if(correct >= 8 && correct <= 10){
            recommendation = "Great job, Keep defending!"
            setRecommendation(recommendation)
        }
        else if(correct >= 5 && correct < 8){
            recommendation = "Good job, But you can do better!"
            setRecommendation(recommendation)
        }
        else{
            recommendation = "Not enough, Re-do the test!"
            setRecommendation(recommendation)
        }

        // Api call
        try{
            const {data} = await axios.post(
                'http://localhost:3300/api/tests', 
                {
                    userEmail: user.email,
                    currentDate: currentDate(),
                    currentTime: currentTime(),
                    timeDuration,
                    correct,
                    recommendation
                },
                configPost
            )

            if(!data.created){
                if(data.authEx){
                    alert(data.errors.message)
                    setTimeout(() => { 
                        // Clear local storage and navigate to login page
                        localStorage.clear()
                        history.push("/")
                    }, 5000)
                }
                else{
                    throw Error(data.errors.message)
                }
            }
        }catch(err){
            alert(err.message)
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
                <p><strong>Your time : </strong> {formatTime(timeDuration)}</p>
                <p><strong>{recommendation}</strong></p>
                <div>
                    <SubmitBtn clickFunc={onReset} txt="Try Again"/>
                </div>
            </div>
        </>
    )
}

export default TestEnd
