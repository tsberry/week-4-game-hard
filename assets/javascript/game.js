// Declare and initialize four characters
var obi = new Character("Obi-wan Kenobi", 408, 24, 48, "obi.jpg", "obi");
var luke = new Character("Luke Skywalker", 440, 20, 40, "luke.jpg", "luke");
var maul = new Character("Darth Maul", 560, 15, 32, "maul.jpeg", "maul");
var sidious = new Character("Darth Sidious", 666, 11, 24, "sidious.jpg", "sidious");
// Add the characters to the characters array
var characters = [obi, luke, maul, sidious];
// Declare player character and enemy variables to be used later on
var char;
var enemy;
var enemies = 3;
// Declare a variable to track whether the characters are fighting (they are not at the beginning of the game)
var fighting = false;
// Declare a variable to track whether the player has lost
var gameOver = false;

function Character(name, hp, attack, counter, img, id) {
    // Each character has a name to display
    this.charName = name;
    // Each character has a set HP
    this.healthPoints = hp;
    // Each character has a base attack power, which doesn't change, and an attack power that increases
    this.attackPower = attack;
    this.baseAttack = attack;
    // Each character has a counterattack power that is used when that character is an enemy
    this.counterPower = counter;
    // Each character has an image to display
    this.image = img;
    // Each character has an id used to retrieve that character
    this.charId = id;
    // The display method returns a div containing all of the character information to be displayed on the page
    this.display = function () {
        var charBox = $("<div class=\"charBox\" id=\"" + this.charId + "\">");
        charBox.append("<div>" + this.charName + "</div>");
        charBox.append("<img style=\"height:100px; width:200px\" src=\"assets/images/" + this.image + "\">");
        charBox.append("<div id=\"" + this.charId + "-health\">" + this.healthPoints + "</div>");
        return charBox;
    };
}

// The selector function takes in an id from an html element and returns the character object associated with that id.
function select(id) {
    for (var i = 0; i < characters.length; i++) {
        if (characters[i].charId === id) return characters[i];
    }
}

// The start function (called when the page loads) displays each character to the starting area.
function start() {
    $("#start-area").append(obi.display());
    $("#start-area").append(luke.display());
    $("#start-area").append(maul.display());
    $("#start-area").append(sidious.display());
}

// The fight function is called whenever the attack button is clicked (provided there is a character in the defender area). It removes health from the characters appropriately and increases the player's attack power. It also displays text to the screen showing the result of combat and updates the HP displays.
function fight() {
    // Each character loses health based on the opposing character's power
    char.healthPoints -= enemy.counterPower;
    enemy.healthPoints -= char.attackPower;
    // Clears combat text and then displays new text for the current round
    $("#combat-text").empty();
    $("#combat-text").append("<p>You attacked " + enemy.charName + " for " + char.attackPower + " points of damage.");
    $("#combat-text").append("<p>" + enemy.charName + " attacked you back for " + enemy.counterPower + " points of damage.");
    // Updates the display of the characters' health points
    $("#" + char.charId + "-health").text(char.healthPoints);
    $("#" + enemy.charId + "-health").text(enemy.healthPoints);
    // The player character's attack power is increased by the base attack value
    char.attackPower += char.baseAttack;

    // If the player's health points are at or below zero
    if (char.healthPoints <= 0) {
        //End the fight
        fighting = false;
        gameOver = true;
        // Display a message alerting game over
        alert("GAME OVER");
        $("#combat-text").html("<p>GAME OVER</p>");
    }

    // If the enemy's health points are at or below zero and the player is not dead
    if (enemy.healthPoints <= 0 && !gameOver) {
        // End the fight
        fighting = false;
        // Remove the enemy character from the screen
        $("#" + enemy.charId).remove();
        enemies--;
        // Display a message alerting enemy death and text displaying this
        alert(enemy.charName + " defeated.");
        $("#combat-text").append("<p>" + enemy.charName + " defeated.</p>");

        if(enemies === 0) {
            $("#combat-text").html("<p>YOU WIN!</p>");
        }
    }
}

// When the page loads, the start function is called, displaying the characters in the starting area
start();

// When the player clicks on a box in the starting area
$("#start-area").on("click", ".charBox", function () {
    // The player character becomes the character associated with the clicked box
    char = select($(this).attr("id"));
    // The player character is displayed in the character area
    $("#character-area").append(char.display());
    // For each character
    for (var i = 0; i < characters.length; i++) {
        // If that character is not the player character
        if (characters[i] !== char) {
            // Display that character in the enemy area
            $("#enemy-area").append(characters[i].display());
        }
    }
    // Remove all html from the start area
    $("#start-area").empty();
});

// When the player clicks on a box in the enemy area
$("#enemy-area").on("click", ".charBox", function () {
    // If the player is not fighting a character
    if (!fighting) {
        // Select the enemy associated with the clicked box
        id = $(this).attr("id");
        enemy = select(id);
        // Remove the clicked box from the enemy area
        $(this).remove();
        // Display the enemy at the beginning of the defender area
        $("#combat-text").before(enemy.display());
        // The characters are now fighting
        fighting = true;
    }
});

// When the attack button is clicked
$("#attack-button").on("click", function () {
    // If the player is currently fighting
    if (fighting) {
        // Call the fight function
        fight();
    }
});