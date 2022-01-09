



document.addEventListener("DOMContentLoaded",()=>{
    getData("/data.json");
})





async function getData(url){

    try{
        let respuesta = await fetch(url);
        if(!respuesta.ok) throw {status: respuesta.status, statusText: respuesta.statusText};
        let json = await respuesta.json();

        let $buttons = document.querySelectorAll(".user-card-body a");
        $buttons.forEach(button=>{
    
            button.addEventListener("click",(event)=>{
        
                
        
                if(event.target.id == "daily"){
                    let dailyCurrent = [];
                    let dailyPrevious = [];

                    json.forEach(activitie=>{
                     dailyCurrent.push(activitie.timeframes.daily.current);
                     dailyPrevious.push(activitie.timeframes.daily.previous);
                    })
                    
                    sustitution(dailyCurrent,dailyPrevious,"Day");
                }
        
                if(event.target.id == "weekly"){
                    let dailyCurrent = [];
                    let dailyPrevious = [];

                    json.forEach(activitie=>{
                     dailyCurrent.push(activitie.timeframes.weekly.current);
                     dailyPrevious.push(activitie.timeframes.weekly.previous);
                    })
                    
                    sustitution(dailyCurrent,dailyPrevious,"Week");
                }
        
        
                if(event.target.id == "monthly"){
                    let dailyCurrent = [];
                    let dailyPrevious = [];

                    json.forEach(activitie=>{
                     dailyCurrent.push(activitie.timeframes.monthly.current);
                     dailyPrevious.push(activitie.timeframes.monthly.previous);
                    })
                    
                    sustitution(dailyCurrent,dailyPrevious,"Month");
                }
        
            })
        
        })


    } catch(err){
        console.log(err);
    }

    

}


const sustitution = function (current,previous,time){


    //crea un array con la lista de actividades
    let activities = ["work","play","study","excercise","social","self-care"];
    //setea el contador en 0
    let count = 0;

    //para cada una de las actividades va a seleccionar el titulo y parrafo y los va a reemplazar por los valores
    // que vengan de los arrays current y previous
    activities.forEach(activity =>{

        let $h2 = document.querySelector(`.${activity} .card-main h2`);
        let $p = document.querySelector(`.${activity} .card-main p`);

        $h2.innerHTML=`${current[count]}hrs`;
        $p.innerHTML=`Last ${time} - ${previous[count]}hrs`;
        count = count+1;
    })

}

