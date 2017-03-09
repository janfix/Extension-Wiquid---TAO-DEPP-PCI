/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html) {

    "use strict"; 
    console.log("GIT TEST MODIFICATION");

    function renderChoices(id, $container, config, assetManager) {

        var $imagetitre = $container.find(".imagetitre");
        var $place1 = $container.find(".place1");
        var $place2 = $container.find(".place2");
        var $place3 = $container.find(".place3");

        $imagetitre.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/img1.svg') }));

        $place1.prepend('<div class="titre2">Sans ablation des testicules</div>');
        $place2.prepend('<div class="titre2">Avec ablation des testicules</div>');
        $place3.prepend('<div class="titre2">Avec ablation des testicules puis greffe des testicules</div>');

        $place1.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/coq4mois.svg') }).attr("class", "anima3"));
        $place1.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/polosolo.svg') }).attr("class", "anima1 polo"));
        $place1.append('<div class="nav1"><button class="precedent1" disabled >Précédent</button><button class="suivant1">Suivant</button></div>');

        $place2.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/chapontxt.svg') }).attr("class", "anima6"));
        $place2.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/ablation.svg') }).attr("class", "anima5 polo"));
        $place2.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/polosoloL2.svg') }).attr("class", "anima4 polo"));
        $place2.append('<div class="nav2"><button class="precedent2" disabled>Précédent</button><button class="suivant2">Suivant</button></div>');

        $place3.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/coq4mois.svg') }).attr("class", "anima11"));
        $place3.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/greffe.svg') }).attr("class", "anima9 polo"));
        $place3.append($('<img>', { src: assetManager.resolve('Berthold/runtime/assets/poulet3.svg') }).attr("class", "anima8 polo"));
        $place3.append('<div class="nav3"><button class="precedent3" disabled>Précédent</button><button class="suivant3">Suivant</button></div>');

        var $suivant1 = $container.find(".suivant1"),
        $precedent1 = $container.find(".precedent1"),
        $suivant2 = $container.find(".suivant2"),
        $precedent2 = $container.find(".precedent2"),
        $suivant3 = $container.find(".suivant3"),
        $precedent3 = $container.find(".precedent3"),
        $anima1 = $container.find('.anima1'),
        $anima3 = $container.find('.anima3'),
        $anima4 = $container.find('.anima4'),
        $anima5 = $container.find('.anima5'),
        $anima6 = $container.find('.anima6'),
        $anima8 = $container.find('.anima8'),
        $anima9 = $container.find('.anima9'),
        $anima11 = $container.find('.anima11');


        var count1 = 0, count2 = 0, count3 = 0;

        function counter1() {
            count1 += 1;
            $container.find(".clickanim1").html(count1);
        }

        function counter2() {
            count2 += 1;
            $container.find(".clickanim2").html(count2);
        }

        function counter3() {
            count3 += 1;
            $container.find(".clickanim3").html(count3);
        }

        $suivant1.click(function(event) {
            $anima1.css("opacity", 0);
            $anima3.css("opacity", 1);
            $suivant1.prop("disabled", true);
            $precedent1.prop("disabled", false);
            counter1();
        });

        $precedent1.click(function(event) {
            $suivant1.prop("disabled", false);
            $precedent1.prop("disabled", true);
            $anima1.css("opacity", 1);
            $anima3.css("opacity", 0);
            counter1();
        });

        var cptClick2 = 0;
        $suivant2.click(function(event) {
            cptClick2 = cptClick2 + 1;
            if (cptClick2 === 1) {
                $anima4.css("opacity", 0);
                $anima5.css("opacity", 1);
                $precedent2.prop("disabled", false);
                counter2();
            }
            if (cptClick2 === 2) {
                $suivant2.prop("disabled", true);
                $precedent2.prop("disabled", false);
                $anima5.css("opacity", 0);
                $anima6.css("opacity", 1);
                counter2();
            }
        });

        $precedent2.click(function(event) {
            if (cptClick2 === 1) {
                $anima4.css("opacity", 1);
                $anima5.css("opacity", 0);
                $precedent2.prop("disabled", true);
                $suivant2.prop("disabled", false);
                counter2();
            } else if (cptClick2 === 2) {
                $anima5.css("opacity", 1);
                $anima6.css("opacity", 0);
                $suivant2.prop("disabled", false);
                counter2();
            }
            cptClick2 = cptClick2 - 1;
        });

        var cptClick3 = 0;
        $suivant3.click(function(event) {
            cptClick3 = cptClick3 + 1;
            if (cptClick3 === 1) {
                $anima8.css("opacity", 0);
                $anima9.css("opacity", 1);
                $precedent3.prop("disabled", false);
                counter3();
            }
            if (cptClick3 === 2) {
                $suivant3.prop("disabled", true);
                $precedent3.prop("disabled", false);
                $anima9.css("opacity", 0);
                $anima11.css("opacity", 1);
                counter3();
            }
        });

        $precedent3.click(function(event) {
            if (cptClick3 === 1) {
                $anima8.css("opacity", 1);
                $anima9.css("opacity", 0);
                $precedent3.prop("disabled", true);
                $suivant3.prop("disabled", false);
                counter3();
            } else if (cptClick3 === 2) {
                $anima9.css("opacity", 1);
                $anima11.css("opacity", 0);
                $suivant3.prop("disabled", false);
                counter3();
            }
            cptClick3 = cptClick3 - 1;
        });

    }



    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config, assetManager);

            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
        renderChoices: function(id, container, config, assetManager) {
            renderChoices(id, $(container), config, assetManager);
        }
    };
});
