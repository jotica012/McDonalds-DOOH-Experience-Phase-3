export function getLastFiveLeads (users) {
    return users.slice(-5)
}

export function totalLeads(users) {
    const totalLeads = users.length
    return totalLeads
}

export function totalInts(interactions){
    const totalInts = interactions.length
    return totalInts
}

export function userBarchart(allUses) {

    const countDay = {}
    for (let i = 0; i < allUses.length; i++) {
        const day = allUses[i].useDay;

        countDay[day] = (countDay[day] || 0) + 1
        
    }
    return countDay
}
export function intLineChart(lineInts) {
    const countInts = {}

    for (let i = 0; i < lineInts.length; i++) {
        const value = lineInts[i].intHour;

        countInts[value] = (countInts[value] || 0) + 1
        
    }
    return countInts
}
