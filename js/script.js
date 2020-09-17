const link = "https://spreadsheets.google.com/feeds/list/1wKdqch4zf6crJaZByvRmcqAgR_kExDn8XKg1mpTeKCE/od6/public/values?alt=json";

window.addEventListener("DOMContentLoaded", getData);

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
        document.querySelector("#adoptParagraph").textContent = singleRowData.gsx$longdesc.$t;
    }
}
