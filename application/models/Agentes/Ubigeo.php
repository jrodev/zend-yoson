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
    
}

?>
