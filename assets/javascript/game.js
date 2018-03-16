var obi = new Character("Obi-wan Kenobi", 100, 6, 12, "obi.jpg", "obi");
var luke = new Character("Luke Skywalker", 120, 5, 10, "luke.jpg", "luke");
var sidious = new Character("Darth Sidious", 160, 3, 6, "sidious.jpg", "sidious");
var maul = new Character("Darth Maul", 140, 4, 8, "maul.jpeg", "maul");
var characters = [obi, luke, sidious, maul];
var char;
var enemy;
var fighting = false;

function Character(name, hp, attack, counter, img, id) {
    this.charName = name;
    this.healthPoints = hp;
    this.attackPower = attack;
    this.baseAttack = attack;
    this.counterPower = counter;
    this.image = img;
    this.charId = id;
    this.display = function () {
        var charBox = $("<div class=\"charBox\" id=\"" + this.charId + "\">");
        charBox.append("<div>" + this.charName + "</div>");
        charBox.append("<img style=\"height:100px; width:200px\" src=\"assets/images/" + this.image + "\">");
        charBox.append("<div id=\"" + this.charId + "-health\">" + this.healthPoints + "</div");
        return charBox;
    };
}

function select(id) {
    if (id === "obi") return obi;
    if (id === "luke") return luke;
    if (id === "sidious") return sidious;
    if (id === "maul") return maul;
}

function start() {
    $("#start-area").append(obi.display());
    $("#start-area").append(luke.display());
    $("#start-area").append(sidious.display());
    $("#start-area").append(maul.display());
}

function fight() {
    char.healthPoints -= enemy.counterPower;
    enemy.healthPoints -= char.attackPower;
    $("#combat-text").empty();
    $("#combat-text").append("<p>You attacked " + enemy.charName + " for " + char.attackPower + " points of damage.");
    $("#combat-text").append("<p>" + enemy.charName + " attacked you back for " + enemy.counterPower + " points of damage.");
    $("#" + char.charId + "-health").text(char.healthPoints);
    $("#" + enemy.charId + "-health").text(enemy.healthPoints);
    char.attackPower += char.baseAttack;
    console.log(enemy.healthPoints);
    if (enemy.healthPoints <= 0) {
        fighting = false;
        $("#" + enemy.charId).remove();
        alert("ENEMY DEAD");
    }
    if (char.healthPoints <= 0) {
        alert("GAME OVER");
    }
}

start();
$("#start-area").on("click", ".charBox", function () {
    char = select($(this).attr("id"));
    // console.log(char.charName);
    $("#character-area").append(char.display());
    for (var i = 0; i < characters.length; i++) {
        if (characters[i] !== char) {
            $("#enemy-area").append(characters[i].display());
        }
    }
    $("#start-area").empty();
});

$("#enemy-area").on("click", ".charBox", function () {
    if (!fighting) {
        id = $(this).attr("id");
        enemy = select(id);
        $(this).remove();
        $("#combat-text").before(enemy.display());
        fighting = true;
    }
});

$("#attack-button").on("click", function() {
    if(fighting) {
        fight();
    }
});