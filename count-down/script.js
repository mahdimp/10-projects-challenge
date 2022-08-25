function counter(dateString) {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diff = eventDate - now;
    const secondsToEvent = diff / 1000;
    const days = Math.floor(secondsToEvent / (3600 * 24));
    const hours = Math.floor(secondsToEvent / 3600) % 24;
    const minutes = Math.floor(secondsToEvent / 60) % 60;
    const seconds = Math.floor(secondsToEvent % 60)

    updateCounters(days, hours, minutes, seconds)
}

function updateCounters(days, hours, minutes, seconds) {
    const daysElement = document.getElementById('days')
    const hoursElement = document.getElementById('hours')
    const minutesElement = document.getElementById('minutes')
    const secondsElement = document.getElementById('seconds')
    daysElement.innerHTML = formatTime(days)
    hoursElement.innerHTML = formatTime(hours)
    minutesElement.innerHTML = formatTime(minutes)
    secondsElement.innerHTML = formatTime(seconds)
}

function formatTime(value) {
    return value ? value : '0'
}

setInterval(() => {
    counter('2023/1/1')
}, 1000)