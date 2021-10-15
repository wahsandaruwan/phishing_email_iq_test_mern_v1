const InputBox = ({type, place, loginState}) => {
    return (
        <>
            <input className="inp" onChange={(e) => loginState(e.target.value)} type={type} placeholder={place}/>
        </>
    )
}

export default InputBox
