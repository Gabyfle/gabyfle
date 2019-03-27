$(document).ready(function() {
    /**
     * Animating header stuff
     * Principally text and colors
     */
    $("#header").hover(function(){
        $("#big-title").html("$Gabriel_Santamaria <span style=\"color: #f92472 !important;\">=</span>").css("color","#FFFFFF");
        $("#description").html("\"Passionné de pixels, de hiéroglyphes, et de bulles d'air\"<span style=\"color: #FFFFFF !important;\">;</span>").css("color","#e7db74").css("font-family", "Inconsolata");
    }, function() {
        $("#big-title").text("Gabriel Santamaria").css("color","#ac80ff");
        $("#description").html("Le site internet d'un passionné <small>(un de plus)</small> de pixels, de hiéroglyphes, et de bulles d'air").css("color","#FFFFFF").css("font-family", "Open Sans");
    });

    /**
     * Getting repos number from Github
     */
    function getUserData(user)
    {
        var steamUrl = 'app/steam_stats.php';
        var githubUrl = 'app/github_stats.php';
        jQuery.getJSON(steamUrl, function(json){
            var ownedGames = json.totalGames;
            var totalHours = json.totalHours;
            $("#ownedGames").html(ownedGames + "<span style=\"color:#FFF;\">,</span>");
            $("#totalHours").html(Math.floor(totalHours / 60) + "<span style=\"color:#FFF;\">,</span>");
        });
        jQuery.getJSON(githubUrl, function(json){
            var reposNumber = json.repos;
            var languages = json.languages;
            var langSum = 1; /* If we put this to 0, it's possible that we divide by 0... */
            var percentages = Array();
            percentages["Autre"] = 0;
            /* First loop to get total value */
            for (const key in languages) {
                if (languages.hasOwnProperty(key)) {
                    langSum = langSum + languages[key];                  
                }
            }
            /* Second loop to get percentages */
            for (const key in languages) {
                if (languages.hasOwnProperty(key)) {
                    percentage = Math.round((100 * languages[key]) / langSum);
                    if(percentage < 9){
                        percentages["Autre"] += percentage;
                    } else {
                        percentages[key] = Math.round((100 * languages[key]) / langSum);
                    }
                }
            }
            $("#repos").html(reposNumber + "<span style=\"color:#FFF;\">,</span>");
            /* Displaying percentages */
            var html = "<span style=\"color:#FFF;\">[</span>"; /* html that will be displayed */
            for (const key in percentages) {
                if (percentages.hasOwnProperty(key)) {
                    html = html + 
                           " <div class=\"languages\"><span id=\"marge\"/><span style=\"color:#e7db74;\">\"" + 
                           key + 
                           "\"</span> <span style=\"color: #f92472 !important;\">=></span> " +
                          percentages[key] +
                          "<span style=\"color:#FFF;\">,</span></div>";
                }
            }
            html = html + "<span style=\"color:#FFF;\"> ],</span>";
            $("#percentages").html(html);
        });
    }
    /**
     * headerAnimate(void)
     * Animate the header, by throwing images like pixels, bubbles or maths/physics related symbols
     */
    function headerAnimate()
    {

    }

    /* Launching data requests */
    getUserData("Gabyfle");
    /* Animating header */
});