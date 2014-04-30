<?php

class Portal_BusquedaController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */ //$this->_helper->removeHelper($name)
        $ctrlDir = $this->getFrontController()->getControllerDirectory('portal');//echo "ctrlDir->".$ctrlDir;
        $this->view->addBasePath($ctrlDir . '/../views');//echo "INIT";
    }

    public function resultadosAction()
    {
        // Cargando recursos estaticos JS y CSS
        $this->view->headLink()->appendStylesheet(CSS_URL.'/bst.datepicker/base'.MIN.'.css');
        $this->view->headLink()->appendStylesheet(CSS_URL.'/bst.datepicker/clean'.MIN.'.css');
        $this->view->headScript()->appendFile(JS_URL.'/library/datepicker'.MIN.'.js');
        $this->view->headScript()->appendFile(JS_URL.'/application/modules/portal/pages/result.js');
        
        // Captura de valores enviados por GET
        $get = $this->_request->getQuery(); //var_dump($get);
        $jsParams =array(
            'selsVals'=>array(
                'searchDpto'=>isset($get['search-dpto'])?trim($get['search-dpto']):'',
                'searchProv'=>isset($get['search-prov'])?trim($get['search-prov']):'',
                'dist1'=>isset($get['dist1'])?trim($get['dist1']):'',
                'dist2'=>isset($get['dist2'])?trim($get['dist2']):'',
                'dist3'=>isset($get['dist3'])?trim($get['dist3']):'',
            ),
            'dates'=>array(),
        );
        
        $inm = new Application_Model_Agentes_Inmueble();
        $ubg = new Application_Model_Agentes_Ubigeo();
        $whr = array();
        
        $d1=isset($get['dist1'])?trim($get['dist1']):''; 
        $d2=isset($get['dist2'])?trim($get['dist2']):''; 
        $d3=isset($get['dist3'])?trim($get['dist3']):''; 
        if($d1&&$d2&&$d3) $whr["i.dist IN ('$d1','$d2','$d3')"]='';
        
        $fi=isset($get['fechaIni'])?trim($get['fechaIni']):''; 
        $ff=isset($get['fechaFin'])?trim($get['fechaFin']):'';
        if($fi&&$ff){
            $jsParams['dates']['ini']=$fi; $jsParams['dates']['end']=$ff; 
            $whr["i.fechareg>'$fi 23:59:59'"]=''; $whr["i.fechareg<'$ff 00:00:00'"]='';
        }
        
        $tr=isset($get['transac'])?$get['transac']:array();
        if(is_array($tr)&&count($tr)){
            $this->view->transac = $tr;
            $whr['i.transaccion IN ('.implode(',',$tr).')']='';
        }
        
        $ti=isset($get['tipo'])?$get['tipo']:array();
        if(is_array($ti)&&count($ti)){
            $this->view->tipo = $ti;
            $whr['i.tipoImn IN ('.implode(',',$ti).')']='';
        }
        
        $dr=trim($get['dormtrs']); $ga=trim($get['garages']); $es=trim($get['estac']);
        if($dr) $whr["i.cantDorm=$dr"]='';
        if($ga) $whr["i.garages=$ga"]='';
        if($es) $whr["i.estac=$es"]='';
        $this->view->more = array($dr,$ga,$es);
        
        $this->view->inmRes = $inm->getInmuebles(1,10,'DESC','*',$whr);
        
        // Ubigeo: Departamentos
        $this->view->ubDptos = $ubg->getDptos();
        
        $this->view->headScript()->appendScript('window.vars='.json_encode($jsParams).';'); 
    }
    
}