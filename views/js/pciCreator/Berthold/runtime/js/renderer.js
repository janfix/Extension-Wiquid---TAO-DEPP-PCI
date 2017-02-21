define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

    function renderChoices(id, $container, config, assetManager){

        var $imagetitre = $(".imagetitre");
        var $place1 = $(".place1");
        var $place2 = $(".place2");
        var $place3 = $(".place3");

          $imagetitre.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/img1.svg')}));
          
          $place1.prepend('<div class="titre2">Sans ablation des testicules</div>');
          $place2.prepend('<div class="titre2">Avec ablation des testicules</div>');
          $place3.prepend('<div class="titre2">Avec ablation des testicules puis greffe des testicules</div>');
    
          $place1.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/coq4mois.svg')}).attr("class","anima3"));
          $place1.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/polosolo.svg')}).attr("class","anima1 polo"));
          $place1.append('<div class="nav1"><button class="precedent1" disabled >Précédent</button><button class="suivant1">Suivant</button></div>');  

          $place2.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/chapontxt.svg')}).attr("class","anima6"));
          $place2.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/ablation.svg')}).attr("class","anima5 polo"));
          $place2.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/polosoloL2.svg')}).attr("class","anima4 polo"));            
          $place2.append('<div class="nav2"><button class="precedent2" disabled>Précédent</button><button class="suivant2">Suivant</button></div>');

          $place3.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/coq4mois.svg')}).attr("class","anima11"));
          $place3.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/greffe.svg')}).attr("class","anima9 polo"));
          $place3.append($('<img>', {src: assetManager.resolve('Berthold/runtime/assets/poulet3.svg')}).attr("class","anima8 polo"));            
          $place3.append('<div class="nav3"><button class="precedent3" disabled>Précédent</button><button class="suivant3">Suivant</button></div>');

var $suivant1 = $(".suivant1");
var $precedent1 = $(".precedent1");
var $suivant2 = $(".suivant2");
var $precedent2 = $(".precedent2");
var $suivant3 = $(".suivant3");
var $precedent3 = $(".precedent3");


$suivant1.click(function(event) {  
  $('.anima1').css("opacity",0);
  $('.anima3').css("opacity",1);
  $suivant1.prop("disabled", true);   
  $precedent1.prop("disabled", false);
  });

$precedent1.click(function(event) {
    $suivant1.prop("disabled", false);
    $precedent1.prop("disabled", true);
    $('.anima1').css("opacity",1);
    $('.anima3').css("opacity",0);
});

var cptClick2 = 0;
$suivant2.click(function(event) { 
 cptClick2 = cptClick2 + 1;
  if(cptClick2 === 1 ){
    $('.anima4').css("opacity",0);
    $('.anima5').css("opacity",1);
    $precedent2.prop("disabled", false);
  } 
  if(cptClick2 === 2 ){
    $suivant2.prop("disabled", true);   
    $precedent2.prop("disabled", false);
    $('.anima5').css("opacity",0);
    $('.anima6').css("opacity",1);
  }
  });

$precedent2.click(function(event) {
  if(cptClick2 === 1 ){
    console.log("CAS 1");
    $('.anima4').css("opacity",1);
    $('.anima5').css("opacity",0);
    $precedent2.prop("disabled", true);
    $suivant2.prop("disabled", false);
  }
  else if(cptClick2 === 2 ){
    console.log("CAS 2");
    $('.anima5').css("opacity",1);
    $('.anima6').css("opacity",0);
    $suivant2.prop("disabled", false);
  }  
    cptClick2 = cptClick2 - 1;
});

var cptClick3 = 0;
$suivant3.click(function(event) { 
 cptClick3 = cptClick3 + 1;
  if(cptClick3 === 1 ){
    $('.anima8').css("opacity",0);
    $('.anima9').css("opacity",1);
    $precedent3.prop("disabled", false);
  } 
  if(cptClick3 === 2 ){
    $suivant3.prop("disabled", true);   
    $precedent3.prop("disabled", false);
    $('.anima9').css("opacity",0);
    $('.anima11').css("opacity",1);
  }
  });

$precedent3.click(function(event) {
  if(cptClick3 === 1 ){
    console.log("CAS 1");
    $('.anima8').css("opacity",1);
    $('.anima9').css("opacity",0);
    $precedent3.prop("disabled", true);
    $suivant3.prop("disabled", false);
  }
  else if(cptClick3 === 2 ){
    console.log("CAS 2");
    $('.anima9').css("opacity",1);
    $('.anima11').css("opacity",0);
    $suivant3.prop("disabled", false);
  }  
    cptClick3 = cptClick3 - 1;
});













    }

   

    return {
        render : function(id, container, config, assetManager){

            var $container = $(container);

            renderChoices(id, $container, config, assetManager );
            
            //render rich text content in prompt
            html.render($container.find('.prompt'));
        },
        renderChoices : function(id, container, config, assetManager){
            renderChoices(id, $(container), config, assetManager);
        }
    };
});