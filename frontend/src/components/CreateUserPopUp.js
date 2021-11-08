import { useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

import { BiX } from "react-icons/bi"
import InputBox from "./InputBox"
import SubmitBtn from "./SubmitBtn"

const CreateUserPopUp = ({refreshUserTable, togglePopUp, selectedUserId}) => {
    // New user states
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userType, setUserType] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [myError, setMyError] = useState("")
    const [mySuccess, setMySuccess] = useState("")

    console.log(selectedUserId)

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
        setEmail(newValue)
    }

    // Update user password state
    const userPasswordState = (newValue) => {
        setPassword(newValue)
    }

    // Configurations
    const configPost = {
        headers: {
            "Content-type": `application/json`,
            "Authorization": `Bearer ${token}`
        }
    }

    const configCommon = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    // Create user handler
    const createUserHandler = async (e) => {
        e.preventDefault()

        // Api call
        try{
            const {data} = await axios.post(
                'http://localhost:3300/api/users/register', 
                {
                    firstName,
                    lastName,
                    userType,
                    email,
                    password
                },
                configPost
            )

            if(data.created){
                setMyError("")
                setMySuccess(data.success.message)
                setTimeout(() => { 
                    togglePopUp(e)
                }, 2000)
                // Refresh user table
                refreshUserTable()
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

    // Get one user handler
    const getOneUserHandler = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3300/api/users/${selectedUserId}`,
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
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setUserType(data.userType)
                setEmail(data.email)
            }
        } catch (err) {
            console.log(err)
            setMySuccess("")
            setMyError(err.message)
        }
    }

    useEffect(() => {
        if(selectedUserId){
            getOneUserHandler()
        }
    }, [])

    // Update user handler
    const updateUserHandler = async (e) => {
        e.preventDefault()

        // Api call
        try{
            const {data} = await axios.put(
                `http://localhost:3300/api/users/${selectedUserId}`,
                {
                    firstName,
                    lastName,
                    userType,
                    email,
                    password
                },
                configPost
            )

            if(data.created){
                setMyError("")
                setMySuccess(data.success.message)
                setTimeout(() => { 
                    togglePopUp(e)
                }, 2000)
                // Refresh user table
                refreshUserTable()
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
                    <h2>{!selectedUserId ? "Create a New User" : "Edit User"}</h2>
                    <InputBox inputState={firstNameState} type="text" place="Enter First Name..." defaultValue={firstName}/>
                    <InputBox inputState={lastNameState} type="text" place="Enter First Name..." defaultValue={lastName}/>
                    <select id="user-type" className="uq-drop" onChange={(e) => userTypeState(e.target.value)} value={!selectedUserId ? null : userType}>
                        <option value="" selected></option>
                        <option value="admin">admin</option>
                        <option value="normal">normal</option>
                    </select>
                    <InputBox inputState={userEmailState} type="text" place="Enter Email..." defaultValue={email}/>
                    <InputBox inputState={userPasswordState} type="password" place="Enter Password..."/>
                    <SubmitBtn clickFunc={!selectedUserId ? createUserHandler : updateUserHandler} txt={!selectedUserId ? "Create User" : "Update User"}/>
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
