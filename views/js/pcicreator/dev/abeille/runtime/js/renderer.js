/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
Assets created by Wiquid.
All assets are under Creative Commons licence -
*/

define(['IMSGlobal/jquery_2_1_1',
        'abeille/runtime/js/raphael.min',
        'lodash', 
        'OAT/util/html'], function($, Raphael, _, html){

    "use strict"; 

    function renderChoices(id, $container, config, assetManager){

        var icodanger = {src: assetManager.resolve('abeille/runtime/assets/danger.png')};
        var icofrelon = {src: assetManager.resolve('abeille/runtime/assets/frelon2.png')};
        var objfleurrouge = {src: assetManager.resolve('abeille/runtime/assets/fleurrouge.png')};
        var objfleurjaune = {src: assetManager.resolve('abeille/runtime/assets/fleurjaune.png')};
        var objfleurbleue = {src: assetManager.resolve('abeille/runtime/assets/fleurbleue.png')};
        var objabeille = {src: assetManager.resolve('abeille/runtime/assets/abeille100.png')};
        var objfrelonvolant = {src: assetManager.resolve('abeille/runtime/assets/frelonvolant.png')};

        var $abeille = $container;
        var pesticlick = 0;
        var frelonclick = 0;
        
        $abeille.append("<div class='Rarea'></div>");
        $abeille.append("<div id='cmdpanel' class='cmdpanel'><div class='consigne'>Modifier les paramètres pour déclencher l'animation</div></div>");
        
        $container.find(".cmdpanel").append(
            "<div class='pesti line'><div class='titrepesti'>Quantité de pesticide</div></div><div class='frelon line'><div class='titrefrelon'>Frelon asiatique</div></div>");    
        $container.find(".frelon").append(            
            "<img class = 'icofrelon' src="+ icofrelon.src +"><div class='grador'><input type='range' class='nuisible frelonslider' value='0' min='0' max='2' step='1' autocomplete='off'/></div>"
            );
        $container.find(".pesti").append(            
            "<img class = 'icodanger' src="+ icodanger.src +"><div class='grador'><input type='range' class='nuisible pesticide' value='0' min='0' max='2' step='1'  autocomplete='off'/></div>"
            );

            var idcanvas = _.uniqueId('idCanvas_');// lodash generate unique id
            $container.find('.Rarea').attr('id',idcanvas);
            var paper = Raphael(idcanvas, 800, 440);
            var bg_asset = {src: assetManager.resolve('abeille/runtime/assets/bg2.png')};
            var bg = paper.image(bg_asset.src,0, 0, 800, 440);
            $container.find('svg').css('border', '1px grey solid');

var abeille = [];
var beeset = paper.set();
var beepresente;

var quantifb = 30;
var quantifj = 60;
var quantifr = 30;

var group1 = [31,62,28,6,20,24,3,61,21,14,49,36,15,22,30,60,40];
var group2 = [0,11,26,4,58,29,57,63,23,10,56,38,43,1,19,12,9];
var group3 = [7,52,53,65,66,67,8,41,42,34,35,18,59,47,50,37,16];
var group4 = [27,25,51,64,2,33,48,45,54,55,13,44,39,32,5,17,46];

var blueset = paper.set();
var redset = paper.set();
var yellowset = paper.set();
var popu;

function population(pop){
    var accord;
    if(pop===0){accord='abeille';}
    else{accord='abeilles';}
     popu = paper.text(600,70,'Population de la ruche : '+pop+' '+accord).attr({'font-size':20});
    
}

population(80000);
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function flower(fleurpath, quanti, setflower){
// Area 1 bottom image
for (var i = 0; i <quanti ; i++) {
var zoax = getRandomArbitrary(-20, 800);
var zoay = getRandomArbitrary(260, 600);
var fleur = paper.image(fleurpath,zoax,zoay, 90, 72);
var alsize = getRandomArbitrary(0.02, 0.17);
fleur.scale(alsize,alsize);
setflower.push(fleur);
}

// Area 2 on the right
for (var i = 0; i <quanti ; i++) {
var zoax = getRandomArbitrary(260, 800);
var zoay = getRandomArbitrary(140, 265);
var fleur = paper.image(fleurpath,zoax,zoay, 90, 72);
var alsize = getRandomArbitrary(0.06, 0.07);
fleur.scale(alsize,alsize); 
setflower.push(fleur);
}

// zone 3 à gauche
for (var i = 0; i <(quanti/4) ; i++) {
var zoax = getRandomArbitrary(-100, 120);
var zoay = getRandomArbitrary(150, 300);
var fleur = paper.image(fleurpath,zoax,zoay, 90, 72);
var alsize = getRandomArbitrary(0.06, 0.07);
fleur.scale(alsize,alsize); 
setflower.push(fleur);
}

}

var pathblue = objfleurbleue.src;
var pathred = objfleurrouge.src;
var pathyellow = objfleurjaune.src;

// For each kind of flower : path, quanti, set name !
flower(pathblue,quantifb,blueset);
flower(pathred,quantifr,redset);
flower(pathyellow,quantifj,yellowset);


function beefly(quanti){
var xmob = 20;
for (var i = 0; i < quanti; i++) {

abeille[i] = paper.image(objabeille.src,180, 160, 100, 68);
abeille[i].scale(0.1,0.1);
beeset.push(abeille[i]); 
}
beeset.forEach(function(e){
    var ymob =  getRandomArbitrary(150,370);
    if(xmob>650){xmob = 20;}
    e.animate({ 'transform':"s1 1", x :xmob, y : ymob},2000);
    xmob = xmob+100;
});


}

beefly(8); // Init bees first value


$container.find(".pesticide").mousedown(function(event) {
    beepresente = beeset.length;
});

function beeremover(killedbee){
for (var i = 0; i < killedbee; i++) {
        beeset[beeset.length-1].animate({'opacity' : 0 }, 3000 );
        beeset.pop();
    }   
}


function frelonflight(){
var frelonvolant = paper.image(objfrelonvolant.src,0,50, 100, 68);
frelonvolant.scale(1);
frelonvolant.animate({'x':1000, 'y':300, 'width': 300, 'height':150},6000, function(){this.remove();});}


$container.find(".pesticide").mouseup(function(event) {

    pesticlick += 1;
    $container.find(".pesticlick").html(pesticlick);
    
    var otherslider = $('.frelonslider').val();
    if(this.value == 0 && otherslider == 0 ){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group1[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group2[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group3[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
 
        // population = 8
        var actionbee = 8 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        popu.remove();
        population(80000);


    }

    if(this.value == 1 && otherslider == 0){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group2[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group3[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }

        // population = 6
        var actionbee = 6 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(60000);
    }

    if(this.value == 0 && otherslider == 1){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group2[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group3[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }

        // population = 6
        var actionbee = 6 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(60000);
    }

    if(this.value == 1 && otherslider == 2){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }


        // population = 2
        var actionbee = 2 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(20000);
    }

    if(this.value == 2 && otherslider == 1){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }

        // population = 2
        var actionbee = 2 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(20000);
    }       

    if(this.value == 2 && otherslider == 0){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "1" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        
        // population = 4
        var actionbee = 4 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(40000);
    }

    if(this.value == 0 && otherslider == 2){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "1" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }

        // population = 4
        var actionbee = 4 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(40000);
    }

    if(this.value == 1 && otherslider == 1){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Disappearance of 25%
            redset[group3[i]].animate({ "opacity": "1" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        // population = 4
        var actionbee = 4 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(40000);
    }

    if(this.value == 2 && otherslider == 2){
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group4[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        
        beeremover(beeset.length);
        popu.remove();
        population(0);
    }
});

$container.find(".frelonslider").mousedown(function(event) {
    
        beepresente = beeset.length;

});

$container.find(".frelonslider").mouseup(function(event) {

    frelonclick += 1;
    $container.find(".frelonclick").html(frelonclick);

    var otherslider = $container.find('.pesticide').val();
    if(this.value == 0 && otherslider == 0 ){
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group1[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group2[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group3[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
       // population = 8
        var actionbee = 8 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(80000);

    }

    if(this.value == 1 && otherslider == 0){ 

        frelonflight();
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group2[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group3[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
       // population = 6
        var actionbee = 6 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(60000);

    }

    if(this.value == 0 && otherslider == 1){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group2[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
            blueset[group3[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group3[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
       // population = 6
        var actionbee = 6 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(60000);
    }

    if(this.value == 1 && otherslider == 2){

        frelonflight();
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        
       // population = 2
        var actionbee = 2 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(20000);
    }

    if(this.value == 2 && otherslider == 1){

        frelonflight();
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        
       // population = 2
        var actionbee = 2 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(20000);
    }       

    if(this.value == 2 && otherslider == 0){

        frelonflight();
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        
       // population = 4
        var actionbee = 4 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(40000);
    }

    if(this.value == 0 && otherslider == 2){
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }

       // population = 4
        var actionbee = 4 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(40000);
    }

    if(this.value == 1 && otherslider == 1){

        frelonflight();
        
        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }
        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
            blueset[group4[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
            redset[group4[i]].animate({ "opacity": "1" }, 2000);// Appearance of 25%
        }
        
       // population = 4
        var actionbee = 4 - beepresente;
        if(actionbee >0 ){beefly(actionbee);}
        else{ beeremover(Math.abs(actionbee));}
        popu.remove();
        population(40000);
    }

    if(this.value == 2 && otherslider == 2){

        frelonflight();

        for (var i = 0; i < group1.length; i++) {
            blueset[group1[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group1[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group2.length; i++) {
            blueset[group2[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
            redset[group2[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
        }

        for (var i = 0; i < group3.length; i++) {
                    blueset[group3[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group3[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
        for (var i = 0; i < group4.length; i++) {
                    blueset[group4[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group4[i]].animate({ "opacity": "0" }, 2000);// Disappearance of 25%
                }
    beeremover(beeset.length);
    popu.remove();
    population(0);

    }
});      
    }


    return {
        render : function(id, container, config, assetManager){

            var $container = $(container);

            renderChoices(id, $container, config, assetManager);

            //render rich text content in prompt
            html.render($container.find('.prompt'));
           
        },
        renderChoices : function(id, container, config, assetManager){
            renderChoices(id, $(container), config, assetManager);
        }
    };
});