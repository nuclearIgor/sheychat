export const calendarDateFormatter = (date) => {
    // type of Date.now() is number

    return Intl.DateTimeFormat('pt-BR', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date)
    // 18/05/2022
}

export const hourAndMinuteFormatter = (date) => {
    return Intl.DateTimeFormat('pt-BR', {
        hour: "numeric",
        minute: "numeric"
    }).format(date)
    // 11:46
}