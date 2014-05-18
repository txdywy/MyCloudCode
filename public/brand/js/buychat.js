

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
      var user_pic = ["http://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Captain-America-icon.png",
                      "http://files.gamebanana.com/img/ico/sprays/iron_man_3.png",
                      "http://files.gamebanana.com/img/ico/sprays/sin_ttulo-1psdpng.gif",
                      "http://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Batman-icon.png",
                      "http://i587.photobucket.com/albums/ss315/phatinium/Miscellaneous/spiderman.png",
                      "http://files.gamebanana.com/img/ico/sprays/flash_2.png"
                     ];


      default_img_url = user_pic[Math.floor((Math.random() * 10)+1)%6];
      if (results.length>0){
          img_url = results[0].get('newBrandLogoUrl');
          if (img_url===null){
            img_url=default_img_url;
          }
          $("#search_result_img").attr("src",img_url);
          $("#popupSearchResultImg").attr("src",img_url);
          //$("#search_result_a").attr("href",img_url);
          $("#search_result_h3").text(results[0].get('brandName')+'\n'+results[0].get('companyName')+'\n'+results[0].get('provinceCnName'));
      }
      else{
          $("#search_result_img").attr("src",default_img_url);
          $("#popupSearchResultImg").attr("src",default_img_url);
          $("#search_result_h3").text("查询不到");
          //alert("查询不到");
      }
      $.mobile.loading( "hide" );
    },
    error: function(error) {
      $.mobile.loading( "hide" );
      alert("Error: " + error.code + " " + error.message);
    }
  });
};

var logInBuyChat = function(e) {
  var self = this;
  var username = this.$("#login-username").val();
  var password = this.$("#login-password").val();
  
  Parse.User.logIn(username, password, {
    success: function(user) {
      //self.$("#login-form").submit();
      //alert("success");
      self.$("#login-form").submit();
      self.$.mobile.loading( "hide" );
      self.$("#login-form").style.display = "block";
    },

    error: function(user, error) {
      self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
      self.$.mobile.loading( "hide" );
      //alert('Invalid user or password');
    }
  });
  //this.$(".login-form button").attr("disabled", "disabled");
  self.$.mobile.loading( "hide" );
  return false;
};

var signUpBuyChat = function(e) {
  var self = this;
  var username = this.$("#signup-username").val();
  var password = this.$("#signup-password").val();
  
  Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
    success: function(user) {
      //delete self;
      self.$("#signup-form").submit();
      self.$.mobile.loading( "hide" );
      self.$("#signup-form").style.display = "block";
    },

    error: function(user, error) {
      self.$(".signup-form .error").html(error.message).show();
      self.$.mobile.loading( "hide" );
      //this.$(".signup-form button").removeAttr("disabled");
    }
  });

  //this.$(".signup-form button").attr("disabled", "disabled");
  self.$.mobile.loading( "hide" );
  return false;
};

var logOutBuyChat = function(e) {
  Parse.User.logOut();
};

$( document ).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
})
.on( "click", ".hide-page-loading-msg", function() {
    $.mobile.loading( "hide" );
});