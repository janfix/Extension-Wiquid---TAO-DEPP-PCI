define(['IMSGlobal/jquery_2_1_1', 'OAT/util/html'], function($, html){

    function renderChoices(id, $container, config, assetManager){

    	$("#premierplan").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/bg.png')}).attr("id","bg").attr("class","bg")); 
    	$("#convoi").append($('<img>', {src: assetManager.resolve('train/runtime/img/train.png')}).attr("id","train").attr("class","train"));
		  $("#convoi").append($('<img>', {src: assetManager.resolve('train/runtime/img/roue.png')}).attr("id","roue").attr("class","roue"));
      $("#convoi").append($('<img>', {src: assetManager.resolve('train/runtime/img/coccifix.png')}).attr("id","coccifix").attr("class","coccifix"));


		$("#traj").append($('<img>', {src: assetManager.resolve('train/runtime/img/traj.png')}).attr("id","ptvvache"));    	
		$("#traj").append($('<img>', {src: assetManager.resolve('train/runtime/img/traj_circle.png')}).attr("id","ptvcc"));    	
		$("#traj").append($('<img>', {src: assetManager.resolve('train/runtime/img/cocciblue.png')}).attr("id","cocciblue").attr("class","cocci"));    	
		$("#traj").append($('<img>', {src: assetManager.resolve('train/runtime/img/coccired.png')}).attr("id","coccired").attr("class","cocci"));    	

		$("#situercocci").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/2coccis.png')}).attr("id","bellescoccis"));
		$("#ccbleu").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/macrococci.png')}).attr("id","macrococci"));
		$("#vache").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/vachelook.png')}).attr("id","vachelook"));
		$("#rmzero").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/zero.png')}).attr("id","zeroid")); //Attention  width="140px" 
		$("#cctraj").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/cctraject.png')}).attr("id","cctrajimg")); 
		$("#armzero").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/zero.png')}).attr("id","armzeroimg"));
		$("#vtraj").prepend($('<img>', {src: assetManager.resolve('train/runtime/img/vtraject.png')}).attr("id","vtrajimg"));


    	 // Identifie le contexte permet de faire varier l'affichage de l'édition
            $( "div" ).each(function( index ) {
            var divid = $(this).attr("id");
            if(divid=="item-editor-scroll-inner"){
               // alert("tu es dans EDITOR !");
            } });

            var answccbleue = "not-used";
            var answvache = "not-used";
            // Interaction du Contenu de la PCI 

             $("#ccbleu").click(function(event) {
              if(answccbleue == "not-used"){$("#trainansw").append(" animcocci-ok,"); answccbleue="anim-ok"; console.log("inside cond jp");}
                $(".cocci").hide();
                $("#situercocci").hide();
                $("#vache").hide();
                $("#bg").addClass('vachego');
                $("#cache").show();
                ccrouego();

              });

              $("#vache").click(function(event) {
              if(answvache == "not-used"){$("#trainansw").append(" animvache-ok,"); answvache="anim-ok";}
                $(".cocci").hide();
                $("#situercocci").hide();
                 $("#ccbleu").hide();
                $("#convoi").addClass('convoigo');
                $("#cache").show();
                vrouego();
              });

            $("#rmzero").click(function(event) {
             $("#bg").removeClass('vachego'); 
             $("#premierplan").addClass('premplan');
             $("#convoi").removeClass('convoigo');
             $("#convoi").show();
             $("#convoi").css("opacity",1);
             $(this).hide();
              $("#vache").show();
              $("#ccbleu").show();
              $("#cctraj").hide();
              $("#vtraj").hide();
              $("#ptvvache").hide();
              $("#bg").css("opacity",1);
              $("#ptvcc").css("opacity",0);
              $(".cocci").hide();
              $("#situercocci").show();

          });
  
          function vrouego(){
            //$("#vache").attr("disabled","disabled");
            $("#roue").addClass('rouego');
            $("#cache").show();
            $('#roue').delay(10000).queue(function (next) {
                $('#vache').hide();
                $("#ccbleu").hide();
                $("#rmzero").show();
                $("#roue").removeClass('rouego');
                $("#roue").css("transform","rotate(0deg)");
                $("#vtraj").show();
                $("#cache").hide();
                next();
            });
            
          }


         function ccrouego(){
            //$("#ccbleu").attr("disabled","disabled");
            $("#roue").addClass('rouego');
            $("#cache").show();
            $('#roue').delay(11000).queue(function (next) { 
                $("#vache").hide();
                $("#ccbleu").hide();
                $("#rmzero").show();
                $("#roue").removeClass('rouego');
                $("#roue").css("transform","rotate(0deg)");
                $("#cctraj").show();
                $("#cache").hide();
                next();
            });
          }

        $("#vtraj").click(function(event) {
            $("#ptvvache").show(); 
         $("#ptvvache").animate({
           opacity: 1},
           2000, function() {
           /* stuff to do after animation is complete */
         });

        });

        $("#cctraj").click(function(event) {
         $("#ptvcc").show();   
         $("#bg").css("opacity",0).css("border","none"); 
         $("#convoi").css("opacity",0.2);
         $("#premierplan").removeClass('premplan');
         $("#premierplan").css("background-image","none");
         $("#ptvcc").animate({
           opacity: 1},
           2000, function() {
           /* stuff to do after animation is complete */
         });

        });

        $("#situercocci").click(function(event) {
         $(".cocci").toggle();

        });

        

    }


    return { 
        render : function(id, container, config, assetManager){

            var $container = $(container);

            renderChoices(id, $container, config, assetManager); 
            
            html.render($container.find('.prompt'));
        },
    };
});