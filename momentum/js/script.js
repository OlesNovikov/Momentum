const timeElement = document.querySelector('[time]'),
    dateElement = document.querySelector('[date]'),
    greetingElement = document.querySelector('[greeting]'),
    nameElement = document.querySelector('.name'),
    focusElement = document.querySelector('[focus]'),
    changeBgButton = document.querySelector('.change-background'),
    changeQuoteButton = document.querySelector('.change-quote'),
    blockquoteElement = document.querySelector('blockquote'),
    figcaptionElement = document.querySelector('figcaption'),
    weatherIconElement = document.querySelector('.weather-icon'),
    temperatureElement = document.querySelector('.temperature'),
    weatherDescriptionElement = document.querySelector('.weather-description'),
    cityElement = document.querySelector('.city'),
    windSpeedElement = document.querySelector('.wind-speed'),
    humidityElement = document.querySelector('.humidity');

const clickEvent = 'click',
    keypressEvent = 'keypress',
    blurEvent = 'blur',
    DOMContentLoadedEvent = 'DOMContentLoaded';

const defaultName = "[Enter name]",
    defaultFocus = "[Enter focus]",
    defaultCity = "Minsk";

const nameInLocalStorage = 'name',
    focusInLocalStorage = 'focus',
    cityInLocalStorage = 'city';

const APIKey = 'dd035de450699f534d3566f835361b25';

document.addEventListener(DOMContentLoadedEvent, getQuote);
changeQuoteButton.addEventListener(clickEvent, getQuote);

document.addEventListener(DOMContentLoadedEvent, getWeather);
cityElement.addEventListener(keypressEvent, setCity);
    
nameElement.addEventListener(keypressEvent, setName);
nameElement.addEventListener(blurEvent, setName);
nameElement.addEventListener(clickEvent, clearElement);
    
focusElement.addEventListener(keypressEvent, setFocus);
focusElement.addEventListener(blurEvent, setFocus);
focusElement.addEventListener(clickEvent, clearElement);
    
changeBgButton.addEventListener(clickEvent, setBackground);

let backgroundsList = [];
let today = new Date(),
    index = today.getHours();

function initializeDateTime(hours) {
    if (isNight(hours)) {
        document.querySelector('.wrapper').style.color = 'white'; 
        document.querySelector('.weather-info').style.color = 'white';
        return "night"; 
    }
    else if (isMorning(hours)) { 
        document.querySelector('.wrapper').style.color = 'black'; 
        document.querySelector('.weather-info').style.color = 'black';
        return "morning"; 
    }
    else if (isAfternoon(hours)) {
        document.querySelector('.wrapper').style.color = 'black'; 
        document.querySelector('.weather-info').style.color = 'black';
        return "afternoon"; 
    }
    else if (isEvening(hours)) {
        document.querySelector('.wrapper').style.color = 'white';
        document.querySelector('.weather-info').style.color = 'white'; 
        return "evening"; 
    }
}

function createBackgroundsList() {
    for (let i = 0; i < 24; i++) {
        let randomNumber = Math.floor(Math.random() * Math.floor(20) + 1);
        randomNumber = addZero(randomNumber);
        const basePath = "assets/img/",
            imageFormat = ".jpg";
        let dayTime = "";

        dayTime = initializeDateTime(i);

        let imageSrc = basePath + dayTime + "/"+ randomNumber.toString() + imageFormat;
        backgroundsList.push(imageSrc);
    }
}

function clearElement(e) {
    e.target.textContent = '';
}

function showDateTime() {
    const dots = `<span>:</span>`;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let date = new Date(),
        day = week[date.getDay() - 1],
        month = months[date.getMonth()],
        monthDay = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

        timeElement.innerHTML = `${addZero(hours)}${dots}${addZero(minutes)}${dots}${addZero(seconds)}`;
        dateElement.innerHTML = `${day}, ${monthDay} ${month}`;

        setTimeout(showDateTime, 1000);
        if ((seconds == 0) && (minutes == 0)) {
            index = hours; 
            setBackground(); 
        }
}

function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

