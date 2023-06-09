const view = new View()
const HOST = window.location.hostname;
const PROTOCOL = window.location.protocol;
const PORT = window.location.port === ''? '' : `:${window.location.port}`
const URL = `${PROTOCOL}//${HOST}${PORT}`;
console.log(URL);
const socket = io(URL, { path: '/real-time' });

function controller(view) {
    
    (async function getDashboardData() {
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        const kpi = data;
        console.log(kpi);
        view.updateBarChart(kpi.freqOfUse)
        view.updateTotalLeads(kpi.totalLeads)
        view.updateTotalInts(kpi.totalInt)
        view.updateConvertionRate(kpi.convertionRatePer)
        view.updateLineChart(kpi.lineChartInt)
    })();
    
    const updateRealTime = async () => {
        const request = await fetch(`${URL}/dashboard`);
        const data = await request.json();
        const kpi = data;
        view.updateBarChart(kpi.freqOfUse)
        view.updateTotalLeads(kpi.totalLeads)
        view.updateTotalInts(kpi.totalInt)
        view.updateConvertionRate(kpi.convertionRatePer)
        console.log('Hello from updateRealTime');
    }

    socket.on('real-time-update', (data) => {
        console.log('Some update happen!');
        console.log(data);
        updateRealTime();
    });

    view.render()
}
controller(view, socket)