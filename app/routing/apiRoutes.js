
var api = function() {

    this.jsonFriends = function(app, friends) {

            app.get("/api/friends", function(req, res) {
                res.json(friends);
            });
        },

        this.postUser = function(app, friends) {

            app.post("/api/friends", function(req, res) {

                var newUser = req.body;
                var index = 0;
                var diffsArray = [];

                while (index < friends.length) {

                    var totalDifference = 0;
                    for (var i = 0; i < newUser.scores.length; i++) {
                        totalDifference += Math.abs(parseInt(friends[index].scores[i]) - parseInt(newUser.scores[i]));
                    }

                    diffsArray.push(totalDifference);
                    index++;
                }

                var lowest = diffsArray[0];

                for (var i = 0; i < diffsArray.length; i++) {
                    if (diffsArray[i] < lowest) {
                        lowest = diffsArray[i];
                    }
                }

                var bestMatch = diffsArray.indexOf(lowest);
                res.send(friends[bestMatch]);
                
                friends.push(newUser);
            });
        };
}

module.exports = api;
