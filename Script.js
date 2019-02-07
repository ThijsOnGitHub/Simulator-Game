var startButton=document.getElementById("startKnop")
var disapear=document.getElementById("disapear")

function randomInt(min,max) {
    return Math.floor(Math.random()*((max+1)-min))+min
};

startButton.addEventListener("click",function(){
    disapear.style.display="none"
}) ;
