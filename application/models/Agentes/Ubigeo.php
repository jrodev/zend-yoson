<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Test
 *
 * @author jrodev
 */
class Application_Model_Agentes_Ubigeo extends Zend_Db_Table 
{
    //protected $_name = 'pais';
    protected $pais = 'pais';
    protected $dpto = 'dpto';
    protected $prov = 'prov';
    protected $dist = 'dist';
    
    public function getPaises()
    {
        $fields = array('key'=>'id','value'=>'nombre');
        $select = $this->_db->select()->from($this->pais, $fields);
        $result = $this->getAdapter()->fetchAll($select);
        return $result;
    }
    
    public function getDptos($idPais=1)
    {
        $fields = array('key'=>'id','value'=>'nombre');
        $select = $this->_db->select()->from($this->dpto, $fields)->where("idpais=$idPais");
        $result = $this->getAdapter()->fetchAll($select);
        return $result;
    }
    
    public function getProvs($idDpto='150000')
    {
        $fields = array('key'=>'id','value'=>'nombre');
        $select = $this->_db->select()->from($this->prov, $fields)->where("iddpto='$idDpto'");
        $result = $this->getAdapter()->fetchAll($select);
        return $result;
    }
    
    public function getDists($idProv='150100')
    {
        $fields = array('key'=>'id','value'=>'nombre');
        $select = $this->_db->select()->from($this->dist, $fields)->where("idprov='$idProv'");
        $result = $this->getAdapter()->fetchAll($select);
        return $result;
    }
}

?>
