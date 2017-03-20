/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
*/

define(['IMSGlobal/jquery_2_1_1',
    'lentilles/runtime/js/raphael.min',
    'lentilles/runtime/js/rtext_edit',
    'lentilles/runtime/js/raphael.json',
    'lodash',
    'OAT/util/html'
], function($, raphael, inlineTextEditing, Rtojson, _, html) {

    "use strict"; 

    function renderChoices(id, $container, config, assetManager) {
        var $lentils = $container.find(".lentils");

        $lentils.append($('<img>', { src: assetManager.resolve('lentilles/runtime/assets/lentils.png') }).css({ top: 6, marginLeft: 12 }));

        var stocker = 0;

        creator();

        function creator() {
            var nbligne = 12;
            var nbcolonne = 12;
            var jsontablor = {};
            var entcol = ["VIDE", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

            $container.find('.tablefdc').append("<tr class='fdc'><td class='coin'></td></tr>");

            for (var i = 1; i < nbcolonne; i++) {
                // create lines and columns
                $container.find('.fdc').append("<td class='entete_lettre'>" + entcol[i] + "</td>");
            }

            for (var i = 1; i < nbligne; i++) {
                // Create columns titles
                $container.find('.tablefdc').append("<tr class='entligne" + i + " entete_nb'><td>" + i + "</td></tr>");

                for (var j = 1; j < nbcolonne; j++) {
                    // Create cells
                    $container.find('.entligne' + i).append("<td class='" + entcol[j] + i + " cellbase'> </td>");
                }
            }

            // Navigation on the worksheet
            var $cellbase =  $container.find('.cellbase');
            $cellbase.mouseover(function() {
                $container.find(this).css('background-color', 'gainsboro');
            });

            $cellbase.mouseleave(function() {
                $container.find(this).css('background-color', 'white');
            });


            // Edit activ cells
            var cellactiv = "";
            var onlyOne = 0;

            function mouseleft(cellar) {
                $container.find(cellar).mouseleave(function(event) {
                    var contenu = $container.find('.modactiv').val();
                    $container.find(cellar).html(contenu);
                    var classarray =  $(cellar).attr("class").split(' ');
                    if (contenu !== ' ') { jsontablor[classarray[0]] = contenu; }
                    var jsontostring = JSON.stringify(jsontablor);
                    $container.find(".reptablor").html(jsontostring);
                    onlyOne = 0;
                });
                return false;
            }

            $container.find('.cellbase').click(function() {
                var classarray =  $container.find('.cellbase').attr("class").split(' ');
                cellactiv =classarray[0] ;
                if (onlyOne === 0) {
                    onlyOne = 1;
                    //cellvalidator(cellactiv);
                    var contenucell = $container.find(this).text();
                    if (contenucell === ' ') {
                        $container.find(this).append("<input type='text' class='modactiv' />");
                        focusonme();
                        mouseleft(this);
                        $container.find(".modactiv").on('keyup', function (e) {
                            if (e.keyCode == 13) { 
                                this.blur();
                            }
                        });
                        if (contenucell !== ' ') { jsontablor[cellactiv] = contenucell; }
                        var jsontostring = JSON.stringify(jsontablor);
                        $container.find(".reptablor").html(jsontostring);
                    } else {
                        $container.find(this).html("<input type='text' class='modactiv' value=" + contenucell + ">");
                        focusonme();
                        mouseleft(this);
                        $container.find(".modactiv").on('keyup', function (e) {
                            if (e.keyCode == 13) { 
                                this.blur();
                            }
                        });
                        if (contenucell !== ' ') { jsontablor[cellactiv] = contenucell; }
                        var jsontostring = JSON.stringify(jsontablor);
                        $container.find(".reptablor").html(jsontostring);
                    }
                    return false;
                }

                function focusonme() { $container.find(".modactiv").focus(); }

                // Navigation mouse on worksheet
                $container.find(this).css('background-color', 'white');
                $container.find(".cellactive").html($(this).attr("class") + "--> <input type='text' class='modifcell'>");

            });
        }

        $container.find('.tablor').append('<button class="btgraphor">Etape 2 : construire un graphique</button>');


        // Graphic area  ***********************************************************************************

        var idlentils = _.uniqueId('idlentils_');// lodash generate unique id
        $container.find(".graphor").attr('id', idlentils); // Attribution of the unique Id to the Id attribute

        var paper = Raphael(idlentils, 1000, 600);

        var axis = function(r, grid, offset) {

            var g = grid || true;
            var o = offset || 0;

            var w = r.width;
            var h = r.height;

            var len = grid ? w : r.width;
            for (var i = 1; i <= w / 10; i = i + 1) {
                r.path("M" + i * 10 + ",0L" + i * 10 + "," + len).attr("stroke", "grey").attr("stroke-opacity", 0.5);

            }

            var len = grid ? w : r.width;
            for (var i = 1; i <= h / 10; i = i + 1) {
                r.path("M0," + i * 10 + "L" + len + "," + i * 10).attr("stroke", "grey").attr("stroke-opacity", 0.5);

            }
        };

        axis(paper);

        var axex = paper.path("M150 80L150 560");
        for (var i = 150; i < 800; i = i + 50) {
            var gradx = paper.path("M" + i + " 560, L" + i + " 565");
            var gradxrect = paper.rect(i - 5, 560, 10, 20).attr({ fill: 'white', 'fill-opacity': 0.1, 'cursor': 'pointer', 'stroke-width': 0 });

            gradxrect.click(function(event) {

                var etix = this.attr('x');

                var gradtext = paper.text(etix, 575, 'Modifier').attr({ 'font-size': 12 });

                reditor(gradtext, 'Modifier');
                this.hide();
            });
        }
        var axey = paper.path("M150 560L800 560");
        for (var i = 80; i < 570; i = i + 20) {
            var grady = paper.path("M145 " + i + "L150 " + i);
            var gradyrect = paper.rect(130, i - 5, 20, 10).attr({ fill: 'white', 'fill-opacity': 0.1, 'cursor': 'pointer', 'stroke-width': 0 });
            gradyrect.click(function(event) {
                var etiy = this.attr('y');
                var gradtext = paper.text(115, etiy, 'Modifier').attr({ 'font-size': 16 });
                reditor(gradtext, 'Modifier');
                this.hide(); // Evite de remettre une étiquette au même endroit
            });

        }
        var edtitre = paper.text(470, 40, 'Cliquer ici pour ajouter un titre').attr({ "font-size": "30" });
        reditor(edtitre, 'Cliquer ici pour ajouter un titre');

        function reditor(mtext, defaultText) {
            paper.inlineTextEditing(mtext);
            mtext.click(function() {
                // Retrieve created <input type=text> field
                var input = this.inlineTextEditing.startEditing();

                input.addEventListener("blur", function(e) {
                    // Stop inline editing after blur on the text field
                    var defauttext = defaultText;
                    mtext.inlineTextEditing.stopEditing(defauttext);
                    gradxrect.toFront();
                    graphtojson(); // update graph json format for response
                }, true);

            });

        }

        var navicount = 0;
        var edaxey = paper.text(120, 60, 'cliquer ici pour \n nommer cet axe').attr("font-size", "14");
        reditor(edaxey, 'cliquer ici pour \n nommer cet axe');
        var edaxex = paper.text(810, 530, 'cliquer ici pour \n nommer cet axe').attr("font-size", "14");
        reditor(edaxex, 'cliquer ici pour \n nommer cet axe');


        var toolbar = paper.rect(850, 100, 150, 300).attr('fill', 'lightgrey');
        var consignecross = paper.text(920, 130, 'cliquer et déposer \n une croix sur le graphique');
        var crosstool = paper.path("m 920,155 5.91756,0 0,7.03552 7.39695,0 0,5.69948 -7.39695,-0.0711 0,7.12784 -5.91756,-0.0356 0,-7.0923 -7.39695,0 0,-5.62841 7.39695,0 0,-7.03552").attr({ fill: '#dc4b4b', 'fill-opacity': 1, 'fill-rule': 'evenodd', stroke: '#000000', 'stroke-width': 1, cursor: 'pointer' });
        crosstool.scale(1.5);
        crosstool.mouseover(function(e) { this.attr({ 'fill-opacity': 0.3, fill: "red" }); });
        crosstool.mouseout(function(e) { this.attr({ 'fill-opacity': 1, fill: '#dc4b4b' }); });
        var guidevertical = paper.path("m923 170 l0 800").attr({ stroke: "blue", 'stroke-width': 1, 'stroke-opacity': 0 });
        var guidehorizontal = paper.path("m0 165 l920 0").attr({ stroke: "blue", 'stroke-width': 1, 'stroke-opacity': 0 });
        var btdessincourbe = paper.rect(870, 210, 100, 20).attr({ fill: '#c9f2c9', cursor: 'pointer', 'stroke-width': 0.5 });
        btdessincourbe.mouseover(function(e) { this.attr({ 'fill-opacity': 0.3 }); });
        btdessincourbe.mouseout(function(e) { this.attr({ 'fill-opacity': 1 }); });
        var dessinercourbe = paper.text(920, 220, 'Tracer la courbe').attr({ cursor: 'pointer' });

        var bteffacerlacourbe = paper.rect(870, 240, 100, 20).attr({ fill: '#c9f2c9', cursor: 'pointer', 'stroke-width': 0.5 });
        var effacercourbe = paper.text(920, 250, 'Effacer la courbe').attr({ cursor: 'pointer' });
        var aidegraduation = paper.text(500, 590, 'Cliquer sur les graduations des axes pour inscrire une valeur').attr({ 'font-size': 11 });

        var idcurve;

        function graphtojson() {
            var graphjson = paper.toJSON();
            $('.repgraphor').html(JSON.stringify(graphjson));
        }


        Raphael.st.draggable2 = function() {
            var me = this,
                lx = 0,
                ly = 0,
                ox = 0,
                oy = 0,
                moveFnc = function(dx, dy) {
                    lx = dx + ox;
                    ly = dy + oy;
                    me.transform('t' + lx + ',' + ly);


                },
                startFnc = function() { this.attr({ fill: 'grey', 'fill-opacity': 0.2, 'stroke-opacity': 0.2 }); },
                endFnc = function() {
                    ox = lx;
                    oy = ly;

                    this.attr({ 'fill-opacity': 0.2, 'stroke-opacity': 0.2 });
                    graphtojson(); // update graph json format for response
                }

            this.drag(moveFnc, startFnc, endFnc);
        };




        Raphael.st.draggable = function() {
            var me = this,
                lx = 0,
                ly = 0,
                ox = 0,
                oy = 0,
                moveFnc = function(dx, dy) {
                    lx = dx + ox;
                    ly = dy + oy;
                    me.transform('t' + lx + ',' + ly);
                    if (lx < -100) {
                        me.attr({ 'stroke-opacity': 0.6, 'fill': 'green' });
                        me[0].scale(0.7);

                    } else { me.attr({ 'stroke-opacity': 0 }); }

                },
                startFnc = function() {},
                endFnc = function() {

                    if (lx < -100) {
                        ox = lx;
                        oy = ly;
                        me[0].attr({ 'fill': 'red' });
                        me[1].attr({ 'stroke-opacity': 0 });
                        me[2].attr({ 'stroke-opacity': 0 });
                        graphtojson(); // update graph json format for response

                    } else {
                        this.remove();
                        graphtojson(); // update graph json format for response
                    }
                    destroycurve();
                    graphtojson(); // update graph json format for response

                };

            this.drag(moveFnc, startFnc, endFnc);
        };


        var crosscollector = paper.set();

        crosstool.mousemove(function(event) {
            var mySet = paper.set();
            var clonard = crosstool.clone();
            var clongvertical = guidevertical.clone();
            var clonghorizontal = guidehorizontal.clone();
            clonard.attr({ 'title': "Déplacer ce point" });
            mySet.push(clonard);
            mySet.push(clongvertical);
            mySet.push(clonghorizontal);


            crosscollector.push(mySet);
            mySet.draggable(); /* Act on the event */

        });


        dessinercourbe.click(function(event) {
            // Class points from right to left
            var coox = [];
            // get crosses x values 
            for (var i = 0; i < crosscollector.length; i++) {
                var crox = crosscollector[i].getBBox();
                coox.push(crox.x);
            }
            // order the array
            function sortNumber(a, b) {
                return a - b;
            }
            // Reorder the array
            coox = coox.sort(sortNumber);

            var debutstring;
            var suitestring;
            var pathstring;
            // Scan crosses using araay order
            for (var i = 0; i < coox.length; i++) {
                for (var j = 0; j < crosscollector.length; j++) {
                    var crosso = crosscollector[j].getBBox();
                    if (coox[i] == crosso.x && crosso.x < -100) {
                        var offsetx = 922;
                        var offsety = 5;
                        if (i == 0) { debutstring = "M" + (crosso.x + offsetx) + " " + (crosso.y + offsety) + " "; } else {
                            suitestring = suitestring + "L" + (crosso.x + offsetx) + " " + (crosso.y + offsety) + " ";
                        }

                    }

                }
            }
            pathstring = debutstring + suitestring;

            destroycurve();
            var traceur = paper.path(pathstring).attr({ stroke: 'red', 'stroke-width': 5, 'stroke-opacity': 0 });
            traceur.animate({ 'stroke-opacity': 1 }, 2000);

            idcurve = traceur.id;

            for (var i = 0; i < crosscollector.length; i++) {
                crosscollector[i].toFront();
            }

            graphtojson(); // update graph json format for response
        });

        effacercourbe.click(function(event) {
            destroycurve();
            graphtojson(); // update graph json format for response
        });


        function destroycurve() {
            if (idcurve) {
                var deadcurve = paper.getById(idcurve);
                if (deadcurve) { deadcurve.remove(); }

            }

        }

        var destroy = paper.circle(1000, 600, 100).attr({ 'fill': 'red', 'fill-opacity': '0.3' });
        var destroytext = paper.text(955, 550, 'Déposer \n les croix ici \n pour les Supprimer');
        // end of graphic area *******************************************************************

        function navict() {
            navicount = navicount + 1;
            $container.find(".navicount").html(navicount);
        }


        $container.find('.btgraphor').click(function(event) {
            $container.find('.tablor').hide();
            $container.find('.graphor').css('opacity', 1);
            navict();
        });

        $container.find('.graphor').prepend('<button class="retourEtape1">Revenir à l\'étape 1 : construire un tableau</button>');

        $container.find('.retourEtape1').click(function(event) {
            $container.find('.btgraphor').show();
            $container.find('.tablor').show();
            $container.find('.graphor').css('opacity', 0);
            navict();
        });

    }


    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config, assetManager);

            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
        renderChoices: function(id, container, config) {
            renderChoices(id, $(container), config, assetManager);
        }
    };
});
