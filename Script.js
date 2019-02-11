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

function TheGame(){
    var startWachtrij=[20,40]
    //var wachtrijInstructies=[[80,0],[0,100],[100,0],[0,49]]
    var wachtrijInstructies=[[200,0],[00,80],[-60,0],[0,80],[120,0],[0,-100],[60,0]]
    var wachtrij=maakXYLijst(wachtrijInstructies,startWachtrij)

    function lengteWachtrij(instructiesAll){
        var lengte = 0 
        var Instructies = JSON.parse(JSON.stringify(instructiesAll))
        for (let index = 0; index < Instructies.length; index++) {
            if(Instructies[index][0]==0){
                lengte+=Math.abs( Instructies[index][1])
            }else{
                lengte+=Math.abs( Instructies[index][0])
            }
        }
        return lengte
    }

    var wachtrijLengte=lengteWachtrij(wachtrijInstructies)
    var realLengte=lengteWachtrij(wachtrijInstructies)
    console.log(wachtrijLengte)
    var mensenDICT={}

    function mensenSpawn(id,startwachtrij,wachtrijInstructies){
        if(Object.keys(mensenDICT).length<28){
        skins=["Geel","Groen","Oranje","Rood"]
        var persoon=document.createElement("img")
        naam="persoon"+id.toString()
        persoon.id=naam
        persoon.src="./imgs/Poppetje "+skins[randomInt(0,3)]+".png"
        persoon.style.position="absolute"
        persoon.style.left=startWachtrij[0]
        persoon.style.top=startWachtrij[1]

        mensenDICT[id]={"afstandLopen":0,"afstandGelopen":0}
        if (mensenDICT[id-1]==undefined){
            mensenDICT[id]["afstandLopen"]=wachtrijLengte-25
        }else{
            mensenDICT[id]["afstandLopen"]=mensenDICT[id-1]["afstandLopen"]-25
        }
        mensenDICT[id]["afstandGelopen"]=0
        mensen.appendChild(persoon)
        walk(persoon,naam,wachtrijInstructies,id)
    }
        setTimeout(mensenSpawn,randomInt(100,3000),id+1,startwachtrij,wachtrijInstructies)
    }
    function walk(naam,id,wachtrijInstructiesAll,nummerID){
        var walkLoop=[]
        var wachtrijInstructies= JSON.parse(JSON.stringify(wachtrijInstructiesAll))
        if (wachtrijInstructies[0][0]==0){
            wachtrijInstructies[0][1]+=10
            naam.style.top=wachtrij[0][1]-10
        }else{
            wachtrijInstructies[0][0]+=10
            naam.style.left=wachtrij[0][0]-10
        }

        if (wachtrijInstructies[wachtrijInstructies.length-1][0]==0){
            wachtrijInstructies[wachtrijInstructies.length-1][1]-=10
        }else{
            wachtrijInstructies[wachtrijInstructies.length-1][0]-=10
        }

        walkLoop[id]=setInterval(function(wachtrijInstructies){
            instructie = wachtrijInstructies[0]
            if (mensenDICT[nummerID-1]==undefined){
                mensenDICT[nummerID]["afstandLopen"]=wachtrijLengte-25
            }else{
                mensenDICT[nummerID]["afstandLopen"]=mensenDICT[nummerID-1]["afstandLopen"]-25
            }
            if(mensenDICT[nummerID]["afstandGelopen"]!=mensenDICT[nummerID]["afstandLopen"]){
                if(instructie[0]>0 && instructie[1]==0){
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
            mensenDICT[nummerID]["afstandGelopen"]+=1
        }
            

            if(instructie[0]==0 && instructie[1]==0){
                wachtrijInstructies.shift()

            }
            if (wachtrijInstructies.length==0){
                delete mensenDICT[nummerID]
                mensen.removeChild(naam)
                clearInterval(walkLoop[id])
            }



        },10,wachtrijInstructies)
    }

    document.getElementById("openAttractie").addEventListener("click",function(){
        console.log("wachtrijLengte=",wachtrijLengte,"Original=",realLengte)
        if(wachtrijLengte==realLengte+25){
            document.getElementById("openAttractie").innerHTML="Open Attractie"
            wachtrijLengte=realLengte
        }else{
            document.getElementById("openAttractie").innerHTML="Sluit Attractie"
            wachtrijLengte=realLengte+25
        }
    })



    // positielijst in de vorm [[x,y],[x,y]]
    function maakWachtrij(breedte,positieLijst){
    for (let index = 0; index < positieLijst.length-1; index++) {
            var posities=[positieLijst[index]].concat([positieLijst[index+1]]).sort(function(a,b){if(a[0]==b[0]){return a[1]-b[1]}else{return a[0]-b[0]}})
            var rij=document.createElement("div")
            rij.id=index
            function index1of2(a,b){
                a=positieLijst[index]
                b=positieLijst[index+1]
                if(a[0]==b[0]){return 1}else{return 0}
            }
            if (positieLijst[index][0]>positieLijst[index+1][0]) {
                rij.style.left= posities[0][0]-5+40
            }else{
                rij.style.left= posities[0][0]-5//+(posities[1][0]==posities[0][0]? 0 : 10 )
            }
            
            if (positieLijst[index][1]>positieLijst[index+1][1]) {
                rij.style.top= posities[0][1]-10+40

            }else{
                rij.style.top= posities[0][1]-10//+(posities[1][0]==posities[0][0]? 10: 0 )
            }

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

}

TheGame()