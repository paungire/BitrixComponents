<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>

<? if (!empty($arResult)): ?>
  <div class="tab-bar">
    <? foreach ($arResult as $arItem): ?>
      <a href="<?= $arItem["LINK"] ?>" class="tab <?= $arItem["SELECTED"] ? 'current' : '' ?>">
        <?= html_entity_decode($arItem['ICON']) ?>
        <?= $arItem["TEXT"] ?>
      </a>
    <? endforeach ?>
  </div>
<? endif ?>