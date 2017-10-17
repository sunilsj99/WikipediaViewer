$(document).ready( function() {
    
   $('#searchForm').on('submit', function(e) {
       $('#result').empty();
       e.preventDefault();
       var search = $('#searchQuery').val();
       $.ajax({
        url:    "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + search + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",
        success: function(data){
           if(data.query.searchinfo.totalhits !== 0) {
               var title = [];
               var desc = [];
               for(var i = 0; i < data.continue.sroffset ; i++) {
                  title.push(data.query.search[i].title);
                  desc.push(data.query.search[i].snippet);
                  var wiki = '<div class="jumbotron" id="box"><div class="box-title"><a href="https://en.wikipedia.org/wiki/'+title[i]+'" target = "_blank">'+ title[i] + '</a></div><div class="box-description">'+ desc[i] +'...</div></div>';
                  $('#result').append(wiki);
              }
           }
        }
    });
   });
});