/*
Copyright DEPP - Ministère de l'éducation nationale 
*/

define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){
 
    "use strict"; 
 
    function renderChoices(id, $container, config, assetManager){

        var meteorloc;
            var objdrag;
            var decalleur = 0;
            var poidsDroite = 0;
            var astro = "terre";
            var answbal  = "not-use";
            var answdyna = "not-use";
          
            var getpathmeteor2 = $('<img>', {src: assetManager.resolve('forcegravite/runtime/img/meteor.png')});
            var $labo = $("#labo");
            var $gravterre = $("#grav-terre");
            var $gravmars = $("#grav-mars") ;
            var $gravlune = $("#grav-lune");
            var $poids40kg = $("#poids40kg");

            // Tab System
            $labo.css("background-color", "black");
            $gravterre.hide();
            $gravmars.hide();
            $gravlune.hide();

            $("#ong_lune").click(function(event) {

                $poids40kg.hide();
                $("#txtmass").hide();
                astro = "lune";
                
                $("#meteor").remove();
                $("#balGauche").remove();
                $("#dynamo").remove();
                $("#socle").remove();
                $labo.append("<div id='socle' class='dropper'></div>");
                $labo.append("<div id='dynamo' class='dropper'></div>");
                $labo.append("<div id='balGauche' class='dropper'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
                $("#socle").append("<div id='meteor' class='draggable'></div>");
                
                draganddroper();
                $("#zero-grav").show();
                $gravlune.hide();
                $gravmars.hide();
                $gravterre.hide();
                $("#path4268").css("display", "none");
                $("#path4268-7").css("display", "none");
                $("#path4292").show();
                $("#bgsvg").css("fill", "#7b7b7b");
                $("#etq_terre").hide();
                $("#etq_lune").show();
                $("#etq_mars").hide();
            });

            $("#ong_mars").click(function(event) {
                $poids40kg.hide();
                $("#txtmass").hide();
                astro = "mars";
                $("#meteor").remove();
                
                $("#meteor").remove();
                $("#balGauche").remove();
                $("#dynamo").remove();
                $("#socle").remove();
                $labo.append("<div id='socle' class='dropper'></div>");
                $labo.append("<div id='dynamo' class='dropper'></div>");
                $labo.append("<div id='balGauche' class='dropper'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
                $("#socle").append("<div id='meteor' class='draggable'></div>");
                
                draganddroper();
                
                $("#zero-grav").show();
                $gravlune.hide();
                $gravmars.hide();
                $gravterre.hide();
                $("#path4268").css("display", "none");
                $("#path4268-7").show();
                $("#path4292").hide();
                $("#bgsvg").css("fill", "#854e37");
                $("#etq_terre").hide();
                $("#etq_lune").hide();
                $("#etq_mars").show();
            });

            $("#ong_terre").click(function(event) {
                $poids40kg.hide();
                $("#txtmass").hide();
                astro = "terre";
                $("#meteor").remove();
                $("#balGauche").remove();
                $("#dynamo").remove();
                $("#socle").remove();
                $labo.append("<div id='socle' class='dropper'></div>");
                $labo.append("<div id='dynamo' class='dropper'></div>");
                $labo.append("<div id='balGauche' class='dropper'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
                $("#socle").append("<div id='meteor' class='draggable'></div>");
                
                draganddroper();
                
                $("#zero-grav").show();
                $gravlune.hide();
                $gravmars.hide();
                $gravterre.hide();

                $("#etq_terre").show();
                $("#path4268").show();
                $("#path4268-7").hide();
                $("#path4292").hide();
                $("#bgsvg").css("fill", "#3465a0");
                $("#etq_terre").show();
                $("#etq_lune").hide();
                $("#etq_mars").hide();
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
                                if(answbal=="not-use"){$("#answforce").append(" balance-ok,"); answbal= "bal-ok"; }
                                $("#dynamo").css("top", "0px");
                                $poids40kg.show();
                                $("#txtmass").show();
                                $("#zero-grav").show();
                                $gravlune.hide();
                                $gravmars.hide();
                                $gravterre.hide();


                            }
                            if (cible == "dynamo") {
                                if(answdyna=="not-use"){$("#answforce").append(" dynamo-ok,"); answdyna= "dyna-ok"; }
                                $poids40kg.hide();
                                $("#txtmass").hide();
                                
                                if (astro == "terre") {
                                    $("#zero-grav").hide();
                                    $gravlune.hide();
                                    $gravmars.hide();
                                    $gravterre.show();
                                    $(this).css("top", "155px");
                                }
                                if (astro == "lune") {
                                    $("#zero-grav").hide();
                                    $gravlune.show();
                                    $gravmars.hide();
                                    $gravterre.hide();
                                    $(this).css("top", "60px");
                                }
                                if (astro == "mars") {
                                    $("#zero-grav").hide();
                                    $gravlune.hide();
                                    $gravmars.show();
                                    $gravterre.hide();
                                    $(this).css("top", "85px");
                                }
                            }
                            if (cible == "socle") {
                                $("#dynamo").css("top", "0px");
                                $poids40kg.hide();
                                $("#txtmass").hide();
                                $("#zero-grav").show();
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
        render : function(id, container, config, assetManager){ 

            var $container = $(container);

            renderChoices(id, $container, config, assetManager); 
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
    };
});