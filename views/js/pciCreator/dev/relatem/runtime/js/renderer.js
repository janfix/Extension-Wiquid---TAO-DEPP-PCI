define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config, assetManager){

      $("#vuefille").append($('<img>', {src: assetManager.resolve('relatem/runtime/img/vuefille.png')}).attr("id","vfimg").attr("class","vfimg"));
      $("#contanim").append($('<img>', {src: assetManager.resolve('relatem/runtime/img/moto.svg')}).attr("id","moto"));
      $("#vuegars").append($('<img>', {src: assetManager.resolve('relatem/runtime/img/cactus.png')}).attr("id","cactus"));    
            var anim1 = "notuse";
            var anim2 = "notuse";
                // Rotation des roues
                var angle = 0;
                  setInterval(function(){
                    angle+=3;
                // $("#roue").rotate(angle);
                  },10);

                var angle = 0;
                  setInterval(function(){
                    angle+=3;
                 // $("#roue2").rotate(angle);
                  },10);
                      
                //console.log('CParti!');
                $("#activVF").click(function(event) {
                    if(anim1=="notuse"){$("#ansrdm").append(" Anim1-OK,"); anim1="anim1ok";}
                    $("#vueglobale").hide();
                    $("#vuegars").hide();
                    $("#vuefille").show();
                    $("#vfimg").removeClass('.vfimg');
                // Permet de rejouer l'animation au click
                var el     = $("#vfimg"),  
                     newone = el.clone(true);          
                 el.before(newone);
                 $("." + el.attr("class") + ":last").remove();

                });


                $("#activG").click(function(event) {
                    if(anim2=="notuse"){$("#ansrdm").append(" Anim2-OK,"); anim2="anim1ok";}
                    $("#vueglobale").hide();
                    $("#vuegars").show();
                    $("#vuefille").hide();


                // Permet de rejouer l'animation au click
                var el = $("#motanim"),  
                     newone = el.clone(true);          
                 el.before(newone);
                 $("." + el.attr("class") + ":last").remove();
                    
                });

                $("#activGlobal").click(function(event) {
                    $("#vueglobale").show();
                    $("#vuegars").hide();
                    $("#vuefille").hide();

                });
    }


    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config, assetManager){ //Il renvoie la méthode render

            var $container = $(container);// Charge le container dans une variable éponyme
            renderChoices(id, $container, config,assetManager ); // Applique les fonctions de mise en forme
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        }
    };

});