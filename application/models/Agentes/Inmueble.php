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
        flog('upd->data:',$data);
        if(!is_array($data)) throw new Exception("data no es array!");
        if(!key_exists('id', $data)) throw new Exception("field 'id' no existe en data!");
        else { $id=$data['id']; unset($data['id']); }
        $affec = $this->update($data, 'id='.(int)$id);
        flog('rows affecs:',$affec);
        return $affec;
    }
    
    public function del($id)
    {
        if(!isset($id)) throw new Exception("id no isset!");
        $this->delete('id = '.(int)$id);
    }
    
    public function getById($id=0, $cols='*')
    {
        if($id===0) throw new Exception("id no isset!");
        $db = $this->getDefaultAdapter();
        $sel = $db->select();
        $sel->from($this->_name, $cols)->where("id=$id");
        return $db->fetchRow($sel); //fetchAll($sel);
    }
    
    

    public function getAll($page=1, $cant=20, $ord='DESC', $cols='*', $whr=FALSE)
    {
        $db = $this->getDefaultAdapter();
        $sel = $db->select();
        $sel->from(array('i'=>$this->_name), $cols)
            ->join(array('p' =>'pais'), 'i.pais=p.id'  , array('nomPais'=>'nombre'))//p.nombre
            ->join(array('dp'=>'dpto'), 'i.dpto=dp.id' , array('nomDpto'=>'nombre'))//dp.nombre
            ->join(array('pr'=>'prov'), 'i.prov=pr.id' , array('nomProv'=>'nombre'))//pr.nombre
            ->join(array('di'=>'dist'), 'i.dist=di.id' , array('nomDist'=>'nombre'))//di.nombre
            ->where('i.activo=1')
        ;
        if($whr) $sel->where($whr[0],$whr[1]);
        $sel->order("i.fechareg $ord")->limitPage($page, $cant);
        //echo $sel; exit;
        return $db->fetchAll($sel);
    }
    
    public function getCountRows($table=false)
    {
        if(!$table) return 0;
        $db = $this->getDefaultAdapter();
        return $db->fetchOne('SELECT COUNT(*) AS count FROM '.$table);
    }
    
}

?>
