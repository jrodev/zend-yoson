<?php
/*
 * 
 */
class Agentes_InmueblesController extends Zend_Controller_Action
{
    //private $ubigeo;
    public function init()
    {
        //$this->ubigeo = new Application_Model_Agentes_Ubigeo();
    }

    public function indexAction()
    {
        
    }
    
    public function createAction()
    {
        $this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=false','text/javascript',array('async'=>true));
        $this->view->headScript()->appendFile(JS_URL.'/application/modules/agente/pages/inmuebles.js');
        //$this->view->headScript()->appendFile(JS_URL.'/library/class/utilMaps.js');
        $frmInm = new Application_Form_Inmueble();
        //var_dump($this->ubigeo->getCountriesList());
        $this->view->form = $frmInm;
    }
    
    public function editAction()
    {

    }

}