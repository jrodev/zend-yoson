<?php

class Application_Form_Inmueble extends Twitter_Form {

    public function init() {
        // Make this form horizontal
        
        $ubigeo = new Application_Model_Agentes_Ubigeo();
 
        $this->setAttrib('horizontal', true);
        $this->setLegend('Nuevo inmueble');
        
        $txtPais = $this->createElement('select', 'pais', array(
            'label'=>'Pais', 'description'=>'Selecione un pais', 'multiOptions'=>$ubigeo->getPaises()
        ))/*->setAttrib('placeholder', 'foo')*/;
        
        $txtDpto = $this->createElement('select', 'dpto', array(
            'label'=>'Departamento', 'description'=>'Selecione departamento', 'multiOptions'=>array('seleccione')
        ))->setAttribs(array('disabled'=>true));
        
        $txtProvs = $this->createElement('select', 'prov', array(
            'label'=>'Provincia', 'description'=>'Selecione provincia', 'multiOptions'=>array('seleccione')
        ))->setAttribs(array('disabled'=>true));        
                
        $txtDist = $this->createElement('select', 'dist', array(
            'label'=>'Distrito', 'description'=>'Selecione distrito', 'multiOptions'=>array('seleccione')
        ))->setAttribs(array('disabled'=>true));        
                
        $txtUrb = $this->createElement('text', 'urb', array('label'=>'Urbanización'));
        
        $txtTipoUbi = $this->createElement('text', 'tipoUbi', array(
            'label'=>'Av,Calle,Jiron etc', 'description'=>'Alam,Av,Calle,Jiron,Malecon,Ovalo,Pasaje,Plaza etc'
        )); 
        
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
            'label'=>'Estado', 'description'=>'Todo listado caduca autmomaticamente a los 120 dias de 
                                               activacion.<br>Si ha caducado, no se reactiva',
            'multiOptions'=>array('0'=>'Retirado', '1'=>'Activo', '2'=>'Reactivado', '3'=>'Caducado'),
        ));
        // coordMap
        $hdUbicacion = $this->createElement('hidden', 'ubicacion', array('label'=>'Ubicacion'));
        // Precio
        $txtPrecio = $this->createElement('text', 'precio', array('label'=>'Precio','class'=>'tipo-moneda'));
        // Estacionamiento
        $txtParking = $this->createElement('text', 'parking', array('label'=>'Estacionamiento','class'=>'parking'));
        // transaccion
        $rdoTransaccion = new Zend_Form_Element_Radio('transaccion', array(
            'label'=>'Transacción', 'description'=>'Tipo de transaccion del inmueble',
            'multiOptions'=>array('1'=>'Estreno', '2'=>'Reventa', '3'=>'En construcción', '4'=>'Alquiler'),
        ));
        // Precio
        $txtFchEntega = $this->createElement('text', 'fechEntrega', array('label'=>'fecha de entrega'));
        // tipo de Inmueble
        $txtTipoInm = $this->createElement('select', 'tipoImn', array(
            'label'=>'Tipo de inmueble', 'description'=>'Selecione un tipo de inmueble', 'multiOptions'=>array(
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
        $fileImage = new Zend_Form_Element_File('imageInm', array('label'=>'Imagen','class'=>'image-inm'));
         // Area total
        $txtAreaTotal = $this->createElement('text', 'areaTotal', array(
            'label'=>'Area total(m2)','class'=>'area-total', 
            'description'=>'Indicar area total, excluida el area de estacionamientos,<br>en el caso de departamentos',
        ));       
         // Area construida
        $txtAreaConst = $this->createElement('text', 'areaConst', array(
            'label'=>'Area construida(m2)','class'=>'area-const', 
            'description'=>'Indicar area techada, excluida el area de estacionamientos,<br>en el caso de departamentos',
        ));
        // Antiguedad
        $selAntiguedad = $this->createElement('select', 'antiguedad', array(
            'label'=>'Tipo de inmueble', 'description'=>'Selecione un tipo de inmueble', 'multiOptions'=>array(
                1=>'No aplicable', 2=>'En Construccion', 3=>'Estreno', 4=>'Hasta 3 años', 5=>'Hasta 5 años',
                6=>'Hasta 10 años', 7=>'Hasta 15 años', 8=>'Hasta 20 años', 9=>'hasta 20+ años', 
            ),
        ))/*->setAttrib('placeholder', 'foo')*/;
        
        
        
        
        
        
        
        
        

        
        
        $this->addElements(array(
            $txtPais, $txtDpto, $txtProvs, $txtDist, $txtUrb, $txtTipoUbi, $txtDir, $txtDet, $rdoEst, $hdUbicacion, 
            $txtPrecio, $txtParking, $rdoTransaccion, $txtFchEntega, $txtTipoInm, $txtPisosNiveles, $fileImage, 
            $txtAreaTotal, $txtAreaConst, 
        ));
        

        
        
        
        
        
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
        ));
    }

}