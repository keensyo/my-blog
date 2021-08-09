---
title: DBeaverでRailsのローカルDBを接続する
date: "2021-08-09"
---

## はじめに

友人のRailsプロジェクトに参加させてもらえることになり、あれこれキャッチアップしているのだが、DBの状況がよくわからないという課題が出てきた。</br>
ActiveRecordなので、ターミナルでrails cすれば一発でテーブルを参照できる。</br>
が、永遠のRails初心者であること、仕事ではSQLクライアントでデータを確認しているため、慣れているやり方を使いたいなと思いよさげなSQLクライアントを探した。</br>
少し探すと、Macであれば[DBeaver](https://dbeaver.io/)の評判が良さそうだったので試してみた。</br>

## 手順

[DBeaver](https://dbeaver.io/)にアクセスし、Downloadをクリックする。</br>
個人で利用する範囲であれば、Community Editionで十分だと思う。Mac OS X(dmg)をクリックする。</br>
BrewやMacPorts経由でのインストールも紹介されているが、個人的にGUIをこれらで管理することに違和感があったため、dmgファイルにした。</br>
ダウンロードが始まるので完了するまで待つ。</br>
自動で新しい接続の設定画面が開くので、設定したいDBを選ぶ。</br>
![img](../../assets/img/db_selected.jpg)
今回はPostgreSQLだったので、アイコンをクリックする。</br>
接続設定画面が開くので、以下のように設定した。</br>

---

Host: localhost</br>
Database: Railsプロジェクトのconfig/database.yml内で定義されているdevelopmentのdatabaseを設定</br>
ユーザー名：PCのローカル環境に直接Railsプロジェクトをクローンしているため、PCのユーザー名を設定</br>
パスワード：未設定

---

![img](../../assets/img/db_connection_settings.jpg)

接続が成功すると、左側にテーブルなどが表示されるカラムなどが用意されている操作画面に切り替わる。</br>
![img](../../assets/img/db_connection_succeed.jpg)
画面左上の[SQL]ボタンをクリックすると、SQLエディタが開くのでクエリを書きまくる。</br>

## 所感

簡単なクエリを投げただけだが、いつも使っているSQLクライアントとの操作感に大きな差はなく快適。</br>
これでCLIで頑張ることとdbフォルダ配下を覗きにいく必要がなくなり、キャッチアップが捗りそう。</br>

## 参考

[how to connect a postgresql with dbeaver (21.0.0)?](https://stackoverflow.com/questions/66515630/how-to-connect-a-postgresql-with-dbeaver-21-0-0)
