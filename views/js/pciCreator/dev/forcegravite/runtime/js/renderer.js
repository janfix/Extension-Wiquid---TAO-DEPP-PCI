/*
Copyright DEPP - Ministère de l'éducation nationale 
*/

define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html) {

    "use strict";

    function renderChoices(id, $container, config, assetManager) {

        var meteorloc;
        var objdrag;
        var decalleur = 0;
        var poidsDroite = 0;
        var astro = "terre";
        var answbal = "not-use";
        var answdyna = "not-use";

        var getpathmeteor2 = $('<img>', { src: assetManager.resolve('forcegravite/runtime/img/meteor.png') });
        var $labo = $container.find(".labo");
        var $gravterre = $container.find(".grav-terre");
        var $gravmars = $container.find(".grav-mars");
        var $gravlune = $container.find(".grav-lune");
        var $poids40kg = $container.find(".poids40kg");
        var $path4268 = $container.find(".path4268");
        var $path42687 = $container.find(".path4268-7");
        var $path4292 = $container.find(".path4292");
        var $textmass = $container.find(".txtmass");
        var $meteor = $container.find(".meteor");
        var $bgsvg = $container.find(".bgsvg");
        var $etqterre = $container.find(".etq_terre");
        var $etqlune = $container.find(".etq_lune");
        var $etqmars = $container.find(".etq_mars");
        var $zerograv = $container.find(".zero-grav");


        // Tab System
        $labo.css("background-color", "black");
        $gravterre.hide();
        $gravmars.hide();
        $gravlune.hide();

        $container.find(".ong_lune").click(function(event) {

            $poids40kg.hide();
            $textmass.hide();
            astro = "lune";

            $meteor.remove();
            $container.find("#balGauche").remove();
            $container.find("#dynamo").remove();
            $container.find("#socle").remove();
            $labo.append("<div id='socle' class='dropper'></div>");
            $labo.append("<div id='dynamo' class='dropper'></div>");
            $labo.append("<div id='balGauche' class='dropper balGauche'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
            $container.find("#socle").append("<div id='meteor' class='draggable meteor'></div>");

            draganddroper();
            $zerograv.show();
            $gravlune.hide();
            $gravmars.hide();
            $gravterre.hide();
            $path4268.css("display", "none");
            $path42687.css("display", "none");
            $path4292.show();
            $bgsvg.css("fill", "#7b7b7b");
            $etqterre.hide();
            $etqlune.show();
            $etqmars.hide();
        });

        $container.find(".ong_mars").click(function(event) {
            $poids40kg.hide();
            $textmass.hide();
            astro = "mars";
            $meteor.remove();

            $meteor.remove();
            $container.find("#balGauche").remove();
            $container.find("#dynamo").remove();
            $container.find("#socle").remove();
            $labo.append("<div id='socle' class='dropper'></div>");
            $labo.append("<div id='dynamo' class='dropper'></div>");
            $labo.append("<div id='balGauche' class='dropper balGauche'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
            $container.find("#socle").append("<div id='meteor' class='draggable meteor'></div>");

            draganddroper();

            $zerograv.show();
            $gravlune.hide();
            $gravmars.hide();
            $gravterre.hide();
            $path4268.css("display", "none");
            $path42687.show();
            $path4292.hide();
            $bgsvg.css("fill", "#854e37");
            $etqterre.hide();
            $etqlune.hide();
            $etqmars.show();
        });

        $container.find(".ong_terre").click(function(event) {
            $poids40kg.hide();
            $textmass.hide();
            astro = "terre";
            $meteor.remove();
            $container.find("#balGauche").remove();
            $container.find("#dynamo").remove();
            $container.find("#socle").remove();
            $labo.append("<div id='socle' class='dropper'></div>");
            $labo.append("<div id='dynamo' class='dropper'></div>");
            $labo.append("<div id='balGauche' class='dropper balGauche'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
            $container.find("#socle").append("<div id='meteor' class='draggable meteor'></div>");

            draganddroper();

            $zerograv.show();
            $gravlune.hide();
            $gravmars.hide();
            $gravterre.hide();

            $etqterre.show();
            $path4268.show();
            $path42687.hide();
            $path4292.hide();
            $bgsvg.css("fill", "#3465a0");
            $etqterre.show();
            $etqlune.hide();
            $etqmars.hide();
        });

        draganddroper();

        function draganddroper() {


            //  DRAG & DROP
            var dragImg = new Image();
            dragImg.src = $(getpathmeteor2).attr("src");
            var dndHandler = {

                draggedElement: null,

                applyDragEvents: function(element) {

                    element.draggable = true;

                    var dndHandler = this;

                    element.addEventListener('dragstart', function(e) {
                        dndHandler.draggedElement = e.target;
                        e.dataTransfer.setData('text/plain', ''); //  Firefox
                        e.dataTransfer.setDragImage(dragImg, 40, 40);


                    }, false);

                },

                applyDropEvents: function(dropper) {


                    dropper.addEventListener('dragover', function(e) {
                        e.preventDefault();


                        this.className = 'dropper drop_hover';
                    }, false);

                    dropper.addEventListener('dragleave', function() {
                        this.className = 'dropper';
                    });

                    var dndHandler = this;

                    dropper.addEventListener('drop', function(e) {

                        var target = e.target,
                            draggedElement = dndHandler.draggedElement,
                            clonedElement = draggedElement.cloneNode(true);

                        var cible = String(target.id);
                        if (cible == "balGauche") {
                            if (answbal == "not-use") { $container.find("#answforce").append(" balance-ok,");
                                answbal = "bal-ok"; }
                            $container.find("#dynamo").css("top", "0px");
                            $poids40kg.show();
                            $container.find("#txtmass").show();
                            $zerograv.show();
                            $gravlune.hide();
                            $gravmars.hide();
                            $gravterre.hide();


                        }
                        if (cible == "dynamo") {
                            if (answdyna == "not-use") { $container.find("#answforce").append(" dynamo-ok,");
                                answdyna = "dyna-ok"; }
                            $poids40kg.hide();
                            $container.find("#txtmass").hide();

                            if (astro == "terre") {
                                $zerograv.hide();
                                $gravlune.hide();
                                $gravmars.hide();
                                $gravterre.show();
                                $container.find(this).css("top", "155px");
                            }
                            if (astro == "lune") {
                                $zerograv.hide();
                                $gravlune.show();
                                $gravmars.hide();
                                $gravterre.hide();
                                $(this).css("top", "60px");
                            }
                            if (astro == "mars") {
                                $zerograv.hide();
                                $gravlune.hide();
                                $gravmars.show();
                                $gravterre.hide();
                                $container.find(this).css("top", "85px");
                            }
                        }
                        if (cible == "socle") {
                            $container.find("#dynamo").css("top", "0px");
                            $poids40kg.hide();
                            $container.find("#txtmass").hide();
                            $zerograv.show();
                            $gravlune.hide();
                            $gravmars.hide();
                            $gravterre.hide();

                        }


                        while (target.className.indexOf('dropper') == -1) {
                            target = target.parentNode;
                        }

                        target.className = 'dropper';

                        clonedElement = target.appendChild(clonedElement);
                        dndHandler.applyDragEvents(clonedElement);

                        draggedElement.parentNode.removeChild(draggedElement);

                    });

                }

            };


            var elements = document.querySelectorAll('.draggable'),
                elementsLen = elements.length;

            for (var i = 0; i < elementsLen; i++) {
                dndHandler.applyDragEvents(elements[i]);
            }

            var droppers = document.querySelectorAll('.dropper'),
                droppersLen = droppers.length;

            var basestation = document.querySelectorAll('.base'),
                basestationlen = basestation.length;

            for (var i = 0; i < droppersLen; i++) {
                dndHandler.applyDropEvents(droppers[i]);
            }
        }


    }


    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config, assetManager);

            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
    };
});
