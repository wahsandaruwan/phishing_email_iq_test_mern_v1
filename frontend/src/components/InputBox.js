const InputBox = ({type, place, inputState}) => {
    return (
        <>
            <input className="inp" onChange={(e) => inputState(e.target.value)} type={type} placeholder={place}/>
        </>
    )
}

export default InputBox
