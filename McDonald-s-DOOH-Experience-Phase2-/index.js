import { express, Server, cors, os, SerialPort, ReadlineParser, dotenv } from './dependencies.js';
import userRoutes from "./routes/userRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import intRoutes from "./routes/intRoutes.js"
import fireStoreDB from './firebase-config.js'

dotenv.config()
const PORT = process.env.PORT; 
const SERVER_IP = '192.168.68.110'; //Reemplazar IP U:172.30.65.245 .. / Barns: 192.168.68.110 // 172.30.65.245 // Ofi: 192.168.1.19// shanti: 192.168.28.58  santijaus : 192.168.1.28
const app = express();



let arduinoubi = {
    posXMapped: 0,
    pinStart: 0,
}

const protocolConfiguration = {
    path: '/dev/cu.usbmodem144101',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

parser.on('data', (data) => {
    // Create the array
    let dataArray = data.split(' ');
    console.log(data);
        
    let arduinoMessage ={
        char : dataArray[0],
        pinStart : parseInt(dataArray[1]),
        posXMapped : parseInt(dataArray[2])
    }
 

    // Parse the Strings to Integer
    console.log(arduinoMessage)
    // Emit the message using WebSocket to the client
    io.emit('arduino', arduinoMessage);
});
 
//IO

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/data`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi`, 
        "Dashboard Endpoint": `http://localhost:${PORT}/dashboard-app` 
     });
});

const io = new Server(httpServer, { path: '/real-time' });

const STATIC_APP = express.static('./static/public-data')
const STATIC_MUPI = express.static('./static/public-mupi')
const STATIC_DASHBOARD = express.static('./static/public-dashboard')

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/data', STATIC_APP);
app.use('/mupi', STATIC_MUPI);
app.use('/dashboard-app', STATIC_DASHBOARD);
app.use('/user', userRoutes);
app.use('/interaction', intRoutes);
app.use('/dashboard', dashboardRoutes);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('actual-screen-app', message => {
        console.log(message);
        socket.broadcast.emit('screen-mupi', message);
    })

});

   // socket.broadcast.emit('arduino', arduinoMessage);
   
    /* socket.on('device-size', deviceSize => {
        socket.broadcast.emit('mupi-size', deviceSize);
    });

 socket.on('mobile-instructions', instructions => {
        console.log(instructions);
        socket.broadcast.emit('mupi-instructions', instructions);
    })

    socket.on('actual-screen-mupi', message => {
        console.log(message);
        socket.broadcast.emit('screen-cel', message);
    })*/

   


// let userData;
// app.post('/userData', (request, response)=>{
// userData = request.body;
// console.log(request.body);
// response.send({Data: `User Data is: ${userData}`})
// console.log(userData);
// //response.end();
// })

fireStoreDB.updateRealTime('Leads', ()=> {
    io.emit('real-time-firebase', {state : 'Using onSnapshot'})
  })

export {io};


