const SubmitBtn = ({txt, clickFunc}) => {
    return (
        <>
            <a className="su-btn" onClick={(e) => clickFunc(e)} href="">{txt}</a>
        </>
    )
}

export default SubmitBtn
