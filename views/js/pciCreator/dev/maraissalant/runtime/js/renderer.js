define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderDisplay(id, $container, config){

             $("div").each(function(index,obj){
            if(obj.id=="item-editor-scroll-inner"){
                $(".bton").css("top","10px").css("left","427px");
                }
           });

           $("#tspan6113").css("left","685px!important");


            $("#feu").hide();
            $("#btzero").hide();
            $("#sel1").hide();
            $("#sel2").hide();
            $("#sel3").hide();
            $("#sel4").hide();

            $(".granos").hide();
            $(".granosb").hide();
            $(".granosc").hide();
            $(".granosd").hide();


            $("#btdemarrer").click(function(event) {
                $(this).hide();
                $("#btzero").show();
                $("#btzero rect").css("fill", "lightgrey");
                $("#btzero rect").css("stroke", "gainsboro");
                $("#btzero text").css("opacity", 0.2);


                $("#heure").addClass('short-hand-start');
                $("#minute").addClass('long-hand-start');

                $("#feu").show();
                //liquide/niveau dep/vitesse/sel/niveau arrivée
                evapora1("#liquid1", 80, 12000, '#sel1', 0);
                evapora1("#liquid2", 80, 33000, '#sel2', 50);
                evapora1("#liquid3", 35, 20000, '#sel3', 0);
                evapora1("#liquid4", 80, 33000, '#sel4', 50);



                function granini(grainsufix, tempo) {
                    $("#grain" + grainsufix).hide().delay(tempo).queue(function(next) {
                        $("#grain" + grainsufix).fadeIn('slow').delay(1000).fadeOut('400');
                        $("#grain" + grainsufix).fadeIn('slow');

                        // Solution parfaite pour Chrome animation des grains de sel qui se déposent Problème Firefox
                        /* $( "#grain"+grainsufix).animate({
                           "cy": "925px"
                         }, 2000, function() {
                         });*/

                        next();
                    });

                }


                // Cache neutralisant le bouton
                $(".bouclier").show().delay(19000).queue(function(next) {
                    $(this).hide();
                    $("#btzero").css("background-color", "#76c7a4");
                    $("#btzero").css("color", "white");

                    next();
                });

                // L'affichage de la couche de sel au fond s'affiche simplement en fonction du timing

                for (var i = 1; i < 8; i++) {
                    var tempor = i * 250 + 2000; // Pour bac1
                    granini("a" + i, tempor);
                    var tempor2 = i * 320 + 4000; // Pour bac2 et 4
                    granini("b" + i, tempor2);
                    granini("d" + i, tempor2);
                    var tempor3 = i * 250 + 6000; // Pour bac3
                    granini("c" + i, tempor3);

                }


                $("#sel1").hide().delay(6000).queue(function(next) {
                    $(this).fadeIn();
                    next();
                });
                $("#sel2").hide().delay(12000).queue(function(next) {
                    $(this).fadeIn();
                    next();
                });
                $("#sel3").hide().delay(14000).queue(function(next) {
                    $(this).fadeIn();
                    next();
                });
                $("#sel4").hide().delay(12000).queue(function(next) {
                    $(this).fadeIn();
                    next();
                });

            });

            $("#btzero").click(function(event) {

                $('#liquid1').attr("height", 80);
                $('#liquid2').attr("height", 80);
                $('#liquid3').attr("height", 35);
                $('#liquid4').attr("height", 80);

                $(this).hide();
                $("#btdemarrer").show();
                $("#feu").hide();
                $(".granos").hide();
                $(".granosb").hide();
                $(".granosc").hide();
                $(".granosd").hide();

                $("#sel1").hide();
                $("#sel2").hide();
                $("#sel3").hide();
                $("#sel4").hide();

                $("#heure").removeClass('short-hand-start');
                $("#minute").removeClass('long-hand-start');
                $("#heure").addClass('short-hand');
                $("#minute").addClass('long-hand');
            });

            function evapora1(liquid, base, vitos, sel, niveau) {
                console.log("DANS EVAPORA1");
                //$('#liquid1').attr("height","10px");
                $({ height: $('#joker').attr('height',0) })
                    .animate({ height: base }, {
                        duration: vitos,
                        step: function(now, fx) {
                            var largos = (base - now);
                            $(liquid).attr('height', largos);
                            if (largos < niveau) {
                                $(this).stop();
                            } else {
                                /*$(sel).show({duration:vitos});*/
                            }
                            if (vitos == 0) {
                                $(sel).hide();
                                $(this).stop();
                            } else {
                                //$(sel).show({duration:vitos});
                            }

                        }
                    });
            }
    }

    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme

            renderDisplay(id, $container, config); // Applique les fonctions de mise en forme
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        },
        /*renderChoices : function(id, container, config){
            renderChoices(id, $(container), config);
        }*/
    };
});