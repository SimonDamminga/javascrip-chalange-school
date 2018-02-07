function calculateResult(results){
    var Ueens = 0;
    var Unone = 0;
    var Uoneens = 0;
    results.forEach(item => {
        if(item.value == "eens"){
            Ueens++;
        }else if(item.value == "geen van beide"){
            Unone++;
        }else if(item.value == "oneens"){
            Uoneens++;
        }
    });

    console.log(Ueens + " " + Unone + " " + Uoneens);
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
    calculateResult(results);

    var elem = element("div", [
        element("button", text("Terug"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "back()")]),
        element("h4", text("Bekijk je resultaten"), [attribute("class", "w3-container")]),        
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
        element("button", [text("Bekijk resultaten")], [attribute("class", "w3-button w3-hover-blue")])
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
        element("button", text("Eens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('eens', "+ indexn +")")]),
        element("button", text("Geen van beide"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('geen van beide', "+ indexn +")")]),
        element("button", text("Oneens"), [attribute("class", "w3-button w3-hover-blue"), attribute("onclick", "next('oneens', "+ indexn +")")]),
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