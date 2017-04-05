/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale  
Assets created by Wiquid.
All assets are under Creative Commons licence -
*/

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
        var svgstring;
        svgstring = fillsvg(); 

        $container.find(".svghome").append(svgstring);

        //Insert Orus
        $container.find(".zonesocle").prepend($('<img>', { src: assetManager.resolve('delor/runtime/img/orus.png') }).attr('class', 'draggable catgod'));

        // Create the water valve 
        $container.find(".robi").append("<div class='modifeau'>Modifier le volume d'eau</div><br /><input type='range' class='vanne' step='5' min='0' ma='140'><div class='moins'>- Moins</div><div  class='plus' >Plus +</div>");
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
            var newVal = $container.find(this).val();
            if (newVal > oldVal) {
                $container.find(".rect5659-1-1").css("height", "455px");
                $container.find(".rect5659-1-1").show();
            }
            oldVal = newVal;
        });

        $vanne.mouseup(function(event) {
            if (answvanne == "not-use") {
                $container.find(".deloransw").append(" vanne-ok,");
                answvanne = "vanne-ok";
            }
            obBecher.fillup();
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

        // POO ->  Interaction beaker and statue
        var obBecher = {
            niveau: 0,
            statue: false,
            seuil1: false, // non submerged
            seuil2: false, // submerged readable
            seuil3: false, // submerged unreadable
            seuil4: false, // submerged overflow
            messageVolume: "",
            remplissage: false, // fill false =  totally empty, if the statue is in the beaker before water: true

            fillup: function() {
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
            mettreStatue: function mettreStatue() {

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
                        if (this.niveau < 86) { $container.find(".lecvol").html("Volume lu : " + this.niveau + " mL"); } else { $container.find(".lecvol").html("Lecture du volume impossible"); }
                        ajusterNiveau(this.niveau * 4);

                    }
                    if (this.seuil3 === true) {
                        // levels
                        if (this.niveau > 94) {
                            ajusterNiveau(97 * 4);
                            // display overflow
                            $container.find(".deborde").show();
                        } 
                        else if(this.niveau < 94 && this.niveau > 87){
                              ajusterNiveau(this.niveau * 4.1);
                        } 
                        else {
                            this.niveau = 96;
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
            sortirStatue: function sortirStatue() {
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
                        if(this.niveau >85){
                            $container.find(".lecvol").html("Lecture du volume impossible");
                            $container.find(".deborde").hide();}
                        else{ 
                            $container.find(".lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                            $container.find(".deborde").hide(); }
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
                        if(this.niveau >85){
                            $container.find(".lecvol").html("Lecture du volume impossible");
                            $container.find(".deborde").hide();}
                        else{ 
                            $container.find(".lecvol").html("Volume lu : " + parseInt(this.niveau) + " mL");
                            $container.find(".deborde").hide(); }
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

                applyDragEvents: function applyDragEvents(element) {

                    element.draggable = true;

                    var dndHandler = this;

                    element.addEventListener('dragstart', function(e) {
                        dndHandler.draggedElement = e.target;
                        e.dataTransfer.setData('text/plain', null); // needed for Firefox

                    }, false);

                },

                applyDropEvents: function applyDropEvents(dropper) {


                    dropper.addEventListener('dragover', function(e) {
                        e.preventDefault();
                        
                        $container.find(this).addClass('drop_hover');
                    }, false);

                    dropper.addEventListener('dragleave', function() {
                        $container.find(this).removeClass('drop_hover');
                        
                    });

                    var dndHandler = this;

                    dropper.addEventListener('drop', function(e) {

                        var target = e.target,
                            draggedElement = dndHandler.draggedElement,
                            clonedElement = draggedElement.cloneNode(true);

                        var cible = String($container.find(target).attr("name"));

                        if (e.preventDefault) { e.preventDefault(); }
                        if (e.stopPropagation) { e.stopPropagation(); }

                        if (cible == "zonesocle") {
                            var poidssta = $container.find(".tspan5974").text();
                            obBecher.statue = false;

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
                            if (answbal == "not-use") {
                                $container.find(".deloransw").append(" balance-ok,");
                                answbal = "bal-ok";
                            }
                            $container.find(".catgod").css("left", "47px").css("top", "64px");
                            obBecher.statue = false;
                            if (statueloc == 2) {
                                obBecher.sortirStatue();
                            }
                            statueloc = 1;
                            if (onoff === 1 && tare === 0) { $container.find(".tspan5974").html("190 g"); } else if (onoff === 0) {
                                $container.find(".tspan5974").html("0 g");
                            } else if (onoff === 1 && tare < 0) { $container.find(".tspan5974").html("0 g"); } else { tare = 0; }
                        }
                        if (cible == "zoneplonge") {
                            if (answbecher == "not-use") {
                                $container.find(".deloransw").append(" becher-ok,");
                                answbecher = "becher-ok";
                            }
                            var poidssta2 = $container.find(".tspan5974").text();
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

                        $container.find(target).removeClass('drop_hover');
                        

                        clonedElement = target.appendChild(clonedElement);
                        dndHandler.applyDragEvents(clonedElement);

                        draggedElement.parentNode.removeChild(draggedElement);

                    });

                }

            };


            var elements = $container.find('.draggable'),
                elementsLen = elements.length;

            for (var i = 0; i < elementsLen; i++) {
                dndHandler.applyDragEvents(elements[i]);
            }

            var droppers = $container.find('.dropper'),
                droppersLen = droppers.length;

            var basestation =$container.find('.base'),
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

        function fillsvg(){ 
            svgstring = '<svg xmlns:osb="http://www.openswatchbook.org/uri/2009/osb" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="1000" height="500" viewBox="0 0 1000 500.00001" id="svg2" version="1.1" inkscape:version="0.91 r13725" sodipodi:docname="or.svg"> <defs id="defs4"> <inkscape:perspective sodipodi:type="inkscape:persp3d" inkscape:vp_x="446.03762 : 41.390321 : 1" inkscape:vp_y="0 : 735.41069 : 0" inkscape:vp_z="1107.2525 : 44.961751 : 1" inkscape:persp3d-origin="784.14503 : -16.322469 : 1" id="perspective4213" /> <inkscape:perspective sodipodi:type="inkscape:persp3d" inkscape:vp_x="417.46619 : 177.10461 : 1" inkscape:vp_y="0 : 735.4107 : 0" inkscape:vp_z="1078.6811 : 180.67604 : 1" inkscape:persp3d-origin="755.5736 : 119.39182 : 1" id="perspective5899" /> <linearGradient id="linearGradient5876" osb:paint="gradient"> <stop style="stop-color:#a41313;stop-opacity:1;" offset="0" id="stop5878" /> <stop style="stop-color:#a41313;stop-opacity:0;" offset="1" id="stop5880" /> </linearGradient> <pattern inkscape:collect="always" xlink:href="#Strips1_2" id="pattern5829" patternTransform="matrix(10,0,0,10,3.357143,-550.4336)" /> <pattern inkscape:stockid="Stripes 1:2" id="Strips1_2" patternTransform="translate(0,0) scale(10,10)" height="1" width="3" patternUnits="userSpaceOnUse" inkscape:collect="always"> <rect id="rect4934" height="2" width="1" y="-0.5" x="0" style="fill:black;stroke:none" /> </pattern> <pattern patternUnits="userSpaceOnUse" width="1006.7143" height="505.28572" patternTransform="translate(-3.357143,550.4336)" id="pattern5826"> <rect y="0.49858767" x="0.49858767" height="504.28854" width="1005.7171" id="rect5653" style="opacity:1;fill:#e3dbdb;fill-opacity:1;stroke:url(#pattern5829);stroke-width:0.99717534;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </pattern> </defs> <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="2.8" inkscape:cx="153.64036" inkscape:cy="103.20571" inkscape:document-units="px" inkscape:current-layer="layer1" showgrid="false" units="px" inkscape:window-width="1920" inkscape:window-height="1017" inkscape:window-x="1672" inkscape:window-y="-8" inkscape:window-maximized="1" /> <metadata id="metadata7"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <g inkscape:label="Calque 1" inkscape:groupmode="layer" id="layer1" transform="translate(0,-552.36216)"> <rect style="opacity:1;fill:#c68989;fill-opacity:1;stroke:none;stroke-width:4.88507509;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4152" width="1002.3473" height="70" x="-0.40843344" y="999.9494" ry="0" rx="0" /> <g id="deborde" class="deborde" transform="matrix(1,0,0,0.88938784,-34,115.84538)"> <ellipse ry="10.606602" rx="135.36044" cy="1036.7048" cx="186.87822" id="path6002" style="opacity:0.68900003;fill:#05fdfd;fill-opacity:0.98431373;stroke:none;stroke-width:1;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path sodipodi:nodetypes="ccccccc" inkscape:connector-curvature="0" id="path6019-1" d="m 273.13769,600.44799 4.88408,287.89201 2.29219,143.6956 -7.40155,-0.042 -22.754,2.5779 13.12139,-3.3109 z" style="fill:#05fdfd;fill-opacity:0.98431373;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" /> <path sodipodi:nodetypes="ccccc" inkscape:connector-curvature="0" id="path6019" d="m 136.65269,674.23155 -2.59458,229.63759 c -0.30935,50.42634 4.97725,126.32056 -33.18404,125.28446 12.70728,1.1956 22.6819,0.8454 35.42242,0.7833 z" style="fill:#05fdfd;fill-opacity:0.98431373;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" /> <rect transform="matrix(1,0,0.2269524,0.97390585,0,0)" y="616.54578" x="95.288628" height="0.3306869" width="37.602959" id="rect6036" style="opacity:1;fill:#6afdfc;fill-opacity:0.98431373;stroke:#01fcfb;stroke-width:0.68339467;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.97254902" /> </g> <ellipse style="opacity:1;fill:#333333;fill-opacity:1;stroke:#000000;stroke-width:0.10490175;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="path4225" cx="525.22095" cy="1042.786" rx="196.47223" ry="2.0178542" /> <rect style="opacity:0.42100004;fill:#04fefe;fill-opacity:0.98431373;stroke:none;stroke-width:0.46861804;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect5659-1-1" class="rect5659-1-1" width="15.948983" height="398.09409" x="140.79594" y="588.97644" transform="matrix(0.99875349,-0.04991454,0,1,0,0)" /> <rect style="opacity:1;fill:none;fill-opacity:0.39473685;stroke:none" width="1006.7143" height="505.28571" x="-7.3571429" y="550.43359" id="rect5831" /> <rect style="opacity:0.95400002;fill:#00ffff;fill-opacity:1;stroke:none;stroke-width:1.04709113;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect5659-1" class="rect5659-1" width="99.065109" height="388.58792" x="-201.69124" y="-1039.7788" transform="matrix(-0.99996929,0.00783652,0,-1,0,0)" ry="0" /> <path style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 102.14267,1038.9903 29.7995,-0.063 -1.07329,0" id="path5661" inkscape:connector-curvature="0" sodipodi:nodetypes="ccc" /> <rect style="opacity:0.40500004;fill:#ffffff;fill-opacity:1;stroke:#f4eed7;stroke-width:1.07263482;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect5659" width="96.140068" height="385.60629" x="103.58028" y="652.26886" transform="matrix(0.99996783,-0.00802073,0,1,0,0)" /> <rect style="opacity:1;fill:#22280b;fill-opacity:1;stroke:none;stroke-width:0.79407972;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect5785" width="45.662785" height="18.388666" x="124.49098" y="552.2337" /> <rect style="opacity:1;fill:#22280b;fill-opacity:1;stroke:none;stroke-width:1;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect5787" width="25.001276" height="11.364216" x="135.20055" y="564.711" /> <rect style="opacity:1;fill:#22280b;fill-opacity:1;stroke:none;stroke-width:0.7064392;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect5787-8" width="17.718693" height="11.657777" x="139.72572" y="570.75146" /> <text xml:space="preserve" style="font-style:normal;font-weight:normal;font-size:7.5px;line-height:112.99999952%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" x="422.24377" y="973.57025" id="text5917" sodipodi:linespacing="113%"><tspan sodipodi:role="line" id="tspan5919" x="422.24377" y="973.57025" /></text> <rect style="opacity:1;fill:#808080;fill-opacity:1;stroke:#000000;stroke-width:1.31233132;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4167" width="29.227489" height="18.759619" x="360.48389" y="1022.5405" /> <rect style="opacity:1;fill:#808080;fill-opacity:1;stroke:#000000;stroke-width:1.31233132;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4167-5" width="29.227489" height="18.759619" x="652.33197" y="1022.5404" /> <path style="fill:#f9f9f9;fill-rule:evenodd;stroke:#ffffff;stroke-width:1.31233132;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 317.22738,1022.6433 74.36143,-58.8787 260.87452,-0.85333 74.36143,59.73203 z" id="path4165" inkscape:connector-curvature="0" /> <rect style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#000000;stroke-width:1.31233132;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4199" width="119.34558" height="7.2152381" x="458.09088" y="955.79944" /> <rect style="opacity:1;fill:#f9f9f9;fill-opacity:1;stroke:#000000;stroke-width:1.30797565;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect4201" width="260.31131" height="14.435218" x="391.4137" y="941.00586" /> <path inkscape:connector-curvature="0" id="grad" d="m 103.03556,999.83423 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-9" d="m 103.06713,1019.5651 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <circle style="opacity:1;fill:#ff0000;fill-opacity:1;stroke:none;stroke-width:1;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.97254902" id="path4217" class="path4217" cx="411.64099" cy="987.60406" r="11.841079" /> <image y="975.16833" x="398.70435" id="image5962" class="image5962" xlink:href="data:image/png;base64,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 " style="image-rendering:optimizeQuality" preserveAspectRatio="none" height="25.424137" width="25.701239" /> <rect style="opacity:1;fill:#28261c;fill-opacity:0.39607843;stroke:#9c3838;stroke-width:1;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect5970" class="rect5970" width="131.75414" height="47.035839" x="451.61267" y="969.25977" ry="8.0812206" /> <text xml:space="preserve" style="font-style:normal;font-weight:normal;font-size:23.70619583px;line-height:112.99999952%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" x="500" y="1000.1145" id="text5972" sodipodi:linespacing="113%"><tspan sodipodi:role="line" id="tspan5974" class="tspan5974" x="500" y="1000.1145">0 g</tspan></text> <g id="g5982" class="g5982" transform="translate(-19.776644,14.162441)"> <rect ry="8.2142859" y="964.86212" x="615.07141" height="23.214285" width="68.571426" id="rect5976" style="opacity:1;fill:#808080;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <text sodipodi:linespacing="113%" id="text5978" y="982.08704" x="629.71423" style="font-style:normal;font-weight:normal;font-size:14.60262775px;line-height:112.99999952%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" xml:space="preserve"><tspan y="982.08704" x="629.71423" id="tspan5980" sodipodi:role="line">TARE</tspan></text> </g> <path inkscape:connector-curvature="0" id="grad-99" d="m 102.97477,980.11673 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-1" class="grad-1" d="m 102.83939,960.38077 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-99-1" class="grad-99-1" d="m 102.7786,940.66332 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-6" class="grad-6" d="m 102.72541,920.89912 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-99-0" class="grad-99-0" d="m 102.66462,901.18162 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-1-7" class="grad-1-7" d="m 102.52924,881.44572 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-99-1-5" class="grad-99-1-5" d="m 102.46845,861.72823 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-3" class="grad-3" d="m 102.40442,841.92853 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-99-4" class="grad-99-4" d="m 102.34363,822.21103 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-1-0" class="grad-1-0" d="m 102.20825,802.47507 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-99-1-52" class="grad-99-1-52" d="m 102.14746,782.75762 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-6-3" class="grad-6-3" d="m 102.09427,762.99342 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-99-0-8" class="grad-99-0-8" d="m 102.03348,743.27592 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-1-7-5" class="grad-1-7-5" d="m 101.8981,723.54002 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path inkscape:connector-curvature="0" id="grad-99-1-5-7" class="grad-99-1-5-7" d="m 101.83731,703.82253 31.31473,0" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none" d="m 102.84338,651.58654 -0.17331,387.56346 -43.436561,0 200.010201,0 -57.57869,0 0,-387.49707 37.37564,0" id="path5657" inkscape:connector-curvature="0" sodipodi:nodetypes="ccccccc" /> <text xml:space="preserve" style="font-style:normal;font-weight:normal;font-size:12px;line-height:112.99999952%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" x="401.50858" y="1006.8174" id="text4221" sodipodi:linespacing="113%"><tspan sodipodi:role="line" id="tspan4223" x="390" y="1012">On / Off</tspan></text> <g id="soclebase" inkscape:label="#soclebase" transform="translate(-4,0)"> <rect y="1025.0764" x="841.42859" height="18.571428" width="99.285713" id="rect4229" style="opacity:1;fill:#ac9d93;fill-opacity:1;stroke:#030303;stroke-width:1;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <rect y="993.40735" x="807.04523" height="32.338161" width="164.48103" id="rect4227" style="opacity:1;fill:#ac9d93;fill-opacity:1;stroke:#030303;stroke-width:0.80469382;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <ellipse ry="0.71428573" rx="75" cy="1044.3622" cx="892.14288" id="path4231" style="opacity:1;fill:#2b0000;fill-opacity:1;stroke:#030303;stroke-width:1;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> </g> </svg>';
            return svgstring;
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
