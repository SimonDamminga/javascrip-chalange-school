function onInit(){
    createHomePage();
}

function clearPage(){
    page.innerHTML = "";  
}


function next(value, question){
    var q;
    if(question == undefined){q = 0;}
    else{q = question + 1}
    
    if(value != undefined){
        results[question] = {question: q, value: value};   
    }
    
    if(q < subjects.length){
        index++;
        createQuestionPage(index); 
    }else{
        index++;
        createReviewPage(results);
    }
}

function back(){
    index--;
    if(index == -1){
        createHomePage();
    }else{
        createQuestionPage(index);        
    }

}

function toggleSecuParties(){
    secuParties = !secuParties;
    console.log(chosenParties);
    if(secuParties == true){
        if(chosenParties.length == 0){
            parties.forEach(partie => {
                if(partie.secular == true){
                    chosenParties.push(partie);
                }
            });
        }else{
            chosenParties.forEach((partie, index)=> {
                if(partie.secular == false){
                    chosenParties.splice(index, 1);
                }
            });
        }
    }else{
        chosenParties = allParties;
        if(bigParties == true){
            chosenParties = allParties;
            chosenParties.forEach(() => {
                chosenParties.forEach((partie, index) => {
                    if(partie.size < 10){
                        chosenParties.splice(index, 1);
                    }
                });
            });
        }
    }
    console.log(chosenParties);
}

function toggleBigParties(){
    bigParties = !bigParties;
    console.log(chosenParties);
    if(bigParties == true){
        if(chosenParties.length == 0){
            parties.forEach((partie) => {
                if(partie.size > 10){
                    chosenParties.push(partie);
                }
            });
            console.log(parties);
        }else{
            chosenParties.forEach(() => {
                chosenParties.forEach((partie, index) => {
                    if(partie.size < 10){
                        chosenParties.splice(index, 1);
                    }
                });
            });
        }
    }else{
        chosenParties = parties;
        console.log(chosenParties);
        if(secuParties == true){
            chosenParties.forEach((partie, index)=> {
                if(partie.secular == false){
                    chosenParties.splice(index, 1);
                }
            });
        }
    }
}

onInit();