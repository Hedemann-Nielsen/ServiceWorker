





let days = document.getElementById('daynumber');
let hours = document.getElementById('hoursnumber');
let minutes = document.getElementById('minutesnumber');
let seconds = document.getElementById('secondsnumber');


//Count Down End Date
//1000 milliseconds = 1 second
//Christmas Day
let countDownDate = new Date("Dec 24, 2023 18:00:00").getTime();

let counter = setInterval(() => {
    //Get Date Now
    let dateNow = new Date().getTime();
    //Find The Date Difference Between Now and End Date
    let dateDiff = countDownDate - dateNow;
    
    
    //Get Time Unit

    let day = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    let hour = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minute = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let second = Math.floor((dateDiff % (1000 * 60)) / 1000);
    
          days.textContent = day < 10 ? `0${day}` : day;
        hours.textContent = hour < 10 ? `0${hour}` : hour;
        minutes.textContent = minute < 10 ? `0${minute}` : minute;
        seconds.textContent = second < 10 ? `0${second}` : second;
    
        if (dateDiff == 0) {
            clearInterval(counter);
        }
    });

    //registrer serviceworker hvis muligt
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceWorker.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}
