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
        $get = $this->_request->getQuery();
        $inm = new Application_Model_Agentes_Inmueble();
        $whr = array(
            "i.dist IN ('".$get['dist1']."','".$get['dist2']."','".$get['dist3']."')"=>'',
            "i.fechareg > '".$get['fechaIni']." 23:59:59'"=>'',
            "i.fechareg < '".$get['fechaFin']." 00:00:00'"=>'',
            'i.transaccion IN ('.implode(',', $get['transac']).')'=> '',
            'i.tipoImn IN ('.implode(',', $get['tipo']).')'=>'',
            'i.cantAscensor='.$get['ascensor']=>'',
            'i.garages='.$get['garages']=>'',
            'i.estac='.$get['estac']=>''
        );
        var_dump($inm->getInmuebles(1,20,'DESC','*',$whr)); 
        exit;
    }
    
}