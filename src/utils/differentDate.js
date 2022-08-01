export const differentDate = (date2) => {
    const date1 = new Date().getTime()
    console.log(date2)
    const diffTime = Math.abs(date2 - date1);
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    const Rdays = ~~diffDays
    const rHours = ~~((diffDays % Rdays) * 24)
    console.log(Rdays, rHours)
    return [Rdays, rHours]
}