// Data
import { useState } from 'react'
import { TblData } from '../data/tempTbl'


const TableAllTests = () => {
    // User test table
    const [data] = useState(TblData)
    return (
        <>
            <section className="all-tests">
                <h3>All Past Tests</h3>
                {data.length > 0 && (
                    <div className="tbl-div">
                        <table className="dt-table">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(data[0]).map((heading, index) => {
                                            return(
                                                <th key={index}>{heading}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((obj) => {
                                        // Destructure
                                        const {Tid, Time, Duration, Date, Marks, Recommendations} = obj
                                        return(
                                            <tr key={Tid}>
                                                <td>{Tid}</td>
                                                <td>{Time}</td>
                                                <td>{Duration}</td>
                                                <td>{Date}</td>
                                                <td>{Marks}</td>
                                                <td>{Recommendations}</td>
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
