var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411' //rename to the name of your port
var datain; //some data coming in over serial!
var canvas_x = 1200; //x value for canvas
var canvas_y = 900; //y value for canvas


function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(canvas_x, canvas_y); //crea
  background(0x08, 0x16, 0x40); //background color
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
   print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  if (serial.available()) {
  	datain = Number(serial.readLine());
        //console.log(datain);
  } 
}

//function for drawing ellipse
function graphData(newData) {
  // map the range of the input to the window height:
  var y_position = map(newData, 0, 870, 0, 255); //define the new value from new Data
  // draw the line in a pretty color:
  stroke(127,0,0); // dark red
  fill(255,200,200);    //pale red
  ellipse(canvas_x/2, canvas_y/2, y_position, y_position); //set the size of ellipse
  // at the edge of the screen, go back to the beginning:
  
}

//function for drawing on canvs
function draw() {
    graphData(datain);
}

