define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config, assetManager){

         // Init variables 
            var statueloc = 0; // 0=socle, 1=balance, 2=becher
            var onoff = 0; // Etat : éteint allumé de la balance.
            var tare = 0; //Etat de la tare
            var niveau = 0;
            var diffniv = 0;
            var neutralisor = 0; //La statue sort du bain indice pris par le drag départ. 0 faux
            var special = 0; //Se met sur 1 si on
            var answvanne = "not-use";
            var answbal = "not-use";
            var answbecher = "not-use";

            //Insertion de Orus
           $("#zonesocle").append($('<img>', {src: assetManager.resolve('delor/runtime/img/orus.png')}).attr('id','catgod').attr('class','draggable'));

            //<img src="delor/runtime/img/orus.png" id="catgod" class="draggable" width="80px" />

            // Création de la vanne 
            $("#robi").append("<div class='modifeau'>Modifier le volume d'eau</div><br /><input type='range' id='vanne' step='5' min='0' ma='140'><div id='moins'>- Moins</div><div id='plus' >Plus +</div>");

            //Bouton tare
            $("#g5982").click(function(event) {
                if (statueloc == 1) {
                    tare = -190;
                    $("#tspan5974").html("0 g");
                } else if (statueloc == 0 || statueloc == 2) {
                    tare = 0;
                    $("#tspan5974").html(tare + " g")
                };
            });

            // Vanne de remplissage 
            $("#rect5659-1").attr("height", 0);
            $("#vanne").val(0);

            var oldVal;
            $("#vanne").on("input", function() {
                var newVal = $(this).val();
                if (newVal > oldVal) {
                    $("#rect5659-1-1").css("height", "455px");
                    $("#rect5659-1-1").show();
                } else if (newVal < oldVal) {
                    /* $("div").text("left");*/
                }
                oldVal = newVal;
            });

            $("#vanne").mouseup(function(event) {
                if(answvanne=="not-use"){$("#deloransw").append(" vanne-ok,"); answvanne="vanne-ok"; }
                obBecher.remplir();
                //console.log("statueloc depuis vanne : " + statueloc);
                // La statue est dans le becher vide
                if (statueloc == 2 && niveau == 0) {
                    /*console.log("Statue dans Becher vide");*/
                    niveau = $("#vanne").val();
                    //console.log(niveau);
                    $("#rect5659-1-1").hide();
                    if (niveau > 97) {
                        niveau = 97;
                        $("#lecvol").html("Lecture impossible du volume");
                        $("#deborde").show();
                        $("#rect5659-1").attr("height", niveau * 4);
                    } else if (niveau > 85 && niveau < 97) {
                        $("#lecvol").html("Lecture impossible du volume");
                        $("#rect5659-1").attr("height", niveau * 4);
                        $("#deborde").hide();
                    } else {
                        $("#lecvol").html("Volume lu : " + niveau + " mL");
                        $("#deborde").hide();
                        $("#rect5659-1").attr("height", niveau * 4);
                    }

                } else {
                    /*console.log("Becher vide sans rien dedans");*/
                    niveau = $("#vanne").val();
                    $("#rect5659-1-1").hide();
                    if (niveau > 85 && niveau < 97) {
                        $("#lecvol").html("Lecture impossible du volume");
                        $("#rect5659-1").attr("height", niveau * 4);
                        $("#deborde").hide();
                    } else if (niveau > 97) {
                        niveau = 97;
                        $("#lecvol").html("Lecture impossible du volume");
                        $("#deborde").show();
                        $("#rect5659-1").attr("height", niveau * 4);
                    } else {
                        niveau = $("#vanne").val();

                        $("#lecvol").html("Volume lu : " + niveau + " mL");
                        $("#deborde").hide();
                        $("#rect5659-1").attr("height", niveau * 4);

                    }
                }
            });

            // Position de départ : off 
            $("#tspan5974").hide();
            $("#tspan5974").attr("x", 480).attr("y", 1000);
            //$("#rect5970").css("fill","grey");

            // Bouton on / off  
            $("#image5962").click(function(event) {
                if (onoff == 0) {
                    console.log("Allumé");
                    $("#tspan5974").show();
                    $("#path4217").css("fill", "#00ff00");
                    $("#tspan5974").css("opacity", 1);
                    $("#tspan5974").css("fill", "green");
                    $("#rect5970").css("fill", "grey");
                    onoff = 1;
                } else {
                    console.log("Eteint");
                    $("#tspan5974").hide();
                    $("#path4217").css("fill", "red");
                    $("#tspan5974").css("opacity", 0);
                    $("#tspan5974").css("fill", "green");
                    $("#rect5970").css("fill", "#28261c");
                    onoff = 0;
                    tare = 0;
                    $("#tspan5974").html(tare + " g");
                }

            });

            // POO du Becher et de son interaction avec statuette
            var obBecher = {
                niveau: 0,
                statue: false,
                seuil1: false, // non submergée
                seuil2: false, // submergé lisible
                seuil3: false, // submergé illisible
                seuil4: false, // submergé débordée
                messageVolume: "",
                remplissage: false, // Remplissage false = vide total, si au départ la statue est présente et on remplit alors true

                remplir: function() {
                    // Deux cas : remplissage à vide ou à plein.
                    if (this.statue == true) { // A vide
                        this.remplissage = true; // Je signale que j'ai rempli avec la statue
                        console.log("remplissage : " + this.remplissage);


                    }

                    var eauDebit = parseInt($("#vanne").val());
                    if (this.statue == true) {
                        if (eauDebit > 0 && eauDebit < 47.6) { // non submergée
                            this.seuil1 = true;
                            this.seuil2 = false;
                            this.seuil3 = false;
                            this.seuil4 = false;
                            this.niveau = eauDebit * 1.2;
                        } else if (eauDebit > 47.5 && eauDebit < 90) { // submergé lisible
                            this.seuil1 = false;
                            this.seuil2 = true;
                            this.seuil3 = false;
                            this.seuil4 = false;
                            this.niveau = eauDebit + 10;
                        } else if (eauDebit > 89 && eauDebit < 97) { // submergé illisible
                            this.seuil1 = false;
                            this.seuil2 = false;
                            this.seuil3 = true;
                            this.seuil4 = false;
                            this.niveau = eauDebit + 10;
                        } else if (eauDebit < 97) { // submergé débordée
                            this.seuil1 = false;
                            this.seuil2 = false;
                            this.seuil3 = false;
                            this.seuil4 = true;
                            this.niveau = 97;
                        }
                    } else {
                        console.log('je remplis mais la statue est out !');
                        if (eauDebit > 0 && eauDebit < 47.6) { // non submergée
                            this.seuil1 = true;
                            this.seuil2 = false;
                            this.seuil3 = false;
                            this.seuil4 = false;

                            this.niveau = eauDebit;
                        } else if (eauDebit > 47.5 && eauDebit < 90) { // submergé lisible
                            this.seuil1 = false;
                            this.seuil2 = true;
                            this.seuil3 = false;
                            this.seuil4 = false;
                            this.niveau = eauDebit;
                        } else if (eauDebit > 89 && eauDebit < 97) { // submergé illisible
                            this.seuil1 = false;
                            this.seuil2 = false;
                            this.seuil3 = true;
                            this.seuil4 = false;
                            this.niveau = eauDebit;
                        } else if (eauDebit > 95) { // submergé débordée
                            this.seuil1 = false;
                            this.seuil2 = false;
                            this.seuil3 = false;
                            this.seuil4 = true;
                            this.niveau = 97;
                        }
                    }
                    console.log("Statue dans becher:" + this.statue);
                    console.log("Seuil1 : " + this.seuil1);
                    console.log("Seuil2 : " + this.seuil2);
                    console.log("Seuil3 : " + this.seuil3);
                    console.log("Seuil4 : " + this.seuil4);
                    return this.niveau;
                },
                mettreStatue: function() {

                    // Modification du niveau à l'entrée de la statue
                    // Attention au changement de seuil pour l'affichage
                    var eauDebit = parseInt($("#vanne").val());
                    if (eauDebit == 0) { // Dépose à sec de la statue
                        this.niveau = 0; // Veille au résidu de this.niveau dans le cas 0
                        console.log("Dépose à sec : " + this.niveau);
                        ajusterNiveau(this.niveau);
                    } else { // Dépose de la statue dans un niveau d'eau
                        console.log("seuil 1 - le niveau : " + this.niveau);
                        console.log("seuil 1" + this.seuil1);

                        if (this.seuil1 == true) {
                            this.niveau = this.niveau * 1.2;
                            console.log("seuil 1 - le niveau : " + this.niveau);
                            ajusterNiveau(this.niveau * 4);
                            $("#lecvol").html("Volume lu : " + this.niveau + " mL");
                            // this.remplissage = true;// Signale que la statuette est à nouveau dans le becher
                        }
                        if (this.seuil2 == true) {
                            this.niveau = this.niveau + 10;
                            if (this.niveau < 86) { $("#lecvol").html("Volume lu : " + this.niveau + " mL"); } else { $("#lecvol").html("Lecture du volume impossible"); }
                            console.log("seuil 2 - le niveau : " + this.niveau);
                            ajusterNiveau(this.niveau * 4);

                            // this.remplissage = true;
                        }
                        if (this.seuil3 == true) {
                            // Cas du chgt de seuil 
                            if (this.niveau > 94) {
                                //this.niveau = 100;
                                ajusterNiveau(97 * 4);
                                // Affichage du débordement
                                console.log("seuil 3 - le niveau : " + this.niveau);
                                $("#deborde").show();
                            } else {
                                this.niveau = 97;
                                ajusterNiveau(this.niveau * 4);
                            }
                            //this.remplissage = true;
                            $("#lecvol").html("Lecture du volume impossible");

                        }
                        if (this.seuil4 == true) {
                            console.log("seuil 4 - le niveau : " + this.niveau);
                            console.log("volume eau :" + eauDebit);
                            console.log("volume eau + statue :" + this.niveau);
                            this.niveau = 97;
                            ajusterNiveau(this.niveau * 4);
                            //this.remplissage = true;
                            $("#lecvol").html("Lecture du volume impossible");
                        }
                    }
                    this.statue = true;
                    console.log("Position de la statue:" + this.statue);
                    console.log("remplissage:" + this.remplissage);
                    return this.niveau;
                },
                sortirStatue: function() {
                    var eauDebit = parseInt($("#vanne").val());
                    // Dans le cas ou la statue est dedans et que je remplis c'est debitdeau=niveau
                    // Donc quand je sors la statue ne pas oublier de corriger la position du curseur et d'ajuster ainsi eaudebit pour la prochaine manip.
                    console.log("ici sortirStatue");
                    // Déterminer le seuil et le niveau
                    console.log("niveau de sortie : " + this.niveau);
                    // En fonction de ce niveau, tu es dans un seuil
                    console.log(" sortie -Seuil1 : " + this.seuil1);
                    console.log(" sortie -Seuil2 : " + this.seuil2);
                    console.log(" sortie -Seuil3 : " + this.seuil3);
                    console.log(" sortie -Seuil4 : " + this.seuil4);
                    console.log("remplissage : " + this.remplissage);
                    if (this.remplissage == true) {
                        if (this.seuil1 == true) {

                            console.log("eauDebit :" + eauDebit);
                            console.log("position vannes :" + $("#vanne").val());
                            console.log("this.niveau :" + parseInt(this.niveau));

                            this.niveau = eauDebit / 1.2;
                            $("#lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                            $("#deborde").hide();
                            this.remplissage = false; //on sort de ce cas particulier
                        } else if (this.seuil2 == true) {
                            console.log("eauDebit : " + eauDebit);
                            console.log("niveau   : " + this.niveau);
                            eauDebit = $("#vanne").val(); //mise à jour eauDebit
                            this.niveau = eauDebit - 10;
                            // $("#vanne").val(this.niveau); 
                            $("#lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                            $("#deborde").hide();
                            this.remplissage = false; //on sort de ce cas particulier

                        } else if (this.seuil3 == true) {
                            eauDebit = $("#vanne").val(); //mise à jour eauDebit
                            this.niveau = eauDebit - 10;
                            //$("#vanne").val(this.niveau);
                            $("#lecvol").html("Lecture du volume impossible");
                            this.remplissage = false; //on sort de ce cas particulier   
                            $("#deborde").hide();
                        } else {
                            eauDebit = $("#vanne").val(); //mise à jour eauDebit
                            this.niveau = eauDebit - 10;
                            //$("#vanne").val(this.niveau);
                            $("#deborde").hide();
                            $("#lecvol").html("Lecture du volume impossible");
                            this.seuil3 = true; // Important il faut gérer le chgt de seuil.
                            this.remplissage = false; //on sort de ce cas particulier 
                        } // cas seuil 4.   

                    } else {
                        if (this.seuil1 == true) {
                            this.niveau = this.niveau / 1.2;
                            console.log("controle de this.niveau :" + this.niveau);
                            ajusterNiveau(this.niveau * 4);
                            $("#lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                            $("#deborde").hide();
                        } else if (this.seuil2 == true) {
                            console.log("eauDebit : " + eauDebit);
                            console.log("niveau   : " + this.niveau);
                            this.niveau = this.niveau - 10;
                            ajusterNiveau(this.niveau * 4);
                            $("#lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                            $("#deborde").hide();

                        } else if (this.seuil3 == true) {
                            this.niveau = this.niveau - 10;
                            $("#lecvol").html("Lecture du volume impossible");
                            $("#deborde").hide();
                        } else {
                            this.niveau = this.niveau - 10;
                            $("#deborde").hide();
                            $("#lecvol").html("Lecture du volume impossible");
                        } // cas seuil 4. 

                    }

                    console.log("Sortie : nouveau niveau : " + this.niveau);
                    ajusterNiveau(this.niveau * 4);
                    // $("#lecvol").html("Cas pas clair 2");
                    this.statue = false;
                    return this.niveau;
                }
            }

            function ajusterNiveau(niveauVisuel) {
                $("#rect5659-1").attr("height", niveauVisuel);

            }

            // **************Gestion du drag and drop*****************************
            draganddroper();

            function draganddroper() {


                // GESTION DRAG & DROP
                var dndHandler = {

                    draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement

                    applyDragEvents: function(element) {

                        element.draggable = true;

                        var dndHandler = this; // Cette variable est nécessaire pour que l'événement "dragstart" ci-dessous accède facilement au namespace "dndHandler"

                        element.addEventListener('dragstart', function(e) {
                            dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
                            e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox

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

                            // Ici les conditions dropper
                            if (cible == "zonesocle") {
                                obBecher.statue = false;
                                var poidssta =  $("#tspan5974").text();
                                if (statueloc == 1 && poidssta=="0 g" && onoff==1){console.log("cas 0 vers -190");
                                    $("#tspan5974").html("-190 g");
                                    tare=-190;
                                } 
                                else if(statueloc == 1 && poidssta=="190 g"){
                                     $("#tspan5974").html("0 g");
                                }    
                                else if (statueloc == 2) {
                                    obBecher.sortirStatue();
                                }
                                
                                statueloc = 0; 
                                // $("#tspan5974").html(tare + " g");
                               
                                
                            }
                            if (cible == "zonepese") {
                                 if(answbal=="not-use"){$("#deloransw").append(" balance-ok,"); answbal="bal-ok"; }
                                $("#catgod").css("left", "47px").css("top", "64px");
                                obBecher.statue = false;
                                if (statueloc == 2) {
                                    obBecher.sortirStatue();
                                }
                                statueloc = 1;
                                if (onoff == 1 && tare == 0) { $("#tspan5974").html("190 g"); } else if (onoff == 0) {
                                    console.log("onoff : " + onoff);
                                    $("#tspan5974").html("0 g");
                                } else if (onoff == 1 && tare < 0) { $("#tspan5974").html("0 g"); } else { tare = 0; }
                                console.log(tare);



                            }
                            if (cible == "zoneplonge") {
                                 if(answbecher=="not-use"){$("#deloransw").append(" becher-ok,"); answbecher="becher-ok"; }
                                var poidssta2 =  $("#tspan5974").text();
                                if (statueloc == 1 && poidssta2=="0 g" && onoff==1 ){console.log("cas 0 vers -190");
                                    $("#tspan5974").html("-190 g");
                                    tare=-190;
                                } 
                                else if(statueloc == 1 && poidssta2=="190 g"){
                                     $("#tspan5974").html("0 g");
                                }  
                                statueloc = 2; // Localise la statuette position Becher
                                obBecher.statue = true; // Met à jour l'objet obBecher
                                obBecher.mettreStatue(); //Lance la méthode de l'objet
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

            //Ajustement gradation aux pixels près.

            $("#grad-1").attr('d', 'm 102.83939,959 31.31473,0');
            $("#grad-99-1").attr('d', 'm 102.7786,938.66332 31.31473,0');
            $("#grad-6").attr('d', 'm 102.72541,919 31.31473,0');
            $("#grad-99-0").attr('d', 'm 102.66462,899 31.31473,0');
            $("#grad-1-7").attr('d', 'm 102.52924,879 31.31473,0');
            $("#grad-99-1-5").attr('d', 'm 102.46845,859 31.31473,0');
            $("#grad-3").attr('d', 'm 102.40442,839 31.31473,0');
            $("#grad-99-4").attr('d', 'm 102.34363,819 31.31473,0');
            $("#grad-1-0").attr('d', 'm 102.20825,799 31.31473,0');
            $("#grad-99-1-52").attr('d', 'm 102.14746,779 31.31473,0');
            $("#grad-6-3").attr('d', 'm 102.09427,759 31.31473,0');
            $("#grad-99-0-8").attr('d', 'm 102.03348,739 31.31473,0');
            $("#grad-1-7-5").attr('d', 'm 101.8981,719 31.31473,0');
            $("#grad-99-1-5-7").attr('d', 'm 101.83731,699 31.31473,0');
            //--------------    

            //listening to dynamic configuration change
            /*this.on('levelchange', function(level){
                _this.config.level = level;
                renderer.renderChoices(_this.id, _this.dom, _this.config);
            });*/
    }


    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config, assetManager){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme

            renderChoices(id, $container, config,assetManager ); // Applique les fonctions de mise en forme
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        },
        
    };
});