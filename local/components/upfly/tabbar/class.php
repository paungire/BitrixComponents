<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/**
 * Bitrix vars
 *
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponent $this
 * @global CMain $APPLICATION
 * @global CUser $USER
 */

use \Bitrix\Main\ErrorCollection;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Engine\Contract\Controllerable;
use CBitrixComponent;

\Bitrix\Main\Loader::includeModule('iblock');
\Bitrix\Main\Loader::includeModule('main');

class TabBar extends CBitrixComponent implements Controllerable
{
  public $arParams;
  public $arResult;

  protected ErrorCollection $errorCollection;

  public function onPrepareComponentParams($arParams)
  {
    $this->errorCollection = new ErrorCollection();
    return $arParams;
  }

  public function getErrors(): array
  {
    return $this->errorCollection->toArray();
  }

  public function getErrorByCode($code)
  {
    return $this->errorCollection->getErrorByCode($code);
  }

  public function executeComponent()
  {
    global $APPLICATION;

    $menu = new CMenu($this->arParams['ROOT_MENU_TYPE']);
    $menu->Init($APPLICATION->GetCurDir());
    var_dump($APPLICATION->GetCurDir());
    $menuItems = $menu->arMenu;
    foreach ($menuItems as $key => $elem) {
      $this->arResult[] = [
        'TEXT' => $elem[0],
        'LINK' => $elem[1],
        'ICON' => $elem[3]['ICON'],
        'SELECTED' => $elem[1] == $APPLICATION->GetCurDir()
      ];
    }
    $this->IncludeComponentTemplate();
  }

  public function configureActions(): array
  {
    return [
      'send' => [
        'prefilters' => []
      ],
    ];
  }

  public function sendAction(): array
  {
    try {
      return [];
    } catch (Exceptions\EmptyEmail $e) {
      $this->errorCollection[] = new Error($e->getMessage());
      return [
        "result" => "Произошла ошибка",
      ];
    }
  }
}
