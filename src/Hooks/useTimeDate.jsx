


const useTimeDate = ({ unixTime }) => {
    // Given timestamp in seconds
    const timestamp = unixTime;

    // Convert timestamp to milliseconds (Unix epoch time)
    const unixTimestampMs = timestamp * 1000;

    // UTC offset in milliseconds for UTC +6
    const utcOffsetMs = 6 * 60 * 60 * 1000;

    // Adjusted timestamp considering UTC +6
    const adjustedTimestampMs = unixTimestampMs + utcOffsetMs;

    // Create a Date object
    const date = new Date(adjustedTimestampMs);

    // Array of month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get date components
    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // Returns 0 for January, 1 for February, etc.
    const monthName = monthNames[monthIndex];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Constructing date and time strings
    const dateStr = `${year}-${monthName}-${day}`;
    const timeStr = `${hours}:${minutes}:${seconds}`;

    return [dateStr, timeStr];
};

export default useTimeDate;