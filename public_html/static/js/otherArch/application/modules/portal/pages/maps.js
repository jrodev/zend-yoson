/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var URL_BASE = window.location.protocol+"//"+window.location.host;
var URL_IMG = URL_BASE+"/static/img";
    
// Selects Dependientes
var SelDep = (function(Sb){

    /*@param url:  ingresado atravez del schema de modulos 'ctrll/par1/$1/par2/$2'
     *@param pars: ingresado dentro de la funcion que dispara evento (como pejm: id option seleccionado)*/
    var btnSubmit = function(child){return $(child).parents('form:eq(0)').find('[type="submit"]')};

    var setUrl = function(url, pars){
        return url.replace(/\$([1-9]+)/gi, function(res, match){
            return pars[parseInt(match)-1];
        });
    };
    /*@param url: url valida del script que devolvera la data
     *@param fnc: funcion que procesara la respuesta enviada como parametro*/
    var ajxReq = function(url, fnc){
        $.ajax({url:URL_BASE+url, type:'get', dataType:'json', success:fnc});
    };
    /* @private variable que alamcena arbol de selectores de dependencias*/
    var treeDeps = {}; 

    return {
        /*Bolean: Existe o no class btn*/
        clsBtn:false,
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            console.log('oParams:---->>',oParams);
            var l=oParams.length, i=0, j=1, THIS=this; //log(oParams);

            while(i<l){ //Recorremos oParams
                //Selects Dependientes
                var selA   = $(oParams[i].ids[0]);
                var selB   = $(oParams[i].ids[1]);

                //Selectores de selects dependientes
                var sSelA  = oParams[i].ids[0];
                var sSelB  = oParams[i].ids[1];

                //Llenando arbol de dependencias
                treeDeps[sSelA]=[sSelB];  //inicial
                for(var j=i+1; j<l; j++){
                    var nextSelA = oParams[j].ids[0];  //siguiente selector selDepA
                    var nextSelB = oParams[j].ids[1];  //siguiente selector selDepA
                    var ultSelDep= treeDeps[sSelA][ treeDeps[sSelA].length-1 ]; //Ultimo selector dep de selA (osea selector selDepB actual)
                    if(ultSelDep==nextSelA){treeDeps[sSelA].push(nextSelB)}   //Si el ultimo actual es igual siguiente se adiciona al actual como dependiente tmb.
                }

                var errMsg = oParams[i].errMsg;
                this.clsBtn = $(btnSubmit(selA)).hasClass('btn');

                //setTreeDeps(oParams, i);
                /*@param idB: paramtro cuan*/
                selA.bind('change', (function(i, selB, errMsg){
                    return function(e, idB){
                        var valSel  = $.trim($('option:selected',this).val());
                        var objDeps = $( treeDeps["#"+this.id].join(',') );
                        /*IF es val vacio FIN*/ 
                        /*log('valSel:--->',valSel);
                        log('objDeps:-->',objDeps);*/
                        if(valSel==''||valSel=='-1'){objDeps.html('').append('<option value="">No hay registros</option>');return}
                        /*ELSE desactivacion y peticion xhr*/
                        objDeps.prop('disabled', true);
                        btnSubmit(this).prop('disabled', true).addClass((THIS.clsBtn?'':'btn ')+'disabled');
                        var url = setUrl(oParams[i].url, [valSel]); console.log('url:',url,'valSel:',valSel);
                        ajxReq(url, THIS.success(selB, idB, arguments[2], errMsg));                            
                    };
                })(i++, selB, errMsg)); 
            }
        },
        /*
         *@param selB: select dependiente
         *@param arg1: segundo parametro pasado al hacer trigger al evento padre (Selected index)
         *@param arg2: tercer  parametro pasado al hacer trigger al evento padre (Value)
         *Evento al cargar completamente la data para selB a peticion de selA */
        success: function(selB/*, evtParm*/){
            var THIS=this;
            var Args=arguments; console.log("Success-args:----->",Args);
            return function(res){
                selB.prop('disabled', false).html('').parent().children('label.error').remove();
                btnSubmit(selB).prop('disabled', false).removeClass((THIS.clsBtn?'':'btn ')+'disabled');
                console.log("selB: ",selB, "res.status: "+res.status,"|res.data.length:"+res.data.length);
                if(res.status=='ok' && res.data.length>0){
                    selB.append($('<option value="">Todos</option>'));
                    $.each(res.data, function(i,v){
                        selB.append( $('<option value="'+v.key+'">'+v.value.toLowerCase()+'</option>').attr('selected',(v.key==Args[1])) );
                    });
                    selB.css('border-color','#CCC').trigger('change',[Args[2]]).parent().children('label.error').remove();
                }else{
                    selB.append('<option value="">No hay registros</option>').trigger('change', [Args[2]]).attr('disabled', true);
                    if(typeof(Args[3])!=='undefined')
                        selB.css('border-color','#B94A48').parent().append('<label generated="true" class="error">'+Args[3]+'</label>');
                }
            };
        }/*.cache('sel-dep-succ')*/,

        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };

})();
    
