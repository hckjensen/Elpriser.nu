

// Create a new Date object
const currentDate = new Date();

// Get the current date in various formats
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Adding 1 as months are zero-indexed (0-11)
let currentDay = currentDate.getDate();

if (currentDay < 10){
    currentDay = '0' + currentDay
} else {
    currentDay = currentDay
}

// Format the date as a string (MM/DD/YYYY or DD/MM/YYYY)
const formattedDate = `${currentDay}-${currentMonth}-${currentYear}`;


// Display the current date
console.log("Current Date:", formattedDate);


// NAV-BAR select
const navItem = document.querySelectorAll('.nav-item')
const pages = document.querySelectorAll('.page')
console.log(pages)
navItem.forEach(item => {
    item.addEventListener('click', (event) => {
        console.log(event.target.id)
        pages.forEach(page => {
            page.style.display = 'none'
        })

        //Assigns color to each nav-item
        navItem.forEach(item => { 
            item.style.color = '#EBEBEB'
        })
        
        //Displays page to corresponding to menu item clicked
        if(event.target.id == 'item1') {
            pages[1].style.display = 'block'
        } else if(event.target.id == 'item3'){
            pages[2].style.display = 'block'
        } else {
            pages[0].style.display = 'block'
        }

        // Assigns green color to clicked nav-item
        event.target.style.color = '#55EC20'
    })
});


//OVERSIGT

const url = `https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDay}_DK1.json`


const getData = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        // Extract prices and find min & max
        const prices = data.map(item => item.DKK_per_kWh);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
  
        // Function to generate a color based on the value
        function getColor(value) {
          const normalizedValue = (value - minPrice) / (maxPrice - minPrice);
          const hue = (1 - normalizedValue) * 120;
          const rgbValue = `hsl(${hue}, 100%, 50%)`;
          return rgbValue;
        }
  
        // Update HTML elements with prices
        for (let i = 0; i < data.length; i++) {
          const prisElement = document.getElementById(`pris${i}`);
          const nyPrisElement = document.getElementById(`nypris${i}`);
          const pris = data[i].DKK_per_kWh;
  
          prisElement.innerHTML = `${pris.toFixed(3)} kr`;
          nyPrisElement.innerHTML = `${pris.toFixed(3)} kr`;
  
          prisElement.style.color = getColor(pris);
          nyPrisElement.style.color = getColor(pris);
        }
  
        // Display minimum and maximum prices
        const minimumPrice = document.getElementById('minPrice');
        const maximumPrice = document.getElementById('maxPrice');
        minimumPrice.innerHTML = `${minPrice.toFixed(3)} kr`;
        maximumPrice.innerHTML = `${maxPrice.toFixed(3)} kr`;
  
        // Display current time & load current price
        function updateTime() {
          const currentDate = new Date();
          const currentHour = new Date().getHours();
          const currentPriceElement = document.getElementById('currentPrice');
  
          const currentHourObject = data.find(item => new Date(item.time_start).getHours() === currentHour);
          const currentPrice = currentHourObject.DKK_per_kWh;
  
          currentPriceElement.innerHTML = `${currentPrice.toFixed(3)} KR`;
  
          const formatTime = time => String(time).padStart(2, '0');
          const hours = formatTime(currentDate.getHours());
          const minutes = formatTime(currentDate.getMinutes());
          const seconds = formatTime(currentDate.getSeconds());
          const currentTime = `${hours}:${minutes}:${seconds}`;
  
          const hoursInt = Number(hours);
          const nextHourInt = (hoursInt + 1) % 24;
          const displayHour = `${hoursInt.toString().padStart(2, '0')}.00 - ${nextHourInt.toString().padStart(2, '0')}.00`;
  
          document.getElementById('currentHour').innerHTML = displayHour;
        }
  
        updateTime(); // Update time initially
        setInterval(updateTime, 1000); // Update time every second
      });
  };
  

getData()



// Pick Date

const pickDate = document.getElementById('datepicker')

document.getElementById('selected-date').innerHTML = `${formattedDate}`

pickDate.addEventListener('change', function(){
    const newDate = new Date(this.value);
    const selectedDate = document.getElementById('selected-date')

    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11.
    let newDay = newDate.getDate();

    if (newDay < 10){
        newDay = '0' + newDay
    } else {
        newDay = newDay
    }

    selectedDate.innerHTML = `${newDay}-${newMonth}-${newYear}`


    // Generate prices for selected day

    const newUrl = `https://www.elprisenligenu.dk/api/v1/prices/${newYear}/${newMonth}-${newDay}_DK1.json`

    fetch(newUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const prices = data.map(item => item.DKK_per_kWh);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);

            // Function to generate a color based on the value
            function getColor(value) {
                // Calculate a value between 0 and 1 based on the item's position between min and max
                const normalizedValue = (value - minPrice) / (maxPrice - minPrice);
                // Use a gradient from red to green based on the normalized value
                const hue = (1 - normalizedValue) * 120;
                // Convert HSL to RGB
                const rgbValue = `hsl(${hue}, 100%, 50%)`;
                return rgbValue;
            }

            // Opdater HTML-elementerne med priserne
            for (let i = 0; i < data.length; i++) {
                const prisElement = document.getElementById(`nypris${i}`);
                const pris = data[i].DKK_per_kWh;
                prisElement.innerHTML = pris.toFixed(3) + ' ' + 'kr';
                prisElement.style.color = getColor(pris)
                 
            }
        })
        .catch(()=>{
            console.log("no data")
            for (let i = 0; i < 24; i++) {
                const prisElement = document.getElementById(`nypris${i}`)
                prisElement.innerHTML = "No Data"
                prisElement.style.color = "red"
            }
        })
})






