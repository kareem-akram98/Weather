const myAPIKey = `c5ca6bd4da9b4fb9ae1174812242506`
const baseURL = 'http://api.weatherapi.com/v1/forecast.json'

console.log("hello");
let cityInput = document.getElementById('cityInput')
let searchCity;
cityInput.addEventListener('input', function () {
    searchCity = cityInput.value
    console.log(searchCity)
    getWeather(searchCity)})

async function getWeather(search) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c5ca6bd4da9b4fb9ae1174812242506&q=${search}&days=3`)
        let finalResponse = await response.json()
        console.log(finalResponse);
        console.log(finalResponse.current.condition);
        displayNow(finalResponse)
        displayToday(finalResponse)
        displayBox(finalResponse)
        display3Day(finalResponse)
    } catch (error) {
        console.log(error);
    }
}
getWeather()
function displayNow(data) {
    let city = data.location.name
    let dataArray = data.forecast.forecastday
    let dayNow = dataArray[0]
    console.log(dayNow);
    document.querySelector('.now').innerHTML = `
                    <p class="position-absolute now-now">NOW</p>

                <div class="now-text p-2">
                  <h2 id="htmlLocation">${city}</h2>
                </div>
                <div class="now-degree p-2">
                  <h2><span id="htmlCurrentTemp">${dayNow.day.avgtemp_c}&deg </span></h2>
                </div>
                <div class="now-img p-2">
                  <img
                    id="htmlCurrentConditionIMG"
                    class="mx-auto"
                    src="https://${dayNow.day.condition.icon}"
                    alt="${dayNow.day.condition.text}"
                  />
                  <p id="htmlCurrentCondition" class="text-center">${dayNow.day.condition.text}</p>
                </div>`
}

function displayToday(data) {
    let dataArray = data.forecast.forecastday
    let toDay = dataArray[0]
    console.log(toDay);
    let todayBox = ``
    for (let i = 0; i < 24; i += 4) {
        todayBox +=
            `
                     <li>
                        <div id="hour1Time" class="hour-head">${toDay.hour[i].time.split(' ')[1]}</div>
                        <div class="hour-body">
                          <img
                            id="hour1IMG"
                            src="https://${toDay.hour[i].condition.icon}"
                            alt="${toDay.hour[i].condition.text}"
                          />
                        </div>
                        <div class="hour-footer">
                          <span id="hour1Temp">${toDay.hour[i].temp_c}</span>&deg;
                        </div>
                      </li> `
    }
    document.querySelector('.hourly-list').innerHTML = todayBox
}

function displayBox(data) {
    let Data=data
    console.log(Data);
    document.querySelector('.additional-info').innerHTML = `
    <div class="row text-center">
                  <div class="col-sm-6 pb-2">
                    <div class="inner clear-bg rounded-4">
                      <h4 class="h5">
                        <i class="fa-solid fa-temperature-half"></i> Real Feel
                      </h4>
                      <p class="mt-3"><span id="htmlRealFeel">${Data.current.feelslike_c}</span>&deg;</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pb-2">
                    <div class="inner clear-bg rounded-4">
                      <h4 class="h5"><i class="fas fa-wind"></i> Wind</h4>
                      <p class="mt-3">
                        <span id="htmlWindSpeed">${Data.current.wind_kph}</span> km/h
                      </p>
                    </div>
                  </div>
                  <div class="col-sm-6 pb-2">
                    <div class="inner clear-bg rounded-4">
                      <h4 class="h5">
                        <i
                          class="fa-solid fa-down-left-and-up-right-to-center fa-rotate-by"
                          style="--fa-rotate-angle: 135deg"
                        ></i>
                        Pressure
                      </h4>
                      <p class="mt-3"><span id="htmlPressure">${Data.current.pressure_mb}</span> mb</p>
                    </div>
                  </div>
                  <div class="col-sm-6 pb-2">
                    <div class="inner clear-bg rounded-4">
                      <h4 class="h5"><i class="fas fa-sun"></i> UV Index</h4>
                      <p class="mt-3"><span id="htmlUV">${Data.current.uv}</span></p>
                    </div>
                  </div>
                </div>
    `
}

const days = [];
toDay()
function toDay() {
    const today = new Date().getDay();
    console.log(today);
    const weekDays = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];

    let day;
    for (let i = 0; i < weekDays.length; i++) {
        day = today + i;
        day = day < weekDays.length ? day : day - weekDays.length;
        days.push(weekDays[day]);
    }
}

function display3Day(data) {
    let dataArray = data.forecast.forecastday
    console.log(dataArray);
    let dataBox = ``
    for (let i = 0; i < 3; i++) {
        dataBox +=
            `  
        <li class="d-flex justify-content-between align-items-center">
                      <div class="day">${days[i]}</div>
                      <div class="condition d-flex align-items-center gap-2">
                        <img
                          src="https://${dataArray[i].day.condition.icon}"
                          alt="${dataArray[i].day.condition.text}"
                        />
                        <p>${dataArray[i].day.condition.text}</p>
                      </div>
                      <div class="max-min">${dataArray[i].day.maxtemp_c}&deg/${dataArray[i].day.mintemp_c}&deg</div>
                    </li>
                    `
    }
    document.querySelector('.week-list').innerHTML = dataBox
}

const x = document.getElementById("demo");
getLocation()
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log();
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  console.log(latitude,longitude);
  let search = `${latitude},${longitude}`
  getWeather(search)
}
