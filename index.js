
function setWidth(q){
    var prec = (q / subjects.length * 100);
    return prec;
}

function start(){
    buttons();
    nextQ();
}

function heavyToggleCheck(){
    heavyCount = !heavyCount;
}

function nextQ(question, value){
    if(value != undefined) results[question] = {qn: question+1, ans: value, mv: heavyCount};

    curQ++;

    if(curQ < subjects.length){
        createPage(curQ);       
        setButtons(curQ);
    }else{
        createReviewPage();
    }

    pBarProgress.style.width = setWidth(curQ) + "%";
}

function preQ(){
    curQ--;

    if(curQ == -1){
        createStartPage();
    }else{
        pBarProgress.style.width = setWidth(curQ) + "%";
        createPage(curQ);       
        setButtons(curQ);         
    }
}

function viewResult(){
    parties.forEach(partie => {
        points.push({n: partie.name, p: 0});
    });

    results.forEach((item, index) => {
        if(item.mv == false){
            subjects[index].parties.forEach(par => {
                if(par.position == item.ans){
                    points.forEach(point => {
                        if(point.n == par.name){
                            point.p++;
                        }
                    });
                }
            });
        }else{
            subjects[index].parties.forEach(par => {
                if(par.position == item.ans){
                    points.forEach(point => {
                        if(point.n == par.name){
                            point.p+=3;
                        }
                    });
                }
            });           
        }
    });

    if(chbxTwo.checked == true){
        parties.forEach(partie => {
            if(partie.secular == false){
                points.forEach((point, index) => {
                    if(point.n == partie.name){
                        points.splice(index, 1);
                    }
                });
            }
        });
    }

    if(chbxOne.checked == true){
        parties.forEach(partie => {
            if(partie.size < 10){
                points.forEach((point, index) => {
                    if(point.n == partie.name){
                        points.splice(index, 1);
                    }
                });
            }
        });
    }

    points = points.sort(function(a, b){
        return parseFloat(b.p) - parseFloat(a.p);
    });

    console.log(points);

    var allSame = allValuesSame(points);
    console.log(allSame)

    if(allSame == true){
        var nameElem = document.createElement("li");
        document.getElementById("results").style.listStyleType = "none";
        var text = document.createTextNode("Er zijn geen matches");
        nameElem.appendChild(text);   
        document.getElementById("results").appendChild(nameElem);    
    }else{
        points.forEach(point => {
            var nameElem = document.createElement("li");
            var text = document.createTextNode(point.n);
            nameElem.appendChild(text);
            document.getElementById("results").appendChild(nameElem);        
        });  
    }

    
    

    resultBtn.style.display = "none";
    pBar.style.display = "none";
    filterOne.style.display = "none";
    filterTwo.style.display = "none";
    questionText.innerHTML = "Dit zijn je resultaten:";
}