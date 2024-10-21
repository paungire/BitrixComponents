<? require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php'); ?>
<!DOCTYPE html>
<html lang="ru">

<head>
  <title><? $APPLICATION->ShowTitle(); ?></title>
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <? CJSCore::Init(array('jquery3')); ?>
  <? CJSCore::Init(array("fx")); ?>

  <? $APPLICATION->ShowHead(); ?>
</head>

<body>
  <? $APPLICATION->IncludeComponent('custom:form-tg', '') ?>
</body>