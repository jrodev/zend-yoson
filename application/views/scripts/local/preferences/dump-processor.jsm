<?php

class Application_Model_Cupon
{

    static protected $_nItems = -1;

    function getAll($page = 1, $ord = '', $typeOrd = 'ASC', $filters = array())
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from(array('c' => 'ps_coupon'), array('id' => 'id_coupon', 'codigo' => 'code', 'desde' => 'date_from', 'hasta' => 'date_to', 'cantidad' => 'quantity',
            'usado' => 'used_quantity', 'valor' => 'value', 'tipo' => 'type', 'estado' => "IF(date_from <= now() AND date_to >= now(), 1, 0)", 'descripcion' => 'description')
        );

        $configColumns = array(
            'id' => array('columnName' => 'ID', 'filterType' => ZExtraLib_Paginator_DGrid::FILTER_EQUAL_VALUE, 'dbColumn' => 'c.id_coupon', 'columnClass' => 't-id fix arrow-desc', 'allowSort' => true, 'inputFilterTags' => array('placeHolder' => 'Buscar por Id')),
            'codigo' => array('columnName' => 'Código', 'filterType' => ZExtraLib_Paginator_DGrid::FILTER_ALL_PART, 'dbColumn' => 'c.code', 'columnClass' => 't-id fix', 'inputFilterTags' => array('placeHolder' => 'Buscar por código')),
            'descripcion' => array('columnName' => 'Descripcion', 'filterType' => ZExtraLib_Paginator_DGrid::FILTER_ALL_PART, 'dbColumn' => "c.description", 'columnClass' => 'tw276', 'inputFilterTags' => array('placeHolder' => 'Buscar por descripcion')),
            'tipo' => array('columnName' => 'Tipo Descuento', 'filterType' => ZExtraLib_Paginator_DGrid::FILTER_EQUAL_VALUE, 'dbColumn' => 'c.type', 'dataFilter' => array(' ' => 'Seleccione', 1 => 'Descuento en %', 2 => 'Descuento Monto'), 'columnClass' => 'tw276'),
            'valor' => array('columnName' => 'Valor', 'filterType' => ZExtraLib_Paginator_DGrid::NO_FILTER, 'dbColumn' => "c.value", 'orderColumn' => 'o.total_paid', 'columnClass' => 't-mont', 'inputFilterClass' => 'numeric', 'inputFilterTags' => array('placeHolder' => array('Min.', 'Max.'))),
            'cantidad' => array('columnName' => 'Cantidad', 'filterType' => ZExtraLib_Paginator_DGrid::NO_FILTER, 'dbColumn' => "c.quantity", 'orderColumn' => 'o.total_paid', 'columnClass' => 't-mont', 'inputFilterClass' => 'numeric', 'inputFilterTags' => array('placeHolder' => array('Min.', 'Max.'))),
            'hasta' => array('columnName' => 'Hasta', 'filterType' => ZExtraLib_Paginator_DGrid::FILTER_RANGE_DATE, 'dbColumn' => 'c.date_to', 'columnClass' => 't-rdate', 'allowSort' => true, 'inpu