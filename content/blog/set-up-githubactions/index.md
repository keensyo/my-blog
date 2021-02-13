---
title: Github Actionsでブログをデプロイする
date: "2021-02-13"
---

このブログがGithub Pagesを利用していることは[先の記事](https://keensyo.github.io/createblog/)にも書いた。</br>
ブログを構成するソースコードはGithub Pagesを利用しているリポジトリとは別リポジトリに存在していて、ちょっと管理が面倒な状態になっている。</br>
であれば(？)、Github Actionsを利用して別リポジトリで管理するソースコードをpushしたときにkeensyo.github.ioにデプロイされるようになれば、</br>
すべてGithubで完結して少し楽になりそうだと思い、Github Actionsを導入した。</br>
裏目的として、Github Actionsを使ってみたかったというのはある…</br>

### 状況

2つのリポジトリが存在する。

1. ブログを構成するソースコード(GatsbyJS)を管理しているリポジトリ(以下、SourceRepo)
2. Github Pagesがホストされているリポジトリ(以下、PagesRepo)

### やりたいこと

* SourceRepoからPagesRepoへデプロイしたい

### 実現のために考えたこと

* SourceRepoに変更が入ったとき(pushされたとき)はブログに変更を加えたいとき
* そのため、SourceRepoへの変更を検知してPagesRepoにデプロイしたい
* 変更を検知=変更の悪影響が無いかテストを回したい(Integration Testをしたい)
* テストを回したあとにデプロイをする(Deployしたい)
* CI/CDを仕組み化すれば実現できそう→Github Actionsを使えばよさそう

### 何をやったか

まず、Github Actionsは名前しか知らなかったので以下でざっくり勉強した。</br>
[Github Actionsについて学ぶ](https://docs.github.com/ja/actions/learn-github-actions)</br>
[Githubの新機能「Github Actions」で試すCI/CD](https://knowledge.sakura.ad.jp/23478/)</br>
公式ドキュメントは網羅的でよいが、概要をつかむには後者の記事が役立った。

概要を掴んだあとは、とにかくやり方を調べた。</br>
とくにリポジトリをまたいだデプロイについては、以下の記事が大変参考になった。</br>
[Github Actionsで別のリポジトリにgit pushする](https://3nan3.github.io/post/2019122201_github_actions/)</br>
認証周りも丁寧に解説いただいていて、なるほどなるほどと読み進めていたが、Github Actionsで肝となるYAMLで詰まった。</br>
上記ブログだと、Hugoを利用しており記載いただいているYAMLを微妙に読み替える必要があったのだった。</br>
そんなときに[GatsbyのサイトをGithub ActionsでGithub Pagesにデプロイ](https://qiita.com/peaceiris/items/2f6d83802f2aefa66f9d)というドンピシャな記事を見つけ、めちゃくちゃに参考にさせてもらった。</br>
[Github](https://github.com/peaceiris/actions-gh-pages)にも丁寧なREADMEがあり、本筋じゃないけどSSHのDeploy Key作成はこのREADMEが無かったらうまくできていなかったと思う。</br>

というわけで、インターネットにお世話になり、無事Github ActionsでCI/CDできるようになった。

### どこでハマったか

##### `github_token`ではなく`deploy_key`と書かなくてはいけないこと

YAMLの話で、参考にした記事だと以下のように書かれている。

```yaml
- name: deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

今回のように、リポジトリをまたいだデプロイの際は、`external_repository`という環境変数を設定しここにデプロイしたいリポジトリ名を書く必要がある。</br>
それと同時に、`github_token`ではなく`deploy_key`と変えなくてはいけない。これも上で紹介しているREADMEに書いてあるのだが、はじめはgithub_tokenと書いて混乱していた。</br>
さらにいうと、${{ secrets.GITHUB_TOKEN }}もそのままGITHUB_TOKENと書いていたが、自分が設定している名前を使えばいいことにも最初は気づかなかった…</br>
イメージとしてはこんな感じになる。</br>

```yaml
- name: deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
   deploy_key: ${{ secrets.FOOBAR }}
   external_repository: username/username.github.io
```

#### sshの公開鍵と秘密鍵の設定を間違っていたこと

取り違えていたとかではなく、含める文字列が足りていなかった。</br>
何度git pushしても`Action failed with "The process '/usr/bin/ssh-add' failed with exit code 1"`と出てしまいビルドエラー。</br>
なんでssh-addできないのか大いに頭を悩ませていたが、以下の記事を見つけ解決した。</br>
[[fastpages]SSH issues? - SOLVED](https://forums.fast.ai/t/fastpages-ssh-issues-solved/65948)

この質問者と全く同じことをやっていて、海外に同じことをやっている人がいる〜  というのと、オープンな場所で質問してくれててBig Thanks!!!という気持ち。</br>
ssh全くわからないということが否が応でもわかってしまったので、この後sshについて勉強しました。

### おわりに

CI/CDといろんなトラブルを経験できてよかった。</br>
平日の夜にちまちまやっていたので時間はかかってしまったが、work-flowに緑のチェックマークがつくのは嬉しい。</br>
気が向いたらもうちょっと工夫してみようと思う。
