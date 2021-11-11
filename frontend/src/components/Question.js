// Element Components
import SubmitBtn from "../components/SubmitBtn"

import {useState, useEffect, useRef} from 'react'

const Question = ({data, onAnswerUpdate, numOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep}) => {
    // Current question state
    const [selected, setSelected] = useState('')
    const [error, setError] = useState('')

    console.log(data)

    // Get checked radio button and unchecked it
    const radioWrapper = useRef()

    useEffect(() => {
        const findCheckedInput = radioWrapper.current.querySelector('input:checked')
        if(findCheckedInput){
            findCheckedInput.checked = false
        }
    },[data])

    // Change answer handler
    const changeHandler = (e) => {
        setSelected(e.target.value)
        if(error){
            setError('')
        }
    }

    // Next question handler
    const nextClickHandler = (e) => {
        e.preventDefault()

        if(selected === ''){
            return setError('Please select an answer!')
        }
        onAnswerUpdate((prevState) => [...prevState, {q: data.question, a: selected}])
        setSelected('')
        if(activeQuestion < numOfQuestions - 1){
            onSetActiveQuestion(activeQuestion + 1)
        }
        else{
            onSetStep(3)
        }
    }

    return (
        <>
            {error && <div style={{maxWidth: "400px", marginBottom: "10px"}} className="err-msg">{error}</div>}
            <div className="options" ref={radioWrapper}>
                <div className="op">
                    <input type="radio" name="ans" id="rd1" value="legitimate" onChange={changeHandler}/>
                    <label htmlFor="rd1">Real Email</label>
                </div>
                <div className="op">
                    <input type="radio" name="ans" id="rd2" value="none" onChange={changeHandler}/>
                    <label htmlFor="rd2">No Answer</label>
                </div>
                <div className="op">
                    <input type="radio" name="ans" id="rd3" value="phishing" onChange={changeHandler}/>
                    <label htmlFor="rd3">Phishing Email</label>
                </div>
            </div>
            <div className="nxt-btn">
                <SubmitBtn clickFunc={nextClickHandler} txt="Next"/>
            </div>
            <div className="image-box">
                <img src={"./uploads/" + data.quizImage} alt="" />
            </div>
        </>
    )
}

export default Question
