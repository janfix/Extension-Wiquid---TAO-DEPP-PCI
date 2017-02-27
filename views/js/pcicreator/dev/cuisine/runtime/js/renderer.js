define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html) {



    function renderChoices(id, $container, config, assetManager) {

        // answers
        var answboiler;
        var answtartre;
        var answfeu;
        var answchoco;

        var mediapath = "cuisine/runtime/img";
        
        var $ztartre = $(".zonetartre");
        var ztartre_assets = ["tartre","vinaigre","tartre2"]; 
        var ztartre_text = "<div class='tartretxt'>Le vinaigre et le tartre réagissent. Ainsi les traces disparaissent.</div>";

        var $zboiler = $(".zoneBoiler");
        var zboiler_assets = ["boiler1","boiler2"];
        var zboiler_text ="<div class='boilertxt'>L'eau bout dans la bouilloire</div>" ;

        var $zfeu = $(".zonefeu");
        var zfeu_assets = ["feugaz"];
        var zfeu_text = "<div class='gazfeutxt'>Le gaz brûle avec le dioxygène de l'air</div>";

        var $zchoco = $(".zonechocolat");
        var zchoco_assets = ["choco1","choco2","choco3"];
        var zchoco_text = "<div class='chocotxt'>Le chocolat fond dans la casserole</div>";


// the function use the media name as class name. 
        function animcuisine(zone, z_assets, z_text){
            console.log(zone + " " + z_assets + " " + z_text);
            for (var i = 0; i < z_assets.length; i++) {
                zone.append($('<img>', {src: assetManager.resolve(mediapath + '/' +  z_assets[i] +'.png')}).attr("class",z_assets[i]));
            }
            zone.append(z_text);
        }

            $(".cuisine").append("<button class='bt bt-tartre'>Observation n°4</button><button class='bt bt-boiler'>Observation n°1</button><button  class='bt bt-feu'>Observation n°3</button><button  class='bt bt-choco'>Observation n°2</button>"); 
            
// Install images and in the right place
    animcuisine($ztartre, ztartre_assets, ztartre_text);
    animcuisine($zboiler, zboiler_assets, zboiler_text);
    animcuisine($zfeu, zfeu_assets, zfeu_text);
    animcuisine($zchoco, zchoco_assets, zchoco_text);


        $(".bt-boiler").click(function(event) {
            answboiler = "bouilloire";
            $(".cuisineasw").append(answboiler + ",");
            $(".bt").hide();
            $(".bt").delay("7100").fadeIn();
            $(".boiler1").hide();
            $(".boiler2").hide();
            $(".boilertxt").hide();
            $(".zoneBoiler").css("display", "inline");
            $(".boiler1").delay("100").fadeIn();
            $(".boilertxt").delay("100").fadeIn();
            $(".boiler2").delay("1500").fadeIn();
            $(".zoneBoiler").delay("7000").hide(0);
        });


        $(".bt-feu").click(function(event) {
            answfeu = "feu";
            $(".cuisineasw").append(answfeu + ",");
            $(".feugaz").hide();
            $(".gazfeutxt").hide();
            $(".bt").hide();
            $(".bt").delay("5100").fadeIn();
            $(".zonefeu").css("display", "inline");
            $(".feugaz").delay("100").fadeIn();
            $(".gazfeutxt").delay("100").fadeIn();
            $(".zonefeu").delay("5000").hide(0);
        });

        $(".bt-choco").click(function(event) {
            answchoco = "chocolat";
            $(".cuisineasw").append(answchoco + ",");
            $(".bt").hide();
            $(".bt").delay("9100").fadeIn();
            $(".zonechocolat").css("display", "inline");
            $(".choco1").hide();
            $(".choco2").hide();
            $(".choco3").hide();
            $(".choco1").delay("100").fadeIn();
            $(".choco2").delay("2500").fadeIn();
            $(".choco3").delay("5000").fadeIn();
            $(".chocotxt").delay("100").fadeIn();
            $(".zonechocolat").delay("9000").hide(0);
        });

        $(".bt-tartre").click(function(event) {
            answtartre = "tartre";
            $(".cuisineasw").append(answtartre + ",");
            $(".bt").hide();
            $(".bt").delay("8100").fadeIn();
            $(".zonetartre").css("display", "inline");
            $(".tartre1").hide();
            $(".vinaigre").hide();
            $(".tartre2").hide();
            $(".tartre1").delay("100").fadeIn();
            $(".vinaigre").delay("2500").fadeIn();
            $(".tartre2").delay("5000").fadeIn();
            $(".tartretxt").delay("100").fadeIn();
            $(".tartretxt").delay("4500").fadeOut();
            $(".zonetartre").delay("8000").hide(0);

        });
    }


    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config, assetManager);

            html.render($container.find('.prompt'));
        }
    };
});
