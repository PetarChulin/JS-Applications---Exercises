function getInfo() {

    const stopId = document.getElementById('stopId');
    const stop = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    let busStop = document.createElement('div');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId.value} `)
        .then(res => res.json())
        .then(data => {
            buses.innerHTML = '';
            stop.innerHTML = '';
            busStop.textContent = data.name;
            stop.appendChild(busStop);

            for (let line of Object.entries(data.buses)) {
                let [busId, time] = line;
                let li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time} minutes`;
                buses.appendChild(li);
            }
        })
        .catch(() => {
            buses.innerHTML = '';
            stop.innerHTML = '';
            busStop.textContent = 'Error';
            stop.appendChild(busStop);
        });
}



