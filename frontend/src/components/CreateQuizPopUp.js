import { useState, useEffect } from "react"
import axios from "axios"
import { useHistory,} from "react-router-dom"

import { BiX } from "react-icons/bi"
import InputBox from "./InputBox"
import SubmitBtn from "./SubmitBtn"

const CreateQuizPopUp = ({refreshQuizTable, togglePopUp, selectedQuizId}) => {
    // New quiz states
    const [title, setTitle] = useState("")
    const [quizImage, setQuizImage] = useState("")
    const [quizAns, setQuizAns] = useState("")
    const [myError, setMyError] = useState("")
    const [mySuccess, setMySuccess] = useState("")

    console.log(selectedQuizId)

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const token = JSON.parse(userData).success

    // Update title state
    const titleState = (newValue) => {
        setTitle(newValue)
    }

    // Update image state
    const imageState = (imgName) => {
        console.log(imgName)
        setQuizImage(imgName)
    }

    // Update answer state
    const answerState = (newValue) => {
        setQuizAns(newValue)
    }

    // Configurations
    const configPost = {
        headers: {
            "Content-type": `multipart/form-data`,
            "Authorization": `Bearer ${token}`
        }
    }

    const configCommon = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    // Create quiz handler
    const createQuizHandler = async (e) => {
        e.preventDefault()

        // Set form data
        const formData = new FormData()
        formData.append("title", title)
        formData.append("quizImage", quizImage)
        formData.append("quizAns", quizAns)

        // Api call
        try{
            const {data} = await axios.post(
                'http://localhost:3300/api/quizes/',
                formData,
                configPost
            )

            if(data.created){
                setMyError("")
                setMySuccess(data.success.message)
                setTimeout(() => { 
                    togglePopUp(e)
                }, 2000)
                // Refresh user table
                refreshQuizTable()
            }
            else{
                if(data.authEx){
                    setMySuccess("")
                    setMyError(data.errors.message)
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
            console.log(err)
            setMySuccess("")
            setMyError(err.message)
        }
    }

    // Get one quiz handler
    const getOneQuizHandler = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3300/api/quizes/${selectedQuizId}`,
                configCommon
            )
            if(data.authEx){
                alert(data.errors.message)
                // Clear local storage and navigate to login page
                localStorage.clear()
                history.push("/")
            }
            else{
                setTitle(data.title)
                setQuizImage(data.quizImage)
                setQuizAns(data.quizAns)
            }
        } catch (err) {
            console.log(err)
            setMySuccess("")
            setMyError(err.message)
        }
    }

    useEffect(() => {
        if(selectedQuizId){
            getOneQuizHandler()
        }
    }, [])

    // Update quiz handler
    const updateQuizHandler = async (e) => {
        e.preventDefault()

        // Set form data
        const formData = new FormData()
        formData.append("title", title)
        formData.append("quizImage", quizImage)
        formData.append("quizAns", quizAns)

        // Api call
        try{
            const {data} = await axios.put(
                `http://localhost:3300/api/quizes/${selectedQuizId}`,
                formData,
                configPost
            )

            if(data.created){
                setMyError("")
                setMySuccess(data.success.message)
                setTimeout(() => { 
                    togglePopUp(e)
                }, 2000)
                // Refresh user table
                refreshQuizTable()
            }
            else{
                if(data.authEx){
                    setMySuccess("")
                    setMyError(data.errors.message)
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
            console.log(err)
            setMySuccess("")
            setMyError(err.message)
        }
    }

    return (
        <>
            <section className="popup">
                <div className="overlay" onClick={(e) => togglePopUp(e)}></div>
                <form className="popup-form">
                    <h2>{!selectedQuizId ? "Create a New Quiz" : "Edit Quiz"}</h2>
                    <InputBox inputState={titleState} type="text" place="Enter Quiz Title..." defaultValue={title}/>
                    {selectedQuizId && <p style={{fontSize: "0.8rem", marginBottom: "5px"}}>Select a new Image or leave it Empty...</p>}
                    <input className="file-up" type="file" onChange={(e) => imageState(e.target.files[0])}/>
                    <select id="user-type" className="uq-drop" onChange={(e) => answerState(e.target.value)} value={!selectedQuizId ? null : quizAns}>
                        <option value=""></option>
                        <option value="legitimate">legitimate</option>
                        <option value="phishing">phishing</option>
                    </select>
                    <SubmitBtn clickFunc={!selectedQuizId ? createQuizHandler : updateQuizHandler} txt={!selectedQuizId ? "Create Quiz" : "Update Quiz"}/>
                    <BiX className="close-icon" onClick={(e) => togglePopUp(e)}/>
                    {myError && 
                        <div className="err-msg">{myError}</div>
                    }
                    {mySuccess && 
                        <div className="success-msg">{mySuccess}</div>
                    }
                </form>
            </section>
        </>
    )
}

CreateQuizPopUp.defaultProps = {
    selectedQuizId: ""
}

export default CreateQuizPopUp
