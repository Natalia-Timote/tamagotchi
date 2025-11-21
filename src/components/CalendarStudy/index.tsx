import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './CalendarStudy.css';

export default function CalendarStudy({ studyingDays }) {
    return (
        <Calendar 
            className="calendar"
            tileClassName={({ date}) => 
                studyingDays.includes(date.toISOString().split("T") [0]) ? 'studied-day' : null
            } 
        ></Calendar>
    )
}