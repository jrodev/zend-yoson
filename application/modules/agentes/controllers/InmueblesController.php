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

        if ($this->getRequest()->isPost()) {
            $fm = $this->_helper->getHelper('FlashMessenger');
            $fm->addMessage('nuevo post!');
            
            $formData = $this->getRequest()->getPost();
            //var_dump($formData); exit;
            if ($frmInm->isValid($formData)) {
                $fm->addMessage('formulario valido!');
                $inm = new Application_Model_Agentes_Inmueble();
                unset($formData["MAX_FILE_SIZE"]);
                unset($formData["guardar"]);
                $inm->add($formData);
                //$this->_helper->redirector('index');
            } else
                $frmInm->populate($formData);
            
            $this->view->msgs = $fm->getMessages();
        }
    }
    
    public function editAction()
    {

    }

}