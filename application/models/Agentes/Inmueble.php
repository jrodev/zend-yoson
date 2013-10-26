<?php
/**
 * Description of Test
 * @author jrodev
 */
class Application_Model_Agentes_Inmueble extends Zend_Db_Table 
{
    //protected $_name = 'pais';
    /*protected $pais = 'pais';
    protected $dpto = 'dpto';
    protected $prov = 'prov';
    protected $dist = 'dist';
    
    public function getPaises()
    {
        $fields = array('key'=>'id','value'=>'nombre');
        $select = $this->_db->select()->from($this->pais, $fields);
        $result = $this->getAdapter()->fetchAll($select);
        return $result;
    }*/
    protected $_name = 'inmueble';
    
    public function getAlbum($id)
    {
        if(!isset($id)) throw new Exception("id no isset!");
        $row = $this->fetchRow('id='.(int)$id);
        if (!$row) throw new Exception("No se encontro row para id=$id");
        return $row->toArray();
    }
    
    public function add($data)
    {
        $this->insert($data);
    }
    
    public function updateAlbum($data)
    {
        if(!is_array($data)) throw new Exception("data no es array!");
        if(!key_exists('id', $data)) throw new Exception("field 'id' no existe en data!");
        $this->update($data, 'id='.(int)$data['id']);
    }
    
    public function deleteAlbum($id)
    {
        if(!isset($id)) throw new Exception("id no isset!");
        $this->delete('id = '.(int)$id);
    }
    
}

?>
