import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import {formatTime} from '../utils/timeformat'
import axios from 'axios'

const TableAllTests = () => {
    // Tests state
    const [tests, setTests] = useState([])

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

    // Handle fetching all users
    useEffect(() => {
        testFetchhandler()
    }, [])

    return (
        <>
            <section className="all-data">
                <h3>All Past Tests</h3>
                {tests.length > 0 && (
                    <div className="tbl-div">
                        <table className="dt-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>User Email</th>
                                    <th>Creation Date</th>
                                    <th>Creation Time</th>
                                    <th>Time Duration</th>
                                    <th>Marks</th>
                                    <th>Recommendation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tests.map((obj, index) => {
                                        // Destructure
                                        const {_id, userEmail, currentDate, currentTime, timeDuration, correct, recommendation} = obj
                                        return(
                                            <tr key={_id}>
                                                <td>{index+1}</td>
                                                <td>{_id}</td>
                                                <td>{userEmail}</td>
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

export default TableAllTests
