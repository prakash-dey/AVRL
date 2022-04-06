// Selecting the elements
const searchBtn = document.querySelector("#search-btn");
const getWeatherBtn = document.querySelector("#get-weather");
const noData = document.querySelector('.no-data');
const searchVal = document.querySelector('#search-inp');

const mainCont = document.querySelector('.main-cont');
// const deleteBtn = document.querySelector('.delete-icon');
const citiesArr = [];


// Function for fetching the data from Api


// Creating the Card
const createCard = async () => {
    const cityName = document.querySelector("#cities");
    // Fetching data
    fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityName.value}`)
        .then(response => response.json())
        .then((data) => {
            // Calculating Time
            // console.log()
            const date = data.date_and_time.split(',')[0].split('/');

            const date_time = new Date(date[2], date[1], date[0]);
            console.log(date_time.getTime());
            const duration = Date.now() - date_time.getTime();
            console.log(duration);
            const days = Math.floor((duration / (1000 * 60 * 60 * 24)));











            console.log(data);
            const id = Date.now();
            const newElm = document.createElement('div');
            newElm.setAttribute('class', `city-cont-items ${cityName.value.split(" ").join("")}`);
            newElm.setAttribute('id', `${id}`);

            newElm.innerHTML = `

                <p class="delete-icon">X</p>
                <h3>${cityName.value}</h3>
                <div class="weather-info-cont">
                    <div>
                        <p>Description:</p>
                        <p>Temperature(<sup>0</sup>C:</p>
                        <p>Pressure(hPa):</p>
                        <p>Data age(no of days):</p>
                    </div>
                    <div>
                        <p>${data.description}</p>
                        <p>${data.temp_in_celsius}</p>
                        <p>${data.pressure_in_hPa}</p>
                        <p>${days}</p>
                    </div>
                </div>
        
            
            `


            if (citiesArr.length === 0) {
                mainCont.replaceChild(newElm, noData);
            } else {
                mainCont.appendChild(newElm);
            }
            citiesArr.push({ id, data });




        });



    // date_and_time
    // description
    // humidity_in_percent
    // pressure_in_hPa
    // temp_in_celsius
}
// Fetching data on clicking

getWeatherBtn.addEventListener('click', () => {
    createCard();
})

// handling delete functionality
const handleDelete = (e) => {
    if (e.target.classList.contains('delete-icon')) {
// const citiesArr = [];
// console.log(e.target.parentElement.id);

citiesArr.forEach((el,idx)=>{
    if(el.id==e.target.parentElement.id){
        citiesArr.splice(idx,1);
    }
})

        e.target.parentElement.remove();
        console.log(citiesArr.length);
    }
    if(citiesArr.length==0){
        mainCont.innerHTML = `<p class="no-data">No Data</p>`;
    }
}





// Delete the data 
mainCont.addEventListener('click', (e) => handleDelete(e));


// Search functionalitty

const handleSearch = (searchKeyword) => {
    console.log(searchVal.value.split(" ").join(""));
    const findElm = document.querySelector(`.${searchVal.value.split(" ").join("")}`);

    findElm.style.borderColor = 'green';
    setTimeout(() => {
        findElm.style.borderColor = '#4472C4';
    }, 3000);

}

searchBtn.addEventListener('click', handleSearch);

