const SubmitBtn = ({txt, loginFunc}) => {
    return (
        <>
            <a className="su-btn" onClick={(e) => loginFunc(e)} href="">{txt}</a>
        </>
    )
}

export default SubmitBtn
