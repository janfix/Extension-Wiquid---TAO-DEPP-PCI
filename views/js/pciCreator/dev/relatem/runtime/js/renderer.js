/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html) {

    "use strict"; 

    function renderChoices(id, $container, config, assetManager) {

        var $vuefille = $container.find(".vuefille");
        var $vueglobale = $container.find(".vueglobale");
        var $vuegars = $container.find(".vuegars");
        var $aswrdm = $container.find(".ansrdm");

        $vuefille.append($('<img>', { src: assetManager.resolve('relatem/runtime/img/vuefille.png') }).attr("id", "vfimg").attr("class", "vfimg"));
        $container.find(".contanim").append($('<img>', { src: assetManager.resolve('relatem/runtime/img/moto.svg') }).attr("id", "moto").attr("class", "moto"));
        $vuegars.append($('<img>', { src: assetManager.resolve('relatem/runtime/img/cactus.png') }).attr("id", "cactus").attr("class", "cactus"));
        var anim1 = "non";
        var anim2 = "non";
        // Wheel rotation
        var angle = 0;
        setInterval(function() {
            angle += 3;
        }, 10);

        var angle = 0;
        setInterval(function() {
            angle += 3;
        }, 10);


        

        $(".activVF").click(function(event) {
            if (anim1 == "non") { $aswrdm.append(" Anim1-OK,");
                anim1 = "anim1ok"; }
            $vueglobale.hide();
            $vuegars.hide();
            $vuefille.show();
            // Replay animation event if animation is running
            var el = $(".vfimg"),
                newone = el.clone(true);
            el.before(newone);
            $("." + el.attr("class") + ":last").remove();

        });


        $(".activG").click(function(event) {
            if (anim2 == "non") { $aswrdm.append(" Anim2-OK,");
                anim2 = "anim1ok"; }
            $vueglobale.hide();
            $vuegars.show();
            $vuefille.hide();
        });

        $(".activGlobal").click(function(event) {
            $vueglobale.show();
            $vuegars.hide();
            $vuefille.hide();

        });
    }


    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);
            renderChoices(id, $container, config, assetManager);

            //render rich text content in prompt
            html.render($container.find('.prompt'));
        }
    };

});
