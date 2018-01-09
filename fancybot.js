const Discord = require("discord.js");
const client = new Discord.Client();
const login = require("./auth.json");
var raids = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '!ping') {
        msg.reply("PONG! MOTHER FUCKER.");
    }

    if (msg.content.toLowerCase().includes('did that ruin it for you')){
        msg.reply("https://static4.fjcdn.com/comments/Show+us+your+butt+spread+your+butt+_fdcae2a5e4b26b686f62c55dd99e509e.png");
        msg.reply("NOOOO!");
    }

    if (msg.content.includes('!createraid')) {
        console.log("got createraid command from user " + msg.author.username);
        if (msg.author.username.includes('Rydlock')) {
            try {
                var day = msg.content.split(" ")[1];
                var time = msg.content.split(" ")[2];
                var note = msg.content.split("note")[1];
                var attending = [];
                var newraid = {"day": day, "time": time, "note": note, "attending": attending};
                if (raids.length === 0){
                    msg.reply("Raid created.");
                    raids.push(newraid);
                } else {
                    for (var i in raids) {
                        if (raids[i]["day"] === day) {
                            msg.reply("There is already a raid scheduled for that day. Currently I can only keep track of 1 raid per day.")
                        } else {
                            msg.reply("Raid created.");
                            raids.push(newraid);
                        }
                    }
                }
                msg.reply('Current Scuedule:');
                for (var i in raids) {
                    var reply = "day: " + raids[i]["day"] + "   time: " + raids[i]["time"] + "   note: " + raids[i]["note"] + "\nattending:" + raids[i]["attending"];
                    msg.reply(reply);
                }
            } catch (ex) {
                console.log('error' + ex)
            }
        }
        else {
            msg.reply('Nice Try: ' + msg.author.username)
        }
    }

    if (msg.content === '!raids') {
        console.log("got raids command");
        try {
            if (raids.length === 0){
                msg.reply("No raids currently scheduled.");
            } else {
                msg.reply('Current Scuedule:');
                for (var i in raids) {
                    var reply = "day: " + raids[i]["day"] + "   time: " + raids[i]["time"] + "   note: " + raids[i]["note"] + "\nattending:" + raids[i]["attending"];
                    msg.reply(reply);
                }
            }
        } catch (ex) {
            console.log('error' + ex)
        }
    }

    if (msg.content.includes('!joinraid')) {
        console.log("got joinraid command");
        try {
            if (raids.length === 0){
                msg.reply("No raids currently scheduled.");
            } else {
                found_raid = false;
                var raid_day = msg.content.split(" ")[1];
                for (var i in raids) {
                    if (raids[i]["day"] === raid_day) {
                        if (raids[i]["attending"].indexOf(msg.author.username) > -1) {
                            msg.reply("You have already joined this raid!");
                        } else {
                            raids[i]["attending"].push(msg.author.username);
                            msg.reply("Joined Raid.");
                        }
                        msg.reply("day: " + raids[i]["day"] + "   time: " + raids[i]["time"] + "   note: " + raids[i]["note"] + "\nattending:" + raids[i]["attending"]);
                        found_raid = true;
                    }
                }
                if (found_raid === false) {
                    msg.reply("No raid scheduled for that day.");
                }
            }
        } catch (ex) {
            console.log('error' + ex);
        }
    }

    if (msg.content.includes('!deleteraid')) {
        console.log("got createraid command from user " + msg.author.username);
        if (msg.author.username.includes('Rydlock')) {
            try {
                var day = msg.content.split(" ")[1];
                var raid_found = false;
                for (var i in raids) {
                    if (raids[i]["day"] === day) {
                        raid_found = true;
                        raids.pop(i);
                        msg.reply("Raid deleted.")
                    }
                }
                if (raid_found === false){
                    msg.reply("Raid not found.")
                }
            } catch (ex) {
                console.log('error' + ex)
            }
        }
        else {
            msg.reply('Nice Try: ' + msg.author.username)
        }
    }
});

client.login(login["token"]);