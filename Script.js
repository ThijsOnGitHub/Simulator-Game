var startButton=document.getElementById("startKnop")
var disapear=document.getElementById("disapear")
var show=document.getElementById("show")
var mensen=document.getElementById("mensen")

function randomInt(min,max) {
    return Math.floor(Math.random()*((max+1)-min))+min
};

startButton.addEventListener("click",function(){
    disapear.style.display="none"
    show.style.display="block"
    startGame()
}) ;
startGame()

function mensenSpawn(id){
    skins=["Geel","Groen","Oranje","Rood"]
    var persoon=document.createElement("img")
    naam="persoon"+toString(id)
    persoon.id=naam
    persoon.src="./imgs/Poppetje "+skins[randomInt(0,3)]+".png"
    persoon.style.transform="rotate(90deg)"
    persoon.style.position="absolute"
    persoon.style.left=10
    persoon.style.top=10
    mensen.appendChild(persoon,naam)
    walk(persoon,naam)
    setTimeout(mensenSpawn,randomInt(1000,5000),id++)
}

function walk(naam,id){
    var walkLoop=[]
    walkLoop[id]=setInterval(function(){
        naam.style.left=Number(naam.style.left.replace("px",""))+1
        if(Number(naam.style.left.replace("px",""))+25>500){
            mensen.removeChild(naam)
            clearInterval(walkLoop[id])
        }else{
            console.log(Number(naam.style.left.replace("px","")))
            console.log(Number(naam.style.left.replace("px",""))>500)
        }

    },10)
}

function startGame(){
    mensenSpawn(0)
    gameLoop()
}