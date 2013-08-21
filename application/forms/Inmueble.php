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
            'description'=>'Ej. "Int. A"; o  "Dpto 305" o "piso 3". Si son varios <br>pisos de costo similar, indicar el nivel mas bajo y <br />ampliar en comentarios'
        ));
        //$txtDet->getDecorator('description')->setOption('escape', false); // No funciona, se hizo , 'escape'=>false en /Library/Twitter/Form.php line28
       
        // coordMap
        $hdUbicacion = $this->createElement('hidden', 'ubicacion', array('label'=>'Ubicacion'));

        $this->addElements(array($txtPais, $txtDpto, $txtProvs, $txtDist, $txtUrb, $txtTipoUbi, $txtDir, $txtDet, $hdUbicacion));

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