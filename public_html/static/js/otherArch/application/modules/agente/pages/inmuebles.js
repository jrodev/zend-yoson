var URL_BASE = window.location.protocol+"//"+window.location.host;
var URL_IMG = URL_BASE+"/static/img";
    
var ClassGmaps = function(container, options) {

    this.map = null;
    this.geocoder = null;

    this.options = {
        zoom: 13,
        center: new google.maps.LatLng(-12.048705506195144, -77.04755937421874),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //(function(This){ //@private constructor
    this.options = (options) ? options : this.options;
    this.map = new google.maps.Map(container, this.options); //alert(this.map);
    this.geocoder = new google.maps.Geocoder();  //Conversion de cadena de direccion a coordenadas
    //})(this);
    this.center = function(lat, lng) {
        new google.maps.LatLng(lat, lng);
    };

    this.geocode = function(vars, fnc) {
        this.geocoder.geocode(vars, function(result, status) {
            fnc(result, status);
        });
    };

    this.doMarker = function(tit, map, latLng, drag) {
        return new google.maps.Marker({title: tit, map: map, position: latLng, draggable: (drag) ? drag : false});
    };

    this.addEvent = function(obj, evt, fnc) {
        google.maps.event.addListener(obj, evt, fnc);
    };
};

function runMap(VAL) {
    var idDivAddr = 'gmapAddr';
    var idDivMap  = 'gmap_ubicacion';
    var idInpHdn  = 'ubicacion';
    
    /*var divMap = '<div id="gMapMarker" style="width: 650px;height: 400px;"></div>' +
            '<div id="markerAddress"></div></div><input type="hidden" id="coordXY" value="' + (VAL || '-12/-77') + '" />';
    document.getElementById('contentMap').innerHTML = divMap;*/
    var gm = new ClassGmaps(document.getElementById(idDivMap));
    var inpVal = $.trim(document.getElementById(idInpHdn).value); //$.trim($('.getXYGmap input').val());
    var mapLatLng = (inpVal=='') ? gm.map.getCenter() : new google.maps.LatLng(parseFloat(inpVal.split('/')[0]), parseFloat(inpVal.split('/')[1]));
    gm.map.setCenter(mapLatLng);
    var marker = gm.doMarker('Mi marker', gm.map, mapLatLng, true);
    //$('#positionGmap').html('['+[mapLatLng.lat(), mapLatLng.lng()].join(' / ')+']');
    document.getElementById(idInpHdn).value = [mapLatLng.lat(), mapLatLng.lng()].join('/');

    gm.geocode({latLng: mapLatLng}, function(res) {/*, state*/
        document.getElementById(idDivAddr).innerHTML = (res && res.length>0)?res[0].formatted_address:'Direccion Indeterminada..';
    });

    gm.addEvent(marker, 'drag', function() {
        var markerYX = marker.getPosition();
        //$('#positionGmap').html('['+[markerYX.lat(), markerYX.lng()].join(' / ')+']'); 
        document.getElementById(idInpHdn).value = [markerYX.lat(), markerYX.lng()].join('/');
        document.getElementById(idDivAddr).innerHTML = 'Moviendo...';
    });

    gm.addEvent(marker, 'dragend', function() {
        var markerYX = marker.getPosition(); //$('#TXT_GEOMAPA').val([markerYX.lat(), markerYX.lng()].join('|'));
        gm.map.setCenter(markerYX);
        gm.geocode({latLng: markerYX}, function(res) {/*, state*/
            if (res && res.length > 0) {
                document.getElementById(idDivAddr).innerHTML = res[0].formatted_address;
            } else {
                document.getElementById(idDivAddr).innerHTML = 'Direccion Indeterminada.';
            }
        });
    });
}

// Select dependientes
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
            var Args=arguments; console.log("Args : -----> ",Args);
            return function(res){
                selB.prop('disabled', false).html('').parent().children('label.error').remove();
                btnSubmit(selB).prop('disabled', false).removeClass((THIS.clsBtn?'':'btn ')+'disabled');
                console.log("selB: ",selB, "res.status: "+res.status,"|res.data.length:"+res.data.length);
                if(res.status=='ok' && res.data.length>0){
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

//window.onload = function(){ 
$(function(){
    // adicionado en el controller
    window.vars = window.vars||{}; 
    
    // Resolviendo bug de Description inline para los radios buttons en ZendForm
    //$('.radio').parent().find('.help-block').removeClass('help-block').addClass('help-inline');
    $('.help-block').removeClass('help-block').addClass('help-inline');
    
    $('label[for="fechEntrega"]').parent().css('display','none');
    $('input[id*="transaccion-"]').bind('click', function(){
        if($(this).val()=="3") $('label[for="fechEntrega"]').parent().slideDown(400);
        else $('label[for="fechEntrega"]').parent().slideUp(400);
    });    
    
    // Si no tiene valor lo oculta
    if(!$.trim($('#pisosNiveles').val()))
        $('label[for="pisosNiveles"]').parent().css('display','none');
    
    // Si no tiene valor lo oculta
    if(!$.trim($('#fechEntrega').val()))
        $('label[for="fechEntrega"]').parent().css('display','none');
    
    $("#tipoImn").bind('change', function(){
        var sIndex = $(this).prop('selectedIndex'); 
        var $pNivels = $('label[for="pisosNiveles"]');
        var $fEntreg = $('label[for="fechEntrega"]');
        console.log("sIndex:",sIndex);
        if(sIndex>=3 && sIndex<=7){
            $fEntreg.parent().slideUp(400);
            $pNivels.parent().slideDown(400);
        }/*else if(sIndex==16){  // id=17
            $pNivels.parent().slideUp(400);
            $fEntreg.parent().slideDown(400);
        }*/else{
            $pNivels.parent().slideUp(400);
            $fEntreg.parent().slideUp(400);
        }
    });
    
    $('#pisosNiveles, #pisosAut').bind('keyup', function(e){
        //var regExp = /[^a-zA-Z0-9\-\_\.\@\s\¿\?!¡áéíóúÁÉÍÓÚüÜñÑ\#\(\)\/"'<>]/gi;
        var regExp = /[^0-9\,]/gi;  var isComas = /\,\,+/gi;
        if(regExp.test(this.value)) this.value=this.value.replace(regExp,''); //Si encuentra caracteres especial los quita.
        /*if(isComas.test(this.value))*/ this.value=this.value.replace(/\,\,+/gi,',');
    });
    
    $('#niveles, .cant-dist').bind('keyup', function(e){  // Solo numeros
        //var regExp = /[^a-zA-Z0-9\-\_\.\@\s\¿\?!¡áéíóúÁÉÍÓÚüÜñÑ\#\(\)\/"'<>]/gi;
        var regExp = /[^0-9]/gi;
        if(regExp.test(this.value)) this.value=this.value.replace(regExp,''); //Si encuentra caracteres especial los quita.
        /*if(isComas.test(this.value))*/ this.value=this.value.replace(/\,\,+/gi,',');
    });
    
    // MAPA ----------------------------------------------------------------------------------------
    var antLatLng = $.trim($('#ubicacion').val()); console.log('antLatLng:'+antLatLng   );
    if(typeof(google)!='undefined')runMap(antLatLng?antLatLng:'-12.084471260776178/-77.04129791259766');
    
    // SELECTS DEPENDIENTES ------------------------------------------------------------------------
    var selsVals = window.vars.selsVals||[]; //$.trim($('#selsVals').val())?$.trim($('#selsVals').val()).split('|'):[];
    console.log('selsVals:',selsVals);
    // Capturando evento ajaxSend
    $(document).bind('ajaxSend', (function(selsVals){
        return function(e,xhr,cnf){
            // Si ya se escogio los selects y se quiere pedir los predeterminados
            if(selsVals.length && /inmuebles\/prov/g.test(cnf.url)){
                console.log('pidiendo prov:cancelao!!');
                xhr.abort(); // cancelando ajax
                $(document).unbind('ajaxSend'); // Para que no afecte al sgte ajax
            }
        };
    })(selsVals));
    // Capturando evento ajaxSuccess
    $(document).bind('ajaxSuccess', (function(selsVals){
        return function(e,xhr,cnf){
            // Si es ajax de peticion de departamentos y ya se eligo previamente
            if(selsVals.length && /inmuebles\/dpto/g.test(cnf.url)){
                console.log('cargando predefinido de selsVals');
                var dpto=selsVals[1], prov=selsVals[2], dist=selsVals[3];
                $('#dpto option[value="'+dpto+'"]').prop('selected',true)
                .parent().trigger('change',[prov,dist]);
            }
        };
    })(selsVals));
    // implementacion selects Dependientes
    SelDep.init([
        {ids:['#pais' ,'#dpto'], url:'/agentes/inmuebles/dpto?idPais=$1'},
        {ids:['#dpto' ,'#prov'], url:'/agentes/inmuebles/prov?idDpto=$1'},
        {ids:['#prov' ,'#dist'], url:'/agentes/inmuebles/dist?idProv=$1'}
    ]);
    $('#pais').trigger('change',['150000','150100']);
    
    // UPLOADS DE IMAGENES -------------------------------------------------------------------------
    (function(){
        // Creando visor de imagenes
        // Contenedor de imagenes subidas y por subir
        var $listImg = $('<ul class="thumbnails" />');
        $('#imageInm').parents('.controls').append($listImg);

        // Crea imagenes pasando como parametro uri de la imagen
        var createImg = function(nameImg, isAjx){
            var srcImg = window.vars.uriUpl+'/'+nameImg;
            // Si es Ajax adicionamos esta imagen al input
            if(isAjx){
                var arrSrc = srcImg.split('/');
                var nomImg = arrSrc[arrSrc.length-1];
                if(window.vars.edit) nomImg=nomImg.split('-')[1];
                var images = $.trim($('#imageInm').val())?$.trim($('#imageInm').val()).split('|'):[];
                images.push(nomImg); console.log('images:',images);
                $('#imageInm').val(images.join('|'));
            }
            // Creando y adicionando imagen
            $imgLink = $('<a class="thumbnail" href="#" />');
            $listImg.append($('<li class="span2" />').append($imgLink));
            $imgLink.append('<img src="'+srcImg+'" border="0" />')
        };

        // Si existen imagenes previamente ingresado se carga en el visor.
        var strImgs = $.trim($('#imageInm').val());
        if(strImgs){
            var aNamesImgs = strImgs.split('|'); //var imgUri = 'static/uploads/inm/';
            var sufix = window.vars.edit?'small-':'';
            for(var i=0;i<aNamesImgs.length; i++) createImg(sufix+aNamesImgs[i]);
        }

        // we just want to show the result into the div
        var getFileData = function(base64Image){
            $authtoken = $.trim($('#authtoken').val());
            $.ajax({ type:"POST", data:{base64Image:base64Image,authtoken:$authtoken} })
             .done(function(nameImg){ createImg(nameImg, true) });
        }

        // check if the FileReader API exists... if not then load the Flash object
        // window.atob ie10+
        if (typeof FileReader!=="function" || !window.atob){
            // it's the function called by the swf file
            window.Flash = {getFileData:getFileData};
            // create object element
            $("#inpImageInm").replaceWith('<object id="inpImageInm"></object>');

            var urlSwfFile = URL_BASE+'/static/js/otherArch/library/class/FileToDataURI.swf';
            var urlSwfExpr = URL_BASE+'/static/js/otherArch/library/class/expressInstall.swf';
            
            // 80px by 23px dimensiones del boton input file html
            swfobject.embedSWF(urlSwfFile,"inpImageInm","80px","23px","10",urlSwfExpr,{},{},{});
            return; // end closure
        }

        $('#inpImageInm').on('change', function(e) {
            // we use the normal way to read a file with FileReader
            var files = e.target.files // Archivos cargados
                ,len = files.length    // cantidad de archivos
                ,aFR = [];             // array de instancias fileReader
            
            if (!files || len==0) return;
            
            while(len--){
                console.log('files('+len+'):', files[len].name);
                aFR[len] = new FileReader();
                aFR[len].onload = function(e) {
                    console.log('e.target:',e.target);
                    getFileData(e.target.result.split(",")[1]);// split para solo base64 string
                };
                console.log('aFR['+len+']:',aFR[len]);
                aFR[len].readAsDataURL(files[len]);
            }
            $(this).val('');
        });

    })();
    
    // CAMBIO ESTADO - Listado Inmubles -----------------------------------------------------------
    $('.inm-status').bind('change', function(){
        $this = $(this);
        $imgLoading = $this.parent().find('img');
        $this.css('display','none');
        $imgLoading.css('display','block');
        $.ajax({
            url:URL_BASE+'/agentes/inmuebles/index',
            type:"POST",
            data:{id:$(this).attr('inm-id'),estado:$(this).find('option:selected').val()},
            success:function(sRowsAffec){
                $this.css('display','block');
                $imgLoading.css('display','none');
                if($.trim(sRowsAffec)=='0') alert('ajax error!');
            }
        });
    });

    return; 
});
//};