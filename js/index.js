var page = document.getElementById("main");
var index = -1;
results = [];

function onInit(){
    createHomePage();
}

function clearPage(){
    page.innerHTML = "";  
}

function createHomePage(){        
    clearPage();

    var elem = element("div", [
        element("h4", text("Klik op start om te beginnen")),
        element("p", text("Test uw politieke voorkeur aan de hand van 30 stellingen")),
        element("button", text("Start"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next()")])
    ], [attribute("class", "w3-container w3-light-grey")]);


    page.appendChild(elem);
}

function createQuestionPage(index){
    clearPage();

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h2", text(subjects[index].title)),
        element("p", text(subjects[index].statement)),
        element("button", text("Eens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('eens', index)")]),
        element("button", text("Geen van beide"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('geen van beide', index)")]),
        element("button", text("Oneens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('oneens', index)")]),
        element("button", text("Overslaan"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('unanswered', index)")])
    ], [attribute("class", "w3-container w3-light-grey")])

    page.appendChild(elem);
}

function next(value, question){
    var q;
    if(question == undefined){q = 0;}
    else{q = question + 1}
    
    if(value != undefined){
       results.push({question: q, value: value}) 
    }
    
    if(q < subjects.length){
        index++;
        createQuestionPage(index); 
    }else{
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

onInit();