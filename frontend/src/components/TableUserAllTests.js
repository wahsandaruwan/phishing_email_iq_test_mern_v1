import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import {formatTime} from '../utils/timeformat'
import axios from 'axios'


const TableUserAllTests = () => {
    // Tests state
    const [tests, setTests] = useState([])

    console.log(tests)

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const user = JSON.parse(userData).userInfo
    const userEmail = user.email
    const token = JSON.parse(userData).success
    console.log(token)

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
            <section className="all-data">
                <h3>My Past Tests</h3>
                {tests.length > 0 && (
                    <div className="tbl-div">
                        <table className="dt-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Test Date</th>
                                    <th>Test Time</th>
                                    <th>Time Duration</th>
                                    <th>Marks</th>
                                    <th>Recommendation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tests.map((obj, index) => {
                                        // Destructure
                                        const {_id, currentDate, currentTime, timeDuration, correct, recommendation} = obj
                                        return(
                                            <tr key={_id}>
                                                <td>{index+1}</td>
                                                <td>{currentDate}</td>
                                                <td>{currentTime}</td>
                                                <td>{formatTime(timeDuration)}</td>
                                                <td>{correct}</td>
                                                <td>{recommendation}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    )
}

export default TableUserAllTests
