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

//Scroll position Event
$(window).scroll(function(){
    //console.log('$(window).scrollTop():',$(window).scrollTop());
    var toFix = ($(window).scrollTop()>110);
    $('#frmFilters').css('position',toFix?'fixed':'static').css('top',toFix?'5px':'auto');
});

// Load
$(function(){

    // implementacion selects Dependientes
    SelDep.init([
        {ids:['#search-dpto' ,'#search-prov'], url:'/portal/index/prov?idDpto=$1'},
        {ids:['#search-prov' ,'#dist1,#dist2,#dist3'], url:'/portal/index/dist?idProv=$1'}
    ]);
    
    var selsVals = window.vars.selsVals||{}; console.log('selsVals:',selsVals);
    if(selsVals.hasOwnProperty('searchDpto') && selsVals['searchDpto']!=''){
        
        var dpto=selsVals['searchDpto'], prov=selsVals['searchProv'] 
           ,dist1=selsVals['dist1'],dist2=selsVals['dist2'],dist3=selsVals['dist3']
        ;
        // Seleccionando los otros 2 selects distritos
        $(document).bind('ajaxSuccess', (function(d2,d3){
            return function(e,xhr,cnf){
                console.log("===>>>>>>",cnf.url);
                console.log('d2-d3',d2,d3);
                if(d2 && d3 && /index\/dist/g.test(cnf.url)){
                    $('#dist2 option[value="'+d2+'"]').prop('selected',true);
                    $('#dist3 option[value="'+d3+'"]').prop('selected',true);
                }
            };
        })(dist2,dist3));
        
        $('#search-dpto option[value="'+dpto+'"]')
        .prop('selected',true).parent().trigger('change',[prov,dist1]);    
    }
    
    // Datepicker range implementacion
    var dateForMySql = function(date){
        var aDate=[], m=1+date.getMonth(), d=date.getDate();
        aDate.push( date.getFullYear() );
        aDate.push( m<10?('0'+m):m );
        aDate.push( d<10?('0'+d):d );
        return aDate.join('-');
    };
    
    var dates=window.vars.dates||{}, aEnd, aIni, to, from;
    if(dates.hasOwnProperty('end')) {
        aEnd = dates['end'].split('-'); console.log("dates['end']:",aEnd);
        to = new Date(aEnd[0],parseInt(aEnd[1])-1,aEnd[2]);
    } else to = new Date();
    
    if(dates.hasOwnProperty('ini')) {
        aIni = dates['ini'].split('-'); console.log("dates['ini']:",aIni);
        from = new Date(aIni[0],parseInt(aIni[1])-1,aIni[2]);
    }else from = new Date(to.getTime()-1000*60*60*24*14);
    
    $('#datepicker-calendar').DatePicker({
        inline: true,
        date: [from, to],
        calendars: 3,
        mode: 'range',
        current: new Date(to.getFullYear(), to.getMonth() - 1, 1),
        onChange: function(dates, el) { console.log('dates*-*-**-*-*-*-*>>>>',dates);
            console.log('mysql fecha:', dates[0].getFullYear()+'-'+(1+dates[0].getMonth())+'-'+dates[0].getDate());
            $('#fechaIni').val(dateForMySql(dates[0]));
            $('#fechaFin').val(dateForMySql(dates[1]));
            // update the range display
            $('#date-range-field span').text(
                    dates[0].getDate()+dates[0].getMonthName(false)+' '+dates[0].getFullYear()+' hasta '+
                    dates[1].getDate()+dates[1].getMonthName(false)+' '+dates[1].getFullYear());
        }
    });

    // initialize the special date dropdown field
    $('#date-range-field span').text(
            from.getDate()+from.getMonthName(false)+' '+from.getFullYear()+' hasta '+
            to.getDate()+to.getMonthName(false)+' '+to.getFullYear());

    // bind a click handler to the date display field, which when clicked
    // toggles the date picker calendar, flips the up/down indicator arrow,
    // and keeps the borders looking pretty
    $('#date-range').bind('mouseleave', function() {

    });
    $('html').bind('click', function() {
        $('#datepicker-calendar').slideUp(400)
    });
    $('#date-range-field').bind('click', function(e) {
        e.stopPropagation();
        $('#datepicker-calendar').slideToggle(400);
        // switch to up-arrow
        var _up = ($('#date-range-field a').text().charCodeAt(0) == 9660);
        $('#date-range-field a').html(_up ? '&#9650;' : '&#9660;');
        $('#date-range-field').css({borderBottomLeftRadius: _up ? 0 : 5, borderBottomRightRadius: _up ? 0 : 5});
        $('#date-range-field a').css({borderBottomRightRadius: _up ? 0 : 5});
        return false;
    });
    
    
});