function isNight(hours) {
    if (hours < 6) return true;
    return false;
}

function isMorning(hours) {
    if ((hours >= 6) && (hours < 12)) return true;
    return false;
}

function isAfternoon(hours) {
    if ((hours >= 12) && (hours < 18)) return true;
    return false;
}

function isEvening(hours) {
    if (hours >= 18) return true;
    return false;
}

function viewBgImage(imageSrc) {
    const wrapper = document.querySelector('.wrapper');
    const src = imageSrc;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
        wrapper.style.backgroundImage = `url(${src})`;
    }; 
}

function handleButton() {
    changeBgButton.disabled = true;
    setTimeout(function() { changeBgButton.disabled = false }, 1000);
}

function setBackground() {
    index = index % backgroundsList.length;
    let imageSrc = backgroundsList[index];
    viewBgImage(imageSrc);
    handleButton();
    
    dayTime = initializeDateTime(index);
    setGreeting(dayTime);
    index++;
}

function setGreeting(dayTime) {
    if (dayTime !== null) {
        greetingElement.textContent = `Good ${dayTime},`;
    }
}

function getName() {
    let name = localStorage.getItem(nameInLocalStorage);
    
    if (name === null) {
        nameElement.textContent = defaultName;
    } else {
        nameElement.textContent = `${name}`;
    }
}

function setName(e) {
    let originalStr = e.target.innerText;
    let noSpacesStr = originalStr.replace(/\s/g ,'');

    if (e.type == keypressEvent) {
        if (e.which == 13 || e.keyCode == 13) {
            if (noSpacesStr.length !== 0) {
                localStorage.setItem(nameInLocalStorage, e.target.innerText);
            }
            nameElement.blur();
        }
    } else {
        if (noSpacesStr.length !== 0) {
            localStorage.setItem(nameInLocalStorage, e.target.innerText);
        } else {
            getName();
        }
    }
}

function getFocus() {
    let focus = localStorage.getItem(focusInLocalStorage);
    
    if (focus === null) {
        focusElement.textContent = defaultFocus;
    } else {
        focusElement.textContent = focus;
    }
}

function setFocus(e) {
    let originalStr = e.target.innerText;
    let noSpacesStr = originalStr.replace(/\s/g ,'');

    if (e.type == keypressEvent) {
        if (e.which == 13 || e.keyCode == 13) {
            if (noSpacesStr.length !== 0) {
                localStorage.setItem(focusInLocalStorage, e.target.innerText);
            }
            focusElement.blur();
        }
    } else {
        if (noSpacesStr.length !== 0) {
            localStorage.setItem(focusInLocalStorage, e.target.innerText);
        } else {
            getFocus();
        }
    }
}

async function getQuote() {
    const endpoint = 'https://api.quotable.io/random';
    const response = await fetch(endpoint);
    const json = await response.json();
    blockquoteElement.textContent = json.content;
    figcaptionElement.textContent = json.author;
}

async function getWeather() {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.textContent}&lang=en&appid=${APIKey}&units=metric`;
    const response = await fetch(endpoint);
    if (response.status === 404 || response.status === 400) {
        alert("City not found");
        getCity();
    } else {
        const data = await response.json();
        weatherIconElement.className = 'weather-icon owf';
        weatherIconElement.classList.add(`owf-${data.weather[0].id}`);
        temperatureElement.textContent = `${Math.ceil(data.main.temp)}°C`;
        weatherDescriptionElement.textContent = data.weather[0].description;
        windSpeedElement.textContent = "wind speed: " + data.wind.speed + "ms";
        humidityElement.textContent = "humidity: " + data.main.humidity + "%";

        localStorage.setItem(cityInLocalStorage, cityElement.textContent);
    }
}

function getCity() {
    let city = localStorage.getItem(cityInLocalStorage);
    if (city === null) {
        cityElement.textContent = defaultCity;
    } else {
        cityElement.textContent = city;
    }
}

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        cityElement.blur();
    }
}

getCity();
createBackgroundsList();
showDateTime();
setBackground();
getName();
getFocus();
getWeather();