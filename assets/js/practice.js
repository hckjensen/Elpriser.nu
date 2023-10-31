const getData = () =>{
    const endpoint = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json';
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const ul = document.createElement('ul');
            data && data.map(item => {
                const li = document.createElement('li');
                li.innerHTML = item.DKK_per_kWh;
                ul.appendChild(li)
            })
            document.getElementById('container').appendChild(ul)
        })
        .catch(error => console.error(error))
}

getData()