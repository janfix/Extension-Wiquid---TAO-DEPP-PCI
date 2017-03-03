define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html) {

    "use strict";  

    function renderChoices(id, $container, config, assetManager) {

        // Init variables 
        var statueloc = 0; // 0=base, 1=scale, 2=beaker
        var onoff = 0; // State : scale is off.
        var tare = 0; //Tare
        var niveau = 0;
        var diffniv = 0;
        var neutralisor = 0; //the statue get out of the beaker starting point =0  /false
        var special = 0; // 1 = on
        var answvanne = "not-use";
        var answbal = "not-use";
        var answbecher = "not-use";

        //Insert Orus
        $container.find(".zonesocle").append($('<img>', { src: assetManager.resolve('delor/runtime/img/orus.png') }).attr('id', 'catgod').attr('class', 'draggable catgod'));

        // Create the water valve 
        $container.find(".robi").append("<div class='modifeau'>Modifier le volume d'eau</div><br /><input type='range' id='vanne' class='vanne' step='5' min='0' ma='140'><div id='moins'>- Moins</div><div id='plus' class='plus' >Plus +</div>");
        var $vanne = $container.find(".vanne");
        // Tare button
        $container.find(".g5982").click(function(event) {
            if (statueloc === 1) {
                tare = -190;
                $container.find(".tspan5974").html("0 g");
            } else if (statueloc === 0 || statueloc === 2) {
                tare = 0;
                $container.find(".tspan5974").html(tare + " g");
            }
        });

        // Water valve 
        $container.find(".rect5659-1").attr("height", 0);
        $vanne.val(0);

        var oldVal;
        $vanne.on("input", function() {
            var newVal = $(this).val();
            if (newVal > oldVal) {
                $container.find(".rect5659-1-1").css("height", "455px");
                $container.find(".rect5659-1-1").show();
            } else if (newVal < oldVal) {}
            oldVal = newVal;
        });

        $vanne.mouseup(function(event) {
            if (answvanne == "not-use") { $(".deloransw").append(" vanne-ok,");
                answvanne = "vanne-ok"; }
            obBecher.remplir();
            // the statue est in the empty beaker
            if (statueloc === 2 && niveau === 0) {
                niveau = $vanne.val();
                $container.find(".rect5659-1-1").hide();
                if (niveau > 97) {
                    niveau = 97;
                    $container.find(".lecvol").html("Lecture impossible du volume");
                    $container.find(".deborde").show();
                    $container.find(".rect5659-1").attr("height", niveau * 4);
                } else if (niveau > 85 && niveau < 97) {
                    $container.find(".lecvol").html("Lecture impossible du volume");
                    $container.find(".rect5659-1").attr("height", niveau * 4);
                    $container.find(".deborde").hide();
                } else {
                    $container.find(".lecvol").html("Volume lu : " + niveau + " mL");
                    $container.find(".deborde").hide();
                    $container.find(".rect5659-1").attr("height", niveau * 4);
                }

            } else {
                niveau = $vanne.val();
                $container.find(".rect5659-1-1").hide();
                if (niveau > 85 && niveau < 97) {
                    $container.find(".lecvol").html("Lecture impossible du volume");
                    $container.find(".rect5659-1").attr("height", niveau * 4);
                    $container.find(".deborde").hide();
                } else if (niveau > 97) {
                    niveau = 97;
                    $container.find(".lecvol").html("Lecture impossible du volume");
                    $container.find(".deborde").show();
                    $container.find(".rect5659-1").attr("height", niveau * 4);
                } else {
                    niveau = $vanne.val();

                    $container.find(".lecvol").html("Volume lu : " + niveau + " mL");
                    $container.find(".deborde").hide();
                    $container.find(".rect5659-1").attr("height", niveau * 4);

                }
            }
        });

        // Starting Position  : off 
        $container.find(".tspan5974").hide();
        $container.find(".tspan5974").attr("x", 480).attr("y", 1000);

        // On / off  button
        $container.find(".image5962").click(function(event) {
            if (onoff === 0) {
                $container.find(".tspan5974").show();
                $container.find(".path4217").css("fill", "#00ff00");
                $container.find(".tspan5974").css("opacity", 1);
                $container.find(".tspan5974").css("fill", "green");
                $container.find(".rect5970").css("fill", "grey");
                onoff = 1;
            } else {
                $container.find(".tspan5974").hide();
                $container.find(".path4217").css("fill", "red");
                $container.find(".tspan5974").css("opacity", 0);
                $container.find(".tspan5974").css("fill", "green");
                $container.find(".rect5970").css("fill", "#28261c");
                onoff = 0;
                tare = 0;
                $container.find(".tspan5974").html(tare + " g");
            }

        });

        // POO ->  Interaction beaker and avec statue
        var obBecher = {
            niveau: 0,
            statue: false,
            seuil1: false, // non submerged
            seuil2: false, // submerged readable
            seuil3: false, // submerged unreadable
            seuil4: false, // submerged overflow
            messageVolume: "",
            remplissage: false, // fill false =  totally empty, if the statue is in the beaker before water: true

            remplir: function() {
                // two cases : fill from empty or not.
                if (this.statue === true) { // from empty
                    this.remplissage = true; // the statue is already in the beaker
                }

                var eauDebit = parseInt($vanne.val());
                if (this.statue === true) {
                    if (eauDebit > 0 && eauDebit < 47.6) { // non submerged
                        this.seuil1 = true;
                        this.seuil2 = false;
                        this.seuil3 = false;
                        this.seuil4 = false;
                        this.niveau = eauDebit * 1.2;
                    } else if (eauDebit > 47.5 && eauDebit < 90) { //  submerged readable
                        this.seuil1 = false;
                        this.seuil2 = true;
                        this.seuil3 = false;
                        this.seuil4 = false;
                        this.niveau = eauDebit + 10;
                    } else if (eauDebit > 89 && eauDebit < 97) { // submerged unreadable
                        this.seuil1 = false;
                        this.seuil2 = false;
                        this.seuil3 = true;
                        this.seuil4 = false;
                        this.niveau = eauDebit + 10;
                    } else if (eauDebit < 97) { // submerged overflow
                        this.seuil1 = false;
                        this.seuil2 = false;
                        this.seuil3 = false;
                        this.seuil4 = true;
                        this.niveau = 97;
                    }
                } else {
                    if (eauDebit > 0 && eauDebit < 47.6) { // non submerged
                        this.seuil1 = true;
                        this.seuil2 = false;
                        this.seuil3 = false;
                        this.seuil4 = false;

                        this.niveau = eauDebit;
                    } else if (eauDebit > 47.5 && eauDebit < 90) { //  submerged readable
                        this.seuil1 = false;
                        this.seuil2 = true;
                        this.seuil3 = false;
                        this.seuil4 = false;
                        this.niveau = eauDebit;
                    } else if (eauDebit > 89 && eauDebit < 97) { // submerged unreadable
                        this.seuil1 = false;
                        this.seuil2 = false;
                        this.seuil3 = true;
                        this.seuil4 = false;
                        this.niveau = eauDebit;
                    } else if (eauDebit > 95) { // submerged overflow
                        this.seuil1 = false;
                        this.seuil2 = false;
                        this.seuil3 = false;
                        this.seuil4 = true;
                        this.niveau = 97;
                    }
                }
                return this.niveau;
            },
            mettreStatue: function() {

                // Modification of water level when statue get in
                // not constant !
                var eauDebit = parseInt($vanne.val());
                if (eauDebit === 0) { // Beaker is dry
                    this.niveau = 0; // reset water level to 0
                    ajusterNiveau(this.niveau);
                } else { // Water is present in Beaker
                    if (this.seuil1 === true) {
                        this.niveau = this.niveau * 1.2;
                        ajusterNiveau(this.niveau * 4);
                        $container.find(".lecvol").html("Volume lu : " + this.niveau + " mL");
                    }
                    if (this.seuil2 === true) {
                        this.niveau = this.niveau + 10;
                        if (this.niveau < 86) { $(".lecvol").html("Volume lu : " + this.niveau + " mL"); } else { $(".lecvol").html("Lecture du volume impossible"); }
                        ajusterNiveau(this.niveau * 4);

                    }
                    if (this.seuil3 === true) {
                        // levels 
                        if (this.niveau > 94) {

                            ajusterNiveau(97 * 4);
                            // display overflow
                            $container.find(".deborde").show();
                        } else {
                            this.niveau = 97;
                            ajusterNiveau(this.niveau * 4);
                        }
                        $container.find(".lecvol").html("Lecture du volume impossible");

                    }
                    if (this.seuil4 === true) {
                        this.niveau = 97;
                        ajusterNiveau(this.niveau * 4);
                        $container.find(".lecvol").html("Lecture du volume impossible");
                    }
                }
                this.statue = true;
                return this.niveau;
            },
            sortirStatue: function() {
                var eauDebit = parseInt($vanne.val());
                //adjust water level on statue exit
                if (this.remplissage === true) {
                    if (this.seuil1 === true) {

                        this.niveau = eauDebit / 1.2;
                        $container.find(".lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                        $container.find(".deborde").hide();
                        this.remplissage = false;
                    } else if (this.seuil2 === true) {
                        eauDebit = $vanne.val();
                        this.niveau = eauDebit - 10;
                        $container.find(".lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                        $container.find(".deborde").hide();
                        this.remplissage = false;

                    } else if (this.seuil3 === true) {
                        eauDebit = $vanne.val();
                        this.niveau = eauDebit - 10;
                        $container.find(".lecvol").html("Lecture du volume impossible");
                        this.remplissage = false;
                        $container.find(".deborde").hide();
                    } else {
                        eauDebit = $vanne.val();
                        this.niveau = eauDebit - 10;
                        $container.find(".deborde").hide();
                        $container.find(".lecvol").html("Lecture du volume impossible");
                        this.seuil3 = true;
                        this.remplissage = false;
                    }

                } else {
                    if (this.seuil1 === true) {
                        this.niveau = this.niveau / 1.2;
                        ajusterNiveau(this.niveau * 4);
                        $container.find(".lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                        $container.find(".deborde").hide();
                    } else if (this.seuil2 === true) {
                        this.niveau = this.niveau - 10;
                        ajusterNiveau(this.niveau * 4);
                        $container.find(".lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                        $container.find(".deborde").hide();

                    } else if (this.seuil3 === true) {
                        this.niveau = this.niveau - 10;
                        $container.find(".lecvol").html("Lecture du volume impossible");
                        $container.find(".deborde").hide();
                    } else {
                        this.niveau = this.niveau - 10;
                        $container.find(".deborde").hide();
                        $container.find(".lecvol").html("Lecture du volume impossible");
                    }

                }
                ajusterNiveau(this.niveau * 4);
                this.statue = false;
                return this.niveau;
            }
        };

        function ajusterNiveau(niveauVisuel) {
            $container.find(".rect5659-1").attr("height", niveauVisuel);

        }

        // **************Orus drag and drop*****************************
        draganddroper();

        function draganddroper() {

            var dndHandler = {

                draggedElement: null,

                applyDragEvents: function(element) {

                    element.draggable = true;

                    var dndHandler = this;

                    element.addEventListener('dragstart', function(e) {
                        dndHandler.draggedElement = e.target;
                        e.dataTransfer.setData('text/plain', ''); // needed for Firefox

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


                        if (cible == "zonesocle") {
                            obBecher.statue = false;
                            var poidssta = $(".tspan5974").text();
                            if (statueloc == 1 && poidssta == "0 g" && onoff == 1) {
                                $container.find(".tspan5974").html("-190 g");
                                tare = -190;
                            } else if (statueloc == 1 && poidssta == "190 g") {
                                $container.find(".tspan5974").html("0 g");
                            } else if (statueloc == 2) {
                                obBecher.sortirStatue();
                            }

                            statueloc = 0;



                        }
                        if (cible == "zonepese") {
                            if (answbal == "not-use") { $(".deloransw").append(" balance-ok,");
                                answbal = "bal-ok"; }
                            $container.find(".catgod").css("left", "47px").css("top", "64px");
                            obBecher.statue = false;
                            if (statueloc == 2) {
                                obBecher.sortirStatue();
                            }
                            statueloc = 1;
                            if (onoff == 1 && tare == 0) { $(".tspan5974").html("190 g"); } else if (onoff == 0) {
                                $container.find(".tspan5974").html("0 g");
                            } else if (onoff == 1 && tare < 0) { $(".tspan5974").html("0 g"); } else { tare = 0; }
                        }
                        if (cible == "zoneplonge") {
                            if (answbecher == "not-use") { $(".deloransw").append(" becher-ok,");
                                answbecher = "becher-ok"; }
                            var poidssta2 = $(".tspan5974").text();
                            if (statueloc == 1 && poidssta2 == "0 g" && onoff == 1) {

                                $container.find(".tspan5974").html("-190 g");
                                tare = -190;
                            } else if (statueloc == 1 && poidssta2 == "190 g") {
                                $container.find(".tspan5974").html("0 g");
                            }
                            statueloc = 2;
                            obBecher.statue = true;
                            obBecher.mettreStatue();
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

        //Adjust beaker graduations .

        $container.find(".grad-1").attr('d', 'm 102.83939,959 31.31473,0');
        $container.find(".grad-99-1").attr('d', 'm 102.7786,938.66332 31.31473,0');
        $container.find(".grad-6").attr('d', 'm 102.72541,919 31.31473,0');
        $container.find(".grad-99-0").attr('d', 'm 102.66462,899 31.31473,0');
        $container.find(".grad-1-7").attr('d', 'm 102.52924,879 31.31473,0');
        $container.find(".grad-99-1-5").attr('d', 'm 102.46845,859 31.31473,0');
        $container.find(".grad-3").attr('d', 'm 102.40442,839 31.31473,0');
        $container.find(".grad-99-4").attr('d', 'm 102.34363,819 31.31473,0');
        $container.find(".grad-1-0").attr('d', 'm 102.20825,799 31.31473,0');
        $container.find(".grad-99-1-52").attr('d', 'm 102.14746,779 31.31473,0');
        $container.find(".grad-6-3").attr('d', 'm 102.09427,759 31.31473,0');
        $container.find(".grad-99-0-8").attr('d', 'm 102.03348,739 31.31473,0');
        $container.find(".grad-1-7-5").attr('d', 'm 101.8981,719 31.31473,0');
        $container.find(".grad-99-1-5-7").attr('d', 'm 101.83731,699 31.31473,0');
        //--------------    

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
