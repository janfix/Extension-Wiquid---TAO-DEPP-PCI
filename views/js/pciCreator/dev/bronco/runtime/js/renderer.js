/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
*/

define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html) {

    "use strict"; 

    function renderChoices(id, $container, config) {
        $container.find(".polludiv").append("<input type='range' id='pollu' class='pollu' max='20' min='1'>");

        $container.find(".pollu").val(1);
        var answ = "";
        $container.on("input", ".pollu", function() {
            var vpol = 40 - eval($container.find(".pollu").val());
            $(".air").attr("r", vpol);

            answ = answ + $container.find(".pollu").val();

            if (answ.length < 80) { $container.find(".broncoanswer").append("'" + $container.find(".pollu").val() + "',"); }

        });
    }


    return {
        render: function(id, container, config) {

            var $container = $(container);

            renderChoices(id, $container, config);

            html.render($container.find('.prompt'));
        }
    };
});
