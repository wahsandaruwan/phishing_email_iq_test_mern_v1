// Element Component
import QuizWithHeading from "./QuizWithHeading"
import QuizStart from "./QuizStart";

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import TestEnd from "./TestEnd";

let interval
const Test = () => {
    // Question states
    const [step, setStep] = useState(1)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [answers, setAnswers] =  useState([])
    const [time, setTime] = useState(0)
    const [quizes, setQuizes] = useState([])

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const token = JSON.parse(userData).success
    console.log(token)

    // Create config with token
    const configCommon = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    // Clear interval
    useEffect(() => {
        if(step === 3){
            clearInterval(interval)
        }
    }, [step])

    // Quiz start handler
    const quizStartHandler = (e) => {
        e.preventDefault()
        setStep(2)
        // Timer
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, 1000)
    }

    // Quiz reset handler
    const resetClickHandler = (e) => {
        e.preventDefault()

        setStep(2)
        setActiveQuestion(0)
        setAnswers([])
        setTime(0)
        // Timer
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, 1000)
    }

    // Shuffle array
    const shuffleArray = (arr) => {
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1))
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }

        return arr
    }

    // Fetching quizes handler
    const quizFetchhandler = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3300/api/quizes/`,
                configCommon
            )
            if(data.authEx){
                alert(data.errors.message)
                // Clear local storage and navigate to login page
                localStorage.clear()
                history.push("/")
            }
            else{
                console.log(data)
                const cloneData = [...data]
                console.log(shuffleArray(cloneData))
                setQuizes(cloneData)
            }
        } catch (err) {
            alert(err.message)
        }
    }

    // Handle fetching all users
    useEffect(() => {
        quizFetchhandler()
    }, [])

    return (
        <>
            <section className="test">
                {step === 1 && <QuizStart onQuizStart={quizStartHandler}/>}
                {step === 2 && <QuizWithHeading
                    data={quizes[activeQuestion]}
                    onAnswerUpdate={setAnswers}
                    numOfQuestions={10}
                    activeQuestion={activeQuestion}
                    onSetActiveQuestion={setActiveQuestion}
                    onSetStep={setStep}
                />}
                {step === 3 && <TestEnd
                    results={answers}
                    data={quizes}
                    onReset={resetClickHandler}
                    timeDuration={time}
                />}
            </section>
        </>
    )
}

export default Test
