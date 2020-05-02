window.addEventListener("load", function(){
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperatureDescription");
    let temperatureDegree = document.querySelector(".temperatureDegree");    
    let locationTimezone = document.querySelector(".locationTimezone");
    let convertTemperature = document.querySelector("span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            long = position.coords.longitude;
            lat = position.coords.latitude; 
            

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
        
            fetch(api)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                const {temperature,summary,icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                    //Set Icon
                setIcon(icon, document.querySelector(".icon"));    

            })
        
        })
    } else{
        h1.TextContent = "Sorry! This is not working. Maybe you are in a magical Timezone! :3"
    }

    function setIcon(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }

    convertTemperature.addEventListener("click", function(){
        if(convertTemperature.textContent=="F"){
            let F = Number(temperatureDegree.textContent);
            const num = (F-32)*(5/9);
            temperatureDegree.textContent = num.toFixed(2);
            convertTemperature.textContent = "C";
        } else{
            let C = Number(temperatureDegree.textContent);
            const num = (C*9)/5 + 32;
            temperatureDegree.textContent = num.toFixed(2);
            convertTemperature.textContent = "F";
        }
    })

})

