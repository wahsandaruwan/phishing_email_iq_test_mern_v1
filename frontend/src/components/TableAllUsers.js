import axios from 'axios'
import { useState, useEffect } from 'react'

// Data
import { TblData } from '../data/tempTbl'

const TableAllUsers = () => {
    // Users state
    const [users, setUsers] = useState([])

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const token = JSON.parse(userData).success
    console.log(token)

    // Create config with token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Handle fetching all users
    useEffect(async () => {
        try {
            const {data} = await axios.get(
                'http://localhost:3300/api/users/',
                config
            )
            console.log(data)
            setUsers(data)
        } catch (err) {
            console.log(err.message)
        }
    }, [])

    // User test table
    const [data] = useState(TblData)
    return (
        <>
            <section className="all-tests">
                <h3>All Users</h3>
                {users.length > 0 && (
                    <div className="tbl-div">
                        <table className="dt-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>User Type</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((obj) => {
                                        console.log(obj)
                                        // Destructure
                                        const {_id, firstName, lastName, userType, email, password} = obj
                                        return(
                                            <tr key={_id}>
                                                <td>{_id}</td>
                                                <td>{firstName}</td>
                                                <td>{lastName}</td>
                                                <td>{userType}</td>
                                                <td>{email}</td>
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

export default TableAllUsers