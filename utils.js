var curQ = -1;
var results = [];
var heavyCount = false;
var points = [];

var title = document.getElementById("title");
var questionText = document.getElementById("main-text");
var pBarProgress = document.getElementById("p-bar-progress");
var pBar = document.getElementById("p-bar");

var button = document.getElementById("button-start");
var agreeBtn = document.getElementById("button-agree");
var noneBtn = document.getElementById("button-none");
var disagreeBtn = document.getElementById("button-disagree");
var backBtn = document.getElementById("button-back");
var skip = document.getElementById("button-skip");
var filterOne = document.getElementById("filter-1");
var filterTwo = document.getElementById("filter-2");
var chbxOne = document.getElementById("exampleCheck1");
var chbxTwo = document.getElementById("exampleCheck2");
var heavyChbx = document.getElementById("heavy");
var chbx = document.getElementById("ckbx-div");
var resultBtn = document.getElementById("button-result");
var otherThougths = document.getElementById("button-parties");

button.setAttribute("onclick", "start()");
backBtn.setAttribute("onclick", "preQ()"); 
resultBtn.setAttribute("onclick", "viewResult()");

function allValuesSame(points) {

    for(var i = 1; i < points.length; i++)
    {
        if(points[i].p !== points[0].p)
            return false;
    }

    return true;
}

function buttons(){
    button.style.display = "none";
    agreeBtn.style.display = "inline-block";
    noneBtn.style.display = "inline-block";
    disagreeBtn.style.display = "inline-block";
    backBtn.style.display = "inline-block";
    skip.style.display = "inline-block";
    otherThougths.style.display = "inline-block";
    chbx.style.display = "block";
    pBar.style.display = "block";    
}

function createStartPage(){
    button.style.display = "inline-block";
    agreeBtn.style.display = "none";
    noneBtn.style.display = "none";
    disagreeBtn.style.display = "none";
    backBtn.style.display = "none";
    skip.style.display = "none"
    pBar.style.display = "none";
    chbx.style.display = "none";
    otherThougths.style.display = "none";


    title.innerHTML = "Stemwijzer";
    questionText.innerHTML = "Test uw politieke voorkeur aan de hand van 30 stellingen";
}

function createReviewPage(){
    title.innerHTML = "Bekijk je resultaten";
    questionText.innerHTML = "Gebruik de filters om je uitkomst te beinvloeden";
    filterOne.style.display = "block";
    filterTwo.style.display = "block";
    chbx.style.display = "none";
    resultBtn.style.display = "inline-block";
    otherThougths.style.display = "none";

    hideButtons();
}

function setButtons(q){
    agreeBtn.setAttribute("onclick", `nextQ(${q}, 'pro')`);
    disagreeBtn.setAttribute("onclick", `nextQ(${q}, 'contra')`);
    noneBtn.setAttribute("onclick", `nextQ(${q}, 'ambivalent')`);  
    skip.setAttribute("onclick", `nextQ(${q}, "skipped")`);
    heavyChbx.checked = false;
    heavyCount = false;

    heavyChbx.setAttribute("onclick", "heavyToggleCheck()");
}

function createPage(index){
    title.innerHTML = subjects[index].title;
    questionText.innerHTML = subjects[index].statement;
}

function hideButtons(){
    agreeBtn.style.display = "none";
    noneBtn.style.display = "none";
    disagreeBtn.style.display = "none";
    backBtn.style.display = "none";
    skip.style.display = "none";   
}