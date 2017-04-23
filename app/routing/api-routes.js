// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var data = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(data);
  });


  app.post("/api/friends", function(req, res) {
    //this is what will be displayed on the page
    var display = {
      name: "",
      photo: "",
      diff: 1000
    };

    var userData = req.body.scores;
    var differenceNum = 0;

      console.log(req.body.scores);
       console.log(data);

       //Loops through friends list
      for (var i = 0; i < data.length; i++) {
        differenceNum = 0;
        for (var x = 0; x < data[i].scores.length; x++) {

        differenceNum += Math.abs(parseInt(userData[x]) - parseInt(data[i].scores[x]));
        console.log(differenceNum);
        }

       if (differenceNum <= display.diff) {
            display.name = data[i].name,
            display.photo = data[i].photo,
            display.diff = differenceNum;
          }

       }
       console.log(display);
      data.push(req.body);

      return res.json(display);

  });


};//end