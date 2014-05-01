

Parse.$ = jQuery;

// Initialize Parse with your Parse application javascript keys
Parse.initialize("rHbqdGAlsbn31Z7KdIHhQ2PruGDZksLyiLZcmzfj", "chxPoylXdw1snBbMJunz2IRnUK5pjHArRGBxgrEZ");
// Todo Model
// ----------
var search_func = function(){
  var search_input = $("#search_product").val();
  var GameScore = Parse.Object.extend("yhd_data");
  var query = new Parse.Query(GameScore);
  query.startsWith("brandName", search_input);
  query.find({
    success: function(results) {
      /*
      alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        alert(object.id + ' - ' + object.get('brandName'));
      }*/
      if (results.length>0){
          img_url = results[0].get('newBrandLogoUrl');
          if (img_url===null){
            img_url="http://www.factslides.com/imgs/s-Apple.png";
          }
          $("#search_result_img").attr("src",img_url);
          $("#search_result_a").attr("href",img_url);
          $("#search_result_h3").text(results[0].get('brandName')+'\n'+results[0].get('companyName')+'\n'+results[0].get('provinceCnName'));
      }
      else{
          $("#search_result_img").attr("src","http://www.factslides.com/imgs/s-Apple.png");
          $("#search_result_h3").text("查询不到");
          alert("查询不到");
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
};
