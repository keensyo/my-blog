---
date: "2021-09-24"
title: nvmでインストールしたNode.jsに同梱されるnpmのバージョンを変更したい
---
と思ったのだけれど、できなかった。</br>
結局再度nvmでnode.jsをインストールしなおして解消した。
何を試したか整理しておく。</br>

## ことのはじまり

修正が入ったReactプロジェクトのローカルサーバーを起動しようとしたところ、以下と似たエラーが起きた。</br>
[Error when trying to install react-redux dependency](https://stackoverflow.com/questions/64529958/error-when-trying-to-install-react-redux-dependency)
npmのバージョンが7以降だからうまくいってないんじゃないか？ということだったので、手元のnpmのバージョンを確認してみた。</br>
すると、インストールして使っているnodeとそれに推奨されているnpmとでバージョンに差異があり、かつnpmが7系ということがわかった。</br>

```shell
xxx:/Users/xxx npm version
{
  npm: '7.24.0',
  node: '14.17.6',
  v8: '8.4.371.23-node.76',
  uv: '1.41.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.17.2',
  modules: '83',
  nghttp2: '1.42.0',
  napi: '8',
  llhttp: '2.1.3',
  openssl: '1.1.1l',
  cldr: '39.0',
  icu: '69.1',
  tz: '2021a',
  unicode: '13.0'
}
```

本来、node.jsが14.17.6に対し、npmは6.14.15が同梱される。</br>
ので、6.14.15にバージョンを下げたい。</br>

### nvmのコマンドを調べる

nvm --あでnvmのコマンドがわかるので、確認した。</br>
見たところ、installコマンドやそのオプションなど、あまり複雑なことはできないようだった。</br>
nvm versionで出力されるのは14.17.6。</br>
nvm listだと、14.16.1と14.17.1が入っていたので、あまり意味は無さそうと思いながらnvm uninstall [version]で14.17.6以外を削除。</br>

### npmのコマンドを調べる

nvmがダメならnpmはどうだろう、ということでnpm helpでコマンドを確認。</br>
こっちもinstallや状態確認などのコマンドが多く、ほしいコマンドを見つけられなかった。</br>
7系が入っているので、とりあえず6系を入れようとnpm install npm@6.14.15を実行した。</br>
ついでに7系のuninstallも実行。</br>

### nvmで再インストール

結構ググってみたが、そもそもこういった事象の人はあまりいない？ようで、</br>
npmないしnvm経由でインストールする方法を解説する記事にたどり着くだけだった。</br>
お手上げになってしまったので、nvmで再インストールを実施した。</br>

```shell
nvm use system  #いま使っている14.17.6をuninstallするため
nvm uninstall 14.17.6
nvm ls  #きちんとuninstallできているか確認
nvm install --lts
nvm use 14.17.6
```

### おわりに

本当にnpmそのものの切り替えはできないのか、知見がほしい…
