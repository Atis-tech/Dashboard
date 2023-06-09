    //FIREBASE FOR DATABASE
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
    import {getDatabase, set, get, update, ref, remove, child} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBh-4FWpJ8DWP5B5Vw6uQrbzwxmakxX_o8",
      authDomain: "atis-database.firebaseapp.com",
      databaseURL: "https://atis-database-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "atis-database",
      storageBucket: "atis-database.appspot.com",
      messagingSenderId: "455303908965",
      appId: "1:455303908965:web:faad4b06c8a6e53239808c",
      measurementId: "G-TCJ6SN5FV5"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getDatabase();

    //CALLBACK FUNCTIONS
    $(document).ready(function () {
        try {
            get_API_data();
            setInterval(() => {
                bin_status();
            }, 3600);
            loadDatabase();
        } finally {
            for_pinpoint();
            for_date();
            buttons();
            $('#exampleModal').on('shown.bs.modal', function() {
                paginationData(10);
            });
        }
    });

    function for_date() {
        var date_now = $.datepicker.formatDate('MM dd, yy', new Date());
        $('#date').html(date_now);
    }

    function bin_status() {
        //Main variable
        var bin1;
        var bin2;
        var bin3;
        var bin4;
        var bin5;

        //Changing depending to API
        var storedObject = localStorage.getItem('BinStatus');
        console.log(`Previous Bin Status: ${storedObject}`);
        if (storedObject !== null) {
            var parsedObject = JSON.parse(storedObject);
            bin1 = (parsedObject['bin-1']!=null && !isNaN(parsedObject['bin-1']) && parsedObject['bin-1']!=undefined) ? parsedObject['bin-1'] : 100;
            bin2 = (parsedObject['bin-2']!=null && !isNaN(parsedObject['bin-2']) && parsedObject['bin-2']!=undefined) ? parsedObject['bin-2'] : 100;
            bin3 = (parsedObject['bin-3']!=null && !isNaN(parsedObject['bin-3']) && parsedObject['bin-3']!=undefined) ? parsedObject['bin-3'] : 100;
            bin4 = (parsedObject['bin-4']!=null && !isNaN(parsedObject['bin-4']) && parsedObject['bin-4']!=undefined) ? parsedObject['bin-4'] : 100;
            bin5 = (parsedObject['bin-5']!=null && !isNaN(parsedObject['bin-5']) && parsedObject['bin-5']!=undefined) ? parsedObject['bin-5'] : 100;
        } else {
            bin1 = 100;
            bin2 = 100;
            bin3 = 100;
            bin4 = 100;
            bin5 = 100;
        }
        //types of bin status
        var stat_hf = "HALF-FULL";
        var stat_min = "MINIMAL OR EMPTY";
        var stat_full = "FULL";
        var stat_err = "ERROR";

        //bin image images
        var hf_img = "images/sidebar/yellowbin.png";
        var min_img = "images/sidebar/bluebin.png";
        var full_img = "images/sidebar/fullbin.png";
        var err_img = "images/sidebar/errorbin.png"

        const bins = [
            { btn: '#bin_btn1', img: '#bin_img1', value: bin1 },
            { btn: '#bin_btn2', img: '#bin_img2', value: bin2 },
            { btn: '#bin_btn3', img: '#bin_img3', value: bin3 },
            { btn: '#bin_btn4', img: '#bin_img4', value: bin4 },
            { btn: '#bin_btn5', img: '#bin_img5', value: bin5 },
        ];

        // Loop over the bins and set the values accordingly
        for (let i = 0; i < bins.length; i++) {
            const bin = bins[i];
            const value = bin.value;

            if (value >= 17 && value <= 39) { //half full
                $(bin.btn).attr('data-stat', stat_hf);
                $(bin.img).attr('src', hf_img);
            } else if (value >= 40 && value <= 70) {//minimal or empty
                $(bin.btn).attr('data-stat', stat_min);
                $(bin.img).attr('src', min_img);
            }  else if (value >= 0 && value <= 16) {//full
                $(bin.btn).attr('data-stat', stat_full);
                $(bin.img).attr('src', full_img);
            } else {//error
                $(bin.btn).attr('data-stat', stat_err);
                $(bin.img).attr('src', err_img);
            }
        }
    }

    function buttons() {
        $('#bin_btn1').click(function () {
            var loc1 = $(this).attr('data-loc');
            var id1 = $(this).attr('data-id');
            var img1 = $('#bin_img1').attr('src');
            var stat1 = $(this).attr('data-stat');
            $('#bin_loc').html(loc1);
            $('#bin_id').html(id1);
            $('#bin_img').attr('src', img1);
            $('#bin_stat').html(stat1);
            run_algo([3, 3], reinstate_path(), 552);

        });
        $('#bin_btn2').click(function () {
            var loc2 = $(this).attr('data-loc');
            var id2 = $(this).attr('data-id');
            var img2 = $('#bin_img2').attr('src');
            var stat2 = $(this).attr('data-stat');
            $('#bin_loc').html(loc2);
            $('#bin_id').html(id2);
            $('#bin_img').attr('src', img2);
            $('#bin_stat').html(stat2);
            run_algo([9, 3], reinstate_path(), 627);

        });
        $('#bin_btn3').click(function () {
            var loc3 = $(this).attr('data-loc');
            var id3 = $(this).attr('data-id');
            var img3 = $('#bin_img3').attr('src');
            var stat3 = $(this).attr('data-stat');
            $('#bin_loc').html(loc3);
            $('#bin_id').html(id3);
            $('#bin_img').attr('src', img3);
            $('#bin_stat').html(stat3);
            run_algo([0, 10], reinstate_path(), 482);

        });
        $('#bin_btn4').click(function () {
            var loc4 = $(this).attr('data-loc');
            var id4 = $(this).attr('data-id');
            var img4 = $('#bin_img4').attr('src');
            var stat4 = $(this).attr('data-stat');
            $('#bin_loc').html(loc4);
            $('#bin_id').html(id4);
            $('#bin_img').attr('src', img4);
            $('#bin_stat').html(stat4);
            run_algo([9, 9], reinstate_path(), 351);

        });
        $('#bin_btn5').click(function () {
            var loc5 = $(this).attr('data-loc');
            var id5 = $(this).attr('data-id');
            var img5 = $('#bin_img5').attr('src');
            var stat5 = $(this).attr('data-stat');
            $('#bin_loc').html(loc5);
            $('#bin_id').html(id5);
            $('#bin_img').attr('src', img5);
            $('#bin_stat').html(stat5);
            run_algo([11, 13], reinstate_path(), 296);

        });
    }

    function reinstate_path() {
        var bsu = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 4, 0, 0, 0, 0, 8, 0],
        ];
        return bsu;
    }
    
    function get_API_data() {
        const appId = "bulsu-lora-bin";
        const devId1 = "bin-1";
        const devId2 = "bin-2";
        const devId3 = "bin-3";
        const devId4 = "bin-4";
        const devId5 = "bin-5";
        const apiKey = 'AEO5BYYNBDURPIYFECSVUJD45X3G2WWKJDZCDYY.27T7EP5MBZQVRRBXK5IL3RDRT3ZCHLMQOWPHFFYD2U7JOY4TQBIQ';
        const apiUrl = 'https://au1.cloud.thethings.network/api/v3/events?filter=as.up.data.forward';
        const authToken = `Bearer NNSXS.${apiKey}`;
        const contentType = 'application/json';
        const userAgent = 'my-integration/my-integration-version';

        const requestData = {
            identifiers: [
                {
                    device_ids: {
                        device_id: devId1,
                        application_ids: { application_id: appId }
                    }
                },
                {
                    device_ids: {
                        device_id: devId2,
                        application_ids: { application_id: appId }
                    }
                },
                {
                    device_ids: {
                        device_id: devId3,
                        application_ids: { application_id: appId }
                    }
                },
                {
                    device_ids: {
                        device_id: devId4,
                        application_ids: { application_id: appId }
                    }
                },
                {
                    device_ids: {
                        device_id: devId5,
                        application_ids: { application_id: appId }
                    }
                }
            ]
        };

        const requestHeaders = new Headers({
            'Authorization': authToken,
            'Accept': 'text/event-stream',
            'Content-Type': contentType,
            'User-Agent': userAgent
        });

        const requestOptions = {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(requestData)
        };
        return new Promise((resolve, reject) => {
            fetch(apiUrl, requestOptions)
                .then(response => {
                    const reader = response.body.getReader();
                    let buffer = '';
                    let deviceData = {};
                    let messageDatas = {};
                    let saveBins = {};
                    return reader.read().then(function processText({ done, value }) {
                        if (done) {
                            resolve('Process completed.');
                            return;
                        }

                        buffer += new TextDecoder().decode(value);
                        const messages = buffer.split('\n\n');
                        buffer = messages.pop();    

                        for (const message of messages) {
                            const messageObject = JSON.parse(message); // Parse the message string into a JSON object

                            if (messageObject.result.name == "as.up.data.forward" && !messageObject.result.name.includes("ns.down.transmission.fail")) { // Filter for uplink messages
                                const devIds = messageObject.result?.identifiers?.[0]?.device_ids?.device_id;
                                var binValue = messageObject.result?.data?.uplink_message?.decoded_payload?.text;
                                const binTime = messageObject.result?.data?.uplink_message?.received_at;
                                var previousBinval = localStorage.getItem('prevBin');
                                console.log(previousBinval);

                                //Exception when uncaught Error in API
                                if(binValue==null || isNaN(binValue) || binValue==undefined){
                                    var parsedBin = JSON.parse(previousBinval);
                                    binValue = parsedBin[devIds];
                                } else {
                                    switch (devIds) {
                                        case devId1:
                                            saveBins[devId1] = parseInt(binValue);
                                            break;
                                        case devId2:
                                            saveBins[devId2] = parseInt(binValue);
                                            break;
                                        case devId3:
                                            saveBins[devId3] = parseInt(binValue);
                                            break;
                                        case devId4:
                                            saveBins[devId4] = parseInt(binValue);
                                            break;
                                        case devId5:
                                            saveBins[devId5] = parseInt(binValue);
                                            break;
                                        default:
                                            break;
                                    }
                                    previousBinval = localStorage.setItem('prevBin', JSON.stringify(saveBins));
                                }

                                const timestamp = binTime;
                                const date = new Date(timestamp);

                                // Convert to Philippine time
                                const localTime = date.toLocaleString('en-PH', { timeZone: 'Asia/Manila' });

                                // Get the date component in YYYY-MM-DD format
                                const dateString = localTime.split(',')[0].replace(/\//g, '-');

                                // Get the time component in HH:MM:SS format
                                const timeString = localTime.split(',')[1].trim();

                                //Values for Database
                                var loc = '';
                                var binId = 0;
                                if(devIds=='bin-1'){
                                    loc = 'Alvarado Hall';
                                    binId=1;
                                }
                                else if(devIds=='bin-2'){
                                    loc = 'Pimentel Hall';
                                    binId=2;
                                }
                                else if(devIds=='bin-3'){
                                    loc = 'CHTM Building';
                                    binId=3;
                                }
                                else if(devIds=='bin-4'){
                                    loc = 'Roxas Hall';
                                    binId=4;
                                }
                                else if(devIds=='bin-5'){
                                    loc = 'Natividad Hall';
                                    binId=5;
                                }

                                //Values for Database
                                var binVal = parseInt(binValue);
                                var binStat = '';
                                if (binVal >= 17 && binVal <= 39) {
                                    binStat = "HALF FULL";
                                } else if (binVal >= 40 && binVal <= 70) {
                                    binStat = "MINIMAL OR EMPTY";
                                } else if (binVal >= 0 && binVal <= 16) {
                                    binStat = "FULL";
                                } else {
                                    binStat = "ERROR";
                                }
                                messageDatas = {Date: dateString, Time : timeString, Bin : binId, Status : binStat, Location: loc};
                                console.log(messageDatas);
                                console.log(`Current Bin: ${devIds}, Current Value: ${binValue}`);
                                
                                //Pass processed data to Database
                                switch (devIds) {
                                    case devId1:
                                        deviceData[devId1] = parseInt(binValue);
                                        break;
                                    case devId2:
                                        deviceData[devId2] = parseInt(binValue);
                                        break;
                                    case devId3:
                                        deviceData[devId3] = parseInt(binValue);
                                        break;
                                    case devId4:
                                        deviceData[devId4] = parseInt(binValue);
                                        break;
                                    case devId5:
                                        deviceData[devId5] = parseInt(binValue);
                                        break;
                                    default:
                                        break;
                                }
                                console.log(deviceData);
                                localStorage.setItem('BinStatus', JSON.stringify(deviceData));
                                savetoDatabase(messageDatas);
                            }
                        }

                        return reader.read().then(processText);
                    });
                })
                .catch(error => {
                    reject(error)
                    console.log(error.message);
                }
            );
        });
    }
    
    function savetoDatabase(logData) {
        return new Promise((resolve, reject) => {
            const dbRef = ref(db, "Data/");
            const dateObj = { [logData.Date]: [{ Time: logData.Time, Bin: logData.Bin, Status: logData.Status, Location: logData.Location }] };
            for (const Date in dateObj) {
                if (Object.hasOwnProperty.call(dateObj, Date)) {
                    const dataArr = dateObj[Date];
                    const dateRef = child(dbRef, Date);
                    get(dateRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            // Datekey already exists, update it
                            for (const { Time, Bin, Status, Location } of dataArr) {
                                const childRef = child(dateRef, `${Time}`);
                                set(childRef, {
                                    Bin: Bin,
                                    Status: Status,
                                    Location: Location
                                }).then(() => {
                                    console.log(`Data saved for ${Date} ${Time}`);
                                    resolve(`Data saved for ${Date} ${Time}`);
                                }).catch((error) => {
                                    console.error(`Error saving data for ${Date} ${Time}: ${error}`);
                                    reject(`Error saving data for ${Date} ${Time}: ${error}`);
                                });
                            }
                        } else {
                            // Datekey does not exist, create it
                            const newDateObj = {};
                            for (const { Time, Bin, Status, Location } of dataArr) {
                                newDateObj[Time] = {
                                    Bin: Bin,
                                    Status: Status,
                                    Location: Location
                                };
                            }
                            set(dateRef, newDateObj).then(() => {
                                console.log(`Data saved for ${Date}`);
                                resolve(`Data saved for ${Date}`);
                            }).catch((error) => {
                                console.error(`Error saving data for ${Date}: ${error}`);
                                reject(`Error saving data for ${Date}: ${error}`);
                            });
                        }
                    }).catch((error) => {
                        console.error(`Error checking if ${Date} exists: ${error}`);
                        reject(`Error checking if ${Date} exists: ${error}`);
                    });
                }
            }
        });
    }
    
    function loadDatabase() {
        return new Promise((resolve, reject) => {
          const dbRef = ref(db, 'Data');
          get(dbRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert data to an array of objects with date and time keys
                const dataArray = [];
                for (const dateKey in data) {
                  if (Object.hasOwnProperty.call(data, dateKey)) {
                    const dateObj = data[dateKey];
                    for (const timeKey in dateObj) {
                      if (Object.hasOwnProperty.call(dateObj, timeKey)) {
                        const { Bin, Status, Location } = dateObj[timeKey];
                        dataArray.push({
                          date: dateKey,
                          time: timeKey,
                          bin: Bin,
                          status: Status,
                          location: Location
                        });
                      }
                    }
                  }
                }
                // Sort dataArray by date and time
                dataArray.sort((a, b) => {
                  const aDatetime = new Date(`${a.date} ${a.time}`);
                  const bDatetime = new Date(`${b.date} ${b.time}`);
                  if (b.date !== a.date) {
                    return new Date(a.date) - new Date(b.date);
                  } else {
                    return aDatetime.getTime() - bDatetime.getTime();
                  }
                }).reverse();
                // Generate table rows from sorted dataArray
                let logOutput = '';
                dataArray.forEach(({ date, time, bin, status, location }) => {
                    const datetime = new Date(`${date} ${time}`);
                    const formattedDatetime = `${datetime.toLocaleDateString()} - ${datetime.toLocaleTimeString()}`;
                    logOutput += `
                        <tr>
                        <td>${formattedDatetime}</td>
                        <td>${bin}</td>
                        <td>${location}</td>
                        <td>${status}</td>
                        </tr>
                    `;
                  console.log(`Date: ${date}, Time: ${time}, Bin: ${bin}, Status: ${status}, Location: ${location}`);
                });
                document.getElementById('log_table_body').innerHTML = logOutput;
                resolve('Load database completed.');
              } else {
                console.log('No data available');
                reject('No data available');
              }
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        });
    }
      
    function antColonyDijkstra(bsu, startCoord, endCoord, numAnts, iterations) {
        const distances = [];
        const visited = [];
        const prev = [];
        const rows = bsu.length;
        const cols = bsu[0].length;
        const direction = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];
        const pheromones = new Array(rows * cols).fill(0.1);

        // Initialize distances, visited, and prev arrays
        for (let i = 0; i < rows; i++) {
            distances[i] = new Array(cols).fill(Number.MAX_SAFE_INTEGER);
            visited[i] = new Array(cols).fill(false);
            prev[i] = new Array(cols).fill(null); // initialized to null
        }

        let start = startCoord,
            end = [];

        // Find end points
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (bsu[i][j] === 9) {
                    end.push([i, j]);
                }
            }
        }

        for (let it = 0; it < iterations; it++) {
            // Traverse the graph using Dijkstra's algorithm, biased by pheromones
            for (let ant = 0; ant < numAnts; ant++) {
                let [currRow, currCol] = start;
                let dist = 0;

                while (true) {
                    visited[currRow][currCol] = true;

                    // Update pheromone trail and distances
                    let idx = currRow * cols + currCol;
                    pheromones[idx] += 1.0 / (dist + 1);
                    distances[currRow][currCol] = Math.min(
                        distances[currRow][currCol],
                        dist
                    );

                    // Check if endpoint has been reached
                    if (currRow === endCoord[0] && currCol === endCoord[1]) {
                        break;
                    }

                    let maxPheromone = 0;
                    let probs = [];
                    let probSum = 0;

                    // Calculate the probability of moving to each neighbor node
                    for (let d = 0; d < 4; d++) {
                        let [nextRow, nextCol] = [
                            currRow + direction[d][0],
                            currCol + direction[d][1],
                        ];
                        if (
                            nextRow >= 0 &&
                            nextRow < rows &&
                            nextCol >= 0 &&
                            nextCol < cols &&
                            !visited[nextRow][nextCol] &&
                            bsu[nextRow][nextCol] !== 0
                        ) {
                            let idx = nextRow * cols + nextCol;
                            let pher = pheromones[idx];
                            let dist2 = distances[currRow][currCol] + 1;
                            let prob = Math.pow(pher, 1) / Math.pow(dist2, 2);
                            probs.push(prob);
                            probSum += prob;
                            if (pher > maxPheromone) {
                                maxPheromone = pher;
                            }
                        } else {
                            probs.push(0);
                        }
                    }
                    if (probSum === 0) {
                        let [prevRow, prevCol] = prev[currRow][currCol];
                        [currRow, currCol] = [prevRow, prevCol];
                        dist--;
                        continue;
                    }

                    // Choose the next move based on the probabilities
                    let rand = Math.random() * probSum;
                    let probAcc = 0;
                    let nextRow, nextCol;

                    for (let d = 0; d < 4; d++) {
                        nextRow = currRow + direction[d][0];
                        nextCol = currCol + direction[d][1];

                        if (
                            nextRow >= 0 &&
                            nextRow < rows &&
                            nextCol >= 0 &&
                            nextCol < cols &&
                            !visited[nextRow][nextCol] &&
                            bsu[nextRow][nextCol] !== 0
                        ) {
                            probAcc += probs[d];
                            if (rand <= probAcc) {
                                break;
                            }
                        }
                    }

                    // Update current node and distance
                    dist++;
                    prev[nextRow][nextCol] = [currRow, currCol];
                    [currRow, currCol] = [nextRow, nextCol];
                }

                // Update start node for the next ant
                start = endCoord;
            }

            // Update pheromone trail evaporation and decay
            for (let i = 0; i < rows * cols; i++) {
                pheromones[i] *= 0.99;
                pheromones[i] = Math.max(pheromones[i], 0.1);
            }
        }

        // Trace back the optimal path using the prev array
        let path = [endCoord];
        let [currRow, currCol] = endCoord;

        while (prev[currRow][currCol] !== null) {
            let [prevRow, prevCol] = prev[currRow][currCol];
            path.unshift([prevRow, prevCol]);
            [currRow, currCol] = [prevRow, prevCol];
        }

        let shortestPath = [];
        let curr = endCoord;
        while (prev[curr[0]][curr[1]] !== null) {
            shortestPath.unshift(curr);
            curr = prev[curr[0]][curr[1]];
        }

        // Map the return path to the bsu array as num 5
        for (let i = shortestPath.length - 1; i >= 0; i--) {
            const row = shortestPath[i][0];
            const col = shortestPath[i][1];
            bsu[row][col] = 5;
        }

        // Return the bsu array with the path mapped as num 5
        return bsu;
    }

    function run_algo(start_algo, bsu, value) {
        var bsuCopy = JSON.parse(JSON.stringify(bsu));
        const startCoord = start_algo;
        const endCoord = [0, 18];
        let numAnts = 10;
        let iterations = 10;
        let shortestPath = new antColonyDijkstra(
            bsu,
            startCoord,
            endCoord,
            numAnts,
            iterations
        );
        var pathValue = 0;
        pathValue = ((shortestPath[3][0] == 5 && shortestPath[3][1] == 5 && shortestPath[3][2] == 5 && shortestPath[3][3] == 5) ? 64 : 0)
            + ((shortestPath[4][3] == 5 && shortestPath[5][3] == 5 && shortestPath[6][3] == 5 && shortestPath[7][3] == 5) ? 84 : 0)
            + ((shortestPath[8][1] == 5 && shortestPath[8][2] == 5 && shortestPath[8][3] == 5) ? 36 : 0)
            + ((shortestPath[9][1] == 5 && shortestPath[10][1] == 5) ? 27 : 0)
            + ((shortestPath[11][1] == 5 && shortestPath[11][2] == 5 && shortestPath[11][3] == 5 && shortestPath[11][4] == 5 && shortestPath[11][5] == 5 && shortestPath[11][6] == 5) ? 75 : 0)
            + ((shortestPath[9][6] == 5 && shortestPath[10][6] == 5) ? 25 : 0)
            + ((shortestPath[8][4] == 5 && shortestPath[8][5] == 5 && shortestPath[8][6] == 5) ? 38 : 0)
            + ((shortestPath[4][6] == 5 && shortestPath[5][6] == 5 && shortestPath[6][6] == 5 && shortestPath[7][6] == 5) ? 82 : 0)
            + ((shortestPath[3][4] == 5 && shortestPath[3][5] == 5 && shortestPath[3][6] == 5) ? 45 : 0)
            + ((shortestPath[3][7] == 5 && shortestPath[3][8] == 5 && shortestPath[3][9] == 5 && shortestPath[3][10] == 5) ? 65 : 0)
            + ((shortestPath[1][10] == 5 && shortestPath[1][11] == 5 && shortestPath[1][12] == 5 && shortestPath[1][13] == 5) ? 34 : 0)
            + ((shortestPath[2][10] == 5) ? 40 : 0)
            + ((shortestPath[4][10] == 5) ? 48 : 0)
            + ((shortestPath[6][10] == 5 && shortestPath[7][10] == 5 && shortestPath[8][10] == 5) ? 43 : 0)
            + ((shortestPath[10][10] == 5 && shortestPath[11][10] == 5 && shortestPath[12][10] == 5 && shortestPath[13][10] == 5 && shortestPath[14][10] == 3) ? 38 : 0)
            + ((shortestPath[5][10] == 5 && shortestPath[5][11] == 5 && shortestPath[5][12] == 5 && shortestPath[5][13] == 5) ? 49 : 0)
            + ((shortestPath[9][10] == 5 && shortestPath[9][11] == 5 && shortestPath[9][12] == 5 && shortestPath[9][13] == 5) ? 55 : 0)
            + ((shortestPath[6][13] == 5 && shortestPath[7][13] == 5 && shortestPath[8][13] == 5) ? 56 : 0)
            + ((shortestPath[11][13] == 5 && shortestPath[12][13] == 5 && shortestPath[13][13] == 5 && shortestPath[14][13] == 5) ? 15 : 0)
            + ((shortestPath[11][14] == 5 && shortestPath[11][15] == 5 && shortestPath[11][16] == 5 && shortestPath[11][17] == 5 && shortestPath[11][18] == 5) ? 115 : 0)
            + ((shortestPath[0][18] == 5 && shortestPath[1][18] == 5 && shortestPath[2][18] == 5 && shortestPath[3][18] == 5 && shortestPath[4][18] == 5 && shortestPath[5][18] == 5 && shortestPath[6][18] == 5 && shortestPath[7][18] == 5 && shortestPath[8][18] == 5 && shortestPath[9][18] == 5 && shortestPath[10][18] == 5) ? 181 : 0)
            + ((shortestPath[12][18] == 5 && shortestPath[13][18] == 5 && shortestPath[14][18] == 5) ? 78 : 0);

        if (pathValue != value) {
            bsuCopy[5][3] = 0;
            bsuCopy[11][3] = 0;
            bsuCopy[5][13] = 0;
            let shortestPathModify = new antColonyDijkstra(
                bsuCopy,
                startCoord,
                endCoord,
                numAnts,
                iterations
            );
            output_path(shortestPathModify);
            console.log(shortestPathModify);
        } else if (pathValue == value) {
            output_path(shortestPath);
            console.log(shortestPath);
        }
    }

    function output_path(path) {
        let shortestPath = path;
        var output = '';
        output += '\n<div id="path_container" class="placeholder-glow">\n';
        if (shortestPath[3][0] == 5 && shortestPath[3][1] == 5 && shortestPath[3][2] == 5 && shortestPath[3][3] == 5) {
            output += '<div id="A" class="placeholder col-12 absolute h-[2.3%] w-[22%] bg-[#F53180] opacity-80 top-[22.5%] left-[1%] rounded-2xl" style="transform: rotate(1deg);"></div>';
        } else {
            output += '<div id="A" class="road"></div>';
        }

        if (shortestPath[4][3] == 5 && shortestPath[5][3] == 5 && shortestPath[6][3] == 5 && shortestPath[7][3] == 5) {
            output += '<div id="B" class="placeholder col-12 absolute h-[2.3%] w-[23%] bg-[#F53180] opacity-80 top-[39%] left-[11.5%] rounded-2xl" style="transform: rotate(86.7deg);"></div>';
        } else {
            output += '<div id="B" class="road"></div>';
        }

        if (shortestPath[8][1] == 5 && shortestPath[8][2] == 5 && shortestPath[8][3] == 5) {
            output += '<div id="C"   class="placeholder col-12 absolute h-[2.3%] w-[11.5%] bg-[#F53180] opacity-80 top-[55%] left-[13%] rounded-2xl" style="transform: rotate(-4deg);"></div>';
        } else {
            output += '<div id="C" class="road"></div>';
        }

        if (shortestPath[9][1] == 5 && shortestPath[10][1] == 5) {
            output += '<div id="D"   class="placeholder col-12 absolute h-[2.3%] w-[9.5%] bg-[#F53180] opacity-80 top-[61%] left-[9.5%] rounded-2xl" style="transform: rotate(87deg);"></div>';
        } else {
            output += '<div id="D" class="road"></div>';
        }

        if (shortestPath[11][1] == 5 && shortestPath[11][2] == 5 && shortestPath[11][3] == 5 && shortestPath[11][4] == 5 && shortestPath[11][5] == 5 && shortestPath[11][6] == 5) {
            output += '<div id="E"   class="placeholder col-12 absolute h-[2.3%] w-[19.5%] bg-[#F53180] opacity-80 top-[66.5%] left-[13.5%] rounded-2xl" style="transform: rotate(-4.5deg);"></div>';
        } else {
            output += '<div id="E" class="road"></div>';
        }

        if (shortestPath[9][6] == 5 && shortestPath[10][6] == 5) {
            output += '<div id="F"   class="placeholder col-12 absolute h-[2.3%] w-[9.5%] bg-[#F53180] opacity-80 top-[59.5%] left-[27.5%] rounded-2xl" style="transform: rotate(86deg);"></div>';
        } else {
            output += '<div id="F" class="road"></div>';
        }

        if (shortestPath[8][4] == 5 && shortestPath[8][5] == 5 && shortestPath[8][6] == 5) {
            output += '<div id="G"   class="placeholder col-12 absolute h-[2.3%] w-[11.5%] bg-[#F53180] opacity-80 top-[54%] left-[23.5%] rounded-2xl" style="transform: rotate(-4deg);"></div>';
        } else {
            output += '<div id="G" class="road"></div>';
        }
        if (shortestPath[8][6] == 5 && shortestPath[8][5] != 5 && shortestPath[8][6] != 5) {
            output += '<div id="G2"   class="placeholder col-12 absolute h-[2.5%] w-[3.5%] bg-[#F53180] opacity-80 top-[53.5%] left-[31.5%] rounded-2xl" style="transform: rotate(-4deg);"></div>';
        } else {
            output += '<div id="G2" class="road"></div>';
        }

        if (shortestPath[4][6] == 5 && shortestPath[5][6] == 5 && shortestPath[6][6] == 5 && shortestPath[7][6] == 5) {
            output += '<div id="H"   class="placeholder col-12 absolute h-[2.3%] w-[22.5%] bg-[#F53180] opacity-80 top-[38%] left-[22.5%] rounded-2xl" style="transform: rotate(88deg);"></div>';
        } else {
            output += '<div id="H" class="road"></div>';
        }

        if (shortestPath[3][4] == 5 && shortestPath[3][5] == 5 && shortestPath[3][6] == 5) {
            output += '<div id="I"   class="placeholder col-12 absolute h-[2.3%] w-[12%] bg-[#F53180] opacity-80 top-[22.8%] left-[22%] rounded-2xl" style="transform: rotate(1deg);"></div>';
        } else {
            output += '<div id="I" class="road"></div>';
        }

        if (shortestPath[3][7] == 5 && shortestPath[3][8] == 5 && shortestPath[3][9] == 5 && shortestPath[3][10] == 5) {
            output += ' <div id="J"   class="placeholder col-12 absolute h-[2.3%] w-[18.5%] bg-[#F53180] opacity-80 top-[23%] left-[33%] rounded-2xl" style="transform: rotate(deg);"></div>';
        } else {
            output += '<div id="J" class="road"></div>';
        }

        if (shortestPath[1][10] == 5 && shortestPath[1][11] == 5 && shortestPath[1][12] == 5 && shortestPath[1][13] == 5) {
            output += '<div id="K"   class="placeholder col-12 absolute h-[3.5%] w-[13.2%] bg-[#F53180] opacity-80 top-[8.5%] left-[50%] rounded-2xl" style="transform: rotate(-1deg);"></div>';
        } else {
            output += '<div id="K" class="road"></div>';
        }

        if (shortestPath[2][10] == 5) {
            output += '<div id="L"   class="placeholder col-12 absolute h-[2.3%] w-[11%] bg-[#F53180] opacity-80 top-[15.5%] left-[45.3%] rounded-2xl" style="transform: rotate(91.2deg);"></div>';
        } else {
            output += '<div id="L" class="road"></div>';
        }

        if (shortestPath[4][10] == 5) {
            output += '<div id="M"   class="placeholder col-12 absolute h-[2.3%] w-[16%] bg-[#F53180] opacity-80 top-[34%] left-[42.5%] rounded-2xl" style="transform: rotate(91.6deg);"></div>';
        } else {
            output += '<div id="M" class="road"></div>';
        }

        if (shortestPath[6][10] == 5 && shortestPath[7][10] == 5 && shortestPath[8][10] == 5) {
            output += '<div id="N"   class="placeholder col-12 absolute h-[2.3%] w-[13%] bg-[#F53180] opacity-80 top-[53.5%] left-[43.6%] rounded-2xl" style="transform: rotate(91.8deg);"></div>';
        } else {
            output += '<div id="N" class="road"></div>';
        }

        if (shortestPath[10][10] == 5 && shortestPath[11][10] == 5 && shortestPath[12][10] == 5 && shortestPath[13][10] == 5 && shortestPath[14][10] == 3) {
            output += '<div id="O"   class="placeholder col-12 absolute h-[2.3%] w-[9%] bg-[#F53180] opacity-80 top-[68.5%] left-[45.4%] rounded-2xl" style="transform: rotate(91.8deg);"></div>';
        } else {
            output += '<div id="O" class="road"></div>';
        }

        if (shortestPath[5][10] == 5 && shortestPath[5][11] == 5 && shortestPath[5][12] == 5 && shortestPath[5][13] == 5) {
            output += '<div id="P"   class="placeholder col-12 absolute h-[2.3%] w-[16.5%] bg-[#F53180] opacity-80 top-[45%] left-[49.5%] rounded-2xl" style="transform: rotate(-1deg);"></div>';
        } else {
            output += '<div id="P" class="road"></div>';
        }

        if (shortestPath[9][10] == 5 && shortestPath[9][11] == 5 && shortestPath[9][12] == 5 && shortestPath[9][13] == 5) {
            output += '<div id="Q"   class="placeholder col-12 absolute h-[2.3%] w-[17%] bg-[#F53180] opacity-80 top-[62.6%] left-[49.1%] rounded-2xl" style="transform: rotate(.3deg);"></div>';
        } else {
            output += '<div id="Q" class="road"></div>';
        }

        if (shortestPath[10][13] == 5) {
            output += '<div id="Q2"   class="placeholder col-12 absolute h-[2.3%] w-[4%] bg-[#F53180] opacity-80 top-[64.6%] left-[63.5%] rounded-2xl" style="transform: rotate(90deg);"></div>';
        } else {
            output += '<div id="Q2" class="road"></div>';
        }

        if (shortestPath[6][13] == 5 && shortestPath[7][13] == 5 && shortestPath[8][13] == 5) {
            output += ' <div id="R"   class="placeholder col-12 absolute h-[2.3%] w-[16%] bg-[#F53180] opacity-80 top-[55.3%] left-[57.5%] rounded-2xl" style="transform: rotate(90.3deg);"></div>';
        } else {
            output += '<div id="R" class="road"></div>';
        }

        if (shortestPath[11][13] == 5 && shortestPath[12][13] == 5 && shortestPath[13][13] == 5 && shortestPath[14][13] == 5) {
            output += '<div id="S"   class="placeholder col-12 absolute h-[2.3%] w-[7.5%] bg-[#F53180] opacity-80 top-[70.4%] left-[61.7%] rounded-2xl" style="transform: rotate(90.3deg);"></div>';
        } else {
            output += '<div id="S" class="road"></div>';
        }

        if (shortestPath[11][14] == 5 && shortestPath[11][15] == 5 && shortestPath[11][16] == 5 && shortestPath[11][17] == 5 && shortestPath[11][18] == 5) {
            output += '<div id="T"   class="placeholder col-12 absolute h-[2.3%] w-[31.5%] bg-[#F53180] opacity-80 top-[66.4%] left-[65%] rounded-2xl" style="transform: rotate(.3deg);"></div>';
        } else {
            output += '<div id="T" class="road"></div>';
        }

        if (shortestPath[0][18] == 5 && shortestPath[1][18] == 5 && shortestPath[2][18] == 5 && shortestPath[3][18] == 5 && shortestPath[4][18] == 5 && shortestPath[5][18] == 5 && shortestPath[6][18] == 5 && shortestPath[7][18] == 5 && shortestPath[8][18] == 5 && shortestPath[9][18] == 5 && shortestPath[10][18] == 5) {
            output += '<img class="w-[3%] absolute top-[-5%] left-[93.5%] z-20" src="images/map/end.png"alt="" /><div id="U"   class="placeholder col-12 absolute h-[2.3%] w-[46%] bg-[#F53180] opacity-80 top-[33.5%] left-[72.4%] rounded-2xl" style="transform: rotate(89deg);"></div>';
        } else {
            output += '<div id="U" class="road"></div>';
        }

        if (shortestPath[12][18] == 5 && shortestPath[13][18] == 5 && shortestPath[14][18] == 5) {
            output += '<div id="V"   class="placeholder col-12 absolute h-[2.3%] w-[22%] bg-[#F53180] opacity-80 top-[81%] left-[85%] rounded-2xl" style="transform: rotate(89deg);"></div>';
        } else {
            output += '<div id="V" class="road"></div>';
        }
        output += '\n</div>'
        document.getElementById('line-div').innerHTML = output;
    }
    
    function for_pinpoint(){
        var prevpin;
        $('#try > *').click(function(){
           var pinNum = $(this).attr('data-pin');
            if (prevpin === pinNum) {
                return;
            }

            if (prevpin) {
                $(`#pinpoint${prevpin}`).attr('hidden',true);
                $(`img`).removeClass('ring-2');
            }

            $(`#pinpoint${pinNum}`).removeAttr('hidden');
            $(`#bin_img${pinNum}`).addClass('ring-2');
            prevpin = pinNum;

        })
    }

    function paginationData(rowsPerPage) {
    var table = $("#log_table");
    var tbody = table.find("tbody");
    var rows = tbody.find("tr");
    var pageCount = Math.ceil(rows.length / rowsPerPage);

    // Remove old pagination links if they exist
    var paginationList = $("#pagination_list");
    if (paginationList.length) {
        paginationList.remove();
    }

    // Create new pagination links
    var paginationNav = $("<nav></nav>").addClass("flex justify-center");
    paginationList = $("<ul></ul>").addClass("pagination pagination-sm").attr("id", "pagination_list");
    for (var i = 1; i <= pageCount; i++) {
        var paginationItem = $("<li></li>").addClass("page-item");
        var paginationLink = $("<a></a>").addClass("page-link").text(i).attr("href", "#");
        paginationItem.append(paginationLink);
        paginationList.append(paginationItem);
    }
    paginationNav.append(paginationList);

    // Add pagination links to modal footer
    var modalFooter = $("#exampleModal .modal-footer");
    modalFooter.find("nav").remove();
    modalFooter.prepend(paginationNav);

    // Initialize event handlers for pagination links
    paginationList.find("li").on("click", function () {
        var page = $(this).index();
        var start = rowsPerPage * page;
        var end = start + rowsPerPage;

        rows.hide();
        rows.slice(start, end).show();

        // Update active page link
        paginationList.find(".page-item").removeClass("active");
        $(this).addClass("active");
    });

    // Show first page by default
    paginationList.find("li:first-child").trigger("click");
    }
