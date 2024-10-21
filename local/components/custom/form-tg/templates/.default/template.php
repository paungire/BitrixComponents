<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
\Bitrix\Main\UI\Extension::load('local.form-tg');
?>
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.13/dist/full.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.tailwindcss.com"></script>

<div id="form-tg"></div>

<script>
  const signParams = '<?= $arResult['signParams'] ?>';
  const arResult = <?= CUtil::PhpToJSObject($arResult) ?>;
  const app = new BX.Local.FormTg('#form-tg');
  app.init();
</script>