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
    var inpVal = document.getElementById(idInpHdn).value; //$.trim($('.getXYGmap input').val());
    var mapLatLng = (inpVal == '') ? gm.map.getCenter() : new google.maps.LatLng(parseFloat(inpVal.split('/')[0]), parseFloat(inpVal.split('/')[1]));
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

//window.onload = function(){ 
$(function(){
    
    $('label[for="fechEntrega"]').parent().css('display','none');
    $('input[id*="transaccion-"]').bind('click', function(){
        if($(this).val()=="3") $('label[for="fechEntrega"]').parent().slideDown(400);
        else $('label[for="fechEntrega"]').parent().slideUp(400);
    });    
    
    $('label[for="pisosNiveles"]').parent().css('display','none');
    $("#tipoImn").bind('change', function(){
        var sIndex = $(this).prop('selectedIndex'); 
        if(sIndex>=3 && sIndex<=7) $('label[for="pisosNiveles"]').parent().slideDown(400);
        else $('label[for="pisosNiveles"]').parent().slideUp(400);
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
    runMap('-12.084471260776178/-77.04129791259766');
});
//};