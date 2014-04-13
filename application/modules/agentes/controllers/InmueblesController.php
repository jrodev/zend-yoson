<?php
/*
 * 
 */
class Agentes_InmueblesController extends Zend_Controller_Action
{
    public $ubigeo;
    private $pathUpl;
    private $tempUpl;
    private $idUsu;
    private $cantRegs = 10;

    public function init()
    {
        $this->ubigeo  = new Application_Model_Agentes_Ubigeo();
        $this->pathUpl = PATH_UPL.'/inm';
        $this->tempUpl = TEMP_UPL;
        $this->idUsu   = Zend_Auth::getInstance()->getStorage()->read()->id;
    }

    public function indexAction()
    {
        if ($this->getRequest()->isPost() && $this->getRequest()->isXmlHttpRequest()) {
            $this->_helper->layout()->disableLayout(); 
            $this->_helper->viewRenderer->setNoRender(true);
            $moInm = new Application_Model_Agentes_Inmueble();
            
            $id  = $this->getRequest()->getPost('id', FALSE);
            $isDel = $this->getRequest()->getPost('isDel', FALSE);
            
            if(!$id) throw new Exception("indexAction:field id is empy!");
            
            if ($isDel) {
                $res = $moInm->del((int)$id); flog('$id,$res:',array($id,$res));
                echo $res;
                return ;
            }
            
            $est = $this->getRequest()->getPost('estado', FALSE); 
            flog('$id,$est:',array($id,$est));
            if(trim($est)==='') throw new Exception("stateAction:field estado is empy!");
            
            $res = $moInm->upd(array('id'=>$id,'estado'=>$est)); 
            flog('$id,$est,$res:',array($id,$est,$res));
            echo $res;
            return;
        }
        $urlinmjs = JS_URL.'/application/modules/agente/pages/inmuebles.js';
        $this->view->headScript()->appendFile( $urlinmjs, null);
        
        $moInm = new Application_Model_Agentes_Inmueble();
        $page = (int)$this->getRequest()->getParam('page',1);
        $rowsPage = (int)$this->getRequest()->getParam('rows',$this->cantRegs);

        $rows = (int)$moInm->getCountRows('inmueble');
        $cantPages = (int)($rows/$rowsPage) + (($rows%$rowsPage)?1:0);

        $this->view->rows = $moInm->getAll($page, $rowsPage);
        
        // suponiendo que la url siempre llega de esta forma: .../agentes/inmuebles/index/x/y
        $thisUrl = BASE_URL.$this->getRequest()->getRequestUri();
        $aUrl = explode('/', $thisUrl);
        $aUrl[count($aUrl)-1] = '%s';
        $aUrl[count($aUrl)-2] = '%s';
        $this->view->thisUrl = implode('/', $aUrl);
        
        $this->view->page = $page;
        $this->view->rowsPage = $rowsPage;
        $this->view->cantPages = $cantPages;
    }
    
