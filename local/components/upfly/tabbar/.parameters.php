<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$site = ($_REQUEST["site"] <> '' ? $_REQUEST["site"] : ($_REQUEST["src_site"] <> '' ? $_REQUEST["src_site"] : false));
$arMenu = GetMenuTypes($site);

$arComponentParameters = array(
	"PARAMETERS" => array(
		"ROOT_MENU_TYPE" => array(
			"NAME" => GetMessage("MAIN_MENU_TYPE_NAME"),
			"TYPE" => "LIST",
			"DEFAULT" => 'left',
			"VALUES" => $arMenu,
			"ADDITIONAL_VALUES"	=> "Y",
			"DEFAULT" => 'left',
			"PARENT" => "BASE",
			"COLS" => 45
		),
	)
);
