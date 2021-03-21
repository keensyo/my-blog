---
title: ブログへの変更点
date: "2021-03-21"
---

細々とブログに手を入れているのでその内容について。

#### faviconを変更した

GatsbyJSのfaviconのままだったので変更した。</br>
[Favicon.io](https://favicon.io/favicon-generator/)を利用。</br>
使い勝手が良く、かなり簡単に作れたので感謝&満足。

#### フォントを変更した

githubThemeというフォントテーマを使っている。</br>
[公式](https://www.gatsbyjs.com/docs/using-typography-js/)や[この記事](https://blog.ue-y.me/gatsby-typography/)、あと[こっちの記事](https://nekumiyama.github.io/amaNekublog/20200906_typography/)も参考にさせてもらった。</br>
流れはオーソドックスで、`gatsby-plugin-typography`をnpm installし、フォントの情報を書いておくtypography.jsをつくり対応した。</br>
ただ、これだけだとうまく反映されずstyle.cssというブログデザイン全体を管理するCSSのフォントに関わる部分をコメントアウト(もしくは削除)する必要があった。</br>
ついでに、文字サイズの変更や太さも修正した。

#### 全体的にシンプルにした

gatsby-starter-blogは、デフォルトだとブログタイトルの下に著者の説明が表示されており必要なかったため削除した。</br>
同様に、フッターの記載も削除した。あとでフッターはいい感じにする予定。

#### 今後に向けて

Aboutページをきちんと作る。</br>
フッターも整備する。
