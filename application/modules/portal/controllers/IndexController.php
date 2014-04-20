<?php

class Portal_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        //$this->_helper->removeHelper($name)
        $ctrlDir = $this->getFrontController()->getControllerDirectory('portal');
        //echo "ctrlDir->".$ctrlDir;
        $this->view->addBasePath($ctrlDir . '/../views');//echo "INIT";
    }

    public function indexAction()
    {
        //get_class(new Extra_Image('/sss/ss')); exit;
        // action body
        $this->view->headLink()->appendStylesheet(CSS_URL.'/bst.datepicker/base'.MIN.'.css');
        $this->view->headLink()->appendStylesheet(CSS_URL.'/bst.datepicker/clean'.MIN.'.css');
        $this->view->headLink()->appendStylesheet(CSS_URL.'/jqCarousel2.0.css');
        //$this->view->headScript()->appendFile(JS_URL.'/library/class/jq.FileReader'.MIN.'.js');
        $this->view->headScript()->appendFile(JS_URL.'/library/datepicker'.MIN.'.js');
        $this->view->headScript()->appendFile(JS_URL.'/library/class/utilMaps.js');
        //$this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=false');
        $this->view->headScript()->appendFile(JS_URL.'/library/jquery/plugins/jqCarousel2.0.js');
        $this->view->headScript()->appendFile(JS_URL.'/application/modules/portal/pages/index.min.js');
        //Zend_Debug::dump($this->getRequest()->getParams());
        $this->view->assign('var', "indexAction");
        
        $inmueble = new Application_Model_Agentes_Inmueble();
        $ubigeo   = new Application_Model_Agentes_Ubigeo();
        
        // listado de casas y departamentos
        $this->view->casas = $inmueble->getAll( 1,20,'DESC','*',array('tipoImn IN (?)',array(1,2,3)) );
        $this->view->dptos = $inmueble->getAll( 1,20,'DESC','*',array('tipoImn IN (?)',array(4,5,6)) );
        
        // Ubigeo: Departamentos
        $this->view->ubDptos = $ubigeo->getDptos();

    }

    public function resultmapAction()
    {
        $this->_helper->viewRenderer->setNoRender();
        $this->_helper->layout->disableLayout();
        $idDpto = $this->getRequest()->getParam('idDpto');
        echo "<br>-*-*-*"; var_dump($idDpto);
        if(isset( $idDpto )){ //header('Content-Type: text/javascript; charset=utf8');
            $deps = array(
             /*dptos*/   /*provs*/
                '1' => array('1'=>'Lima','2'=>'Cañete'),
                '2'  => array('3'=>'Arequipa'),
                '3'  => array('4'=>'Callao')
            ); echo json_encode($deps[$idDpto]); //exit();
        }
        $idProv = $this->getRequest()->getParam('idProv');
        echo "<br>-*-*-*"; var_dump($idProv);
        if(isset( $idProv )){ //header('Content-Type: text/javascript; charset=utf8');
            $provs = array( /*provs*/   /*dists*/
                '1' => array('1'=>'Miraflores','2'=>'San Isidro','3'=>'Santiago De Surco','4'=>'San Borja'),
                '2' => array('5'=>'Asia','6'=>'Lunahuana'),
                '3' => array('8'=>'Arequipa','9'=>'Cayma','10'=>'Yanahuara'),
                '4' => array('11'=>'Callao','12'=>'Bellavista','13'=>'Ventanilla','14'=>'La Punta','15'=>'La Perla')
            ); echo json_encode($provs[$idProv]); //exit();
        }
    }

    public function depsAction(){
        
        $this->_helper->viewRenderer->setNoRender();
        $this->_helper->layout->disableLayout();
        
        $dist=$this->getRequest()->getParam("dist"); 
        $opc =$this->getRequest()->getParam("opc"); 
        $tipo=$this->getRequest()->getParam("tipo"); 
        $prec=$this->getRequest()->getParam("prec");
        /*
        .....
        ALGORITMO SELECT MYSQL CON PHP
        ....
        */
        /*Resultado de consulta mysql echa por algoritmo PHP*/
        echo '[{
                "titulo":"Departamento <b>['.$opc.']</b>",
                "enlace":"detalle/dpto/id/128",
                "direccion":"<b>['.$dist.']</b> Av. Oscar R. Benavides 4869<br \/><a href=\'mailto:elcebichedelrey@gmail.com\'>elcebichedelrey@gmail.com<\/a>",
                "descripcion":"<br \/>  Conservando la tradición que le diò origen, hoy le suma un estilo diferente, moderno y fresco para convertirse en una singular... ",
                "logo":"dpto.jpg",
                        "at":"valor AT",
                        "ac":"valor AC",
                        "precio":"dpto.jpg",
                "mapa":"-12.052541225555547\/-77.09325313568115"
            },{
                "titulo":"Departamento <b>['.$opc.']</b>",
                "enlace":"detalle/dpto/id/126",
                "direccion":"<b>['.$dist.']</b> Avenida Colonial, s\/n - Cdra 40 Mall Aventura Plaza - BELLAVISTA - Callao.",
                "descripcion":"<br \/>  De oferta ... ",
                "logo":"dpto.jpg",
                        "at":"valor AT",
                        "ac":"valor AC",
                        "precio":"dpto.jpg",
                "mapa":"-12.056024658260947\/-77.10179328918457"
            },{
                "titulo":"Departamento <b>['.$opc.']</b>",
                "enlace":"detalle/dpto/id/123",
                "direccion":"<b>['.$dist.']</b> Av. Argentina 3257 Int. 40",
                "descripcion":"<br \/> El mejor lugar donde vivir en una sona exclusiva tranquila y libre de  delincuencia y demas cosas ... ",
                "logo":"dpto.jpg",
                        "at":"valor AT",
                        "ac":"valor AC",
                        "precio":"dpto.jpg",
                "mapa":"-12.048202609842993\/-77.11136877536773"
            }]';
    }


    public function uploadAction()
    {
        $this->_helper->viewRenderer->setNoRender();
        $this->_helper->layout->disableLayout();
        $this->view->headScript()->appendFile(JS_URL.'/library/class/jq.FileReader'.MIN.'.js');
    }

    public function foojsonAction()
    {
        $this->_helper->layout->disableLayout();
        $response = Zend_Controller_Front::getInstance()->getResponse();
        $response->setHeader('Content-Type', 'application/json', true);
        return Zend_Json::encode(array('val1'=>'value1', 'val2'=>'value2'));
    }

    public function provAction()
    {
        $ubigeo = new Application_Model_Agentes_Ubigeo();
        $idDpto = $this->_request->getQuery('idDpto');
        $res = $ubigeo->getProvs($idDpto);
        echo Zend_Json::encode(array('status'=>'ok', 'data'=>$res));
        exit;
    }
    
    public function distAction()
    {
        $ubigeo = new Application_Model_Agentes_Ubigeo();
        $idProv = $this->_request->getQuery('idProv');
        $res = $ubigeo->getDists($idProv);
        echo Zend_Json::encode(array('status'=>'ok', 'data'=>$res));
        exit;
    }
    
}