const URL = "https://data.cityofnewyork.us/resource/ia2d-e54m.json"
const buttons = document.querySelector('.buttons')
const waterFunnel = document.querySelector('#waterDrops')
const select = document.querySelector('select')
const waterLevel = document.querySelector('.waterLevel')


//fetching the data from open data nyc api
fetch(URL)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
        data.forEach(obj =>{
            const option = document.createElement('option')
            option.innerText = obj.year
            option.value = obj.per_capita_gallons_per_person_per_day
            
            select.appendChild(option)
        })
    })
    .catch((err)=>{
        console.log(err)
    })


select.addEventListener("change", ()=>{
        waterFlow(select.value)
        risingTide(select.value) 
       
})



// creates the flow of water droplets out of the faucet
function waterFlow(num) {
    for (var i = 0; i < num ; i++) {
        const delay = setTimeout(function(){
            makeDrop();  
        }, 220 * i + 200);
        //resets the water flow when the select value changes
        select.addEventListener("change", ()=>{
            waterFunnel.innerHTML=""
            clearTimeout(delay)
        })
    }
}

//makes each individual drop
function makeDrop(){
const drop = document.createElement("img")
drop.src="https://www.readyrefresh.com/medias/sys_master/images/images/h41/h13/h00/8797819011102/1316-main-arrowhead-distilled-1-gallon-bottle-composite.png"
drop.classList = "waterFlow"
// drop.style.left = window.innerWidth * Math.random() + "px"
waterFunnel.appendChild(drop)
}

//creates the rising water level

function risingTide(num){
   
   
for (let i=0; i < num; i++){
   
    const rise = setTimeout(()=>{
        waterLevel.style.height = i* num/window.innerHeight*4 + "px"
        if (parseInt(waterLevel.style.height) > 40){
            console.log(select.value)
            waterLevel.innerText = select.value + " gallons of water consumed per person per day"
        }
    }, 220*i + 200)
   



select.addEventListener("change", ()=>{
    waterLevel.innerHTML = ""
    waterLevel.style.height = 0  + "px"
    clearTimeout(rise)
    
})
}}

