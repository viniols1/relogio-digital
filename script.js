const timezoneSelect = document.getElementById('timezone-select');
const hourHand = document.getElementById('hour-hand');
const minHand = document.getElementById('min-hand');
const secondHand = document.getElementById('second-hand');
const digitalHour = document.getElementById('digital-hour');
const digitalMin = document.getElementById('digital-min');
const digitalSec = document.getElementById('digital-sec');
const amPmDisplay = document.getElementById('am-pm');
const dateDisplay = document.getElementById('date-display');

const timezones = [
    { label: "Hora Local (Seu dispositivo)", zone: "local" },
    { label: "Brasil - Brasilia", zone: "America/Brasilia" },
    { label: "EUA - Nova York", zone: "America/New_York" },
    { label: "Espanha - Madrid", zone: "Europe/Madrid" },
    { label: "Alemanha - Berlim", zone: "Europe/Berlin" },
    { label : "Itália - Roma", zone: "Europe/Rome" },
    { label: "Portugal - Lisboa", zone: "Europe/Lisbon" },
    { label: "Reino Unido - Londres", zone: "Europe/London" },
    { label: "França - Paris", zone: "Europe/Paris" },
    { label: "Rússia - Moscou", zone: "Europe/Moscow" },
    { label: "Japão - Tóquio", zone: "Asia/Tokyo" },
    { label: "China - Xangai", zone: "Asia/Shanghai" },
    { label: "Índia - Calcutá", zone: "Asia/Kolkata" },
    { label: "Austrália - Sydney", zone: "Australia/Sydney" },
    { label: "Emirados Árabes - Dubai", zone: "Asia/Dubai" }
];

timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.zone;
    option.textContent = tz.label;
    timezoneSelect.appendChild(option);
});

function updateClock() {
    const selectedZone = timezoneSelect.value;
    let now;

    if (selectedZone === 'local') {
        now = new Date();
    } else {
        const tzString = new Date().toLocaleString("en-US", { timeZone: selectedZone });
        now = new Date(tzString);
    }

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsDegrees = ((seconds / 60) * 360);
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6);
    const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30);

    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;

    digitalHour.textContent = String(hours).padStart(2, '0');
    digitalMin.textContent = String(minutes).padStart(2, '0');
    digitalSec.textContent = String(seconds).padStart(2, '0');

    amPmDisplay.textContent = hours >= 12 ? 'PM' : 'AM';

    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = selectedZone === 'local' 
        ? now.toLocaleDateString('pt-BR', optionsDate)
        : new Date().toLocaleDateString('pt-BR', { ...optionsDate, timeZone: selectedZone });
    
    dateDisplay.textContent = dateStr;
}

setInterval(updateClock, 1000);
updateClock();

timezoneSelect.addEventListener('change', updateClock);