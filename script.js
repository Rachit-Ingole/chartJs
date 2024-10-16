
const base_url = 'https://mesonet.agron.iastate.edu/cgi-bin/request/asos.py?hours=24&';

function newChart(data){
    const ctx = document.getElementById('myChart');
    console.log(data);
    new Chart(ctx, {
    type: 'line',
    data: {
        labels: data[0],
        datasets: [{
        label: '# of Votes',
        data: data[1],
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    });
}


const getData = async(data,station) =>{
    url = `${base_url}data=${data}&station=${station}`
    try {
        const response = await fetch(url);
        const result = await response.text();
        let res = JSON.parse(csvJSON(result));
        
        
        var label = []
        for(i of res){
            if(i["valid"] !== undefined){
                label.push(i["valid"]);
            }
        }
        
        var data = []
        for(i in res){
            if(res[i]["tmpc"] !== undefined){
                data.push(res[i]["tmpc"]);
            }
        }   
        
        newChart([label,data]);
       

    } catch (error) {
        console.error(error);
    }
}




/* Suggestion System */
const searchInput = document.querySelector("#search-input");
const suggestions = Object.keys(stationCodes);
const suggestionBox = document.querySelector(".search-suggestions")


searchInput.onkeyup = function(){
    let input = searchInput.value;
    if(input.length > 2){

        suggestionBox.classList.remove("hidden");
        var res = suggestions.filter((a)=>{
            return a.toLowerCase().includes(input.toLowerCase())
        })
        let filler = "";
        for(let i of res){
            if(i==res.length-1){

            }
            filler += "<li onclick=listclicked(this)>"+ i +"<div id=station-code>" + stationCodes[i] +"</div></li>\n";
        }
        suggestionBox.innerHTML = "<ul>"+ filler +"</ul>";
    }
    else{
        suggestionBox.classList.add("hidden")
    }
}

function listclicked(list){
    let s = "";
    for(let i of list.innerHTML){
        if(i=="<"){
            break
        }
        s += i
    }
    searchInput.value = s;


}



getData("tmpc","VABB")





