---
title: プロジェクトに追加したファイルを認識させる（Visual Studio）
date: "2021-06-04"
---

仕事でC#を使っているので、同時にVisual Studioも利用している。</br>
Visual Studio、慣れてきたのであまり気にならなくなってきたが、けっこう戸惑いながら使ってきた。</br>
まだ手に馴染んでいないので、修行が足りないなという感じ。</br>
修行不足のためにごくごく初歩的だが、知らなくて30分ぐらい時間を使ってしまったことがあったのでまとめておく。</br>

### Visual Studioのプロジェクトにファイルを追加したいとき

テストデータをcsvで用意し、それを読み込ませてテストしようと思ったときにハマった。</br>
つくったcsvを所定のフォルダ配下に移動させ、Visual Studioでそのフォルダを見るとcsvが見当たらない。</br>
Visual Studio Codeでそのフォルダを開くと、たしかにcsvは存在している。</br>
また、Visual Studio上でそのフォルダを右クリックし、エクスプローラーで開くを選択してもcsvは存在している。</br>
いろいろググってみると、[このサイト](https://social.msdn.microsoft.com/Forums/aspnet/ja-JP/76552b96-5018-422f-8f75-31d4c51b26ce/visual-studio?forum=vsgeneralja)が見つかり試したところうまくいった。</br>
インターネットありがとう。</br>

書いてあることそのままだが、以下で解決。</br>
ソリューションエクスプローラー上で「全てのファイルを表示」をクリック。</br>
表示されたファイルを右クリックし、「プロジェクトに含める」をクリック。</br>

### 余談

ちなみに、これはWindowsの話で、Visual Studio for Macだとそもそもプロジェクトに含まれないなんてことが起きないかも。</br>
手元で適当なソリューションにフォルダをつくり、Finder上でドラッグ&ドロップでファイルを追加してみたが、プロジェクトにきちんと含まれていた。</br>
軽くググっても、それらしいページがヒットしないのでWindows特有なのかもしれない。</br>
