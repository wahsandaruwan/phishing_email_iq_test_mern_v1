const InputBox = ({type, place, inputState, defaultValue}) => {
    return (
        <>
            <input className="inp" onChange={(e) => inputState(e.target.value)} type={type} placeholder={place} value={defaultValue}/>
        </>
    )
}

export default InputBox
