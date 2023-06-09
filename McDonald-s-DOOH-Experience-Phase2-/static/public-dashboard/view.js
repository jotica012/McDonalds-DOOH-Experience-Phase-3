class View {
    static lineChart = document.querySelector('#my-line-chart');
    static barChart = document.querySelector('#my-bar-chart');
    static totalLeadsStat = document.querySelector('#total-leads')
    static totalIntsStat = document.querySelector('#total-ints')
    static convertionRate = document.querySelector('#convertion-rate')
    // static fiveLeadsTable = document.querySelector('table');
    constructor() {
        this.linechart
        this.barchart;
    }

    updateLineChart(lineInt){
        const labels = Object.keys(lineInt)
        const values = Object.values(lineInt)
        console.log(labels);
        console.log(values);

        this.linechart.data.labels = labels
        this.linechart.data.datasets[0].data = values
        this.linechart.update()
    }

    getLineChart() {
        const config = {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
                datasets: [
                    {
                        label: 'Interactions per hour',
                        data: [100, 200, 150, 250, 180],
                        backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo del área bajo la línea
                        borderColor: 'rgba(0, 123, 255, 1)', // Color de la línea
                        borderWidth: 2, // Ancho de la línea
                        pointRadius: 5, // Radio de los puntos del gráfico
                        pointBackgroundColor: 'rgba(0, 123, 255, 1)', // Color de fondo de los puntos
                        pointBorderColor: '#fff', // Color del borde de los puntos
                        pointHoverRadius: 7, // Radio de los puntos al pasar el mouse por encima
                        pointHoverBackgroundColor: '#fff', // Color de fondo de los puntos al pasar el mouse por encima
                        pointHoverBorderColor: 'rgba(0, 123, 255, 1)' // Color del borde de los puntos al pasar el mouse por encima
                    }
                ]
            },
            options: {
                responsive: true, // Hace el gráfico responsivo al tamaño del contenedor
                scales: {
                    y: {
                        beginAtZero: true // Inicia el eje y en cero
                    }
                }
            }
        };
        this.linechart = new Chart(View.lineChart, config)
    }

    updateBarChart(countDay) {
        const labels = Object.keys(countDay)
        const uses = Object.values(countDay)
        console.log(labels);
        console.log(uses);

        this.barchart.data.labels = labels
        this.barchart.data.datasets[0].data = uses
        this.barchart.update()

    }

    getBarChart() {
        const config = {
            type: 'bar',
            data: {
                labels: ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
                datasets: [{
                    label: 'Fequency of use',
                    data: [2, 3, 4, 5, 7, 8],
                    borderRadius: 50,
                    backgroundColor: ['rgba(24, 145, 246, 1)'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 10
                    }
                }
            }
        };
        this.barchart = new Chart(View.barChart, config)
    }

    updateTotalLeads(totalLeads) {
        console.log(totalLeads);
        View.totalLeadsStat.innerHTML = ''
        let p = document.createElement('p')
        p.innerHTML = `        
        <p> ${totalLeads}</p>
        `
        View.totalLeadsStat.appendChild(p)
    }

    updateTotalInts(totalInt) {
        console.log(totalInt);
        View.totalIntsStat.innerHTML = ''
        let p = document.createElement('p')
        p.innerHTML = `         
        <p> ${totalInt} </p>        
        `
        View.totalIntsStat.appendChild(p)
    }

    updateConvertionRate(convertionRatePer) {
        console.log(convertionRatePer);
        View.convertionRate.innerHTML = ''
        let p = document.createElement('p')
        p.innerHTML = `         
        <p> ${convertionRatePer}%</p>        
        `
        View.convertionRate.appendChild(p)
    }

    render() {
        this.getLineChart()
        this.getBarChart()
    }

}