    public function createAction()
    {
        /* $pathOrig = $this->tempUpl.'/dirOrig/fooDir';
        $pathFile = $pathOrig."/foo.ext";
        if(!file_exists($pathFile) && !file_exists($pathOrig) && !is_dir($pathOrig) && mkdir($pathFile, 0755, true)) 
            echo "se creo: $pathFile";
        else echo "Ya existe: $pathFile";
        
        $pathCopy = $this->pathUpl.'/dirCopy/';
        if(rename($pathOrig, $pathCopy)) echo "rename ok!";
        else  echo "rename ERROR!";
        exit;*/

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
        
        $sessNs = new Zend_Session_Namespace('authtoken');

        $uriUpl = explode('public_html/',$this->tempUpl);
        $jsParams = array('selsVals'=>'','edit'=>0); // Paramentros javascript que iran en el head
        
        // NO es POST ----------------------------------------------------------------
        if (!$this->getRequest()->isPost()) {
            $this->view->form = $frmInm = new Application_Form_Inmueble();
            $frmInm->addFormToken();
            // Creando dirname de imagenes temporalemte subidas
            if(isset($sessNs->dirnameimg)) {
                // Eliminando directorio anterior
                $dirToDel = $this->tempUpl.'/'.$sessNs->dirnameimg; // Eliminando directorio y contenido
                if (file_exists($dirToDel) && is_dir($dirToDel)) 
                    flog("elinando dir $dirToDel:",$this->deleteDirectory($dirToDel));
            }
            $sessNs->dirnameimg = "temp".md5(uniqid(rand(),1));
            flog('no post - dirnameimg:',$sessNs->dirnameimg);
            $jsParams['uriUpl'] = BASE_URL.'/'.$uriUpl[1].'/'.$sessNs->dirnameimg.'/imginm';
            $this->view->headScript()->appendScript('window.vars='.json_encode($jsParams).';');
            return ;
        }
        
        // SI es POST ----------------------------------------------------------------
        $formData = $this->getRequest()->getPost(); //var_dump('$formData:',$formData);
        $isAjax   = $this->getRequest()->isXmlHttpRequest(); flog('POST-dirnameimg',$sessNs->dirnameimg);
        
        // Si Token diferente
        if (!$isAjax && $sessNs->authtoken!=$formData['authtoken']) {
            $this->view->err='1'; flog('Si Token diferente dirnameimg:',$sessNs->dirnameimg);
            $jsParams['uriUpl'] = BASE_URL.'/'.$uriUpl[1].'/'.$sessNs->dirnameimg.'/imginm';
            $this->view->headScript()->appendScript('window.vars='.json_encode($jsParams).';');
            $frmInm = new Application_Form_Inmueble(null,$formData);
            $frmInm->addFormToken();
            return ($this->view->form = $frmInm);
        }
        
        // Token iguales
        $upload = new Zend_File_Transfer_Adapter_Http(); //$upload->setDestination(PATH_UPL."/inm/");

        // Si es upload de archivos(mediante submit)
        if ($upload->isUploaded('inpImageInm')) {
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
        if ($isAjax) {
            $base64Image = $this->getRequest()->getPost('base64Image', FALSE);
            //$authtoken   = $this->getRequest()->getPost('authtoken', FALSE);
            $rutaImg = $this->tempUpl.'/'.$sessNs->dirnameimg.'/imginm';
            echo $this->ajaxUpload($rutaImg, $base64Image);
            return ;
        }

        // Creado el formulario 
        $this->view->form = $frmInm = new Application_Form_Inmueble(null,$formData);
        $frmInm->addFormToken();
        
        // Si Form invalid
        if (!$frmInm->isValid($formData)) {
            $this->view->err = '2';         
            $formData["authtoken"]=$sessNs->authtoken;
            flog('$formData',$formData);
            $jsParams['selsVals']=array($formData['pais'],$formData['dpto'],$formData['prov'],$formData['dist']);
            $jsParams['uriUpl'] = BASE_URL.'/'.$uriUpl[1].'/'.$sessNs->dirnameimg.'/imginm';
            $this->view->headScript()->appendScript('window.vars='.json_encode($jsParams).';');
            return $frmInm->populate($formData);
        }
        
        // Form valido
        unset($formData["authtoken"]);
        unset($formData["inpImageInm"]);
        unset($formData["MAX_FILE_SIZE"]);
        unset($formData["guardar"]);
        $formData["idUsu"] = $this->idUsu; // Aosciando registro a este usuario
        $inm = new Application_Model_Agentes_Inmueble();
        $this->view->headScript()->appendScript('window.vars='.json_encode($jsParams).';');
        if(!($idInm=$inm->add($formData))) return $this->view->err='3';
        $tmpDir = $this->tempUpl.'/'.$sessNs->dirnameimg.'/imginm';
        $endDir = $this->pathUpl.'/usu'.$this->idUsu."/inm$idInm"; 
        ///if(mkdir($endDir, 0755, true)) flog('se creo endDir!');
        flog('$tmpDir:',$tmpDir);
        flog('$endDir:',$endDir);
        $this->copyDir($tmpDir, $endDir, true);
        //if(!rename($tmpDir, $endDir)) flog('Error en copiar directorio!'); 
        // Si se guardo correctamente se redirecciona
        flog('redirigiendo:',BASE_URL.'/agentes/inmuebles/create?save');
        $this->getResponse()->setRedirect(BASE_URL.'/agentes/inmuebles/create?save');
        //$this->view->err='4'; // Mensaje success!!
        //$frmInm->reset();
    }

    public function editAction()
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
        
        $sessNs   = new Zend_Session_Namespace('authtoken'); // Name espace para token
        $moInm    = new Application_Model_Agentes_Inmueble();

        $isPost = $this->getRequest()->isPost();
        $isAjax = $this->getRequest()->isXmlHttpRequest();
        
        $uriUpl   = explode('public_html/',$this->pathUpl);
        $codErr = '0'; // Numero de error por defecto (0 = ningun error)
        
        $formData = $this->getRequest()->getPost();  // Capturando datos POST si lo hubiese

        // Cargando formualrio con un registro de la BD
        $idInm = (int)$this->getRequest()->getParam('id',false);
        if (!$idInm) { throw new Exception("id incorrect!"); return ; } // Si ID incorrecto
        $rowId = $moInm->getById($idInm);
        unset($rowId['id']); unset($rowId['fechareg']); unset($rowId['activo']);
        
        $jsParams = array( // Paramentros javascript que iran en el head
            'selsVals'=>array($rowId['pais'],$rowId['dpto'],$rowId['prov'],$rowId['dist']),'edit'=>1
        ); 
        $dataPopulate = $rowId;
        $frmInm = new Application_Form_Inmueble(null,$isPost?$formData:$rowId); // send form to view
        $this->view->form = $frmInm;
        
        // Peticion Post
        if ($isPost) {
            // si es ajax post
            if ($isAjax) {
                $base64Image = $this->getRequest()->getPost('base64Image', FALSE);
                //$rutaImg = $this->tempUpl.'/'.$sessNs->dirnameimg.'/imginm';
                $rutaImg = $this->pathUpl.'/usu'.$this->idUsu.'/inm'.$idInm;
                $nameImg = $this->ajaxUpload($rutaImg, $base64Image, TRUE);
                
                $aNameImg = explode('-', $nameImg);
                $aImages  = explode('|', $rowId['imageInm']);
                $aImages[]=$aNameImg[1];
                $moInm->upd( array('id'=>$idInm, 'imageInm'=>implode('|',$aImages)) );
                
                echo $nameImg;
                return ;
            // form post
            } else {
                flog('formData:',$formData);
                // Tokens diferentes
                if ($sessNs->authtoken!=$formData['authtoken']) {
                    flog('Tokens diferentes');
                    $codErr = '1';
                    $frmInm->addFormToken();
                // Tokens Iguales
                } else {
                    $frmInm->addFormToken();
                    $jsParams['selsVals'] = array(
                        $formData['pais'],$formData['dpto'],$formData['prov'],$formData['dist']
                    );
                    // Si Form invalid
                    $dataPopulate = $formData; // salvando formData antes del unset.
                    if (!$frmInm->isValid($formData)) {
                        $codErr = '2';         
                        $formData["authtoken"] = $sessNs->authtoken;
                        $dataPopulate = $formData; // salvando form con token
                    // Form Valid!
                    } else {
                        // Seteando algunos datos
                        unset($formData["authtoken"])    ; unset($formData["inpImageInm"]);
                        unset($formData["MAX_FILE_SIZE"]); unset($formData["imageInm"]); // save by ajax
                        unset($formData["guardar"])      ; $formData["id"] = $idInm;
                        $formData["idUsu"] = $this->idUsu; // Asociando registro a este usuario
                        // NO Guardo
                        if (!$moInm->upd($formData)) $codErr='3';
                        // SI Guardo
                        else {/*
                            $tmpDir = $this->tempUpl.'/'.$sessNs->dirnameimg.'/imginm'; flog('$tmpDir:',$tmpDir);
                            $endDir = $this->pathUpl.'/usu'.$this->idUsu."/inm$idInm";  flog('$endDir:',$endDir);
                            $this->copyDir($tmpDir, $endDir, true);*/
                            // Si se guardo correctamente se redirecciona
                            flog('redirigiendo:',BASE_URL."/agentes/inmuebles/edit/$idInm?save");
                            $this->getResponse()->setRedirect(BASE_URL."/agentes/inmuebles/edit/$idInm?save");
                        }
                    }
                }
            }
        // NO Post
        } else {
            $frmInm->addFormToken(); //Addicionando token al formulario
            // Creando dirname de imagenes temporalemte subidas
            /*if(isset($sessNs->dirnameimg)) {
                // Eliminando directorio anterior
                $dirToDel = $this->tempUpl.'/'.$sessNs->dirnameimg; // Eliminando directorio y contenido
                if (file_exists($dirToDel) && is_dir($dirToDel)) 
                    flog("Delete directory($dirToDel):",$this->deleteDirectory($dirToDel));
            }
            $sessNs->dirnameimg = "temp".md5(uniqid(rand(),1));  // Nuevo nombre de directorio
            flog('Nuevo dirnameimg:',$sessNs->dirnameimg);*/
        }
        $frmInm->populate($dataPopulate);
        $jsParams['uriUpl'] = BASE_URL.'/'.$uriUpl[1].'/usu'.$this->idUsu.'/inm'.$idInm; // url imgs
        $this->view->err = $codErr; 
        $this->view->headScript()->appendScript('window.vars='.json_encode($jsParams).';'); // vars js
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
    
    public function stateAction()
    {

    }

        /**
     * @param string $rutaImg Ruta donde se guardara la imagen ($this->tempUpl."/$authtoken")
     * @param string $base64Image Imagen como cadena en base64
     * @param bool $isEdit Si es una edicion TRUE si es insercion FALSE.
     * @return string Nombre de la imagen que se ha subido.
     */
    private function ajaxUpload($rutaImg, $base64Image, $isEdit=FALSE){
        $this->_helper->layout()->disableLayout(); 
        $this->_helper->viewRenderer->setNoRender(true);

        if (!file_exists($rutaImg) && !is_dir($rutaImg)) {
            mkdir($rutaImg, 0755, true); flog('ajax-dirCreate:',$rutaImg);
        }

        $extImg  = $this->getTypeBase64Image($base64Image);
        $prefix  = $isEdit?'big-':''; // Si es edit la inage va directo
        $sufix   = uniqid().'.'.$extImg;
        $nameImg = $prefix.$sufix;
        //$frmInm->getElement('inpImageInm')->getDestination();
        $urlImg = $this->base64ToImage($base64Image, "$rutaImg/$nameImg");
        if($isEdit) $this->imageRedimencion($rutaImg, $sufix);
        //$aUri = explode('public_html/',$urlImg); // dividiendo ruta absoluta
        return trim($nameImg);
    }

    /**
     * @param string $strImg Imagen cadena en base64
     * @return string Tipo de imagen
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
     * @param string $base64String Imagen cadena en base64
     * @param string $outFile Ruta donde guardar archivo
     * @return string Ruta donde se guardo la imagen
     */
    private function base64ToImage($base64String, $outFile) {
        $ifp = fopen($outFile, "wb"); 
        if(!fwrite($ifp, base64_decode($base64String)))
            throw new Exception("base64ToImage:No se guardo!"); 
        fclose($ifp); 
        return $outFile; 
    }
    
    /**
     * @param string $dir Ruta al directorio
     * @return bool True si se elimino directorio.
     */
    private function deleteDirectory($dir) {
        foreach (scandir($dir) as $file) {
            if('.'===$file || '..'===$file) continue;
            if(is_dir("$dir/$file")) $this->deleteDirectory("$dir/$file");
            else unlink("$dir/$file");
        }
        return rmdir($dir);
    }

    /**
     * 
     */
    private function copyDir($src, $dst, $redi=false) 
    {
        $dir = opendir($src);
        if(mkdir($dst, 0755, true)) flog("se creo destino:$dst"); // con permisos y creacion de subdirectorios
        while ( false!==($file=readdir($dir)) )
            if ($file!='.' && $file!='..')
                if (is_dir("$src/$file")) $this->copyDir("$src/$file", "$dst/$file");
                else {
                    $urlEnd = "$dst/big-$file";                   
                    if (copy("$src/$file", $urlEnd) && $redi) 
                        $this->imageRedimencion($dst, $file);
                }
        closedir($dir);
    }
    
    /**
     * @param string $dst Directorio de destino
     * @param string $file parte del nombre de la inalgen original "big-$file"
     * @return void crea dos archivos redimensionados de "big-$file"
     */
    private function imageRedimencion($dst, $file)
    {
        $urlEnd = "$dst/big-$file";
        $aFile = explode('.', $file);
        $img = new Extra_Image($urlEnd);
        $img->resize(583,440,'crop');
        $img->save("medium-".$aFile[0], $dst);
        $img->resize(265,200,'crop');
        $img->save("small-".$aFile[0], $dst);
        flog('create:medium-small');
    }

    /**
     * 
     */
    private function getFileExtension($filename)
    {
        $fext_tmp = explode('.',$filename);
        return $fext_tmp[(count($fext_tmp) - 1)];
    }

}