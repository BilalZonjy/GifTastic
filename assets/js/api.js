function search_and_display(userInput){
      userInput = userInput.replace(/ /g, "+");
      var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + userInput + '&api_key=dc6zaTOxFJmzC&limit=10';
      $.ajax({url: queryURL, method: 'GET'}).done(function(response){
              $('.giphy_image').remove()
              for(i in  response.data){                
              var giphyURL_still = response.data[i].images.fixed_height_small_still.url;
              var giphyURL = response.data[i].images.fixed_height_small.url
              var gif_image = $("<img class='giphy_image'>");
              gif_image.attr("src", giphyURL_still);
              gif_image.attr("alt", "giphy image");
              gif_image.attr("data-still", giphyURL_still);
              gif_image.attr("data-animate", giphyURL);
              gif_image.attr("data-state","still");
              gif_image.css("margin-left",'20px');
              gif_image.css("margin-top",'20px');
              $("#images").prepend(gif_image);
              $(".gif-form").trigger("reset");
              
            }
            });
       }  

$('.search_button').on('click', function(event){
      event.preventDefault();
      var userInput = $('#form-value').val().trim();
      var btn = $('<button>');
      btn.addClass("btn");
      btn.addClass("btn-success");
      btn.addClass("btn-lg ");
      btn.addClass('history_btn');
      btn.attr("data-search_term", userInput);
      btn.text(userInput);
      $("#history").prepend(btn);
      search_and_display(userInput);
      });

$(document).on("click", ".giphy_image", function() {

        if ($(this).attr("data-state") == "still"){
            $(this).attr('src',$(this).attr("data-animate"));
            $(this).attr('data-state','active');

          }else{
            $(this).attr('src',$(this).attr("data-still"));
            $(this).attr('data-state','still');
          }
      });


$(document).on("click", ".history_btn", function() {

      var userInput =$(this).attr('data-search_term').trim();
      search_and_display(userInput);
      });
