let days = document.querySelector('.daynumber'),
    hours = document.querySelector('.hoursnumber'),
    minutes = document.querySelector('.minutesnumber'),
    seconds = document.querySelector('.secondsnumber'),
    //Count Down End Date
    //1000 milliseconds = 1 second
    //Christmas Day
    countDownDate = new Date("Dec 24, 2023 00:00:01").getTime();

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
    }, 1000);