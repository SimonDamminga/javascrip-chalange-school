

function onInit(){
    parties.forEach(partie => {
        points.push({n: partie.name, p: 0});
    });
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
}

function toggleBigParties(){
    bigParties = !bigParties;
}

onInit();