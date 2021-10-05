const SumBox = ({title, value, icon}) => {
    return (
        <>
            <div className="box">
                <div className="icon">{icon}</div>
                <p className="title-bx">{title}</p>
                <p className="val">{value}</p>
            </div>
        </>
    )
}

export default SumBox
