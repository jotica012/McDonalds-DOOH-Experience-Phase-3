import { fs } from "../dependencies.js";
import * as KPI from './kpiCalculations.js'

export const getInt = (req, res) => {
    try {
        const userJsonData = fs.readFileSync('./localCollection/users.json')
        const {users} = JSON.parse(userJsonData)
    
        const intJsonData = fs.readFileSync('./localCollection/interactions.json')
        const {interactions} = JSON.parse(intJsonData)

        //Para la convertion rate
        const totalInteractions = interactions.length
        const leads = users.length

        const convertionRate = (leads / totalInteractions) * 100

        const convertionRatePer = Math.floor(convertionRate)      
        
        //para la Bar Chart
        const allUses = interactions

        // para la line Chart
        const lineInts = interactions
        
        const freqOfUse = KPI.userBarchart(allUses)  
        const totalLeads = KPI.totalLeads(users)
        const totalInt  = KPI.totalInts(interactions)      
        const lastFiveLeads = KPI.getLastFiveLeads(users)
        const lineChartInt = KPI.intLineChart(lineInts)

        let dashboardData = {lastFiveLeads, freqOfUse, totalLeads, totalInt, convertionRatePer, lineChartInt}
        res.send(dashboardData)


    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading JSON data');

  }
}