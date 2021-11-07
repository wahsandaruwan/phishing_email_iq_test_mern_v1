import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import SubmitBtn from "./SubmitBtn"
import CreateQuizPopUp from './CreateQuizPopUp'

const TableAllQuizes = () => {
    // Create quiz form state
    const [showCreateQuiz, setShowCreateQuiz] = useState(false)

    // Users state
    const [quizes, setQuizes] = useState([])

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

    // Fetching quizes handler
    const quizFetchhandler = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:3300/api/quizes/`,
                config
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
        quizFetchhandler()
    }, [])

    // Handle create user form
    const toggleCreateQuizForm = (e) => {
        e.preventDefault()
        setShowCreateQuiz(!showCreateQuiz)
        console.log(showCreateQuiz)
    }

    // Delete quiz handler
    const quizDeleteHandler = async (e, quizId) => {
        console.log(quizId)
        e.preventDefault()
        if(window.confirm("Are you really want to delete this quiz?")){
            try {
                const {data} = await axios.delete(
                    `http://localhost:3300/api/quizes/${quizId}`,
                    config
                )
                if(data.created){
                    alert(data.success.message)
                    // Refresh user table
                    quizFetchhandler()
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
                    <SubmitBtn clickFunc={toggleCreateQuizForm} txt="Create a New Quiz"/>
                </div>
                <h3>All Quizes</h3>
                {quizes.length > 0 && (
                    <div className="tbl-div">
                        <table className="dt-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Quiz Title</th>
                                    <th>Quiz Image</th>
                                    <th>Quiz Answer</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    quizes.map((obj, index) => {
                                        console.log(obj)
                                        // Destructure
                                        const {_id, title, quizImage, quizAns} = obj
                                        return(
                                            <tr key={_id}>
                                                <td>{index+1}</td>
                                                <td>{_id}</td>
                                                <td>{title}</td>
                                                <td className="tbl-quiz-img"><img src={"./uploads/" + quizImage}/></td>
                                                <td>{quizAns}</td>
                                                <td className="del-td"><a href="#" className="tbl-btn del" onClick={(e) => quizDeleteHandler(e, _id)}>Delete</a></td>
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
                showCreateQuiz && <CreateQuizPopUp refreshQuizTable={quizFetchhandler} togglePopUp={toggleCreateQuizForm}/>
            }
        </>
    )
}

export default TableAllQuizes
