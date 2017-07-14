const formateDate = (date) => {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function formateThisDateForSarari(date) {
        return new Date(date);
    }
    
    let time = formateThisDateForSarari(date);
    let year = time.getFullYear();
    let month = monthNames[time.getMonth()];
    let day = time.getDate();
    let hour = padZero(time.getHours());
    let minute = padZero(time.getMinutes());
    let second = padZero(time.getSeconds());
    return `${month} ${day}, ${year} ${hour}:${minute}:${second}`
};

function padZero(str) {
    return ('00' + str).slice(-2);
}

module.exports = formateDate;