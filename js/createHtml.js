function calculateResult(results){
    results.forEach((item, index) => {
        subjects[index].parties.forEach(par => {
            if(par.position == item.value){
                points.forEach(point => {
                    if(point.n == par.name){
                        point.p++;
                    }
                });
            }
        });
    });

    if(secuParties == true){
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

    if(bigParties == true){
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

    var res = points.sort(function(a, b){
        return parseFloat(b.p) - parseFloat(a.p);
    });

    return res;
}

function createResultPage(){
    var res = calculateResult(results);
    console.log(res)

    clearPage();

    var elem = element("div", [
        element("h4", text("resultaten")),
    ], [attribute("class", "w3-card-4 custom-card")]);

    res.forEach((result, index) => {
        if(result.p > 0){
            elem.appendChild(element("p", text((index+1) + ": " + result.n)))
        }
    });

    page.appendChild(elem);
}

function createHomePage(){        
    clearPage();

    var elem = element("div", [
        element("h4", text("Klik op start om te beginnen"), [attribute("class", "w3-container")]),
        element("p", text("Test uw politieke voorkeur aan de hand van 30 stellingen"), [attribute("class", "w3-container")]),
        element("button", text("Start"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next()")]),

    ], [attribute("class", "w3-card-4 custom-card")]);


    page.appendChild(elem);
}


function createReviewPage(results){
    clearPage();


    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h4", text("Deze vragen zijn wel/niet beantwoord"), [attribute("class", "w3-container")]),        
    ], [attribute("class", "w3-card-4 custom-card")]);

    results.forEach(result => {
        if(result.value == "unanswered"){
            var goToQuestionButton = element("button", [text(result.question)], [attribute("class", "w3-button w3-red w3-hover-blue custom"), attribute("onclick", "createQuestionPage(" + (result.question - 1) + ")")])
        }else{
            var goToQuestionButton = element("button", [text(result.question)], [attribute("class", "w3-button w3-green w3-hover-blue custom"), attribute("onclick", "createQuestionPage(" + (result.question - 1) + ")")])
        }
        
        elem.appendChild(goToQuestionButton);
    });

    var checkboxes = element("div", []);

    if(secuParties == true){
        checkboxes.appendChild(element("br"))
        checkboxes.appendChild(element("p", text("Alleen seculieren partijen"), [attribute("class", "chooseSecu"), ]))
        checkboxes.appendChild(element("input", [], [attribute("type", "checkbox"), attribute("onchange", "toggleSecuParties()"), attribute("checked")]))
        checkboxes.appendChild(element("br"))
    }else{
        checkboxes.appendChild(element("br"))
        checkboxes.appendChild(element("p", text("Alleen seculieren partijen"), [attribute("class", "chooseSecu"), ]))
        checkboxes.appendChild(element("input", [], [attribute("type", "checkbox"), attribute("onchange", "toggleSecuParties()")]))
        checkboxes.appendChild(element("br"))       
    }

    if(bigParties == true){
        checkboxes.appendChild(element("br"))
        checkboxes.appendChild(element("p", text("Alleen grote partijen"), [attribute("class", "chooseSecu"), ]))
        checkboxes.appendChild(element("input", [], [attribute("type", "checkbox"), attribute("onchange", "toggleBigParties()"), attribute("checked")]))
        checkboxes.appendChild(element("br"))
    }else{
        checkboxes.appendChild(element("br"))
        checkboxes.appendChild(element("p", text("Alleen grote partijen"), [attribute("class", "chooseSecu"), ]))
        checkboxes.appendChild(element("input", [], [attribute("type", "checkbox"), attribute("onchange", "toggleBigParties()")]))
        checkboxes.appendChild(element("br"))       
    }

    elem.appendChild(element("div", [
        checkboxes,
        element("button", [text("Bekijk resultaten")], [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", `createResultPage()`)])
    ]))

    page.appendChild(elem);
}

function createQuestionPage(indexn){
    index = indexn;
    clearPage();

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h2", text(subjects[indexn].title), [attribute("class", "w3-container")]),
        element("p", text(subjects[indexn].statement), [attribute("class", "w3-container")]),
        element("button", text("Eens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('pro', "+ indexn +")")]),
        element("button", text("Geen van beide"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('ambivalent', "+ indexn +")")]),
        element("button", text("Oneens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('contra', "+ indexn +")")]),
        element("button", text("Overslaan"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('unanswered', "+ indexn +")")]),


    ], [attribute("class", "w3-card-4 custom-card")])
    var pariesThink = element("div", [], [attribute("class", "parties-div")]);
    var pro = element("div", [element("h1", text("Voor"))], [attribute("class", "w3-card-4 custom-two")]);
    var ambivalent = element("div", [element("h1", text("Geen van beide"))], [attribute("class", "w3-card-4 custom-two")]);
    var contra = element("div", [element("h1", text("Tegen"))], [attribute("class", "w3-card-4 custom-two")]);
    

    subjects[indexn].parties.forEach(parie => {
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