/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var URL_BASE = window.location.protocol+"//"+window.location.host;
var URL_IMG = URL_BASE+"/static/img";
    
$(function(){

    /*-----------------------------------------------------------------------------------
     * Mapas
     *//*-------------------------------------------------------------------------------*/
    function runMap2(TPL){

        if(TPL==='undefined'){alert('funcion tpl no existe!!'); return false;}

       
        var delOpts = function(oSel){ 
            var l=oSel.options.length; //alert('len:'+l);
            while(l--){delete oSel.options[l]; oSel.options[l]=null; oSel.remove(l);}
            oSel.options.length=0;       
        };
        /*-------------------------------------------------------------------------------------*/
        var fillProv = function(resp, sta){ 
            console.log("eChangeDpto: ", arguments);
            var prov = DOM('#prov')[0], i=0;
            resp=(new Function("return "+resp))();
            delOpts(prov); //alert(prov.options.length); //prov.options[0] = (new Option('seleccione',''));
            if(typeof(resp)!=='undefined')
                for(var v in resp) prov.options[i++]=new Option(resp[v],v); //sOpts+='<option value="'+v+'">'+resp[v]+'</option>';
            prov.selectedIndex = 0;
            eChangeProv(prov.options[0].value);
        };
        var eChangeDpto = function(idDpto){
            if(typeof(idDpto)!=='undefined' && idDpto!=''){
                var req = new ClassAjax('post', URL_BASE+'/portal/index/resultmap');
                req.complete = fillProv;
                req.start('idDpto='+idDpto);
            }else console.log('problemas con:idDpto='+idDpto);
        };

        /*-------------------------------------------------------------------------------------*/
        var fillDist = function(resp, sta){
            console.log("eChangeProv: ", arguments);
            var dist = DOM('#dist')[0],i=0;
            resp=(new Function("return "+resp))();
            delOpts(dist); //alert(dist.options.length); //dist.options[0] = new Option('seleccione','');
            if(typeof(resp)!=='undefined')
                for(var v in resp) dist.options[i++]=new Option(resp[v],v);
        };
        var eChangeProv = function(idProv){
            if(typeof(idProv)!=='undefined' && idProv!=''){
                var req = new ClassAjax('post', URL_BASE+'/portal/index/resultmap');
                req.complete = fillDist;
                req.start('idProv='+idProv);// ,'application/json'
            }else console.log('problemas con:idProv='+idProv);
        };

        //DOM('#dpto').addEvent('change', function(){ console.log(this); eChangeDpto(this.options[this.selectedIndex].value) } );
        DOM('#prov').addEvent('change', function(){ console.log(this); eChangeProv(this.options[this.selectedIndex].value) } );

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
        
        DOM('#dist,#opc,#tipo,#prec').addEvent('change', function(){ //if(geocoder){
            var oDist=DOM('#dist')[0], oOpc=DOM('#opc')[0], oTipo=DOM('#tipo')[0], oPrec=DOM('#prec')[0], THAT=this;
            oDist.disabled=true; oOpc.disabled=true; oTipo.disabled=true; oPrec.disabled=true; 
            console.log('oDist.options[oDist.selectedIndex] -> ', oDist.options[oDist.selectedIndex]);
            console.log('oDist.options[oDist.selectedIndex].text -> ', oDist.options[oDist.selectedIndex].text);
            var ubicacion='Peru-'+oDist.options[oDist.selectedIndex].text;    
            geocoder.geocode( {'address': ubicacion}, function(results, status){ //alert(JSON.stringify(results)); //alert(mDump(results,1));
                if(status == google.maps.GeocoderStatus.OK){
                    map.setCenter(results[0].geometry.location);
                    if(oDist.options[oDist.selectedIndex].text=='Elegir'){map.setZoom(11);}
                    else{
                        while(overlays[0]){overlays.pop().setMap(null);}map.setZoom(14);
                        var reqDeps = new ClassAjax('POST', URL_BASE+'/portal/index/deps');
                        reqDeps.complete=function(resJson, sta){
                            if(InfoBubble.bubleOpened)InfoBubble.bubleOpened.close();
                            var resJson = (new Function('return '+resJson))(); //Resultado Json es un array de objetos
                            //console.log('resJsonresJsonresJsonresJson;  ', resJson);
                            for(var index=0,l=resJson.length,marker; index<l; index++){
                                var latLng = resJson[index].mapa.split('/');
                                var bubble = TPL(resJson[index].logo, resJson[index].enlace, resJson[index].titulo, resJson[index].direccion, resJson[index].at, resJson[index].ac, resJson[index].precio);
                                //---------------------------------------- Creando bubble Tabs --------------------------------------------
                                var infoBubble = new InfoBubble({maxWidth: 300, minWidth:250, minHeight:200});
                                infoBubble.addTab("Restaurante", bubble);infoBubble.addTab("+ Info", resJson[index].descripcion);
                                var marker = new google.maps.Marker({position:new google.maps.LatLng(latLng[0],latLng[1]), icon:imgMarker, map:map});

                                overlays.push(marker);
                                google.maps.event.addListener(marker, 'click', (function(marker,infoBubble){
                                    return function(){ infoBubble.open(map,marker);InfoBubble.bubleOpened=infoBubble; };
                                })(marker,infoBubble));
                                //---------------------------------------------------------------------------------------------------------  
                            } oDist.disabled=false; oOpc.disabled=false; oTipo.disabled=false; oPrec.disabled=false; 
                        }; reqDeps.start('dist='+oDist.value+'&opc='+oOpc.value+'&tipo='+oTipo.value+'&prec='+oPrec.value);
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