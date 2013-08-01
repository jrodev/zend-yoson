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
        $frmInm = new Application_Form_Inmueble();
        //var_dump($this->ubigeo->getCountriesList());
        $this->view->form = $frmInm;
    }
    
    public function editAction()
    {

    }

}