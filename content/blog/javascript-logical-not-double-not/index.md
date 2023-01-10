---
title: JavaScriptの論理否定（!）と二重否定（!!）
date: "2022-09-04"
---

プロジェクトのコードで、以下のような表現を見かけた。</br>
なお、記事タイトルはJavaScriptと書いたが、実際に見かけたのはTypeSctiptだったためサンプルコードはTypeScriptで書く。</br>

```typescript
get fooStatus(): boolean {
  return bar.state === GOOD && !!baz.result?.id
}
```

普通のgetterだが、&&の後ろに!!（エクスクラメーションマーク/はてなマーク）が2つ並んでいる。</br>
どうやらbazのプロパティにアクセスするとき、undefinedが返ってくる可能性があるよとTypeScriptの静的解析チェックに引っかかり、その回避として!!を付けているようだった。</br>
ここまでで、baz.result?.idはこの文脈においては必ず値が返ってくること、!!は値が返ってくることを保証する機能があることがわかった（推測できた）。</br>

これでおしまいにしてしまうのはモヤモヤが残るので、公式に、あるいは確かな情報筋に解説を求めた。</br>
調べたところ、機能としてはJavaScriptにおける論理否定（Logical NOT）の一部で、二重否定（Double NOT）と呼ばれるものであった。</br>
確かな情報筋としては[JavaScript Primer](https://jsprimer.net/basic/operator/#not-operator)と[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_NOT)に言及があった。</br>
使いどころとしては、NOT演算子（!）が真偽値を必ず返すことを利用しこれを重ねて使うことで対象のオブジェクトを真偽値に変換してしまうというもの。</br>
やや強引な使い方のように聞こえるが、型変換としてはシンプルに書けるので使っている人は多そうである。</br>

余談だが、今回の調査は結構骨が折れた。</br>
というのも、!!をそれっぽくググってもなかなか検索結果に出てこない。</br>
特に「TypeScript !!」みたいに適当にググったところで、せいぜい非nullアサーション演算子（Non-null assertion operator）の話が引っかかる程度で全く核心に近づかない。</br>
見た目だけで言えば、Null合体演算子（Nullish coalescing operator）っぽいため、ひょっとしてこれの仲間なのか…？などという不毛な時間を過ごした。</br>
半ば諦めムードのところで、やけくそ気味に「JavaScript !! 2つ」のように検索したところ、いろんな方が二重否定であるという内容のブログを書いていてくれており、ようやく解消の道が開けた。</br>
素朴な検索の仕方を念頭に置いてくれた記事達だったのか、とにかく大変助けられた。</br>
もっと冷静に考えて、!で論理否定なのだからこの論理否定が書かれたMDNの記事などをきちんと追っていくことをすればよかった。</br>
ざっと見ていると見落としてしまう表記だなとは思いつつも、書かれている記事がある以上は探しようがあったなと少し反省した。</br>