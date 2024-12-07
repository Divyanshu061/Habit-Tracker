export function getDateString(currDate: Date, dayOffset = 0) {
    const adjustDate = new Date(currDate);
    adjustDate.setDate(currDate.getDate() + dayOffset);
    
    const year = adjustDate.getFullYear();
    const month = String(adjustDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getCurrDayName(dateString: string) {
    const daysWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const currDate = new Date(dateString);
    const currDayNumber = currDate.getDay();
    return daysWeek[currDayNumber];
}

export default function getFormateDate(dateString: string){
    const currDate = new Date(dateString);

    const day = currDate.getDate();
    const year = currDate.getFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[currDate.getMonth()];

    return `${day} ${month} ${year}`;
}
