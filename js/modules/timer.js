import getZero from './getZero'

const timer = (deadline, timerSelector) => {
    function getTimeRemaining(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date())

        const days = Math.floor(total / (1000 * 60 * 60 * 24))
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((total / (1000 * 60)) % 60)
        const seconds = Math.floor((total / 1000) % 60)

        return {
            total, days, hours, minutes, seconds,
        }
    }



    function setClock(selector, endTime) {
        const timerNode = document.querySelector(selector)

        const daysNode = timerNode.querySelector('#days')
        const hoursNode = timerNode.querySelector('#hours')
        const minutesNode = timerNode.querySelector('#minutes')
        const secondsNode = timerNode.querySelector('#seconds')

        let timeInterval

        if (getTimeRemaining(endTime).total > 0) {
            timeInterval = setInterval(updateClock, 1000)
            updateClock()
        } else {
            if (timeInterval) clearInterval(timeInterval)
            daysNode.textContent = '00'
            hoursNode.textContent = '00'
            minutesNode.textContent = '00'
            secondsNode.textContent = '00'
        }

        function updateClock() {
            const timeRemainingObject = getTimeRemaining(endTime)

            daysNode.textContent = getZero(timeRemainingObject.days)
            hoursNode.textContent = getZero(timeRemainingObject.hours)
            minutesNode.textContent = getZero(timeRemainingObject.minutes)
            secondsNode.textContent = getZero(timeRemainingObject.seconds)
        }
    }

    setClock(timerSelector, deadline)
}
export default timer