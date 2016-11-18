define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config, assetManager){

        var meteorloc;
            var objdrag;
            var decalleur = 0;
            var poidsDroite = 0;
            var astro = "terre";
          
            var getpathmeteor2 = $('<img>', {src: assetManager.resolve('forcegravite/runtime/img/meteor.png')});
            
            console.log($(getpathmeteor2).attr("src"));

            // Système d'onglet
            $("#labo").css("background-color", "black");
            $("#grav-terre").hide();
            $("#grav-mars").hide();
            $("#grav-lune").hide();

            $("#ong_lune").click(function(event) {

                $("#poids40kg").hide();
                $("#txtmass").hide();
                astro = "lune";
                // Renovation du drag and drop : remove drag et drop zone
                $("#meteor").remove();
                $("#balGauche").remove();
                $("#dynamo").remove();
                $("#socle").remove();
                $("#labo").append("<div id='socle' class='dropper'></div>");
                $("#labo").append("<div id='dynamo' class='dropper'></div>");
                $("#labo").append("<div id='balGauche' class='dropper'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
                $("#socle").append("<div id='meteor' class='draggable'></div>");
                //Il faut récupérer le faiseur de drag en l'applicant à meteor qui vient d'être recréé
                draganddroper();
                $("#zero-grav").show();
                $("#grav-lune").hide();
                $("#grav-mars").hide();
                $("#grav-terre").hide();
                $("#path4268").css("display", "none");
                $("#path4268-7").css("display", "none");
                $("#path4292").show();
                $("#bgsvg").css("fill", "#7b7b7b");
                $("#etq_terre").hide();
                $("#etq_lune").show();
                $("#etq_mars").hide();


            });

            $("#ong_mars").click(function(event) {
                $("#poids40kg").hide();
                $("#txtmass").hide();
                astro = "mars";
                $("#meteor").remove();
                // Renovation du drag and drop : remove drag et drop zone
                $("#meteor").remove();
                $("#balGauche").remove();
                $("#dynamo").remove();
                $("#socle").remove();
                $("#labo").append("<div id='socle' class='dropper'></div>");
                $("#labo").append("<div id='dynamo' class='dropper'></div>");
                $("#labo").append("<div id='balGauche' class='dropper'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
                $("#socle").append("<div id='meteor' class='draggable'></div>");
                //Il faut récupérer le faiseur de drag en l'applicant à meteor qui vient d'être recréé
                draganddroper();
                //Il faut récupérer le faiseur de drag en l'applicant à meteor qui vient d'être recréé
                $("#zero-grav").show();
                $("#grav-lune").hide();
                $("#grav-mars").hide();
                $("#grav-terre").hide();
                $("#path4268").css("display", "none");
                $("#path4268-7").show();
                $("#path4292").hide();
                $("#bgsvg").css("fill", "#854e37");
                $("#etq_terre").hide();
                $("#etq_lune").hide();
                $("#etq_mars").show();
            });

            $("#ong_terre").click(function(event) {
                $("#poids40kg").hide();
                $("#txtmass").hide();
                astro = "terre";
                // Renovation du drag and drop : remove drag et drop zone
                $("#meteor").remove();
                $("#balGauche").remove();
                $("#dynamo").remove();
                $("#socle").remove();
                $("#labo").append("<div id='socle' class='dropper'></div>");
                $("#labo").append("<div id='dynamo' class='dropper'></div>");
                $("#labo").append("<div id='balGauche' class='dropper'><span id='txtmass'>Masse mesurée : 40 kg</span></div>");
                $("#socle").append("<div id='meteor' class='draggable'></div>");
                //Il faut récupérer le faiseur de drag en l'applicant à meteor qui vient d'être recréé
                draganddroper();
                //Il faut récupérer le faiseur de drag en l'applicant à meteor qui vient d'être recréé
                $("#zero-grav").show();
                $("#grav-lune").hide();
                $("#grav-mars").hide();
                $("#grav-terre").hide();

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


                // GESTION DRAG & DROP
                var dragImg = new Image(); // Il est conseillé de précharger l'image, sinon elle risque de ne pas s'afficher pendant le déplacement
                //dragImg.src = getpathmeteor[1];
                dragImg.src = $(getpathmeteor2).attr("src");


                var dndHandler = {

                    draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement

                    applyDragEvents: function(element) {

                        element.draggable = true;

                        var dndHandler = this; // Cette variable est nécessaire pour que l'événement "dragstart" ci-dessous accède facilement au namespace "dndHandler"

                        element.addEventListener('dragstart', function(e) {
                            dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
                            e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox
                            e.dataTransfer.setDragImage(dragImg, 40, 40);


                        }, false);

                    },

                    applyDropEvents: function(dropper) {


                        dropper.addEventListener('dragover', function(e) {
                            e.preventDefault(); // On autorise le drop d'éléments


                            this.className = 'dropper drop_hover'; // Et on applique le design adéquat à notre zone de drop quand un élément la survole
                        }, false);

                        dropper.addEventListener('dragleave', function() {
                            this.className = 'dropper'; // On revient au design de base lorsque l'élément quitte la zone de drop
                        });

                        var dndHandler = this; // Cette variable est nécessaire pour que l'événement "drop" ci-dessous accède facilement au namespace "dndHandler"

                        dropper.addEventListener('drop', function(e) {

                            var target = e.target,
                                draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
                                clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément

                            var cible = String(target.id);
                            if (cible == "balGauche") {
                                // Repositionner la div de la dynamo et vice et versa ne pas oublier le cas du socle
                                $("#dynamo").css("top", "0px");
                                $("#poids40kg").show();
                                $("#txtmass").show();
                                $("#zero-grav").show();
                                $("#grav-lune").hide();
                                $("#grav-mars").hide();
                                $("#grav-terre").hide();


                            }
                            if (cible == "dynamo") {
                               // $("#balGauche").css("top", "275px").css("left", "268px"); //Repositionne la div
                                $("#poids40kg").hide();
                                $("#txtmass").hide();
                                
                                if (astro == "terre") {
                                    $("#zero-grav").hide();
                                    $("#grav-lune").hide();
                                    $("#grav-mars").hide();
                                    $("#grav-terre").show();
                                    $(this).css("top", "155px");
                                }
                                if (astro == "lune") {
                                    $("#zero-grav").hide();
                                    $("#grav-lune").show();
                                    $("#grav-mars").hide();
                                    $("#grav-terre").hide();
                                    $(this).css("top", "60px");
                                }
                                if (astro == "mars") {
                                    $("#zero-grav").hide();
                                    $("#grav-lune").hide();
                                    $("#grav-mars").show();
                                    $("#grav-terre").hide();
                                    $(this).css("top", "85px");
                                }
                            }
                            if (cible == "socle") {
                                // Repositionner la div dynamo
                                $("#dynamo").css("top", "0px");
                                //$("#balGauche").css("top", "275px").css("left", "268px"); //Repositionne la div bal
                                $("#poids40kg").hide();
                                $("#txtmass").hide();
                                $("#zero-grav").show();
                                $("#grav-lune").hide();
                                $("#grav-mars").hide();
                                $("#grav-terre").hide();

                            }


                            while (target.className.indexOf('dropper') == -1) { // Cette boucle permet de remonter jusqu'à la zone de drop parente
                                target = target.parentNode;
                            }

                            target.className = 'dropper'; // Application du design par défaut

                            clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
                            dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()

                            draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément d'origine

                        });

                    }

                };


                var elements = document.querySelectorAll('.draggable'),
                    elementsLen = elements.length;

                for (var i = 0; i < elementsLen; i++) {
                    console.log(elements[i]);
                    dndHandler.applyDragEvents(elements[i]); // Application des paramètres nécessaires aux élément déplaçables
                }

                var droppers = document.querySelectorAll('.dropper'),
                    droppersLen = droppers.length;

                var basestation = document.querySelectorAll('.base'),
                    basestationlen = basestation.length;

                for (var i = 0; i < droppersLen; i++) {
                    dndHandler.applyDropEvents(droppers[i]); // Application des événements nécessaires aux zones de drop
                }
            }

        
    }


    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config, assetManager){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme

            renderChoices(id, $container, config, assetManager); // Applique les fonctions de mise en forme
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        },
    };
});