var content = document.querySelector("section.content-area-white")
content.insertAdjacentHTML("beforeBegin", "<div class='utm-links'><h2>UTM Links</h2><small>( edit )</small><ul></ul></div>")
var links = document.querySelector('.utm-links ul')
var sm = document.querySelector(".utm-links small")
sm.addEventListener("click", function(){
  var optionsUrl = chrome.extension.getURL('options.html');
  window.open( optionsUrl)
})
chrome.storage.sync.get({
  utmdata: []
}, function(items) {
  items.utmdata.forEach(function(f){
    console.log(f)
    var a = document.createElement("a")
    var li = document.createElement("li")
    a.innerHTML = f.source
    a.href = "?utm_medium="+f.medium+"&utm_source="+f.source+"&utm_campaign=" + f.campaign
    li.appendChild(a)
    links.appendChild(li)
  })
});
