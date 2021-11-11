const currentDate = () => {
    const date = new Date()
    const cDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    return cDate
}

export {currentDate}
