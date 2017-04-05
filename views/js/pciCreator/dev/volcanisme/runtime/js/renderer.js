/*
Copyright DEPP © 2017 - Ministère de l'éducation nationale 
Assets created by Wiquid.
All assets are under Creative Commons licence -
*/

define(['IMSGlobal/jquery_2_1_1',
    'volcanisme/runtime/js/raphael.min',
    'lodash',
    'OAT/util/html'
], function($, Raphael, _,html) {

    "use strict"; 

    function renderChoices(id, $container, config, assetManager) {

        var expetube, paper, bg, water,courbureL,courbureR,tubGD,tubDG,tubDD,tubGG,ouvertG,path48352,pureefluide,degoulineur;
        var borderright,extruder, setjarre, clickpfluide, clickpcompact,clickcachet,clickreinit, setbouchon;
        var bouchoncache, commandpanel, consigne, choix, btfluidset,btfluide, choixfluide ;
        var btdenseset, btdense, choixdense, btpuree1, consigne2,btcachet, cachet, btcachetset,btzeroset,btrmzero   ;
        var rmzero, activpuree, splizz, degoulleft,degoulcenter,degoulright,waterpatch ;
        var setleftbull, setrightbull, bullecollector, bulletimer, buttontimer,bullor, verso; 
        
        expetube = _.uniqueId('expetube_');// lodash generate unique id
        $container.find(".expetube").attr('id', expetube); // Attribution of the unique Id to the Id attribute
        paper = Raphael(expetube, 800, 600); 
        bg = paper.rect(0, 0, 800, 600);

        water = paper.path("m 304.85443,-36.80999 0,37.45037358 0,20.74325642 0.97053,18.188565 3.72936,13.641413 9.72085,15.644341 12.27975,11.57007 12.05743,7.7703 16.60944,7.36659 17.65763,3.85715 15.56283,1.945931 c 4.89286,-0.88213 10.96516,0.14585 16.86514,-0.93773 8.85809,-1.626811 13.94862,-1.683631 27.237,-7.158941 0,0 13.69711,-6.07533 19.71992,-10.43907 6.88822,-4.99078 18.37069,-17.712077 18.37069,-17.712077 0,0 6.69236,-13.326256 9.20555,-20.326849 3.14729,-8.766923 1.79478,-21.466934 1.79478,-21.466934 l -0.13637,-59.557602 -46.36946,0.133012 -0.2374,24.80493 -0.0646,21.41539 0.13321,12.57623 -0.94665,15.605928 -4.055,9.666637 -10.61726,11.975486 -14.48194,7.044743 -13.12242,1.829316 -16.34773,-3.047329 -11.23967,-4.54549 -9.32022,-9.2913 -6.13617,-10.213192 -1.22115,-16.047772 0,-41.231063 -0.51095,-20.998746 z").attr({ id: 'path4854', parent: 'layer1', fill: '#56afff', "fill-opacity": '1', "fill-rule": 'evenodd', stroke: 'none', 'stroke-width': '1', 'stroke-opacity': '1', "stroke-width": '1', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4854');
        courbureL = paper.path("M 439.61216,29.97044 A 43.559486,38.034184 0 0 1 417.88635,63.174381 43.559486,38.034184 0 0 1 374.09024,63.107698 43.559486,38.034184 0 0 1 352.49718,29.837801").attr({ id: 'path4780', parent: 'layer1', opacity: '1', fill: 'none', "fill-opacity": '1', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4780').toFront();
        courbureR = paper.path("M 487.09675,29.92162 A 91.045479,70.813156 0 0 1 441.68674,91.741915 91.045479,70.813156 0 0 1 350.14644,91.617648 91.045479,70.813156 0 0 1 305.01416,29.674441").attr({ id: 'path4782', parent: 'layer1', opacity: '1', fill: 'none', "fill-opacity": '1', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4782').toFront();
        tubGD = paper.path("m 352.49447,32.558011 c 0,-5.058094 0,-222.555661 0,-222.555661 l 0,5.05809").attr({ id: 'path4784', parent: 'layer1', fill: 'none', "fill-rule": 'evenodd', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4784');
        tubDG = paper.path("m 439.53961,32.558011 c 0,-5.058094 0,-222.555661 0,-222.555661 l 0,5.05809").attr({ id: 'path4784-5', parent: 'layer1', fill: 'none', "fill-rule": 'evenodd', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path47845');
        tubDD = paper.path("m 486.87001,32.558011 c 0,-5.058094 0,-222.555661 0,-222.555661 l 0,5.05809").attr({ id: 'path4784-6', parent: 'layer1', fill: 'none', "fill-rule": 'evenodd', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path47846');
        tubGG = paper.path("m 304.77903,32.558011 c 0,-5.058094 0,-222.555661 0,-222.555661 l 0,5.05809").attr({ id: 'path4784-6-2', parent: 'layer1', fill: 'none', "fill-rule": 'evenodd', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path478462');
        ouvertG = paper.ellipse(328.61954, -189.19867, 23.925554, 4.6123991).attr({ id: 'path4835', parent: 'layer1', opacity: '1', fill: 'none', "fill-opacity": '1', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4835');
        path48352 = paper.ellipse(463.30063, -188.73909, 23.925554, 4.6123991).attr({ id: 'path4835-2', parent: 'layer1', opacity: '1', fill: 'none', "fill-opacity": '1', stroke: '#000000', "stroke-width": '1.01', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path48352');
        pureefluide = paper.path('m 447.19366,-177.76687 c 0,0 -6.22752,5.58828 -6.22752,6.93717 0,1.34889 2.72455,7.51525 2.72455,7.51525 0,0 0.38921,3.46858 0.77844,4.43207 l 1.16766,2.89048 0.8019,4.21802 c 0,0 4.64717,0.79214 7.37171,0.98486 2.72454,0.19269 14.40115,0.77078 14.40115,0.77078 l 9.68314,-0.10921 1.99346,-5.67175 2.33533,-5.01017 c 0,0 3.11376,-3.66127 3.11376,-4.81747 0,-1.15618 -1.16768,-3.08318 -1.94611,-4.62477 -0.77842,-1.54159 -2.33532,-4.04667 -3.11376,-4.81746 -0.77844,-0.7708 -0.77844,-2.6978 -7.39517,-3.08318 -6.61675,-0.38541 -4.67065,-2.31239 -14.01194,-1.73429 -9.34128,0.57809 -11.6766,2.11967 -11.6766,2.11967 z');
        degoulineur= paper.rect(353, 180, 45, 5, 15).attr({ stroke: 'none', fill: '#e0d950', 'fill-opacity': 0 });
        borderright = paper.path('m 400,175 a 23.665695,4.3979797 0 0 1 -23.15952,4.39697 23.665695,4.3979797 0 0 1 -24.15022,-4.20888').attr({ 'stroke-width': 1 }).toFront();
        extruder = paper.rect(354, 180, 46, 200, 5).attr({ stroke: 'none', fill: '#e0d950', 'fill-opacity': 0 });
        // response counters
        clickpfluide = 0;
        clickpcompact = 0;
        clickcachet = 0;
        clickreinit = 0;

        // Stop animation
        setbouchon = paper.set();
        setbouchon.push(
            paper.ellipse(319.02319, -219.44574, 30.800091, 6.1481109).attr({ id: 'path4856', parent: 'layer1', opacity: '1', fill: '#82919f', "fill-opacity": '1', stroke: 'none', 'stroke-width': '1', 'stroke-opacity': '1', "stroke-width": '1', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209 m1,0,-0.04472932,0.99899914,0,0").data('id', 'path4856'),
            paper.path("m 298.74788,-220.19915 9.23372,45.41187 41.33232,0 9.08757,-45.61304 z").attr({ id: 'path4858', parent: 'layer1', fill: '#82919f', "fill-opacity": '1', "fill-rule": 'evenodd', stroke: '#000000', "stroke-width": '0', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4858'),
            paper.path("m 300.11947,-217.09436 c -0.219,-1.45618 8.65352,-2.38467 25.63767,-3.46684 15.7513,-1.00362 31.32922,1.88101 31.64271,3.33699 -15.15104,-5.48551 -49.86088,-1.89976 -57.28038,0.12985 z").attr({ id: 'path4860', parent: 'layer1', opacity: '1', fill: 'none', "fill-opacity": '1', stroke: '#c4dce0', "stroke-width": '0.71', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4860')

        );

        setbouchon.forEach(
            function(e) {
                e.hide();
            }
        );
        bouchoncache = paper.path("m 304.47494,-192.15568 0.71022,3.53547 46.82955,-0.0282 0.62553,-2.76208 -21.46876,-6.7677 -18.57604,2.40644 z").attr({ id: 'path4863', parent: 'layer1', fill: '#82919f', "fill-opacity": '1', "fill-rule": 'evenodd', stroke: '#000000', "stroke-width": '0', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4863').hide();
        commandpanel = paper.rect(560, 130, 240, 350).attr({ 'fill': 'pink', 'fill-opacity': 0.5 });
        consigne = paper.text(680, 170, 'Vous allez pouvoir ajouter \n de la purée de pomme de terre \n dans le tube en forme de U.').attr({ 'text-anchor': 'middle', 'stroke': '#545454', 'font-size': 16 });
        choix = paper.text(680, 240, 'Choisissez la densité \n de la purée à verser : ').attr({ 'text-anchor': 'middle', 'stroke': '#545454', 'font-size': 16 });
        btfluidset = paper.set();
        btfluide = paper.rect(610, 300, 140, 40, 5).attr({ fill: "lightgrey" });
        choixfluide = paper.text(680, 320, 'Purée fluide ').attr({ 'text-anchor': 'middle', 'stroke': '#545454', 'font-size': 16, cursor: 'pointer' });
        btfluidset.push(btfluide);
        btfluidset.push(choixfluide);

        btfluidset.mouseover(function(event) {
            this.attr({ 'fill-opacity': 0.3, 'stroke-opacity': 0.6 });
        });
        btfluidset.mouseout(function(event) {
            this.attr({ 'fill-opacity': 1, 'stroke-opacity': 1 });
        });



        btdenseset = paper.set();
        btdense = paper.rect(610, 380, 140, 40, 5).attr({ fill: "lightgrey" });
        choixdense = paper.text(680, 400, 'Purée compacte').attr({ 'text-anchor': 'middle', 'stroke': '#545454', 'font-size': 16, cursor: 'pointer' });
        btdenseset.push(btdense);
        btdenseset.push(choixdense);
        btdenseset.mouseover(function(event) {
            this.attr({ 'fill-opacity': 0.3, 'stroke-opacity': 0.6 });
        });
        btdenseset.mouseout(function(event) {
            this.attr({ 'fill-opacity': 1, 'stroke-opacity': 1 });
        });

        btpuree1 = paper.rect(590, 232, 175, 40, 5).attr({ fill: "lightgrey" }).hide();
        consigne2 = paper.text(680, 170, 'Vous allez maintenant ajouter \n un cachet effervescent \n à l\'eau présente dans le tube.').attr({ 'text-anchor': 'middle', 'stroke': '#545454', 'font-size': 16 }).hide();

        btcachet = paper.rect(580, 245, 200, 50, 5).attr({ fill: "lightgrey" }).hide();
        cachet = paper.text(680, 270, 'Introduire le cachet \n effervescent et boucher !').attr({ 'text-anchor': 'middle', 'stroke': '#545454', 'font-size': 16, cursor: 'pointer' }).hide();
        btcachetset = paper.set();
        btcachetset.push(btcachet);
        btcachetset.push(cachet);

        btzeroset = paper.set();
        btrmzero = paper.rect(580, 245, 200, 50, 5).hide();
        rmzero = paper.text(680, 270, 'Rétablir les conditions \n initiales').attr({ 'text-anchor': 'middle', 'stroke': '#545454', 'font-size': 16, cursor: 'pointer' }).hide();

        btzeroset.push(btrmzero);
        btzeroset.push(rmzero);

        // Dripping
        degoulleft = paper.rect(349, 170, 10, 5, 15).attr({ fill: '#e2dc5f', stroke: 'none', 'fill-opacity': 0 });
        degoulcenter = paper.rect(363, 170, 20, 5, 15).attr({ fill: '#e0e053', stroke: 'none', 'fill-opacity': 0 });
        degoulright = paper.rect(395, 170, 10, 5, 15).attr({ fill: '#e2dc5f', stroke: 'none', 'fill-opacity': 0 });

        waterpatch = paper.rect(219, 330, 48, 80).attr({ fill: '#56afff', stroke: 'none', }).toBack(); // 190


        btfluidset.click(function(event) {
            activpuree = 'fluide';
            videjarre();
            choix.hide();
            btfluidset.forEach(
                function(e) { e.hide(); });
            btdenseset.forEach(
                function(e) { e.hide(); });
            clickpfluide += 1;
            $container.find('.clickpfluide').html(clickpfluide);
        });

        btdenseset.click(function(event) {
            activpuree = 'dense';
            videjarre(activpuree);
            choix.hide();
            btfluidset.forEach(
                function(e) { e.hide(); });
            btdenseset.forEach(
                function(e) { e.hide(); });
            clickpcompact += 1;
            $container.find('.clickpcompact').html(clickpcompact);
        });

        function dropcachet() {
            splizz = paper.ellipse(245, 0, 20, 20).attr({
                fill: 'lightgrey',
                stroke: 'none'
            });

            splizz.animate({ cx: 245, cy: 410, r: 20 }, 1000, function() {
                splizz.animate({ cx: 250, cy: 429, rx: 17, ry: 10 },
                    350,
                    function() {
                        this.animate({
                                cx: 310,
                                cy: 450,
                                ry: 3,
                                transform: 'r-30',
                            },
                            2000,
                            function() {
                                this.animate({
                                    transform: 'r0',
                                    cy: 460
                                }, 1000, function() {
                                    createbulles(30);
                                    boucheur();
                                });
                            });
                    });
            });
        }


        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }


       
        setleftbull = paper.set();
        setrightbull = paper.set();
        bullecollector = paper.set(); // for deletion


        function createbulles(quanti) {
            var start;

            for (start = 1; start < 10; start++) {
               bulletimer=  setTimeout(function() {
                var i, cx, cy;
                    for (i = 0; i < quanti; i++) {
                        cx = getRandomArbitrary(290, 330);
                        cy = getRandomArbitrary(450, 460);
                        bullor = paper.ellipse(cx, cy, 5, 5).attr({ id: 'path4166-2-04', parent: 'layer1', opacity: '0', fill: 'white', "fill-opacity": '0.5', stroke: '#white', "stroke-width": '0.31', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' });
                        bullor.animate({ opacity: 1 }, 1000);
                        bullecollector.push(bullor);
                        if (i < (quanti / 2)) { setleftbull.push(bullor); } else { setrightbull.push(bullor); }
                    }
                    bullemonte(setleftbull);
                    bullemonte(setrightbull);
               
                }, 1000 * start);
              
            }


            buttontimer = setTimeout(function() {
                btzeroset.forEach(
                    function(e) {
                        e.show();
                    });
            }, 20500);

           return buttontimer;
        }

       

        function bullemonte(setname) {
            if (setname == setleftbull) {
                setname.forEach(
                    function(el) {
                        var posirx = getRandomArbitrary(215, 280);
                        var posiry = getRandomArbitrary(390, 450);
                        el.animate({ cx: posirx, cy: posiry }, 1000, function() {
                            posirx = getRandomArbitrary(220, 265);
                            posiry = getRandomArbitrary(200, 230);
                            el.animate({ cx: posirx, cy: posiry }, 1000);
                        });
                    }
                );
                setname.clear();

            } else if (setname == setrightbull) {
                setname.forEach(
                    function(el) {
                        var posiry = getRandomArbitrary(390, 420);
                        var posirx = getRandomArbitrary(350, 420);
                        el.animate({ cx: posirx, cy: posiry }, 1500);
                    }
                );
                setname.clear();
            }
            courbureR.toFront();
            courbureL.toFront();
            tubGG.toFront();
            tubGD.toFront();
            tubDG.toFront();
            tubDD.toFront();
            degoulineur.toFront();
            borderright.toFront();
            degoulleft.toFront();
            degoulcenter.toFront();
            degoulright.toFront();



            splizz.animate({ 'stroke-opacity': 0, 'fill-opacity': 0 }, 5000, function() {

                if (activpuree == 'fluide') {
                    // Fluid mixed
                    pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 19.11522,-3.88791 27.35333,-3.81871 7.32142,0.0615 19.57546,3.283 19.57546,3.283 0,0 -0.71005,208.516603 -0.26524,222.669609 0.53199,16.926848 -6.07243,24.435239 -6.07243,24.435239 l -48.04164,-7.079776 c 0,0 5.38567,-3.01645 6.83021,-13.315074 1.44453,-10.298624 0.62031,-226.174288 0.62031,-226.174288 z' }, 2000);
                    degoulineur.attr({ 'fill-opacity': 1 });
                    borderright.attr({ 'stroke-opacity': 1 });
                    degoulineur.animate({ transform: 't0,-20', height: 30, width: 48 }, 5000, function() {
                        borderright.hide();
                        degoulleft.animate({ 'fill-opacity': 1 }, 1000, function() { degoulleft.animate({ height: 180 }, 4000); });
                        degoulcenter.animate({ 'fill-opacity': 1 }, 1000, function() { degoulcenter.animate({ height: 160 }, 4000); });
                        degoulright.animate({ 'fill-opacity': 1 }, 1000, function() { degoulright.animate({ height: 130 }, 3500); });
                        degoulineur.animate({ height: 180 }, 8000);
                        waterpatch.animate({ transform: 't0 -130' }, 4000);

                    });

                } else if (activpuree == 'dense') {
                    // Compact fluid
                    pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 19.11522,-3.88791 27.35333,-3.81871 7.32142,0.0615 19.57546,3.283 19.57546,3.283 0,0 -0.71005,208.516603 -0.26524,222.669609 0.53199,16.926848 -6.07243,24.435239 -6.07243,24.435239 l -48.04164,-7.079776 c 0,0 5.38567,-3.01645 6.83021,-13.315074 1.44453,-10.298624 0.62031,-226.174288 0.62031,-226.174288 z' }, 2000);
                    extruder.attr({ 'fill-opacity': 1 });
                    borderright.attr({ 'stroke-opacity': 1 });
                    extruder.animate({ transform: 't0,-100' }, 5000);
                    borderright.toFront();
                }
                waterpatch.animate({ transform: 't0 -130' }, 4000);

            });
        }
        //*************************************

        btcachetset.click(function(event) {
            dropcachet();
            consigne2.hide();
            cachet.hide();
            btcachet.hide();
            clickcachet += 1;
            $container.find('.clickcachet').html(clickcachet);
        });


        function boucheur() {
            setbouchon.forEach(function(e) { e.show(); });
            ouvertG.toFront();
            bouchoncache.show();
            bouchoncache.toFront();
        }

        verso = paper.path('m 360,175 16.78572,-70 c 0,0 15,30 17,42.07812 2.79781,13.13813 5.17915,42.5639 5.17915,42.5639 l -3.57142,3.93684 z').attr({
            stroke: 'none',
            fill: '#e0d950'
        }).hide();

        function videjarre(typep) {
            var jarre;
            if (typep == 'dense') {
                setjarre = paper.set();
                jarre = paper.path('m 563.54969,67.888815 c 11.23114,35.811455 16.6548,66.178525 12.11408,67.826745 -4.54072,1.64822 -17.32637,-26.04659 -28.55752,-61.858074 C 535.8751,38.045998 530.45144,7.678919 534.99218,6.0307354 539.53291,4.3825519 552.31855,32.077356 563.54969,67.888815 Z M 536.04637,5.5004831 793.93732,-93.459444 l 6.82924,-7.530956 45.00055,135.16282 -9.27323,-1.595759 -241.86762,80.188709 -18.79005,22.43289 c 0,0 4.75855,-19.41807 -12.24381,-67.341071 C 546.91124,20.839533 540.89682,12.490543 536.04637,5.5004831 z').attr({ opacity: 1, fill: 'orange', 'fill-opacity': 1, stroke: 'grey', 'stroke-width': 3, 'stroke-opacity': 1, transform: 't-300, -100 -90' });
                setjarre.push(jarre);
                setjarre.animate({
                    transform: 't-200, 10'
                }, 2000, function() {
                    setjarre.animate({ transform: 't-200, 10 r-10' }, 2000, function() {
                        verso.show();
                        verso.toBack();
                        setjarre.toBack();
                        remplisseur(typep);
                    });
                });
            } else {
                var jarre;
                setjarre = paper.set();
                jarre = paper.path('m 563.54969,67.888815 c 11.23114,35.811455 16.6548,66.178525 12.11408,67.826745 -4.54072,1.64822 -17.32637,-26.04659 -28.55752,-61.858074 C 535.8751,38.045998 530.45144,7.678919 534.99218,6.0307354 539.53291,4.3825519 552.31855,32.077356 563.54969,67.888815 Z M 536.04637,5.5004831 793.93732,-93.459444 l 6.82924,-7.530956 45.00055,135.16282 -9.27323,-1.595759 -241.86762,80.188709 -18.79005,22.43289 c 0,0 4.75855,-19.41807 -12.24381,-67.341071 C 546.91124,20.839533 540.89682,12.490543 536.04637,5.5004831 z').attr({ opacity: 1, fill: '#ffd056', 'fill-opacity': 1, stroke: 'grey', 'stroke-width': 3, 'stroke-opacity': 1, transform: 't-300, -100 -90' });
                setjarre.push(jarre);
                setjarre.animate({
                    transform: 't-200, 10'
                }, 2000, function() {
                    setjarre.animate({ transform: 't-200, 10 r-10' }, 2000, function() {
                        verso.show();
                        verso.toBack();
                        setjarre.toBack();
                        remplisseur();
                    });
                });
            }
        }


        function remplisseur(typep) {
            var animwater;
            if (typep == 'dense') {     
                pureefluide = paper.path("m 440.10168,-190.39885 c 0,0 16.25808,-3.3522 24.49619,-3.283 7.32142,0.0615 21.71831,3.283 21.71831,3.283 l 0,22.31247 0,29.42345 -46.46704,0.25254 0.0327,-29.31843 z").attr({ id: 'rect5036', parent: 'layer1', opacity: '1', fill: '#e0d950', "fill-opacity": '1', stroke: '#d2d8dd', "stroke-width": '0', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'rect5036');
                pureefluide.toBack();
                animwater = Raphael.animation({ path: "m 304.85443,-134.28971 0,134.93009358 0,20.74325642 0.97053,18.188565 3.72936,13.641413 9.72085,15.644341 12.27975,11.57007 12.05743,7.7703 16.60944,7.36659 17.65763,3.85715 15.56283,1.945931 c 4.89286,-0.88213 10.96516,0.14585 16.86514,-0.93773 8.85809,-1.626811 13.94862,-1.683631 27.237,-7.158941 0,0 13.69711,-6.07533 19.71992,-10.43907 6.88822,-4.99078 18.37069,-17.712077 18.37069,-17.712077 0,0 6.69236,-13.326256 9.20555,-20.326849 3.14729,-8.766923 1.79478,-21.466934 1.79478,-21.466934 l -0.13637,-59.557602 -46.36946,0.133012 -0.2374,24.80493 -0.0646,21.41539 0.13321,12.57623 -0.94665,15.605928 -4.055,9.666637 -10.61726,11.975486 -14.48194,7.044743 -13.12242,1.829316 -16.34773,-3.047329 -11.23967,-4.54549 -9.32022,-9.2913 -6.13617,-10.213192 -1.22115,-16.047772 0,-41.231063 -0.51095,-118.478463 z" }, 3000);
                water.animate(animwater.delay(1150));
                water.toBack();

                pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 16.25808,-3.3522 24.49619,-3.283 7.32142,0.0615 21.71831,3.283 21.71831,3.283 0,0 1.16036,167.81321 0.44905,181.9553273 -0.7307,14.5277357 0.62238,41.9234507 0.62238,41.9234507 l -49.32419,5.25254 2.17556,-34.6755734 z' }, 2000,
                    function() {
                        pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 19.11522,-3.88791 27.35333,-3.81871 7.32142,0.0615 19.57546,3.283 19.57546,3.283 0,0 -0.71005,208.516603 -0.26524,222.669609 0.53199,16.926848 -6.07243,24.435239 -6.07243,24.435239 l -48.04164,-7.079776 c 0,0 5.38567,-3.01645 6.83021,-13.315074 1.44453,-10.298624 0.62031,-226.174288 0.62031,-226.174288 z' }, 1000, function() {
                            pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 19.11522,-3.88791 27.35333,-3.81871 7.32142,0.0615 19.57546,3.283 19.57546,3.283 0,0 -0.96655,208.514867 -0.58091,222.669609 0.78453,28.79614 -23.49756,46.72173 -23.49756,46.72173 L 430.56772,53.131122 c 0,0 7.46911,-7.05706 8.91365,-17.355684 1.44453,-10.298624 0.62031,-226.174288 0.62031,-226.174288 z' }, 1000, function() {
                                hidejarre();
                                btcachetset.forEach(
                                    function(e) {
                                        e.show();
                                    });
                                consigne.hide();
                                consigne2.show();
                            });
                        });
                    });
            } else {
                pureefluide = paper.path("m 440.10168,-190.39885 c 0,0 16.25808,-3.3522 24.49619,-3.283 7.32142,0.0615 21.71831,3.283 21.71831,3.283 l 0,22.31247 0,29.42345 -46.46704,0.25254 0.0327,-29.31843 z").attr({ id: 'rect5036', parent: 'layer1', opacity: '1', fill: '#e0d950', "fill-opacity": '1', stroke: '#d2d8dd', "stroke-width": '0', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'rect5036');
                pureefluide.toBack();

                animwater = Raphael.animation({ path: "m 304.85443,-134.28971 0,134.93009358 0,20.74325642 0.97053,18.188565 3.72936,13.641413 9.72085,15.644341 12.27975,11.57007 12.05743,7.7703 16.60944,7.36659 17.65763,3.85715 15.56283,1.945931 c 4.89286,-0.88213 10.96516,0.14585 16.86514,-0.93773 8.85809,-1.626811 13.94862,-1.683631 27.237,-7.158941 0,0 13.69711,-6.07533 19.71992,-10.43907 6.88822,-4.99078 18.37069,-17.712077 18.37069,-17.712077 0,0 6.69236,-13.326256 9.20555,-20.326849 3.14729,-8.766923 1.79478,-21.466934 1.79478,-21.466934 l -0.13637,-59.557602 -46.36946,0.133012 -0.2374,24.80493 -0.0646,21.41539 0.13321,12.57623 -0.94665,15.605928 -4.055,9.666637 -10.61726,11.975486 -14.48194,7.044743 -13.12242,1.829316 -16.34773,-3.047329 -11.23967,-4.54549 -9.32022,-9.2913 -6.13617,-10.213192 -1.22115,-16.047772 0,-41.231063 -0.51095,-118.478463 z" }, 3000);
                water.animate(animwater.delay(1150));
                water.toBack();
                pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 16.25808,-3.3522 24.49619,-3.283 7.32142,0.0615 21.71831,3.283 21.71831,3.283 0,0 1.16036,167.81321 0.44905,181.9553273 -0.7307,14.5277357 0.62238,41.9234507 0.62238,41.9234507 l -49.32419,5.25254 2.17556,-34.6755734 z' }, 2000, 'linear',
                    function() {
                        pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 19.11522,-3.88791 27.35333,-3.81871 7.32142,0.0615 19.57546,3.283 19.57546,3.283 0,0 -0.71005,208.516603 -0.26524,222.669609 0.53199,16.926848 -6.07243,24.435239 -6.07243,24.435239 l -48.04164,-7.079776 c 0,0 5.38567,-3.01645 6.83021,-13.315074 1.44453,-10.298624 0.62031,-226.174288 0.62031,-226.174288 z' }, 1000, function() {
                            pureefluide.animate({ path: 'm 440.10168,-190.39885 c 0,0 19.11522,-3.88791 27.35333,-3.81871 7.32142,0.0615 19.57546,3.283 19.57546,3.283 0,0 -0.96655,208.514867 -0.58091,222.669609 0.78453,28.79614 -23.49756,46.72173 -23.49756,46.72173 L 430.56772,53.131122 c 0,0 7.46911,-7.05706 8.91365,-17.355684 1.44453,-10.298624 0.62031,-226.174288 0.62031,-226.174288 z' }, 1000, function() {
                                hidejarre();
                                btcachetset.forEach(
                                    function(e) {
                                        e.show();
                                    });
                                consigne.hide();
                                consigne2.show();
                            });
                        });
                    });
            }
        }

        function hidejarre() {
            verso.hide();
            setjarre.animate({
                    transform: 'r30'
                },
                2000,
                function() {
                    this.hide();
                });
        }

        btzeroset.click(function(event) {
            clearTimeout(bulletimer);
            clearTimeout(buttontimer);
            bullor.stop();
            degoulineur.stop();
            degoulleft.stop();
            degoulcenter.stop();
            degoulright.stop();
            water.stop();
            pureefluide.stop();
            waterpatch.stop();
            extruder.stop();
           

            rzero();
            clickreinit += 1;
            $container.find('.clickreinit').html(clickreinit);
        });

        function rzero() {
            extruder.remove();
            extruder = paper.rect(354, 180, 46, 200, 5).attr({ stroke: 'none', fill: '#e0d950', 'fill-opacity': 0 });
            btzeroset.forEach(
                function(e) {
                    e.hide();
                });
            bouchoncache.hide();
            setbouchon.forEach(
                function(e) {
                    e.hide();
                });
            splizz.remove();
            cachet.hide();

            bullecollector.forEach(
                function(e) {
                    e.stop();
                }
            );

            bullecollector.remove();

            degoulleft.remove();
            degoulcenter.remove();
            degoulright.remove();
            degoulleft = paper.rect(349, 170, 10, 5, 15).attr({ fill: '#e2dc5f', stroke: 'none', 'fill-opacity': 0 }).stop();
            degoulcenter = paper.rect(363, 170, 20, 5, 15).attr({ fill: '#e2dc5f', stroke: 'none', 'fill-opacity': 0 }).stop();
            degoulright = paper.rect(395, 170, 10, 5, 15).attr({ fill: '#e2dc5f', stroke: 'none', 'fill-opacity': 0 }).stop();
            borderright.show();
            borderright.toFront();

            pureefluide.attr('fill-opacity', 0);


            water.remove();
            water = paper.path("m 304.85443,-36.80999 0,37.45037358 0,20.74325642 0.97053,18.188565 3.72936,13.641413 9.72085,15.644341 12.27975,11.57007 12.05743,7.7703 16.60944,7.36659 17.65763,3.85715 15.56283,1.945931 c 4.89286,-0.88213 10.96516,0.14585 16.86514,-0.93773 8.85809,-1.626811 13.94862,-1.683631 27.237,-7.158941 0,0 13.69711,-6.07533 19.71992,-10.43907 6.88822,-4.99078 18.37069,-17.712077 18.37069,-17.712077 0,0 6.69236,-13.326256 9.20555,-20.326849 3.14729,-8.766923 1.79478,-21.466934 1.79478,-21.466934 l -0.13637,-59.557602 -46.36946,0.133012 -0.2374,24.80493 -0.0646,21.41539 0.13321,12.57623 -0.94665,15.605928 -4.055,9.666637 -10.61726,11.975486 -14.48194,7.044743 -13.12242,1.829316 -16.34773,-3.047329 -11.23967,-4.54549 -9.32022,-9.2913 -6.13617,-10.213192 -1.22115,-16.047772 0,-41.231063 -0.51095,-20.998746 z").attr({ id: 'path4854', parent: 'layer1', fill: '#56afff', "fill-opacity": '1', "fill-rule": 'evenodd', stroke: 'none', 'stroke-width': '1', 'stroke-opacity': '1', "stroke-width": '1', "stroke-linecap": 'butt', "stroke-linejoin": 'miter', "stroke-opacity": '1' }).transform("t-86.295739,364.87209").data('id', 'path4854');
            water.stop();

            waterpatch.remove();
            waterpatch = paper.rect(219, 330, 48, 80).attr({ fill: '#56afff', stroke: 'none', }).toBack(); // 190


            degoulineur.remove();
            degoulineur = paper.rect(353, 180, 45, 5, 15).attr({ stroke: 'none', fill: '#e0d950', 'fill-opacity': 0 });
            consigne.show();
            choix.show();
            btfluidset.forEach(
                function(e) {
                    e.show();
                });
            btdenseset.forEach(
                function(e) {
                    e.show();
                });

        }
     return buttontimer;
    }


    return {

        render: function(id, container, config, assetManager) {

            var $container = $(container);

            var bttimer =  renderChoices(id, $container, config, assetManager);

            //render rich text content in prompt
            html.render($container.find('.prompt'));
            return bttimer;
        },
        renderChoices: function(id, container, config, assetManager) {
            renderChoices(id, $(container), config, assetManager);
        }
    };
});
