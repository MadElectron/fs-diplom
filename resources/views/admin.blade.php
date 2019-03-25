<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <title>ИдёмВКино</title>
  <link rel="stylesheet" href="{{mix('css/app.css')}}" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
</head>

<body>
  <div id="popups_auth"></div>
  <div id="popups"></div>
  <div id="popups_movies"></div>

  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    <span class="page-header__subtitle">Администраторррская</span>
  </header>
  
  <main class="conf-steps">
    <div id="app"></div>
     
  </main>


  <script src="{{mix('js/app.js')}}"></script>
  <script src="js/accordeon.js"></script>
</body>
</html>
