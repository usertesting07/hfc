$(document).ready(function(){


    var dataOptions = {
        "30 Shana": SH30, 
        "30 Sam": SL30, 
        "30 Vivian": VQ30, 
        "50 Shana": SH50, 
        "50 Sam": SL50, 
        "50 Vivian": VQ50
    }

    $("select").change(function() {
        var selected = $( "select option:selected" ).html()
        loadTopics("selected", dataOptions[selected]);
    })


    var width = $(window).width();
    var numCols = Math.floor((width/252));

    var topics = ["hair", "diy", "homedecor", "food", "animals"]


    //Shana's coteries
    var selectedTitles = ['logo and identity', 'typography', 'industrial design', 'web and app design', 'clothes', 'business and advertising', 'articles', 'science resources', 'cultural architecture', 'knitting and crochet', 'art education resources', 'interior design', 'chicken recipes', 'mens fashion', 'fast recipes', 'makeup', 'posters', 'necklaces', 'tattoos', 'hair care', 'wedding hairstyles and makeup', 'quilting', 'world cuisine', 'yarn and needle', 'positive quotes', 'designers', 'earrings', 'diy projects', 'skin care', 'sweets']
    var unselectedTitles = ['special recipes', 'foreign language', 'middle school', 'wedding flowers', 'pork recipes', 'glass', 'motor vehicles', 'music', 'teacher resources', 'photography tips', 'handmade jewelry', 'photojournalism', 'technology', 'side dish recipes', 'wedding dresses', 'rice dishes', 'wallet', 'high school', 'fiber art', 'film', 'brunch', 'barbecue', 'tassels', 'noodle recipes', 'outdoor sports', 'sculpture', 'travel destinations', 'soups', 'fragrance', 'drinks']

    var colors = ["#F13535", "#E2780D", "#0FA573", "#0A6955", "#364A4C", "#133A5E", "#004B91", "#0084FF", "#B469EB", "#8046A5", "#5B2677", "#6E0F3C"]

    var titleListFor = {"selected": selectedTitles, "unselected": unselectedTitles}

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    if ($(".feed").children.length == 0) {
        for (i=0; i<numCols; i++) {
            $col = $(document.createElement("div")).addClass("col");
            $(".feed").append($col);
        }
    }

    // for (i=0; i< 20; i++) {
    //     $pin = $(document.createElement("div")).addClass("previewPin");
    //     $pin.css("height", "" + getRandomInt(200,500) + "px")
    //     var colNum = i%($(".col").length);
    //     $($(".col")[colNum]).append($pin);
    // }





    var numColor = 0;
    var createTopic = function (annotation, selectionState, color, i) {
        var $topic = $(document.createElement("div")).addClass("topic "+ selectionState);
        /*$topic.css("background-image", "url('"+"https://unsplash.it/"+(106+i)+"/?random"+"')");
        */
        var $topicText = $(document.createElement("div")).addClass("topicText");
        title = annotation
        title = title.substring(0,1).toUpperCase()+title.substring(1)
        $topicText.text(title)


        var $check = $(document.createElement("div")).addClass("check");
        $topic.append($check)

        $topic.append($topicText)
        $topic.css("background-color", color)

        var $mask = $(document.createElement("div")).addClass("mask");
        $mask.append($topicText.clone())
        // $mask.css("background-color", colors[numColor])

        $topic.append($mask);



        $(".topics").append($topic);


            $topic.find('.topicText').click(function(evt) {
                // var parent = $(this).parent()
                if ($(parent).hasClass("selected")) {
                    $(parent).removeClass("selected").addClass("unselected")
                    // $(parent).css("background-color", "#efefef")

                } else {
                    $(parent).removeClass("unselected").addClass("selected")
                }
            });

            $topic.click(function(evt) {
                if ($(this).hasClass("selected")) {
                    num--;
                    $(this).removeClass("selected").addClass("unselected")
                    // animateFeed("down")
                } else {
                    num++;
                    $(this).removeClass("unselected").addClass("selected")
                    // animateFeed("up")
                }
                // addPins()
                updateNextNum(5-num)
            });

        return $topic
    }

    var num=0;

    var animateFeed = function (dir) {
        if (num > 1) {
            if (dir == "up") {
                var topNum = $(".feed").position().top-600;
            } else if (dir == "down") {
                var topNum = $(".feed").position().top+600;
            }
            setTimeout(function() {
                $(".feed").animate({
                    top:topNum
                });
            }, 1)

        }
    }

    var updateNextNum = function(num) {
        if (num <= 0) {
            $(".next").text("Done").addClass("active")
        } else {
            $(".next").text("Follow " + num + " more")
        }
    }

    var loadTopics = function (selectionState, data) {
        $(".topics").empty()

        var length = titleListFor[selectionState].length

        var keys = Object.keys(data)
        for (var i in keys) {
            var l1 = keys[i];
            color = colors[i]
            createTopic(l1, selectionState, color, i);
            for (c in data[l1]) {
                createTopic(data[l1][c], selectionState, color, i);
            }

        };
    }



    $(".done").click(function() {
        alert("Nice picks! This is the end of this prototype")
    })



    loadTopics("selected", dataOptions["30 Shana"]);

})
