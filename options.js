var forms = document.querySelector(".forms")
var notice = document.querySelector(".alert")
function save_options() {
  var forms = document.querySelectorAll("form")
  var formData = []
  for(var i = 0; i < forms.length; i++){
    var form = forms[i];
    var medium = form.querySelector("[name='medium']").value
    var source = form.querySelector("[name='source']").value
    var campaign = form.querySelector("[name='campaign']").value
    formData.push({
      medium: medium,
      source: source,
      campaign: campaign
    })
  }
  chrome.storage.sync.set({
    utmdata: formData
  }, function(){
    notice.style.display = "block"
    setTimeout(function(){
      notice.style.display = "none"
    },2000)
  })
}

function restore_options() {
  chrome.storage.sync.get({
    utmdata: []
  }, function(items) {
    if(items.utmdata.length){
      forms.innerHTML = ""
    }
    items.utmdata.forEach(function(f){
      forms.appendChild(addForm(f))
    })
  });
}

function addForm(f){
  var form = document.createElement("form")
  var del = document.createElement("a")
  del.innerHTML = "&times;"
  del.className = 'btn btn-danger btn-sm'
  del.href = "#"
  del.addEventListener("click", function(e){
    e.preventDefault()
    forms.removeChild(this.parentNode)
  })
  form.innerHTML += "<div><label>Medium</label> <input type='text' name='medium' value='"+f.medium+"'></div>"
  form.innerHTML += "<div><label>Source</label> <input type='text' name='source' value='"+f.source+"'></div>"
  form.innerHTML += "<div><label>Campaign</label> <input type='text' name='campaign' value='"+f.campaign+"'></div>"
  form.appendChild(del)
  return form
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options)
document.getElementById('new').addEventListener('click', function(){
  forms.appendChild(addForm({
    medium:"",
    source:"",
    campaign:""
  }))
});


