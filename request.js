// модуль с запросами


export async function getRequest(inputCity) {
    console.log(inputCity)
    const serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const apiKey = '0225b3d9f1e828f47605224d400ac2ac'; 
    const url = `${serverUrl}?q=${inputCity}&appid=${apiKey}&units=metric&cnt=3`;

    // console.log(url)

    const response = await fetch(url);

    return await response.json()
}


