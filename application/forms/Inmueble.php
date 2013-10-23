<?php

class Application_Form_Inmueble extends Twitter_Form {

    public function init() {
        // Make this form horizontal
        
        $ubigeo = new Application_Model_Agentes_Ubigeo();
 
        $this->setAttrib('horizontal', true);
        $this->setAttrib('enctype', 'multipart/form-data');
        $this->setLegend('Nuevo inmueble');
        
        $txtPais = $this->createElement('select', 'pais', array(
            'label'=>'Pais', 'description'=>'<b>*</b> Selecione un pais', /*'multiOptions'=>$ubigeo->getPaises()*/
            'multiOptions'=>array(1=>'Peru'),
        ))/*->setRequired(true)->setAttrib('placeholder', 'foo')*/;
        
        $txtDpto = $this->createElement('select', 'dpto', array(
            'label'=>'Departamento', 'description'=>'<b>*</b> Selecione departamento', /*'multiOptions'=>array('seleccione')*/
            'multiOptions'=>array(1=>'lima'),
        ))/*->setAttribs(array('disabled'=>true))*/->setRequired(true);
        
        $txtProvs = $this->createElement('select', 'prov', array(
            'label'=>'Provincia', 'description'=>'<b>*</b> Selecione provincia', /*'multiOptions'=>array('seleccione')*/
            'multiOptions'=>array(1=>'lima'),
        ))/*->setAttribs(array('disabled'=>true))*/->setRequired(true);        
        
        $txtDist = $this->createElement('select', 'dist', array(
            'label'=>'Distrito', 'description'=>'<b>*</b> Selecione distrito', /*'multiOptions'=>array('seleccione')*/
            'multiOptions'=>array(1=>'lima metropolitana'),
        ))/*->setAttribs(array('disabled'=>true))*/->setRequired(true);        
                
        $txtUrb = $this->createElement('text', 'urb', array('label'=>'Urbanización'));
        
        $txtTipoUbi = $this->createElement('text', 'tipoUbi', array(
            'label'=>'Av,Calle,Jiron etc', 'description'=>'<b>*</b> Alam,Av,Calle,Jiron,Malecon,Ovalo,Pasaje,Plaza etc'
        ))->setRequired(true); 
        
        // Direccion
        $txtDir = $this->createElement('text', 'direc', array('label'=>'Direccion'));
        
        // Detalle
        $txtDet = new Zend_Form_Element_Textarea('detalle', array( //Tambien deveria funionar con createElement
            'label'=>'Detalle',  
            'description'=>'Ej. "Int. A"; o  "Dpto 305" o "piso 3". Si son varios <br>pisos de costo 
                            similar, indicar el nivel mas bajo y <br />ampliar en comentarios'
        ));
        
        //$txtDet->getDecorator('description')->setOption('escape', false); 
        // No funciona, se hizo , 'escape'=>false en /Library/Twitter/Form.php line28
        
        $rdoEst = new Zend_Form_Element_Radio('estado', array(
            'label'=>'Estado', 'inline'=>true,
            'description'=>'Todo listado caduca autmomaticamente a los 120 dias de activacion.<br>Si ha caducado, no se reactiva',
            'multiOptions'=>array('0'=>'Retirado', '1'=>'Activo', '2'=>'Reactivado', '3'=>'Caducado'),
        ));
        // coordMap
        $hdUbicacion = $this->createElement('hidden', 'ubicacion', array('label'=>'Ubicacion'));
        // Precio
        $txtPrecio = $this->createElement('text', 'precio', array('description'=>'<b>*</b>', 'label'=>'Precio','class'=>'tipo-moneda'));
        // Estacionamiento
        $txtParking = $this->createElement('text', 'parking', array('description'=>'<b>*</b>', 'label'=>'Estacionamiento','class'=>'parking'));
        // transaccion
        $rdoTransaccion = new Zend_Form_Element_Radio('transaccion', array(
            'label'=>'Transacción', 'description'=>'<b>*</b> Tipo de transaccion del inmueble', 'inline'=>true,
            'multiOptions'=>array('1'=>'Estreno', '2'=>'Reventa', '3'=>'En construcción', '4'=>'Alquiler'),
        ));
        // Fecha entrega - (para transaccion en construccion)
        $txtFchEntega = $this->createElement('text', 'fechEntrega', array('label'=>'fecha de entrega'));
        // tipo de Inmueble
        $txtTipoInm = $this->createElement('select', 'tipoImn', array(
            'label'=>'Tipo de inmueble', 'description'=>'<b>*</b> Selecione un tipo de inmueble', 'multiOptions'=>array(
                1=>'Casa', 2=>'Casa de Campo', 3=>'Casa de Playa', 4=>'Departamento', 5=>'Depart. de Playa',
                6=>'Dpto amoblado', 7=>'Oficinas /Edificio', 8=>'Oficinas/casa', 9=>'Tienda/Local', 
                10=>'Local Industrial', 11=>'Venta de Aires', 12=>'Estacionamiento', 13=>'Terreno', 
                14=>'Terr. Playa', 15=>'Terr. en habilitacion', 16=>'Terreno Agricola',
            ),
        ))/*->setAttrib('placeholder', 'foo')*/;
        // Piso(s) o Nivel(es)
        $txtPisosNiveles = $this->createElement('text', 'pisosNiveles', array(
            'label'=>'Piso(s) o Nivel(es)','class'=>'pisos-niveles', 
            'description'=>'Indicar varios si tiene el mismo precio<br>separados por comas Ej: 1,5,12.',
        ));
        // imagen
        $fileImage = new Zend_Form_Element_File('imageInm', 
            array('label'=>'Imagen','class'=>'image-inm','required'=>true,)
        );
        $fileImage->setDestination(PATH_UPL."/inm/");  //realpath(APPLICATION_PATH . self::DIR_TMP)
        $fileImage->addValidators(array(
            array('count', TRUE, 1),
            array('extension', TRUE, array('jpg,jpeg,gif,png')),
            array('size', FALSE, 1024*1024*10),
        ))->setMaxFileSize(1024*1024*10);
         // Niveles
        $txtNiveles = $this->createElement('text', 'niveles', array(
            'label'=>'niveles','class'=>'niveles', 'maxlength'=>3,
            'description'=>'<b>*</b> Niveles de casa o cantidad de pisos en edifico',
        ));
         // Area total
        $txtAreaTotal = $this->createElement('text', 'areaTotal', array(
            'label'=>'Area total(m2)','class'=>'area-total', 
            'description'=>'<b>*</b> Indicar area total, excluida el area de estacionamientos,<br>en el caso de departamentos',
        ));       
         // Area construida
        $txtAreaConst = $this->createElement('text', 'areaConst', array(
            'label'=>'Area construida(m2)','class'=>'area-const', 
            'description'=>'<b>*</b> Indicar area techada, excluida el area de estacionamientos,<br>en el caso de departamentos',
        ));
        // Antiguedad
        $selAntiguedad = $this->createElement('select', 'antiguedad', array(
            'label'=>'Antiguedad', 'description'=>'Elija la antiguedad del inmueble', 'multiOptions'=>array(
                ''=>'No aplicable', 1=>'En Construccion', 2=>'Estreno', 3=>'Hasta 3 años', 4=>'Hasta 5 años',
                5=>'Hasta 10 años', 6=>'Hasta 15 años', 7=>'Hasta 20 años', 8=>'hasta 20+ años', 
            ),
        ))/*->setAttrib('placeholder', 'foo')*/;
        // Precio
        $txtCantDorm = $this->createElement('text', 'cantDorm', array(
            'label'=>'Dormitorios','class'=>'cant-dist','maxlength'=>2,'description'=>'<b>*</b>'
        ));
        // cantidad baños completos
        $txtCantBanCom = $this->createElement('text', 'cantBanCom', array(
            'label'=>'Baño completos','class'=>'cant-dist','maxlength'=>1,'description'=>'<b>*</b>'
        ));
        // cantidad baños medios
        $txtCantBanMed = $this->createElement('text', 'cantBanMed', array(
            'label'=>'Baños medios','class'=>'cant-dist','maxlength'=>1,'description'=>'<b>*</b>'
        ));
        // cantidad de cuartos de servicio
        $txtCantCuarServ = $this->createElement('text', 'cantCuarServ', array(
            'label'=>'Cuarto de servicio','class'=>'cant-dist','maxlength'=>1,'description'=>'<b>*</b>'
        ));
        // cantidad baños de servicio
        $txtCantBanServ = $this->createElement('text', 'cantBanServ', array(
            'label'=>'Baños de servicio','class'=>'cant-dist','maxlength'=>1,'description'=>'<b>*</b>'
        ));
        
        // Comedor independiente
        $rdoComIndep = new Zend_Form_Element_Radio('comIndep', array(
            'label'=>'Comedor independiente', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),//'checked'=>true,
        ));
        // Sala comedor
        $rdoSalaCome = new Zend_Form_Element_Radio('salaCome', array(
            'label'=>'Sala comedor', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Terraza
        $rdoTerraza = new Zend_Form_Element_Radio('terraza', array(
            'label'=>'Terraza', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Ascensor
        $rdoAscensor = new Zend_Form_Element_Radio('ascensor', array(
            'label'=>'Sala comedor', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Piscina
        $rdoPiscina = new Zend_Form_Element_Radio('piscina', array(
            'label'=>'Piscina', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Deposito
        $rdoDeposito = new Zend_Form_Element_Radio('deposito', array(
            'label'=>'Deposito C/S costo extra', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Gardin exterior
        $rdoGardinExt = new Zend_Form_Element_Radio('gardinExt', array(
            'label'=>'Gardin exterior', 'description'=>'', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Gardin interior
        $rdoGardinInt = new Zend_Form_Element_Radio('gardinInt', array(
            'label'=>'Gardin interior', 'description'=>'', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));

        // Garages
        $rdoGarages = new Zend_Form_Element_Radio('garages', array(
            'label'=>'Garages', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array(0,1,2,3,'4+'),
        ));
        // Estacionamientos
        $rdoEstac = new Zend_Form_Element_Radio('estac', array(
            'label'=>'Estacionamientos', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array(0,1,2,3,'4+'),
        ));       
        // Estacionamientos area publica
        $rdoEstacPub = new Zend_Form_Element_Radio('estacPub', array(
            'label'=>'Estac. area publica', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));    
        // Inmueble condominio
        $rdoEstacCond = new Zend_Form_Element_Radio('estacPub', array(
            'label'=>'Estac. area publica', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('0'=>'No aplicable', '1'=>'Si', '2'=>'No'),
        )); 
        // Inmueble Clase de dpto
        $rdoClassDpto = $this->createElement('select', 'classDpto', array(
            'label'=>'Clase de departamento', 'description'=>'<b>*</b>', 'multiOptions'=>array(
                ''=>'No aplicable', 1=>'Flat', 2=>'Duplex', 3=>'Triplex', 4=>'Pent House', 5=>'Otros',
            ),
        ))/*->setAttrib('placeholder', 'foo')*/;
        // Zonificion
        $rdoZonific = $this->createElement('select', 'zonificacion', array(
            'label'=>'Zonificación', 'multiOptions'=>array(
                ''=>'Elegir', 'Residencial', 'Comercial', 'Oficinas Admin.', 'Industrial', 'Otra',
            ),
        ))/*->setAttrib('placeholder', 'foo')*/;
        // Pisos max. autorizacion
        $txtPisosAut = $this->createElement('text', 'pisosAut', array(
            'label'=>'Max. pisos autorizacion','class'=>'max-pisos-aut', 
            'description'=>'pisos',
        ));
        //Condiciones del inmueble
        $txtCondInm = $this->createElement('text', 'condInm', array(
            'label'=>'Condiciones del Inmueble','class'=>'cond-inm', 'description'=>'<b>*</b>', 
            'multiOptions'=>array('No aplicable', 'xremodelar', 'Regular', 'Buena', 'Muy Buena', 'Excelente'),
        ));
        // Proteccion con rejas
        $rdoRejas = new Zend_Form_Element_Radio('rejas', array(
            'label'=>'Area protegida por rejas', 'description'=>'<b>*</b>', 'inline'=>true, 
            'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Vigilancia 24 horas
        $rdoVig24h = new Zend_Form_Element_Radio('vig24h', array(
            'label'=>'Vigilancia  24 horas ', 'description'=>'<b>*</b>', 'inline'=>true, 
            'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Frente al mar
        $rdoFrenteMar = new Zend_Form_Element_Radio('frenteMar', array(
            'label'=>'Frente al mar', 'description'=>'<b>*</b>', 'inline'=>true, 
            'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Vista al mar
        $rdoVistaMar = new Zend_Form_Element_Radio('vistaMar', array(
            'label'=>'Vista al mar', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Frente al parque
        $rdoFrenteParq = new Zend_Form_Element_Radio('frenteParq', array(
            'label'=>'Frente al parque', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // EDIFICIOS - Caso de Departamentos - Opcional
        // Area de Recepcion
        $rdoAreaRecep = new Zend_Form_Element_Radio('areaRecep', array(
            'label'=>'Area de Recepcion', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Sala de recepciones
        $rdoSalaRecep = new Zend_Form_Element_Radio('salaRecep', array(
            'label'=>'Sala de recepciones', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Area de Esparcimiento
        $rdoAreaEspar = new Zend_Form_Element_Radio('areaEspar', array(
            'label'=>'Area de Esparcimiento', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Area para BBQ
        $rdoAreaBbq = new Zend_Form_Element_Radio('areaBbq', array(
            'label'=>'Area para BBQ', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Area Deportiva
        $rdoAreaDepor = new Zend_Form_Element_Radio('areaDepor', array(
            'label'=>'Area Deportiva', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Mascotas - Permitido
        $rdoPermMasc = new Zend_Form_Element_Radio('permMasc', array(
            'label'=>'Mascotas - Permitido', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        
        // Agua
        $rdoServAgua = new Zend_Form_Element_Radio('servAgua', array(
            'label'=>'Agua', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));
        // Desagüe 
        $rdoServDesague = new Zend_Form_Element_Radio('servDesague', array(
            'label'=>'Desagüe', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));        
        // Electricidad
        $rdoServElectr = new Zend_Form_Element_Radio('servElectr', array(
            'label'=>'Electricidad', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));        
        // Gas - Calidda
        $rdoServGas = new Zend_Form_Element_Radio('servGas', array(
            'label'=>'Gas - Calidda', 'description'=>'<b>*</b>', 'inline'=>true, 'multiOptions'=>array('1'=>'Si', '2'=>'No'),
        ));        
        // Precio
        //$txtCantDorm = $this->createElement('text', 'cantDorm', array('label'=>'Dormitorios','class'=>'cant-dorm','maxlength'=>1));
        $this->addElements(array(
            $txtPais, $txtDpto, $txtProvs, $txtDist, $txtUrb, $txtTipoUbi, $txtDir, $txtDet, $rdoEst, $hdUbicacion, 
            $txtPrecio, $txtParking, $rdoTransaccion, $txtFchEntega, $txtTipoInm, $txtPisosNiveles, $fileImage, 
            $txtAreaTotal, $txtAreaConst, $selAntiguedad, $txtNiveles,
            $txtCantDorm, $txtCantBanCom, $txtCantBanMed, $txtCantCuarServ, $txtCantBanServ, $txtCantDorm,
            
            $rdoComIndep->setValue('2'), $rdoSalaCome->setValue('2'), $rdoTerraza->setValue('2'), $rdoAscensor->setValue('2'), 
            $rdoPiscina->setValue('2'), $rdoDeposito->setValue('2'), $rdoGardinExt->setValue('2'), $rdoGardinInt->setValue('2'),
            $rdoGarages->setValue(0), $rdoEstac->setValue(0), $rdoEstacPub->setValue(2), $rdoEstacCond->setValue(2), 
            $rdoClassDpto->setValue(1), $rdoZonific, $txtPisosAut, $txtCondInm, $rdoRejas->setValue('2'), $rdoVig24h->setValue('2'), 
            $rdoFrenteMar->setValue('2'), $rdoVistaMar->setValue('2'), $rdoFrenteParq->setValue('2'), $rdoAreaRecep, $rdoSalaRecep, 
            $rdoAreaEspar, $rdoAreaBbq, $rdoAreaDepor, $rdoPermMasc, $rdoServAgua->setValue('1'), $rdoServDesague->setValue('1'), 
            $rdoServElectr->setValue('1'), $rdoServGas->setValue('2'),
        ));
        
        $this->addElement('submit', 'guardar', array('label' => 'Guardar'));
        $this->addElement('reset', 'limpiar', array('label' => 'Limpiar'));
        
        return;
        /*
        $this->addElement('password', 'password', array(
            'label' => 'Password',
            'description' => 'Please enter a nice password.',
            'required' => true,
        ));

        $this->addElement('password', 'oldpassword', array(
            'label' => 'Old Password',
            'value' => '******',
            'description' => 'This is your old password. Keep going.',
            'attribs' => array('disabled' => true)
        ));

        $this->addElement('select', 'Security Question', array(
            'label' => 'Please select a security question',
            'multiOptions' => array(
                'car' => 'What was your first car?',
                'city' => 'What is your favorite city?'
        )));

        $this->addElement('checkbox', 'remember_me', array(
            'label' => 'Remember me for two weeks',
        ));

        $this->addElement('radio', 'terms', array(
            'label' => 'I agree to the terms',
        ));

        $this->addElement('radio', 'terms', array(
            'label' => 'Terms',
            'multiOptions' => array(
                '1' => 'I agree to the terms',
                '0' => "I don't agree to the terms"
            )
        ));

        $this->addElement('multicheckbox', 'multichecks', array(
            'description' => 'This is a nice thing.',
            'label' => 'Foobar',
            'multiOptions' => array(
                '1' => 'I agree to the terms',
                '0' => "I don't agree to the terms"
            )
        ));

        $this->addElement('multicheckbox', 'multichecks2', array(
            'label' => 'Inline checkboxes',
            'inline' => true,
            'multiOptions' => array('1' => 'One', '0' => 'Two')
        ));

        $this->addElement('file', 'file', array(
            'label' => 'Please upload a file',
            'required' => true
        ));

        $this->addElement('hidden', 'id', array('value'=>'Test', 'label'=>'Test'));

        $elm = $this->createElement('text', 'foo', array(
            'label' => 'Element created via createElement'));

        $this->addElement($elm);

        $elm2 = new Zend_Form_Element_Text('foo2', array('label'=>'Via new instance'));

        $this->addElement($elm2);

        $this->addElement('submit', 'register', array('label' => 'Register'));
        $this->addElement('reset', 'reset', array('label' => 'Reset'));
        $this->addElement('button', 'custom', array(
            'class' => 'success',
            'label' => 'Custom classes, too!'
        ));*/
    }

}