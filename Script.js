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


var startWachtrij=[20,40]
var wachtrijInstructies=[[80,0],[0,100],[100,0],[0,49]]
var wachtrij=maakXYLijst(wachtrijInstructies,startWachtrij)

function mensenSpawn(id,startwachtrij,wachtrijInstructies){
    skins=["Geel","Groen","Oranje","Rood"]
    var persoon=document.createElement("img")
    naam="persoon"+toString(id)
    persoon.id=naam
    persoon.src="./imgs/Poppetje "+skins[randomInt(0,3)]+".png"
    persoon.style.transform="rotate(90deg)"
    persoon.style.position="absolute"
    persoon.style.left=startWachtrij[0]
    persoon.style.top=startWachtrij[1]
    mensen.appendChild(persoon)
    walk(persoon,naam,wachtrijInstructies)
    setTimeout(mensenSpawn,/*randomInt(1000,5000)*/500,id++,startwachtrij,wachtrijInstructies)
}

function walk(naam,id,wachtrijInstructiesAll){
    var walkLoop=[]
    var wachtrijInstructies= JSON.parse(JSON.stringify(wachtrijInstructiesAll))

    naam.style.left=wachtrij[0][0]
    naam.style.top=wachtrij[0][1]
    console.log(wachtrijInstructies)
    walkLoop[id]=setInterval(function(wachtrijInstructies){
        if (wachtrijInstructies.length==0){
            mensen.removeChild(naam)
            clearInterval(walkLoop[id])
        }
        instructie = wachtrijInstructies[0]
        console.log(instructie)
        instructie = wachtrijInstructies[0]
        if(instructie[0]==0 && instructie[1]==0){
            wachtrijInstructies.shift()
            
        }else if(instructie[0]>0 && instructie[1]==0){
            naam.style.left=Number(naam.style.left.replace("px",""))+1
            instructie[0]-=1
            naam.style.transform= "rotate(90deg)"
        }else if (instructie[0]<0 && instructie[1]==0){
            naam.style.left=Number(naam.style.left.replace("px",""))-1
            instructie[0]+=1
            naam.style.transform= "rotate(90deg)"
        }else if (instructie[0]==0 && instructie[1]>0){
            naam.style.top=Number(naam.style.top.replace("px",""))+1
            instructie[1]-=1
            naam.style.transform= "rotate(180deg)"
        }else if (instructie[0]==0 && instructie[1]<0){
            naam.style.top=Number(naam.style.top.replace("px",""))-1
            instructie[1]+=1
            naam.style.transform= "rotate(180deg)"
        }
        //naam.style.left=Number(naam.style.left.replace("px",""))+1

    },10,wachtrijInstructies)
}

// positielijst in de vorm [[x,y],[x,y]]
function maakWachtrij(breedte,positieLijst){
   for (let index = 0; index < positieLijst.length-1; index++) {
        var posities=[positieLijst[index]].concat([positieLijst[index+1]]).sort(function(a,b){if(a[0]==b[0]){return a[1]-b[1]}else{return a[0]-b[0]}})
        var rij=document.createElement("div")
        rij.id=index
        rij.style.top= posities[0][1]-10//+(posities[1][0]==posities[0][0]? 10: 0 )
        rij.style.left= posities[0][0]-5//+(posities[1][0]==posities[0][0]? 0 : 10 )
        rij.style.width= posities[1][0]-posities[0][0]+(posities[1][0]==posities[0][0]? breedte : 0 )
        rij.style.height=posities[1][1]-posities[0][1]+(posities[1][0]==posities[0][0]? 0 : breedte)
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
        var actie=actielijst[index]
        var nieuweX=vorigItem[0]+actie[0]
        var nieuweY=vorigItem[1]+actie[1]
        nieuweLijst.push([nieuweX,nieuweY])
    }
    return nieuweLijst
}


function startGame(wachtrij,startWachtrij,wachtrijInstructies){
    mensenSpawn(0,startWachtrij,wachtrijInstructies)
    maakWachtrij(40,wachtrij)
}
startGame(wachtrij,startWachtrij,wachtrijInstructies)