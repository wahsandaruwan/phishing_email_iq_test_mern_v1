// Element components
import SumBox from "./SumBox"

// Icons
import {BiReset, BiUser, BiAbacus} from "react-icons/bi"

import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

const SummaryAdmin = () => {
    // Tests state
    const [tests, setTests] = useState('')

    // Users state
    const [users, setUsers] = useState('')

    // Quizes state
    const [quizes, setQuizes] = useState('')

    const testsLen = tests.length
    const usersLen = users.length
    const quizesLen = quizes.length

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const token = JSON.parse(userData).success

    // Create config with token
    const configCommon = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    // Fetching tests handler
    const testFetchhandler = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3300/api/tests/`,
                configCommon
            )
            if(data.authEx){
                alert(data.errors.message)
                // Clear local storage and navigate to login page
                localStorage.clear()
                history.push("/")
            }
            else{
                setTests(data)
            }
        } catch (err) {
            alert(err.message)
        }
    }

    // Fetching users handler
    const userFetchhandler = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3300/api/users/`,
                configCommon
            )
            if(data.authEx){
                alert(data.errors.message)
                // Clear local storage and navigate to login page
                localStorage.clear()
                history.push("/")
            }
            else{
                setUsers(data)
            }
        } catch (err) {
            alert(err.message)
        }
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
                setQuizes(data)
            }
        } catch (err) {
            alert(err.message)
        }
    }

    // Handle fetching all users
    useEffect(() => {
        testFetchhandler()
        userFetchhandler()
        quizFetchhandler()
    }, [])

    return (
        <>
            <section className="summary">
                <SumBox title="Number of Users" value={users && usersLen ? usersLen : 0} icon={<BiUser/>}/>
                <SumBox title="Number of Tests" value={tests && testsLen ? testsLen : 0} icon={<BiReset/>}/>
                <SumBox title="Number of Quizes" value={quizes && quizesLen ? quizesLen : 0} icon={<BiAbacus/>}/>
            </section>
        </>
    )
}

export default SummaryAdmin