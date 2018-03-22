$(document).ready(function(){


    var width = $(window).width();
    var numCols = Math.floor((width/252));

    var topics = ["hair", "diy", "homedecor", "food", "animals"]


    var selectedTitles = ["Animals", "Architecture", "Art", "Cars", "Celebrities", "DIY and crafts", "Design", "Education", "Film", "Food and drink", "Gardening", "Geek", "Hair", "Health", "History", "Holidays", "Home decor", "Humor", "Illustrations", "Kids", "Men's fashion", "Outdoors", "Photography", "Products", "Quotes", "Science", "Sports", "Tattoos", "Technology", "Travel"]
    var unselectedTitles = ["Animals", "Architecture", "Art",  "Cars", "Celebrities", "DIY and crafts", "Design", "Education", "Film"]

    var colors = ["#F13535", "#E2780D", "#0FA573", "#B469EB", "#0A6955", "#8046A5", "#004B91", "#364A4C", "#133A5E", "#5B2677", "#6E0F3C"]

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
    

    var addPins = function () {
        // $(".previewPin").addClass("hide")
        setTimeout(function() {
            // $(".previewPin").remove();
            var topic = topics[getRandomInt(0,4)]
            for (i=0; i<5; i++) {

                var pinNum = i+1
                var colNum = i%($(".col").length);

                var $pin = $(document.createElement("div"));
                $pin.addClass("pin");

                var $pinImgDiv = $(document.createElement("div")).addClass("pin-img");

                var $pinImg = $(document.createElement("img"));
                $pinImg.attr("src", "img/"+topic+"/"+pinNum+".png");
                $pinImgDiv.append($pinImg);
                $pin.append($pinImgDiv)


                $($(".col")[colNum]).append($pin);

                // delay

                setTimeout(function() {
                    $(".pin").addClass("appear");

                }, 1)
            }
        }, 0.5)


    }

    var getTallestPin = function () {
        var height = 0
        for (i=0; i<numCols; i++) {
            //console.log( $($(".col")[i])[0].children )
            $last = $($($(".col")[i])[0].children)
            pinHeight = ($last.find("img"))[0].height
            if (pinHeight > height) {
                height = pinHeight
            }
        }

        return height
        
    }


    var numColor = 0;
    var createTopic = function (selectionState, i) {
        var $topic = $(document.createElement("div")).addClass("topic "+ selectionState);
        /*$topic.css("background-image", "url('"+"https://unsplash.it/"+(106+i)+"/?random"+"')");
        */
        var $topicText = $(document.createElement("div")).addClass("topicText");
        title = titleListFor[selectionState][i]
        $topicText.text(title)


        var $check = $(document.createElement("div")).addClass("check");
        $topic.append($check)

        // $topic.css("background-color", colors[getRandomInt(0, colors.length-1)])
        if (numColor == colors.length-1) {
            numColor=0
        }else {
            numColor++
        }
        $topic.append($topicText)
        $topic.css("background-color", colors[numColor])

        var $mask = $(document.createElement("div")).addClass("mask");
        $mask.append($topicText.clone())
        // $mask.css("background-color", colors[numColor])

        $topic.append($mask);

        

        // var $hiddenText = $(document.createElement("div")).addClass("topicText hiddenText");
        // $hiddenText.text(""+$topicText.text()+" hidden");

        // $topic.append($hiddenText)


        $(".topics").append($topic);
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

    var loadTopics = function (selectionState) {
        var length = titleListFor[selectionState].length
        for (i=0; i<length; i++) {
            $topic = createTopic(selectionState, i);

            $topic.find('.topicText').click(function(evt) {
                console.log($(this).parent())
                // var parent = $(this).parent()
                if ($(parent).hasClass("selected")) {
                    console.log($(parent))
                    console.log("has selected)")
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
        };
    }

    
        var num=0;


    
    loadTopics("selected");

    loadTopics("unselected");
    
})




