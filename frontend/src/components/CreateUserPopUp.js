import InputBox from "./InputBox"
import SubmitBtn from "./SubmitBtn"

const CreateUserPopUp = () => {
    return (
        <>
            <section className="popup">
                <form className="popup-form">
                    <h2>Create a User</h2>
                    <InputBox type="text" place="Enter First Name..."/>
                    <InputBox type="text" place="Enter First Name..."/>
                    <select id="user-type">
                        <option value="admin">admin</option>
                        <option value="normal">normal</option>
                    </select>
                    <InputBox type="text" place="Enter Email..."/>
                    <InputBox type="password" place="Enter Password..."/>
                    <SubmitBtn txt="Create User"/>
                </form>
            </section>
        </>
    )
}

export default CreateUserPopUp
