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
                
                $upload = new Zend_File_Transfer_Adapter_Http(); //$upload->setDestination(PATH_UPL."/inm/");
                try { // upload received file(s)
                    $upload->receive();
                } catch (Zend_File_Transfer_Exception $e) {
                    $e->getMessage();
                }
                
                
                
                // you MUST use following functions for knowing about uploaded file 
                # Returns the file name for 'doc_path' named file element
                $name = $upload->getFileName('imageInm', FALSE);

                # Returns the size for 'doc_path' named file element 
                # Switches of the SI notation to return plain numbers
                //$upload->setOption(array('useByteString' => false));
                $size = $upload->getFileSize('imageInm');

                # Returns the mimetype for the 'doc_path' form element
                $mimeType = $upload->getMimeType('imageInm');

                // following lines are just for being sure that we got data
                print "<br>Url of uploaded file: $name ";
                print "<br>File Size: $size ";
                print "<br>File's Mime Type: $mimeType";
                print "<br>ext: ".$this->getFileExtension($name);

                // New Code For Zend Framework :: Rename Uploaded File
                $renameFile = 'newName.jpg';

                exit; //$fullFilePath = '/images/'.$renameFile;
                
                
                
                
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
    
    private function getFileExtension($filename)
    {
        $fext_tmp = explode('.',$filename);
        return $fext_tmp[(count($fext_tmp) - 1)];
    }
    
    public function editAction()
    {

    }

}