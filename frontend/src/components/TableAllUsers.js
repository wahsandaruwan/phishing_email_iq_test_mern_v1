import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import SubmitBtn from "./SubmitBtn"
import CreateUserPopUp from './CreateUserPopUp'

const TableAllUsers = () => {
    // Create user form state
    const [showCreateUser, setShowCreateUser] = useState(false)

    // Users state
    const [users, setUsers] = useState([])

    // Set history
    const history = useHistory()

    // Token from local storage
    const userData = localStorage.getItem('userWithToken')
    const token = JSON.parse(userData).success
    console.log(token)

    // Create config with token
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Fetching user handler
    const userFetchhandler = async () => {
        try {
            const {data} = await axios.get(
                'http://localhost:3300/api/users/',
                config
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
            console.log(err)
        }
    }

    // Handle fetching all users
    useEffect(() => {
        userFetchhandler()
    }, [])

    // Handle create user form
    const toggleCreateUserForm = (e) => {
        e.preventDefault()
        setShowCreateUser(!showCreateUser)
        console.log(showCreateUser)
    }

    // Add added user to the table
    const userAddToTable = (userObj) => {
        console.log(userObj)
        userFetchhandler()
    }

    return (
        <>
            <section className="all-users">
                <div className="create-user-btn">
                    <SubmitBtn clickFunc={toggleCreateUserForm} txt="Create a New User"/>
                </div>
                <h3>All Users</h3>
                {users.length > 0 && (
                    <div className="tbl-div">
                        <table className="dt-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>User Type</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((obj, index) => {
                                        console.log(obj)
                                        // Destructure
                                        const {_id, firstName, lastName, userType, email, password} = obj
                                        return(
                                            <tr key={_id}>
                                                <td>{index+1}</td>
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
            {
                showCreateUser && <CreateUserPopUp userToTable={userAddToTable} togglePopUp={toggleCreateUserForm}/>
            }
        </>
    )
}

export default TableAllUsers
