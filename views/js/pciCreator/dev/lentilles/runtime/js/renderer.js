define(['IMSGlobal/jquery_2_1_1',
    'lentilles/runtime/js/raphael.min',
    'lentilles/runtime/js/rtext_edit',
    'lentilles/runtime/js/raphael.json',
    'OAT/util/html'
], function($, raphael, inlineTextEditing, Rtojson, html) {

    function renderChoices(id, $container, config, assetManager) {
        var $lentils = $(".lentils");

        $lentils.append($('<img>', { src: assetManager.resolve('lentilles/runtime/assets/lentils.png') }).css({ top: 6, marginLeft: 12 }));

        var stocker = 0;

        creator();

        function creator() {
            // Récupération des valeurs 
            var nbligne = 12;
            var nbcolonne = 12;
            var jsontablor = {};
            var entcol = ["VIDE", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

            $('#tablefdc').append("<tr id='fdc'><td id='coin'></td></tr>");

            for (var i = 1; i < nbcolonne; i++) {
                // Création ligne des titres colonnes
                $('#fdc').append("<td class='entete_lettre'>" + entcol[i] + "</td>");
            }

            for (var i = 1; i < nbligne; i++) {
                // Création ligne des titres colonnes
                $('#tablefdc').append("<tr id='entligne" + i + "' class='entete_nb'><td>" + i + "</td></tr>");

                for (var j = 1; j < nbcolonne; j++) {
                    // Création des cellules du tableau
                    $('#entligne' + i).append("<td id='" + entcol[j] + i + "' class='cellbase'> </td>");
                }
            }

            // Navigation du survol au dessus de la feuille de calcul
            $('.cellbase').mouseover(function() {
                $(this).css('background-color', 'gainsboro');
            });

            $('.cellbase').mouseleave(function() {
                $(this).css('background-color', 'white');
            });


            // Edition de la cellule active et parseur de formules
            var cellactiv = "";
            var onlyOne = 0;

            function cellvalidator(cellar) {

                $('#' + cellar).keypress(function(e) {
                    if (e.which == 13) {
                        var contenu = $('.modactiv').val();
                        $('#' + cellar).html(contenu);
                         if(contenu){jsontablor[cellar] = contenu;}
                         var jsontostring = JSON.stringify(jsontablor);
                         $(".reptablor").html(jsontostring);
                        console.log(jsontablor);
                        onlyOne = 0;
                        return false; //<---- Add this line
                    }
                });
            }

            function mouseleft(cellar) {
                $(cellar).mouseleave(function(event) {
                    //console.log($(cellar));
                    var contenu = $('.modactiv').val();
                    $(cellar).html(contenu);
                     if(contenu){jsontablor[cellar.id] = contenu;}
                     var jsontostring = JSON.stringify(jsontablor);
                    $(".reptablor").html(jsontostring);
                    onlyOne = 0;
                });
                return false;
            }



            $('.cellbase').click(function() {
                // console.log('clickos');
                cellactiv = this.id;
                if (onlyOne == 0) {
                    onlyOne = 1;
                    cellvalidator(cellactiv);
                    var contenucell = $(this).text();
                    console.log(contenucell.length);
                    if (contenucell == ' ') {
                        $(this).append("<input type='text' class='modactiv'/>");
                        focusonme();
                        mouseleft(this);
                        if(contenucell){jsontablor[cellactiv] = contenucell;}
                         var jsontostring = JSON.stringify(jsontablor);
                         $(".reptablor").html(jsontostring);
                          console.log(jsontablor);
                    } else {
                        $(this).html("<input type='text' class='modactiv' value=" + contenucell + ">");
                        mouseleft(this);
                        if(contenucell){jsontablor[cellactiv] = contenucell;}
                         var jsontostring = JSON.stringify(jsontablor);
                         $(".reptablor").html(jsontostring);
                          console.log(jsontablor);
                    }
                    return false;
                }

                function focusonme() { $(".modactiv").focus(); }

                // Navigation souris sur tableau
                $(this).css('background-color', 'white');
                $("#cellactive").html(this.id + "--> <input type='text' id='modifcell'>");

            });
        }

        $('.tablor').append('<button class="btgraphor">Etape 2 : construire un graphique</button>');

        // Zone du graphique 
        var paper = Raphael(document.getElementById("graphor"), 1000, 600);

        var axis = function(r, grid, offset) {

            var g = grid || true;
            var o = offset || 0;

            var w = r.width;
            var h = r.height;

            var len = grid ? w : r.width;
            //console.log(len);
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
                //console.log(this.attr('x'));
                var etix = this.attr('x');
                //var etiqis = paper.rect(etix, 530, 100,20);
                //etiqis.rotate(-30);
                var gradtext = paper.text(etix, 575, 'Modifier').attr({ 'font-size': 12 });
                //gradtext.rotate(-30);
                reditor(gradtext, 'Modifier');
                this.hide(); // Evite de remettre une étiquette au même endroit
            });
        }
        var axey = paper.path("M150 560L800 560");
        for (var i = 80; i < 570; i = i + 20) {
            var grady = paper.path("M145 " + i + "L150 " + i);
            var gradyrect = paper.rect(130, i - 5, 20, 10).attr({ fill: 'white', 'fill-opacity': 0.1, 'cursor': 'pointer', 'stroke-width': 0 });
            gradyrect.click(function(event) {
                /*console.log(this.attr('y'));*/
                var etiy = this.attr('y');
                //var etiqis = paper.rect(etix, 530, 100,20);
                //etiqis.rotate(-30);
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
                }, true);

            });
        }


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

        var btvalidergraph = paper.rect(870, 330, 100, 40).attr({ fill: '#c2d4ea', cursor: 'pointer', 'stroke-width': 0.5 });
        var validergraph = paper.text(920, 350, 'valider le graphique').attr({ cursor: 'pointer' });
        var idcurve;

        validergraph.click(function(event) {
            graphtojson();
        });

        function graphtojson() {
            var graphjson = paper.toJSON();
            console.log(graphjson);
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
                startFnc = function() {

                    // console.log(me.length);

                },
                endFnc = function() {
                    // console.log(lx);
                    if (lx < -100) {
                        ox = lx;
                        oy = ly;
                        me[0].attr({ 'fill': 'red' });
                        me[1].attr({ 'stroke-opacity': 0 });
                        me[2].attr({ 'stroke-opacity': 0 });


                    } else {
                        this.remove();
                    }
                    destroycurve();

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
            console.log(mySet.length);
            mySet.draggable(); /* Act on the event */

        });


        dessinercourbe.click(function(event) {
            // Reclasser les points de droite à gauche
            // créer le tableau stockant les valeurs de x
            var coox = [];
            // Récupérer les valeurs de x de toutes les croix
            for (var i = 0; i < crosscollector.length; i++) {
                var crox = crosscollector[i].getBBox();
                coox.push(crox.x);
            }
            // Permet ordonner un tableau
            function sortNumber(a, b) {
                return a - b;
            }
            // Reorder the array
            coox = coox.sort(sortNumber);

            var debutstring;
            var suitestring;
            var pathstring;
            // Scanner le tableau des objets croix en utilisant l'ordre du tableau
            for (var i = 0; i < coox.length; i++) {
                for (var j = 0; j < crosscollector.length; j++) {
                    var crosso = crosscollector[j].getBBox();
                    if (coox[i] == crosso.x && crosso.x < -100) {
                        // Il suffit de tracer la courbe en utilisant crosso.x et crosso.y pour chaque point
                        // Penser à faire un offset ! 
                        var offsetx = 922;
                        var offsety = 5;
                        if (i == 0) { debutstring = "M" + (crosso.x + offsetx) + " " + (crosso.y + offsety) + " "; } else {
                            suitestring = suitestring + "L" + (crosso.x + offsetx) + " " + (crosso.y + offsety) + " ";

                            console.log(crosso.x);

                        }

                    }

                }
            }
            pathstring = debutstring + suitestring;
            console.log(pathstring);

            destroycurve();
            var traceur = paper.path(pathstring).attr({ stroke: 'red', 'stroke-width': 5, 'stroke-opacity': 0 });
            traceur.animate({ 'stroke-opacity': 1 }, 2000);

            idcurve = traceur.id;

            for (var i = 0; i < crosscollector.length; i++) {
                crosscollector[i].toFront();
            }

            if (traceur) { console.log('traceur existe'); }

            //paper.path("M"+crox.x+" "+crox.y+"L100 100");


        });

        effacercourbe.click(function(event) {
            destroycurve();
        });


        function destroycurve() {
            console.log(idcurve);
            if (idcurve) {
                var deadcurve = paper.getById(idcurve);
                if (deadcurve) { deadcurve.remove(); }

            }

        }

        var destroy = paper.circle(1000, 600, 100).attr({ 'fill': 'red', 'fill-opacity': '0.3' });
        var destroytext = paper.text(955, 550, 'Déposer \n les croix ici \n pour les Supprimer');
        // Fin zone graphique *******************************************************************


        $('.btgraphor').click(function(event) {
            $('.tablor').hide();
            $('.graphor').css('opacity', 1);

        });

        $('.graphor').prepend('<button class="retourEtape1">Revenir à l\'étape 1 : construire un tableau</button>');

        $('.retourEtape1').click(function(event) {
            $('.btgraphor').show();
            $('.tablor').show();
            $('.graphor').css('opacity', 0);
            // CREATION DUNE VARIABLE REPONSE POUR COMPTER LES ALLER RETOURS
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
