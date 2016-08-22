function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
addJQuery(function(){
function eventInfo(url, $error, callback){
  $o = $("<div />").hide()
  $("body").append($o)

  $o.load("https://accesscontrolalloworiginall.herokuapp.com/" + url + " .content-area-white", function(resp){
    try{
    var address = ""
    var add = $o.find(".campus-address").html().replace(/\n/g, '')
    var city = $o.find(".campus-city").html().replace(/\n/g, '')
    var state = $o.find(".address-region").html().replace(/\n/g, '')
    var zip = $o.find(".postal-code").html().replace(/\n/g, '')
    var times = $o.find(".datetime_details").find(".cw_start_and_end_time_details")
    var out = {}
    out.values = {
      title: $o.find("h1[itemprop='name']").html(),
      location: $o.find(".campus-name").html(),
      category: 'Lectures, Seminars, and Workshops',
      address: add,
      city: city,
      state: state,
      zip: zip,
      phone: "(202) 517-1777",
      linkurl: url,
      starttime: times[0].innerHTML,
      endtime: times[1].innerHTML,
      email:'dc@ga.co',
      description: $o.find(".hide-over-720").siblings(":not(header)").map(function(e,i){
        return $(this).html()
      }).get().join(""),
      recurrence: 'One Day',
    }
    out.dropDowns = {
      eventtypeid: '1',
      listingID: '15948',
      categories: '101',
      udf_386: '1702',
      recurType: '0'
    }
    callback(out)
    } catch (e) {
      console.log(e.stack)
      alert("Something went wrong")
      $error.remove()
    }
  })
}
  $("h1.pagehead").append("<input class='js-from-url' placeholder='Enter URL'>")
  var $input = $("h1.pagehead").find(".js-from-url")
  var $loading = $("<div>Loading...</div>")
  $input.on("keyup", function(event){
    if(event.keyCode === 13){
      $input.after($loading)
      var interval = setInterval(function(){
        $loading.html(function(){
          return $(this).html() + "."
        })
      }, 1000)
      eventInfo($input.val(), $loading, function(event){
	clearInterval(interval)
	$loading.remove()
	e = event
	console.log(event)
	for (var value in event.values){
	  $("#"+value).val(event.values[value])
	}
	for (var dropDown in event.dropDowns){
	  $("#"+dropDown).val(event.dropDowns[dropDown])
	}
	tinyMCE.activeEditor.setContent(event.values.description)
      })
    }
  })
})
