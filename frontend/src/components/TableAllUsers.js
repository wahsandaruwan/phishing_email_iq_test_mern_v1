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
    const configCommon = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    // Fetching user handler
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

    // Delete user handler
    const userDeleteHandler = async (e, userId) => {
        e.preventDefault()
        if(window.confirm("Are you really want to delete this user?")){
            try {
                const {data} = await axios.delete(
                    `http://localhost:3300/api/users/${userId}`,
                    configCommon
                )
                if(data.created){
                    alert(data.success.message)
                    // Refresh user table
                    userFetchhandler()
                }
                else{
                    if(data.authEx){
                        console.log(data.errors.message)
                        alert(data.errors.message)
                        // Clear local storage and navigate to login page
                        localStorage.clear()
                        history.push("/")
                    }
                    else{
                        throw Error(data.errors.message)
                    }
                }
            }catch(err){
                alert(err.message)
            }
        }
    }

    return (
        <>
            <section className="all-data">
                <div className="create-uq-btn">
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
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((obj, index) => {
                                        console.log(obj)
                                        // Destructure
                                        const {_id, firstName, lastName, userType, email} = obj
                                        return(
                                            <tr key={_id}>
                                                <td>{index+1}</td>
                                                <td>{_id}</td>
                                                <td>{firstName}</td>
                                                <td>{lastName}</td>
                                                <td>{userType}</td>
                                                <td>{email}</td>
                                                <td className="del-td"><a href="#" className="tbl-btn del" onClick={(e) => userDeleteHandler(e, _id)}>Delete</a></td>
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
                showCreateUser && <CreateUserPopUp refreshUserTable={userFetchhandler} togglePopUp={toggleCreateUserForm}/>
            }
        </>
    )
}

export default TableAllUsers
