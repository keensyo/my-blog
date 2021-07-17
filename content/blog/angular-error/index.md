---
title: ng newするとkarma-jasmine-html-reporterのインストールに失敗する
date: "2021-07-17"
---

[Angular After Tutorial](https://zenn.dev/lacolaco/books/angular-after-tutorial)を始めようと思い、ng new したらエラーになった。</br>

```shell
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: users@0.0.0
npm ERR! Found: jasmine-core@3.7.1
npm ERR! node_modules/jasmine-core
npm ERR!   dev jasmine-core@"~3.7.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer jasmine-core@">=3.8" from karma-jasmine-html-reporter@1.7.0
npm ERR! node_modules/karma-jasmine-html-reporter
npm ERR!   dev karma-jasmine-html-reporter@"^1.5.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See /Users/kensyosakurai/.npm/eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/kensyosakurai/.npm/_logs/2021-07-16T00_33_06_402Z-debug.log
✖ Package install failed, see above.
The Schematic workflow failed. See above.
```

jasmine-core、karma-jasmine-html-reporter辺りの依存関係が解決できないようだ。</br>
解消するために何をしたかメモ。</br>

### 結論

nodeのバージョンを14.16.1に落として再実行。

### やったこと

とりあえずググると試行錯誤された以下の記事が見つかった。</br>
[Angular@cliでng newするとエラーになる](https://zenn.dev/hashito/articles/17239288bb63c5)</br>
かなり細かく書いてもらっており、参考にさせてもらった。</br>
自分の環境と照らし合わせて怪しそうな箇所だった[node.js環境が2つはいっていて干渉しているので、片方を削除する](https://zenn.dev/hashito/articles/17239288bb63c5#node.js%E7%92%B0%E5%A2%83%E3%81%8C2%E3%81%A4%E3%81%AF%E3%81%84%E3%81%A3%E3%81%A6%E3%81%84%E3%81%A6%E5%B9%B2%E6%B8%89%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE%E3%81%A7%E3%80%81%E7%89%87%E6%96%B9%E3%82%92%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B)をまずは試した。</br>
記事とは違い、自分の場合はnvmを残した。</br>
深い意味はなく、nvmを使ってnodeを管理しようとつい先日触っていたのでnodebrewはいらないなという背景。</br>
[Nodebrew本体を削除する方法](https://qiita.com/tonkotsuboy_com/items/f5d17f0b9698554a7716)を参考に、PATHも削除。なぜか、~/.zprofileのほうに定義していた…</br>

当然これだけではうまくいかなかったので、zennのほうで書かれていたnodeのバージョンを14.16.1に変更することを試した。</br>

```shell
nvm install 14.16.1
```

実行後はこんな感じ。</br>

```shell
nvm list
->     v14.16.1
       v14.17.1
         system
```

この状態でng newすると成功した。</br>

### なぜうまくいかなかったのか

zennで言及されていた[stackoverflow](https://stackoverflow.com/questions/67433893/unable-to-resolve-dependency-tree-error-for-creating-new-angular-project/67451478#67451478)にはnpm7系でnodeが最新だとうまくいかないissueがあるよ、ということが書かれていたので探してみた。</br>
すると、closedにはなっているものの[同じこと](https://github.com/angular/angular-cli/issues/21326)を挙げている人がいた。</br>
angular teamの人のコメントによると、karma-jasmine-html-reporterのリリースが起因していて、jasmine-coreのバージョン3.7をサポートしていないことが原因らしい。</br>
npm7系だとpeer dependencyの挙動が変わってしまっていると。</br>
だからnodeを14系にすると、npmも6系になるから解消するということと理解した。</br>
issueにワークアラウンドが書いてあるので、node変えなくてもよかったかも。</br>
でも、もともと14.17.1を入れていたから問題なさそうなのに…ちょっと謎が残る。</br>
