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
    {        //var_dump(rand(1,100) . time() . ".jpg"); new Filter exit;
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
                $upload = new Zend_File_Transfer_Adapter_Http(); //$upload->setDestination(PATH_UPL."/inm/");
                try{ $upload->receive(); }
                catch(Zend_File_Transfer_Exception $e){ $e->getMessage(); }
                //var_dump($frmInm->getElement('imageInm')->getDestination()); exit;
                $name = $upload->getFileName('imageInm', FALSE);
                /*
                $size = $upload->getFileSize('imageInm');
                $mimeType = $upload->getMimeType('imageInm');
                print "<br>Url of uploaded file: $name ";
                print "<br>File Size: $size ";
                print "<br>File's Mime Type: $mimeType";
                print "<br>ext: ".$this->getFileExtension($name);
                */
                $fm->addMessage('formulario valido!');
                $inm = new Application_Model_Agentes_Inmueble();
                $formData["imageInm"] = /*rand(1,100).*/time().$this->getFileExtension($name);
                unset($formData["MAX_FILE_SIZE"]);
                unset($formData["guardar"]);

                $inm->add($formData); //$this->_helper->redirector('index');
                $fm->addMessage('Se guardo correctamente!');
                $frmInm->reset();
            } else{
                $frmInm->populate($formData);
                $fm->addMessage('Error al guardar!');
            }
            $this->view->msgs = $fm->getMessages();
        }
    }
    
    private function getFileExtension($filename)
    {
        $fext_tmp = explode('.',$filename);
        return $fext_tmp[(count($fext_tmp) - 1)];
    }
    
    public function editAction()
    {

    }

}