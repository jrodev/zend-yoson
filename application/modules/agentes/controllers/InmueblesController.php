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
            $fm->addMessage('Ins post!');
            $this->view->msgs = $this->_helper->flashMessenger->getMessages();
            $formData = $this->getRequest()->getPost();
            var_dump($formData); exit;
            if ($form->isValid($formData)) {
                $artist = $form->getValue('artist');
                $title = $form->getValue('title');
                $albums = new Application_Model_DbTable_Albums();
                $albums->addAlbum($artist, $title);
                $this->_helper->redirector('index');
            } else {
                $form->populate($formData);
            }
        }
    }
    
    public function editAction()
    {

    }

}