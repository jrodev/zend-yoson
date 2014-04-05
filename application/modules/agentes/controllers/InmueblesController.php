<?php
/*
 * 
 */
class Agentes_InmueblesController extends Zend_Controller_Action
{
    public $ubigeo;
    
    public function init()
    {
        $this->ubigeo = new Application_Model_Agentes_Ubigeo();
    }

    public function indexAction()
    {

    }
    
    public function createAction()
    {
        $urlGmap  = 'http://maps.google.com/maps/api/js?sensor=false';
        $urlswfo  = JS_URL.'/library/class/swfobject.js';
        $urljqui  = JS_URL.'/library/jquery/jquery.ui/jq.ui.core.js';
        $urlFread = JS_URL.'/library/jquery/plugins/jquery.FileReader.js';
        $urlajxup = JS_URL.'/library/jquery/plugins/jquery.wallform.js';
        $urlinmjs = JS_URL.'/application/modules/agente/pages/inmuebles.js';

        $this->view->headScript()->appendFile( $urlGmap, null, array('async'=>true) );
        $this->view->headScript()->appendFile( $urlswfo, null, array('conditional'=>'lte IE 9') );
        $this->view->headScript()->appendFile( $urljqui, null, array('conditional'=>'lte IE 9') );
        $this->view->headScript()->appendFile( $urlFread, null);
        $this->view->headScript()->appendFile( $urlajxup, null);
        $this->view->headScript()->appendFile( $urlinmjs, null);

        // NO es POST ----------------------------------------------------------------
        if (!$this->getRequest()->isPost()) {
            return ($this->view->form = new Application_Form_Inmueble());
        }
        
        // SI es POST ----------------------------------------------------------------
        $formData = $this->getRequest()->getPost(); //var_dump($formData); exit;
        
        // Si Token diferente
        $myNs = new Zend_Session_Namespace('authtoken');
        var_dump($myNs->authtoken,$formData['authtoken']);
        if ($myNs->authtoken==$formData['authtoken']){
            return ($this->view->form = new Application_Form_Inmueble());
        }
        // Token iguales
        $frmInm = new Application_Form_Inmueble();
        $this->view->form = $frmInm;
        
        // Si es upload de archivos(mediante submit)
        $upload = new Zend_File_Transfer_Adapter_Http(); //$upload->setDestination(PATH_UPL."/inm/");
        if($upload->isUploaded('inpImageInm')){
            $this->_helper->layout()->disableLayout(); 
            $this->_helper->viewRenderer->setNoRender(true);
            $files = $upload->getFileInfo(); flog('files:',$files);
            foreach ($files as $file=>$info) {
                echo '<hr>'; var_dump($file);
                if($upload->isValid($file)) $upload->receive($file);
            }
            return ;
        }

        // se sube el archivo convertido a string en el cliente (mediante ajax)
        if ($this->getRequest()->isXmlHttpRequest()){
            $this->_helper->layout()->disableLayout(); 
            $this->_helper->viewRenderer->setNoRender(true);
            $base64Image = $this->getRequest()->getPost('base64Image', FALSE);
            $extImg  = $this->getTypeBase64Image($base64Image);
            $nameImg = uniqid().'.'.$extImg;
            $pathImg = $frmInm->getElement('inpImageInm')->getDestination();
            $urlImg = $this->base64ToImage($base64Image, "$pathImg/$nameImg");
            $aUri = explode('public_html/',$urlImg); // dividiendo ruta absoluta
            echo trim($aUri[1]);
            return ;
        }
        
        // Si Form invalid
        if (!$frmInm->isValid($formData)) {
            return $frmInm->populate($formData);
        }
        
        // Form valido
        unset($formData["inpImageInm"]);
        unset($formData["MAX_FILE_SIZE"]);
        unset($formData["guardar"]);

        $inm = new Application_Model_Agentes_Inmueble();
        $inm->add($formData); //$this->_helper->redirector('index');
        $frmInm->reset();
        
    }
    
    /**
     * 
     */
    private function getTypeBase64Image($strImg)
    {
        $exts = array(
            'image/jpeg'=>'jpg','image/png'=>'png','image/x-ms-bmp'=>'bmp','image/gif'=>'gif'
        );
        flog('$strImg:', substr($strImg,0,450).'...');
        $imgdata = base64_decode($strImg);
        $f = finfo_open(FILEINFO_NONE);
        $type = finfo_buffer($f, $imgdata, FILEINFO_MIME_TYPE);
        flog('$type:',$type);
        return $exts[$type];
    }

    /**
     * 
     */
    private function base64ToImage($base64String, $outFile) {
        $ifp = fopen($outFile, "wb"); 
        fwrite($ifp, base64_decode($base64String)); 
        fclose($ifp); 
        return $outFile; 
    }
    
    /**
     * 
     */
    private function getFileExtension($filename)
    {
        $fext_tmp = explode('.',$filename);
        return $fext_tmp[(count($fext_tmp) - 1)];
    }
    
    public function dptoAction()
    {
        $idPais = $this->_request->getQuery('idPais');
        $res = $this->ubigeo->getDptos($idPais);
        echo Zend_Json::encode(array('status'=>'ok', 'data'=>$res));
        exit;
    }
    
    public function provAction()
    {
        $idDpto = $this->_request->getQuery('idDpto');
        $res = $this->ubigeo->getProvs($idDpto);
        echo Zend_Json::encode(array('status'=>'ok', 'data'=>$res));
        exit;
    }
    
    public function distAction()
    {
        $idProv = $this->_request->getQuery('idProv');
        $res = $this->ubigeo->getDists($idProv);
        echo Zend_Json::encode(array('status'=>'ok', 'data'=>$res));
        exit;
    }
    
    public function editAction()
    {

    }

}