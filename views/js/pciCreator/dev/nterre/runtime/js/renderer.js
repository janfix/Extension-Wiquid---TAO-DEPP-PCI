define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

// Le renderer sert pour le rendu QTI visible dans Preview. 

    function renderChoices(id, $container, config){

        var answdist = "dist-non";
        var answmass = "mass-non";
        var answray = "ray-non";


            $("#cmddist").append("<input type='range' name='dist' id='dist' max='550' min='50' step='50' />");
            $("#cmdmas").append("<input type='range' name='mas'  id='mas'  max='31' min='1' step='5'/>");
            $("#cmdray").append("<input type='range' name='ray' id='ray'  max='300' min='100'/>");

            $("#dist").val(200);
            $("#ray").val(250);

    $("#dist").change(function(event) {
        if(answdist == "dist-non"){$("#nterransw").append(" dist-ok,"); answdist ="dist-ok"; }
        $("#distance").html("");
        $("#gravitas").html("Valeur de la force de gravitation : ");
        var lockplan = eval($("#dist").val())+24+250;
        var relatdist = eval($("#dist").val()) + 250;

        $("#planetbox svg").css("marginLeft", relatdist +"px");
        $("#plantext").css("marginLeft", lockplan +"px");
        $("#distance").append($("#dist").val()+" Millions de km");
        grav();


     });

     $("#ray").change(function(event) {
        if(answray == "ray-non"){$("#nterransw").append(" ray-ok,"); answray ="ray-ok"; }
        $("#taille").html("");
        var tailkm = 25*$("#ray").val()*($("#ray").val()/100);
        tailkm = Math.round(tailkm);
        $("#path4151").attr("r", $(this).val());
        $("#path4151-6").attr("r", $(this).val());
        $("#taille").append(tailkm + " km");
        //console.log($(this).val());

     });

     $("#mas").change(function(event) {
        if(answmass == "mass-non"){$("#nterransw").append(" mass-ok,"); answmass ="mass-ok"; }
        var valmass;
            $("#masse").html("");
            $("#gravitas").html("Valeur de la force de gravitation : ");
            if($(this).val()==31){valmass=30;}else{valmass = $(this).val();}
            $("#masse").append(valmass + " x 10<sup>23</sup>kg");
            grav();
      });


function grav(){

var distancePE = $("#dist").val();
var massePlanete = $("#mas").val();
if(massePlanete==31){massePlanete=30;}
var gravite;
console.log(massePlanete);
console.log(distancePE);

var exograd =[
    [50, 1," 2.67x10<sup>27</sup> N"],
    [100,1,"6.67x10<sup>27</sup> N"],
    [150,1,"2.96x10<sup>27</sup> N"],
    [200,1,"1.67x10<sup>27</sup> N"],
    [250,1,"1.07x10<sup>27</sup> N"],
    [300,1,"7.41x10<sup>27</sup> N"],
    [350,1,"5.44x10<sup>27</sup> N"],
    [400,1,"4.17x10<sup>27</sup> N"],
    [450,1,"3.29x10<sup>27</sup> N"],
    [500,1,"2.67x10<sup>27</sup> N"],
    [550,1,"2.20x10<sup>27</sup> N"],
    [50,6,"1.60x10<sup>27</sup> N"],
    [100,6,"4.00x10<sup>27</sup> N"],
    [150,6,"1.78x10<sup>27</sup> N"],
    [200,6,"1.00x10<sup>27</sup> N"],
    [250,6,"6.40x10<sup>27</sup> N"],
    [300,6,"4.45x10<sup>27</sup> N"],
    [350,6,"3.27x10<sup>27</sup> N"],
    [400,6,"2.50x10<sup>27</sup> N"],
    [450,6,"1.98x10<sup>27</sup> N"],
    [500,6,"1.60x10<sup>27</sup> N"],
    [550,6,"1.32x10<sup>27</sup> N"],
    [50,11,"2.93x10<sup>27</sup> N"],
    [100,11,"7.34x10<sup>27</sup> N"],
    [150,11,"3.26x10<sup>27</sup> N"],
    [200,11,"1.83x10<sup>27</sup> N"],
    [250,11,"1.17x10<sup>27</sup> N"],
    [300,11,"8.15x10<sup>27</sup> N"],
    [350,11,"5.99x10<sup>27</sup> N"],
    [400,11,"4.59x10<sup>27</sup> N"],
    [450,11,"3.62x10<sup>27</sup> N"],
    [500,11,"2.93x10<sup>27</sup> N"],
    [550,11,"2.43x10<sup>27</sup> N"],
    [50,16,"4.27x10<sup>27</sup> N"],
    [100,16,"1.07x10<sup>27</sup> N"],
    [150,16,"4.74x10<sup>27</sup> N"],
    [200,16,"2.67x10<sup>27</sup> N"],
    [250,16,"1.71x10<sup>27</sup> N"],
    [300,16,"1.19x10<sup>27</sup> N"],
    [350,16,"8.71x10<sup>27</sup> N"],
    [400,16,"6.67x10<sup>27</sup> N"],
    [450,16,"5.27x10<sup>27</sup> N"],
    [500,16,"4.27x10<sup>27</sup> N"],
    [550,16,"3.53x10<sup>27</sup> N"],
    [50,21,"5.60x10<sup>27</sup> N"],
    [100,21,"1.40x10<sup>27</sup> N"],
    [150,21,"6.23x10<sup>27</sup> N"],
    [200,21,"3.50x10<sup>27</sup> N"],
    [250,21,"2.24x10<sup>27</sup> N"],
    [300,21,"1.56x10<sup>27</sup> N"],
    [350,21,"1.14x10<sup>27</sup> N"],
    [400,21,"8.75x10<sup>27</sup> N"],
    [450,21,"6.92x10<sup>27</sup> N"],
    [500,21,"5.60x10<sup>27</sup> N"],
    [550,21,"4.63x10<sup>27</sup> N"],
    [50,26,"6.94x10<sup>27</sup> N"],
    [100,26,"1.73x10<sup>27</sup> N"],
    [150,26,"7.71x10<sup>27</sup> N"],
    [200,26,"4.34x10<sup>27</sup> N"],
    [250,26,"2.77x10<sup>27</sup> N"],
    [300,26,"1.93x10<sup>27</sup> N"],
    [350,26,"1.42x10<sup>27</sup> N"],
    [400,26,"1.08x10<sup>27</sup> N"],
    [450,26,"8.56x10<sup>27</sup> N"],
    [500,26,"6.94x10<sup>27</sup> N"],
    [550,26,"5.73x10<sup>27</sup> N"],
    [50,30,"8.00x10<sup>27</sup> N"],
    [100,30,"2.00x10<sup>27</sup> N"],
    [150,30,"8.89x10<sup>27</sup> N"],
    [200,30,"5.00x10<sup>27</sup> N"],
    [250,30,"3.20x10<sup>27</sup> N"],
    [300,30,"2.22x10<sup>27</sup> N"],
    [350,30,"1.63x10<sup>27</sup> N"],
    [400,30,"1.25x10<sup>27</sup> N"],
    [450,30,"9.88x10<sup>27</sup> N"],
    [500,30,"8.00x10<sup>27</sup> N"],
    [550,30,"6.61x10<sup>27</sup> N"] ];



for (var i = 0; i < exograd.length; i++) {
     console.log(massePlanete);
    if(exograd[i][0] == distancePE){
         
        if(exograd[i][1] == massePlanete){
        $("#gravitas").append(exograd[i][2]);
            console.log("from here");
        console.log(); 
        }
    }

}

}

    }

    return { //Attention ce return doit appartenir à la syntaxe de require.js il clôt la fonction globale
        render : function(id, container, config){ //Il renvoie la méthode render
            var $container = $(container);// Charge le container dans une variable éponyme
            renderChoices(id, $container, config); // Applique les fonctions de mise en forme
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));// Utilisation de HTML.js pour générer du html
        }
    };
});