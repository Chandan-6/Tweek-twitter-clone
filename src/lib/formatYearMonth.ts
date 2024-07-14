
export const formatYearMonth = (dateString : string) : string => {
    const date = new Date(dateString);
    const options : Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}