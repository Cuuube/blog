export const fomateDate = (date: Date): string => {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function formateThisDateForSarari(date: Date): Date {
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

function padZero(str: string | number): string {
    return ('00' + str).slice(-2);
}