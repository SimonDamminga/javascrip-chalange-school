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
        element("h4", text("Klik op start om te beginnen"), [attribute("class", "w3-container")]),
        element("p", text("Test uw politieke voorkeur aan de hand van 30 stellingen"), [attribute("class", "w3-container")]),
        element("button", text("Start"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next()")])
    ], [attribute("class", "w3-card-4 custom-card")]);


    page.appendChild(elem);
}

function createReviewPage(results){
    clearPage();

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h4", text("Bekijk je resultaten"), [attribute("class", "w3-container")]),
    ], [attribute("class", "w3-card-4 custom-card")]);

    results.forEach(result => {
       var resultsText = element("p", text("vraag: " + result.question + ", resultaat: " + result.value), [attribute("class", "w3-container")]);
       var goToQuestionButton = element("button", [text("ga naar vraag: " + result.question)], [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "createQuestionPage(" + (result.question - 1) + ")")])
       elem.appendChild(goToQuestionButton);
       elem.appendChild(resultsText);
    });
    

    page.appendChild(elem);
}

function createQuestionPage(index){
    clearPage();

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h2", text(subjects[index].title), [attribute("class", "w3-container")]),
        element("p", text(subjects[index].statement), [attribute("class", "w3-container")]),
        element("button", text("Eens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('eens', "+ index +")")]),
        element("button", text("Geen van beide"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('geen van beide', "+ index +")")]),
        element("button", text("Oneens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('oneens', "+ index +")")]),
        element("button", text("Overslaan"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('unanswered', "+ index +")")]),


    ], [attribute("class", "w3-card-4 custom-card")])
    var pariesThink = element("div", [], [attribute("class", "parties-div")]);
    var pro = element("div", [element("h1", text("Voor"))], [attribute("class", "w3-card-4 custom-two")]);
    var ambivalent = element("div", [element("h1", text("Geen van beide"))], [attribute("class", "w3-card-4 custom-two")]);
    var contra = element("div", [element("h1", text("Tegen"))], [attribute("class", "w3-card-4 custom-two")]);

    subjects[index].parties.forEach(parie => {
        if(parie.position == "pro"){
            pro.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))
        }else if(parie.position == "ambivalent"){
            ambivalent.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))          
        }else{
            contra.appendChild(element("div", [
                element("h4", text(parie.name)),
                element("p", text(parie.explanation))
            ], []))
        }
    });
    pariesThink.appendChild(pro);
    pariesThink.appendChild(ambivalent);
    pariesThink.appendChild(contra);
    elem.appendChild(pariesThink);
    page.appendChild(elem);
}

function next(value, question){
    var q;
    if(question == undefined){q = 0;}
    else{q = question + 1}
    
    if(value != undefined){
        results[q] = {question: q, value: value};   
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

onInit();