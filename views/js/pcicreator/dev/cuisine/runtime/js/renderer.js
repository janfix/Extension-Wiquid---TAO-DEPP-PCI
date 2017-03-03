define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html) {

"use strict"; 


    function renderChoices(id, $container, config, assetManager) {

        // answers
        var answboiler;
        var answtartre;
        var answfeu;
        var answchoco;

        var mediapath = "cuisine/runtime/img";
        
        var $ztartre =  $container.find('.zonetartre');
        var ztartre_assets = ["tartre","vinaigre","tartre2"]; 
        var ztartre_text = "<div class='tartretxt'>Le vinaigre et le tartre réagissent. Ainsi les traces disparaissent.</div>";

        var $zboiler = $container.find(".zoneBoiler");
        var zboiler_assets = ["boiler1","boiler2"];
        var zboiler_text = "<div class='boilertxt'>L'eau bout dans la bouilloire</div>" ;

        var $zfeu = $container.find(".zonefeu");
        var zfeu_assets = ["feugaz"];
        var zfeu_text = "<div class='gazfeutxt'>Le gaz brûle avec le dioxygène de l'air</div>";

        var $zchoco = $container.find(".zonechocolat");
        var zchoco_assets = ["choco1","choco2","choco3"];
        var zchoco_text = "<div class='chocotxt'>Le chocolat fond dans la casserole</div>";

        


// the function use the media name as class name. 
        function animcuisine(zone, z_assets, z_text){

            for (var i = 0; i < z_assets.length; i++) {
                zone.append($('<img>', {src: assetManager.resolve(mediapath + '/' +  z_assets[i] +'.png')}).attr("class",z_assets[i]));
            }
            zone.append(z_text);
        }

    $container.append("<button class='bt bt-tartre'>Observation n°4</button><button class='bt bt-boiler'>Observation n°1</button><button  class='bt bt-feu'>Observation n°3</button><button  class='bt bt-choco'>Observation n°2</button>"); 
           
        var $btboiler = $container.find(".bt-boiler");
        var $btfeu = $container.find(".bt-feu");
        var $btchoco = $container.find(".bt-choco");
        var $bttartre = $container.find(".bt-tartre");

// Install images in the right place
    animcuisine($ztartre, ztartre_assets, ztartre_text);
    animcuisine($zboiler, zboiler_assets, zboiler_text);
    animcuisine($zfeu, zfeu_assets, zfeu_text);
    animcuisine($zchoco, zchoco_assets, zchoco_text);

    var $element = {
        cuisineasw : $container.find(".cuisineasw"),
        bt :  $container.find(".bt"),
        zoneBoiler : $container.find(".zoneBoiler"),
        boiler1 :  $container.find(".boiler1"),
        boilertxt : $container.find(".boilertxt"),
        boiler2 : $container.find(".boiler2"),
        feugaz  : $container.find(".feugaz"),
        gazfeutxt : $container.find(".gazfeutxt"),
        zonefeu : $container.find(".zonefeu"),
        zonechocolat : $container.find(".zonechocolat"),
        choco1 : $container.find(".choco1"),
        choco2 : $container.find(".choco2"),
        choco3 : $container.find(".choco3"),
        chocotxt : $container.find(".chocotxt"),
        zonetartre : $container.find(".zonetartre"),
        tartre1 : $container.find(".tartre1"),
        vinaigre : $container.find(".vinaigre"),
        tartre2 : $container.find(".tartre2"),
        tartretxt : $container.find(".tartretxt")
    };


        $btboiler.click(function(event) {
            answboiler = "bouilloire";
            $element.cuisineasw.append(answboiler + ",");
            $element.bt.hide();
            $element.bt.delay("7100").fadeIn();
            $element.zoneBoiler.css("display", "inline");
            $element.boiler1.animate({
                opacity: 1},
                1000, function() {
                    $element.boilertxt.delay("100").fadeIn();
                    $element.boiler2.css("opacity",1);
                    $element.zoneBoiler.delay("6000").hide(0);
                });              
        });

        $btfeu.click(function(event) {
            answfeu = "feu";
            $element.cuisineasw.append(answfeu + ",");
            $element.feugaz.hide();
            $element.gazfeutxt.hide();
            $element.bt.hide();
            $element.bt.delay("5100").fadeIn();
            $element.zonefeu.css("display", "inline");
            $element.feugaz.delay("100").fadeIn();
            $element.gazfeutxt.delay("100").fadeIn();
            $element.zonefeu.delay("5000").hide(0);
        });

        $btchoco.click(function(event) {
            answchoco = "chocolat";
            $element.cuisineasw.append(answchoco + ",");
            $element.bt.hide();
            $element.bt.delay("9100").fadeIn();
            $element.zonechocolat.css("display", "inline");
            $element.choco1.hide();
            $element.choco2.hide();
            $element.choco3.hide();
            $element.choco1.delay("100").fadeIn();
            $element.choco2.delay("2500").fadeIn();
            $element.choco3.delay("5000").fadeIn();
            $element.chocotxt.delay("100").fadeIn();
            $element.zonechocolat.delay("9000").hide(0);
        });

        $bttartre.click(function(event) {
            answtartre = "tartre";
            $element.cuisineasw.append(answtartre + ",");
            $element.bt.hide();
            $element.bt.delay("8100").fadeIn();
            $element.zonetartre.css("display", "inline");
            $element.tartre1.hide();
            $element.vinaigre.hide();
            $element.tartre2.hide();
            $element.tartre1.delay("100").fadeIn();
            $element.vinaigre.delay("2500").fadeIn();
            $element.tartre2.delay("5000").fadeIn();
            $element.tartretxt.delay("100").fadeIn();
            $element.tartretxt.delay("4500").fadeOut();
            $element.zonetartre.delay("8000").hide(0);
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
