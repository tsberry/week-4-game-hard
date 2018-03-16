function Character(name, hp, attack, counter, img, id) {
    this.charName = name;
    this.healthPoints = hp;
    this.attackPower = attack;
    this.counterPower = counter;
    this.image = img;
    this.charId = id;
    this.display = function () {
        var charBox = $("<div class=\"charBox\" id=\"" + this.charId + "\">");
        charBox.append("<div>" + this.charName + "</div>");
        charBox.append("<img style=\"height:100px; width:200px\" src=\"assets/images/" + this.image + "\">");
        charBox.append("<div>" + this.healthPoints + "</div");
        return charBox;
    };
}

var obi = new Character("Obi-wan Kenobi", 100, 6, 12, "obi.jpg", "obi");
var luke = new Character("Luke Skywalker", 120, 5, 10, "luke.jpg", "luke");
var sidious = new Character("Darth Sidious", 160, 3, 6, "sidious.jpg", "sidious");
var maul = new Character("Darth Maul", 140, 4, 8, "maul.jpeg", "maul");

function select(id) {
    if(id === "obi") return obi;
    if(id === "luke") return luke;
    if(id === "sidious") return sidious;
    if(id === "maul") return maul;
}

function start() {
    $("#start-area").append(obi.display());
    $("#start-area").append(luke.display());
    $("#start-area").append(sidious.display());
    $("#start-area").append(maul.display());
}

start();
$(".charBox").on("click", function () {
    var char = select($(this).attr("id"));
    // console.log(char.charName);
    $("#character-area").append(char.display());
});