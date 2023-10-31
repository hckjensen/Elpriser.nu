const getData = () =>{
    const endpoint = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK1.json';
    fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            const ul = document.createElement('ul');
            response && response.map(item => {
                const li = document.createElement('li');
                li.innerHTML = item.DKK_per_kWh;
                ul.appendChild(li)  
            })
            document.getElementById('container').appendChild(ul)
        })
        .catch(error => console.error(error))
}
getData();

// Create a new Date object
const currentDate = new Date();

// Get the current time
const currentTime = currentDate.toLocaleTimeString();

console.log(currentTime); // Output the current time