$(function(){

    // implementacion selects Dependientes
    SelDep.init([
        {ids:['#dpto' ,'#prov'], url:'/portal/index/prov?idDpto=$1'},
        {ids:['#prov' ,'#dist'], url:'/portal/index/dist?idProv=$1'}
    ]);

    /*-----------------------------------------------------------------------------------
     * Mapas
     *//*-------------------------------------------------------------------------------*/
    function runMap2(TPL){

        if(TPL==='undefined'){alert('funcion tpl no existe!!'); return false;}

        var myOptions = {
            zoom      : 11,
            center    : new google.maps.LatLng(-12.0433333, -77.02833329999999),
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        var map       = new google.maps.Map(document.getElementById('gmap'), myOptions); window.miMAP=map;
        var geocoder  = new google.maps.Geocoder();
        var imgMarker = 'http://s.guiagps.e3.pe/static/guiarestaurantes/img/rest2.png';
        var overlays  = []; //function clearOverlays(){while(overlays[0]){overlays.pop().setMap(null);}}
        var ULTBUBLE= null;
        //Evento para Tipo de comida, que tambien se dispara al elegir el combo distrito
        var defEat='';
        
        /*----------------------- GOOGLE MAPS FIX (error tabs gmaps 3)------------------------*/
        $('a[data-toggle="tab"][href="#2"]').bind('click',function(){
            console.log("tab 2 click!");
            setTimeout(function(){
                var center = window.miMAP.getCenter();
                google.maps.event.trigger(window.miMAP, "resize");
                window.miMAP.setCenter(center);                
            },500);
        });
        /*------------------------------------------------------------------------------------*/
        
        DOM('#dist,#opc,#tipo').addEvent('change', function(){ //if(geocoder){
            var oDist=DOM('#dist')[0], oOpc=DOM('#opc')[0], oTipo=DOM('#tipo')[0], THAT=this;
            oDist.disabled=true; oOpc.disabled=true; oTipo.disabled=true;
            console.log('oDist.options[oDist.selectedIndex] -> ', oDist.options[oDist.selectedIndex]);
            console.log('oDist.options[oDist.selectedIndex].text -> ', oDist.options[oDist.selectedIndex].text);
            var ubicacion='Peru-'+oDist.options[oDist.selectedIndex].text;    
            geocoder.geocode( {'address': ubicacion}, function(results, status){ //alert(JSON.stringify(results)); //alert(mDump(results,1));
                if(status == google.maps.GeocoderStatus.OK){
                    map.setCenter(results[0].geometry.location);
                    if(oDist.options[oDist.selectedIndex].text=='Elegir'){map.setZoom(11);}
                    else{
                        while(overlays[0]){overlays.pop().setMap(null);}map.setZoom(12);
                        var reqDeps = new ClassAjax('POST', URL_BASE+'/portal/index/deps');
                        reqDeps.complete=function(resJson, sta){
                            if(InfoBubble.bubleOpened)InfoBubble.bubleOpened.close();
                            var resJson = (new Function('return '+resJson))(); //Resultado Json es un array de objetos
                            //console.log('resJsonresJsonresJsonresJson;  ', resJson);
                            for(var index=0,l=resJson.length,marker; index<l; index++){
                                var latLng = resJson[index].ubi.split('/');
                                var bubble = TPL(resJson[index].img, resJson[index].lnk, resJson[index].tit, resJson[index].dir, 'at', 'ac', resJson[index].prec);
                                //---------------------------------------- Creando bubble Tabs --------------------------------------------
                                var infoBubble = new InfoBubble({maxWidth: 300, minWidth:250, minHeight:200});
                                infoBubble.addTab("Restaurante", bubble);infoBubble.addTab("+ Info", resJson[index].det);
                                var marker = new google.maps.Marker({position:new google.maps.LatLng(latLng[0],latLng[1]), icon:imgMarker, map:map});

                                overlays.push(marker);
                                google.maps.event.addListener(marker, 'click', (function(marker,infoBubble){
                                    return function(){ infoBubble.open(map,marker);InfoBubble.bubleOpened=infoBubble; };
                                })(marker,infoBubble));
                                //---------------------------------------------------------------------------------------------------------  
                            } oDist.disabled=false; oOpc.disabled=false; oTipo.disabled=false;
                        }; reqDeps.start('dist='+oDist.value+'&opc='+oOpc.value+'&tipo='+oTipo.value);
                    }
                } else {alert('Geocode was not successful for the following reason: ' + status);}
            }); 
        });
    };
    $(function(){
        var tpl = function(logo, enlace, titulo, direccion, at, ac, precio) {
            /*Modificar este STRING HTML si es necesario (Es lo que se muestra en las burbujas)*/
            var htmlLogo = (logo != '') ? "<a href='" + enlace + "'><img src='" + logo + "' width='100' /></a>" : "";
            var bubble = "<div class='tab_contenido'><h2 style='width:95%;'><a href='" + enlace + "'>" + titulo + "</a></h2>" +
                    "<br>" + htmlLogo + direccion + "<br>A/T – " + at + "<br>A/C – " + ac + "<br>Precio en US$ - " + precio + "</div>";
            return bubble;
        };
        if(document.getElementById('gmap')!=null)runMap2(tpl); /*console.log(DOM("#dpto"))*/
    });

});