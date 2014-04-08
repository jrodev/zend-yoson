<?php
/**
 * Description of GmapMarker
 * @author jrodev
 */
class Application_Form_Decorators_CoinType extends Zend_Form_Decorator_Abstract
{
    protected $_format = '
        <select id="precioInm" name="precioInm" class="%s">
            <option value="1" %s>S/.</option>
            <option value="2" %s>USD.</option>
        </select>&nbsp;%s
    ';//'<input type="text" id="%s" value="" name="%s" class="%s" />'
    
    protected $_formVals = array();
    
    // Si se quita =array('precioInm'=>'1') asignado al argumento lanza error
    // con Zend_Form_Decorator_Interface inconsitencia de constructores
    public function __construct($formValues=array('precioInm'=>'1')) 
    {
        $this->_formVals = is_null($formValues)?array('precioInm'=>'1'):$formValues;
    }

    public function render($content)
    {   
        $strInp= $content;
        $ele   = $this->getElement();
        $id    = htmlentities($ele->getAttrib('id'));
        $class = htmlentities($ele->getAttrib('class'));
        $type  = htmlentities($ele->getAttrib('type'));
        $name  = htmlentities($ele->getName());

        // Si es Soles o Dolares
        $so = ($this->_formVals['precioInm']=='1')?'selected':'';
        $do = ($this->_formVals['precioInm']=='2')?'selected':'';

        $ele->getDecorator('Description')->setEscape(false);

        $markup  = sprintf($this->_format, $class, $so, $do, $strInp/*$id, $name, $class*/);
        return $markup;
    }
}