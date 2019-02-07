var startButton=document.getElementById("startKnop")
var disapear=document.getElementById("disapear")
var show=document.getElementById("show")
var mensen=document.getElementById("mensen")
var wachtrijen=document.getElementById("wachtrijen")
function randomInt(min,max) {
    return Math.floor(Math.random()*((max+1)-min))+min
};

startButton.addEventListener("click",function(){
    disapear.style.display="none"
    show.style.display="block"
    startGame()
}) ;
//the game

var wachtrij=maakXYLijst([[70,0],[0,50]],[20,40])

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
    setTimeout(mensenSpawn,/*randomInt(1000,5000)*/10,id++)
}

function walk(naam,id){
    var walkLoop=[]
    naam.style.left=wachtrij[0][0]
    naam.style.top=wachtrij[0][1]
    walkLoop[id]=setInterval(function(){
        naam.style.left=Number(naam.style.left.replace("px",""))+1
        
        if(Number(naam.style.left.replace("px",""))+25>500){
            mensen.removeChild(naam)
            clearInterval(walkLoop[id])
        }

    },10)
}
// positielijst in de vorm [[x,y],[x,y]
function maakWachtrij(breedte,positieLijst){
    for (let index = 0; index < positieLijst.length-1; index++) {
        var posities=[positieLijst[index]].concat([positieLijst[index+1]]).sort(function(a,b){if(a[0]==b[0]){return a[1]-b[1]}else{return a[0]-b[0]}})
        console.log(posities)
        var rij=document.createElement("div")
        rij.id=index
        rij.style.top= posities[0][1]-10
        rij.style.left= posities[0][0]+5
        rij.style.width= posities[1][0]-posities[0][0]+breedte //+(breedte*  (posities[1][0]==posities[0][0]?1 : 2 ))
        rij.style.height=posities[1][1]-posities[0][1]+breedte //+(breedte*  (posities[1][0]==posities[0][0]?2 : 1 ))
        wachtrijen.appendChild(rij)
    }
}


function maakXYLijst(actielijst,begin){
    var nieuweLijst=[begin]
    for (let index = 0; index < actielijst.length; index++) {
        if (actielijst[index-1]==undefined){
            vorigItem=begin
        }else{
            vorigItem=nieuweLijst[nieuweLijst.length-1]
        }
        console.log(vorigItem)
        actie=actielijst[index]
        nieuweX=vorigItem[0]+actie[0]
        nieuweY=vorigItem[1]+actie[1]
        nieuweLijst.push([nieuweX,nieuweY])
    }
    return nieuweLijst
}


function startGame(){
    mensenSpawn(0)
    maakWachtrij(40,wachtrij)
}
startGame()