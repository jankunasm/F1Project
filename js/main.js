const form = document.querySelector('#form')
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = document.querySelector('#season');
    let round = document.querySelector('#round');
    let jsonData = getData(season, round)
    loadData(jsonData)
})


const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season.value}/${round.value}/driverStandings.json`)
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7)
}

const DOM_Elements = {
    racers : '.racer-list'
}

const create_list = (driverId, position, givenName, familyName, nationality, sponsor, points) => {
    const html = `<a href = '#' class = "list-group-item list-group-item-action list-group-item-light" id="${driverId}"> Position: ${position} Name: ${givenName} ${familyName} Nationality: ${nationality} Sponsor: ${sponsor}, Points: ${points}`
    document.querySelector(DOM_Elements.racers).insertAdjacentHTML('beforeend', html)
}

const loadData = async (jsonData) => {
    const racerList = await jsonData

    racerList.forEach(element => create_list(element.Driver.driverId, element.position, element.Driver.givenName, element.Driver.familyName, element.Driver.nationality, element.Constructors[0].name, element.points))
}