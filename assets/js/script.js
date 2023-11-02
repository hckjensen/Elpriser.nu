

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
const formattedDate = `${currentMonth}/${currentDay}/${currentYear}`;

// Display the current date
console.log("Current Date:", formattedDate);


//OVERSIGT

const url = `https://www.elprisenligenu.dk/api/v1/prices/${currentYear}/${currentMonth}-${currentDay}_DK1.json`


const getData = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Find højeste og laveste pris
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
                const prisElement = document.getElementById(`pris${i}`);
                const pris = data[i].DKK_per_kWh;
                prisElement.innerHTML = pris.toFixed(3) + ' ' + 'kr';
                prisElement.style.color = getColor(pris)
                 
            }

            // Lav og Høj pris
            const minimumPrice = document.getElementById('minPrice')
            const maximumPrice = document.getElementById('maxPrice')
            minimumPrice.innerHTML = `${minPrice.toFixed(3)} kr`
            maximumPrice.innerHTML = `${maxPrice.toFixed(3)} kr`


        })
}

getData()
















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

// 





