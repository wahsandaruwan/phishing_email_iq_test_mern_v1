// Element components
import SumBox from "./SumBox"

// Icons
import {BiBadgeCheck, BiBookmarks, BiTime} from "react-icons/bi"

import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import {formatTime} from '../utils/timeformat'
import axios from 'axios'

const SummaryNormal = () => {
    // Tests state
    const [tests, setTests] = useState('')

    const testsLen = tests.length

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const user = JSON.parse(userData).userInfo
    const userEmail = user.email
    const token = JSON.parse(userData).success

    // Create config with token
    const configCommon = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    // Fetching tests handler
    const testFetchhandler = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3300/api/tests/${userEmail}`,
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

    // Handle fetching all users
    useEffect(() => {
        testFetchhandler()
    }, [])

    return (
        <>
            <section className="summary">
                <SumBox title="Last Test Score" value={tests && testsLen ? (tests[testsLen-1]).correct : 0} icon={<BiBookmarks/>}/>
                <SumBox title="Last Test Time" value={tests && testsLen ? formatTime((tests[testsLen-1]).timeDuration) : 0} icon={<BiTime/>}/>
                <SumBox title="Number of Test Faced" value={tests && testsLen ? testsLen : 0} icon={<BiBadgeCheck/>}/>
            </section>
        </>
    )
}

export default SummaryNormal
