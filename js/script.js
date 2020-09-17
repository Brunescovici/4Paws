const link = "https://spreadsheets.google.com/feeds/list/1wKdqch4zf6crJaZByvRmcqAgR_kExDn8XKg1mpTeKCE/od6/public/values?alt=json";

window.addEventListener("DOMContentLoaded", getData);

let close = 1;

function getData() {
    fetch(link)
        .then(res => res.json())
        .then(handleData);
}

function handleData(data) {
    const myData = data.feed.entry;
    console.log("myDATA: ");
    console.log(myData);
    myData.forEach(showData);
    ready();
}



function showData(singleRowData) {
    console.log("singleROWDATA");
    console.log(singleRowData.gsx$id.$t);
    if(singleRowData.gsx$id.$t == 1) {
        document.querySelector("#about4Paws>h1").textContent = singleRowData.gsx$shortdesc.$t;
        document.querySelector("#aboutParagraph").textContent = singleRowData.gsx$longdesc.$t;
    }

    else if(singleRowData.gsx$id.$t == 2) {
        document.querySelector("#adoptWithUs h1").textContent = singleRowData.gsx$shortdesc.$t;
        document.querySelector("#adoptParagraph").innerHTML = singleRowData.gsx$longdesc.$t;
        document.querySelector("#adoptWithUs img").src = "assets/" + singleRowData.gsx$imgsource.$t + ".jpg";
    }

    else if(singleRowData.gsx$id.$t == 3) {
        document.querySelector("#volunteerWithUs h1").textContent = singleRowData.gsx$shortdesc.$t;
        document.querySelector("#volunteerParagraph").innerHTML = singleRowData.gsx$longdesc.$t;
        document.querySelector("#volunteerWithUs img").src = "assets/" + singleRowData.gsx$imgsource.$t + ".jpg";
    }
    else if(singleRowData.gsx$category.$t == "shelter") {
        const myTemplate = document.querySelector("#shelterTemplate").content;
        const shelterClone = myTemplate.cloneNode(true);
        shelterClone.querySelector("h1").textContent = singleRowData.gsx$name.$t;
        shelterClone.querySelector("img").src = "assets/" + singleRowData.gsx$imgsource.$t + ".jpg";
        shelterClone.querySelector(".description").textContent = singleRowData.gsx$longdesc.$t;
        const parent = document.querySelector("#sheltersContainer");
        parent.appendChild(shelterClone);
    }
}

function ready() {
    document.querySelectorAll('.shelter').forEach(item => {
            item.addEventListener('click', selectShelter);
        })
    document.querySelector("#selectedShelter>button").addEventListener('click', showPets);
    document.querySelector(".modalContent").addEventListener('click', dontClose);
    document.querySelector(".modalBackground").addEventListener('click', closeModal);
    document.querySelector("#pet1").addEventListener('click', openModal);
    document.querySelector("#pet2").addEventListener('click', openModal);
    document.querySelector("#pet3").addEventListener('click', openModal);
    document.querySelector("#pet4").addEventListener('click', openModal);
}

function dontClose() {
    close = 0;
}

function showPets() {
    document.querySelector("#selectedShelter>button").style.display = "none";
    document.querySelector("#pets").style.display = "flex";
}

function openModal() {
    document.querySelector(".modalBackground").style.display = "block";
    document.querySelector(".modalImg").src = this.src;
}

function closeModal() {
    if(close)
        document.querySelector(".modalBackground").style.display = "none";
    else
        close=1;
}

function selectShelter() {

    let i = 1;

    fetch(link)
        .then(res => res.json())
        .then(handleData2);
    const name = this.querySelector("h1").textContent;
    function handleData2(data) {
        const myData = data.feed.entry;
        myData.forEach(setPets);
    }

    function setPets(oneRowData) {
        if(oneRowData.gsx$value.$t == name)
            {
                document.querySelector("#pet"+i).src = "assets/" + oneRowData.gsx$imgsource.$t + ".jpg";
                i++;
            }
    }

    document.querySelector("#selectedShelter").style.display = "none";
    document.querySelector("#pets").style.display="none";
    document.querySelector("#selectedShelter").classList.remove("zoomIn_anim");
    document.querySelector("#selectedShelter>p").classList.remove("fadeIn_anim");
    document.querySelector("#selectedShelter>img").classList.remove("fadeIn_anim");
    document.querySelector("#selectedShelter>button").classList.remove("fadeIn_anim");
    document.querySelector("#selectedShelter>p").style.display = "none";
    document.querySelector("#selectedShelter>button").style.display = "none";
    setTimeout(function() {
            document.querySelector("#selectedShelter").style.display = "flex";
            document.querySelector("#selectedShelter").classList.add("zoomIn_anim");
        }, 300)

    document.querySelector("#ourSheltersHeader").textContent = this.querySelector("h1").textContent;
    document.querySelector("#selectedShelter>img").src = this.querySelector("img").src;
    document.querySelector("#selectedShelter>p").textContent = this.querySelector(".description").textContent;
    document.querySelector("#selectedShelter>p").style.display = "block";
    document.querySelector("#selectedShelter>p").style.opacity = "0%";
    document.querySelector("#selectedShelter>img").style.opacity = "0%";
    document.querySelector("#selectedShelter>button").style.opacity = "0%";
    document.querySelector("#selectedShelter>button").style.display = "block";

    setTimeout(function() {
            document.querySelector("#selectedShelter>p").classList.add("fadeIn_anim");
            document.querySelector("#selectedShelter>img").classList.add("fadeIn_anim");
        }, 1400)
    setTimeout(function() {
            document.querySelector("#selectedShelter>p").style.opacity = "100%";
            document.querySelector("#selectedShelter>img").style.opacity = "100%";
    }, 1600)
    setTimeout(function() {
            document.querySelector("#selectedShelter>button").classList.add("fadeIn_anim");
    }, 1800)
    setTimeout(function() {
            document.querySelector("#selectedShelter>button").style.opacity = "100%";
    }, 2000)
    document.querySelectorAll('.shelter').forEach(item => {
        item.style.display = "grid";
    })
    this.style.display = "none";
    document.querySelector("#ourSheltersHeader").scrollIntoView();
}
