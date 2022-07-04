function attachEvents() {

    let submitBtn = document.getElementById('submit');
    let location = document.getElementById('location');
    let forecast = document.getElementById('forecast');
    let current = document.getElementById('current');
    let upcoming = document.getElementById('upcoming');
    submitBtn.addEventListener('click', getWeather);
    let cityId = '';

    function getWeather() {

        let symbol = { 'Sunny': '☀', 'Partly sunny': '⛅', 'Overcast': '☁', 'Rain': '☂' };

        forecast.style.display = 'block';
        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(res => res.json())
            .then(data => {
                               
                for (const line of Object.values(data)) {
                    location.value == line.name ? cityId = line.code : null;
                }
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityId}`)
                    .then(res => res.json())
                    .then(data => {
                        let cond = Object.values(data.forecast);
                        let weather = cond[0];
                        let div = el('div', '', 'forecasts', current);
                        el('span', `${symbol[weather]}`, 'condition symbol', div);
                        let span = el('span', '', 'condition', div);
                        el('span', `${data.name}`, 'forecast-data', span);
                        el('span', `${cond[2] + '°' + '/' + cond[1] + '°'}`, 'forecast-data', span);
                        el('span', `${weather}`, 'forecast-data', span);

                    }).catch(() => {                                         
                        el('div', 'Error', 'forecasts', current);

                    });
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityId}`)
                    .then(res => res.json())
                    .then(data => {

                        let cond = Object.values(data.forecast);
                        let div = el('div', '', 'forecast-info', upcoming);
                        for (const forecast of cond) {

                            let span = el('span', '', 'upcoming', div);
                            el('span', `${symbol[forecast.condition]}`, 'symbol', span);
                            el('span', `${forecast.low + '°' + '/' + forecast.high + '°'}`, 'forecast-data', span);
                            el('span', `${forecast.condition}`, 'forecast-data', span);
                        }
                    });

            });
    }
    function el(type, content, clas, parent) {
        const element = document.createElement(type);
        element.textContent = content;
        element.classList = clas;
        if (parent) { parent.appendChild(element); }
        return element;
    }
}

attachEvents();