let newsAccordion = document.getElementById("newsAccordion");
apiKey = '080288315496c75b31c51fc7fb1fb900&lang=en';
lang = "en";
const xhr = new XMLHttpRequest()
xhr.open('GET', `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=${lang}&country=in`, true)

xhr.onprogress = function () {
    console.log("In progress")
    newsAccordion.innerHTML = `<h3>LOADING...</h3><img src="https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-10.gif" alt="LOADING...." style="width:120px;height:150px";>`;
}
// What to do when response is ready
xhr.onload = function () {
    console.log("Progress Done")
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        console.log(json)
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            // console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index + 1}:</b> ${element["title"]}
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()

setInterval(displayClock, 500)
function displayClock() {
    // var d = new Date()
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";

    if (hrs == 0) hrs = 12;
    if (hrs > 12) {
        hrs = hrs - 12;
        period = "PM";
    }

    hrs = hrs < 10 ? `0${hrs}` : hrs;
    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    let time = `${hrs}:${mins}:${secs} ${period}`;
    document.getElementById("date").innerText = time

}
