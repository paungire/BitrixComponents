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

class FormTg extends CBitrixComponent implements Controllerable
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
    $this->includeComponentTemplate();
  }
  public function configureActions(): array
  {
    return [
      'sendApiKey' => [
        'prefilters' => []
      ],
      'getUserId' => [
        'prefilters' => []
      ],
      'otpConfirm' => [
        'prefilters' => []
      ],
      'getBotData' => [
        'prefilters' => []
      ],
      'confirm' => [
        'prefilters' => []
      ],
    ];
  }

  private static function getLinkTg($api_key, $method): string
  {
    return 'https://api.telegram.org/bot' . $api_key . '/' . $method;
  }

  public function sendApiKeyAction($api_key): array
  {
    try {
      $ch = curl_init(self::getLinkTg($api_key, 'getMe'));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $response = curl_exec($ch);
      curl_close($ch);
      return [
        "response" => json_decode($response),
      ];
    } catch (Exceptions\EmptyEmail $e) {
      $this->errorCollection[] = new Error($e->getMessage());
      return [
        "result" => "Произошла ошибка",
      ];
    }
  }

  public function getUserIdAction($api_key)
  {
    try {
      $ch = curl_init(self::getLinkTg($api_key, 'getUpdates'));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $data = ['limit' => 100];
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
      $response = curl_exec($ch);
      curl_close($ch);

      $response = json_decode($response);
      $user_id = end($response->result)->message->from->id;

      if ($user_id) {
        $ch = curl_init(self::getLinkTg($api_key, 'sendMessage'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $code = rand(100000, 999999);

        $_SESSION['otp_code'] = $code;
        $_SESSION['tg_user_id'] = $user_id;
        $_SESSION['tg_api_key'] = $api_key;

        $data = ['chat_id' => $user_id, 'text' => $code];
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $response = curl_exec($ch);
        curl_close($ch);
        $_SESSION['tg_data_user'] = json_decode($response)->result;

        $res = [
          "res" => 'true'
        ];
      } else {
        $this->errorCollection[] = new Error('Не удалось получить id пользователя');
        $res = [
          "errors" => $this->errorCollection
        ];
      }
      return $res;
    } catch (Exceptions\EmptyEmail $e) {
      $this->errorCollection[] = new Error($e->getMessage());
      return [
        "result" => "Произошла ошибка",
      ];
    }
  }

  public function otpConfirmAction($code)
  {
    if ($_SESSION['otp_code'] == $code) {
      return true;
    } else {
      return false;
    }
  }

  public function getBotDataAction()
  {
    $user_id = $_SESSION['tg_user_id'];
    $api_key = $_SESSION['tg_api_key'];
    $ch = curl_init(self::getLinkTg($api_key, 'getUserProfilePhotos'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = ['user_id' => $user_id];
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $response = curl_exec($ch);
    curl_close($ch);
    $file_id = json_decode($response)->result->photos[0][0]->file_id;
    $ch = curl_init(self::getLinkTg($api_key, 'getFile'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = ['file_id' => $file_id];
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $response = curl_exec($ch);
    curl_close($ch);
    $file_path = json_decode($response)->result->file_path;
    $file_link = 'https://api.telegram.org/file/bot' . $api_key . '/' . $file_path;
    $ch = curl_init($file_link);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 120);
    $file = curl_exec($ch);
    file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/upload/tmp/' . basename($file_link), $file);
    curl_close($ch);

    $_SESSION['tg_data_user']->photo = '/upload/tmp/' . basename($file_link);

    return $_SESSION['tg_data_user'];
  }

  public function confirmAction()
  {
    try {
      return true;
    } catch (Exceptions\EmptyEmail $e) {
      return false;
    }
  }
}
