<?php
/**
 * Description of Test
 * @author jrodev
 */
class Application_Model_Agentes_Inmueble extends Zend_Db_Table 
{

    protected $_name = 'inmueble';
    
    public function get($id)
    {
        if(!isset($id)) throw new Exception("id no isset!");
        $row = $this->fetchRow('id='.(int)$id);
        if (!$row) throw new Exception("No se encontro row para id=$id");
        return $row->toArray();
    }
    
    public function add($data)
    {
        return (int)$this->insert($data);
    }
    
    public function upd($data)
    {
        if(!is_array($data)) throw new Exception("data no es array!");
        if(!key_exists('id', $data)) throw new Exception("field 'id' no existe en data!");
        $this->update($data, 'id='.(int)$data['id']);
    }
    
    public function del($id)
    {
        if(!isset($id)) throw new Exception("id no isset!");
        $this->delete('id = '.(int)$id);
    }
    
    public function getAll()
    {
        $db = $this->getDefaultAdapter();
        $sel = $db->select();
        $sel->from(array('i'=>$this->_name))
            ->join(array('p' =>'pais'), 'i.pais=p.id' , array('nomPais'=>'nombre'))//p.nombre
            ->join(array('dp'=>'dpto'), 'i.dpto=dp.id', array('nomDpto'=>'nombre'))//dp.nombre
            ->join(array('pr'=>'prov'), 'i.prov=pr.id', array('nomProv'=>'nombre'))//pr.nombre
            ->join(array('di'=>'dist'), 'i.dist=di.id', array('nomDist'=>'nombre'))//di.nombre
            ->where('i.activo=1')->order('fechareg DESC')->limitPage(1, 20)
        ;
        return $db->fetchAll($sel); //echo $sel;
    }
    
}

?>
