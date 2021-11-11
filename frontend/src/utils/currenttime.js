const currentTime = () => {
    const time = new Date()
    const cTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    return cTime
}

export {currentTime}