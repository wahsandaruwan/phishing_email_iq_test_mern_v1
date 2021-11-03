import { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

import { BiX } from "react-icons/bi"
import InputBox from "./InputBox"
import SubmitBtn from "./SubmitBtn"

const CreateUserPopUp = ({togglePopUp}) => {
    // New user states
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userType, setUserType] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [myError, setMyError] = useState("")
    const [mySuccess, setMySuccess] = useState("")

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const token = JSON.parse(userData).success

    // Update first name state
    const firstNameState = (newValue) => {
        setFirstName(newValue)
    }

    // Update last name state
    const lastNameState = (newValue) => {
        setLastName(newValue)
    }

    // Update user type state
    const userTypeState = (newValue) => {
        setUserType(newValue)
    }
    
    // Update user email state
    const userEmailState = (newValue) => {
        setUserEmail(newValue)
    }

    // Update user password state
    const userPasswordState = (newValue) => {
        setUserPassword(newValue)
    }

    // Create user handler
    const createUserHandler = async (e) => {
        e.preventDefault()

        // Configurations
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer "+token
            }
        }

        // Api call
        try{
            const {data} = await axios.post('http://localhost:3300/api/users/register', {
                firstName,
                lastName,
                userType,
                userEmail,
                userPassword
            },
            config)

            if(data.created){
                setMyError("")
                console.log("object")
                setMySuccess(data.success.message)
                setTimeout(() => { 
                    togglePopUp(e)
                }, 2000)
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
                    <h2>Create a New User</h2>
                    <InputBox inputState={firstNameState} type="text" place="Enter First Name..."/>
                    <InputBox inputState={lastNameState} type="text" place="Enter First Name..."/>
                    <select id="user-type" className="user-type" onChange={(e) => userTypeState(e.target.value)}>
                        <option value="" selected></option>
                        <option value="admin">admin</option>
                        <option value="normal">normal</option>
                    </select>
                    <InputBox inputState={userEmailState} type="text" place="Enter Email..."/>
                    <InputBox inputState={userPasswordState} type="password" place="Enter Password..."/>
                    <SubmitBtn clickFunc={createUserHandler} txt="Create User"/>
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

export default CreateUserPopUp
