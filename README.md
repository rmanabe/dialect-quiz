# 方言クイズ (dialect-quiz)

47都道府県の方言クイズアプリシリーズの共通コードベース。都道府県ごとに設定ファイルと問題データを差し替えてビルドし、Apple/Google それぞれに**別アプリとして**申請する方針(ユーザー決定)。第一弾は大阪弁クイズ。

- Expo (React Native) + expo-router。iOS / Android / Web すべて同じコードで動作。
- 広告: AdMob (`react-native-google-mobile-ads`)。Web ではネイティブ広告SDKが動かないため非表示。
- 課金: RevenueCat (`react-native-purchases`)。買い切りで広告非表示 (`remove_ads` entitlement)。Web は購入不可(広告自体出ないので実質不要)。
- 多言語: UIは `ja` / `en` / `zh` / `ko`。クイズの意味(正解・選択肢)は `ja` / `en` のみ収録(下記「言語対応の範囲」参照)。

## 動作確認済み

- `npx expo start --web` でホーム→クイズ(10問ランダム、4択、正誤判定)→結果画面まで一通り動作確認済み。
- 全問正解時に専用の称号演出(紙吹雪 + 「生粋のオオサカン」)が出ることを確認済み。
- 最高記録が端末に保存され、ホーム画面に表示されることを確認済み。
- 言語切り替え(JA/EN/ZH/KO)が即時反映されることを確認済み。
- `npx tsc --noEmit` 型エラーなし。

## セットアップして動かす

```bash
cd dialect-quiz
npm install
npx expo start --web       # ブラウザで確認
npx expo start             # Expo Go / dev client で実機確認(要 expo-dev-client、後述)
```

Node のバージョンは `package.json` の `engines` で `>=20 <21 || >=22` を指定済み(このマシンでは Node 24 で動作確認)。

## ディレクトリ構成(都道府県を増やす前提の設計)

```
app/                          expo-router の画面 (index / quiz / result / _layout)
src/
  prefectures/
    types.ts                  PrefectureConfig の型定義
    osaka/
      config.js                大阪の設定(名前・Bundle ID・配色・AdMob/RevenueCat ID)
      questions.json           大阪弁100問 (word / meaning_ja / meaning_en)
    index.js                   getPrefectureConfig() … EXPO_PUBLIC_PREFECTURE で切替
  quiz/                        出題エンジン(ランダム10問・4択生成・称号判定)
  i18n/                        i18next 設定 + 翻訳ファイル
  ads/                         AdBanner (native / web で実装を分離)
  purchases/                   RevenueCat ラッパー (native / web で実装を分離)
  components/illustrations/    オリジナルのかわいいSVGイラスト(たこ焼き・大阪城など)
  state/                       クイズセッション・最高記録の保存
app.config.ts                  アクティブな都道府県の設定を読み込んで name/bundleId/plugins を生成
```

`src/prefectures/osaka/config.js` と `index.js` が **あえて `.js`** なのは、`app.config.ts` が Node で直接 `require()` する際に、ネストした `.ts` importをExpoのローダーがトランスパイルしないため(実際にこの制約にぶつかって修正した)。型は `types.ts` + `index.d.ts` で担保。

## 47都道府県への展開手順

1. `src/prefectures/<pref-id>/` を作成し、`config.js`(大阪の内容を参考に bundleId・配色・AdMob/RevenueCat IDを差し替え)と `questions.json`(その都道府県の方言100問、`word` / `meaning_ja` / `meaning_en`)を用意する。
2. `src/prefectures/index.js` の `registry` に追加する。
3. `src/quiz/questionBank.ts` の `BANKS` に追加する。
4. `EXPO_PUBLIC_PREFECTURE=<pref-id> npx expo start` で切り替えて確認。
5. アイコン/スプラッシュ画像を用意して `assets/` 配下を差し替える。
6. `npx eas init --non-interactive --force` でその都道府県専用のEASプロジェクトを作成し、出力された `projectId` を `config.js` の `easProjectId` に設定する(`app.config.ts` が `pref.easProjectId` を `extra.eas.projectId` に反映する)。
7. **重要:** `EXPO_PUBLIC_PREFECTURE` をそのEASプロジェクトの環境変数として登録する。ローカルのシェル環境変数はEAS Buildのクラウドビルドには渡らず、`src/prefectures/index.js` は未設定時に `osaka` にフォールバックするため、これをやらないと他都道府県のビルドが `EAS_BUILD_PROJECT_ID_MISMATCH` で失敗する(大阪だけデフォルト値のおかげで気づかれずに動いていた)。
   ```
   export EXPO_PUBLIC_PREFECTURE=<pref-id>
   for env in production preview development; do
     npx eas-cli env:create --name EXPO_PUBLIC_PREFECTURE --value <pref-id> --environment $env --visibility plaintext --non-interactive
   done
   ```
8. `npx eas build --profile preview --platform all --non-interactive --no-wait` でビルド確認(Android実機/iOSシミュレータ向け。ストアアカウント不要)。無料プランは月間ビルド数に上限があるので、枠を使い切っている場合は `--platform ios` や `--platform android` で片方ずつ確認する。
   - EASの無料枠を使い切っていてローカルで代替確認したい場合、`npx expo prebuild` はこのマシンではこのリポジトリの実パス(`方言`という日本語ディレクトリ名を含む)の直下では**必ず失敗する**(Node の `fs.cpSync` が非ASCIIパスへの新規書き込みで無言で失敗/クラッシュするバグのため、`MainApplication does not exist` という紛らわしいエラーになる)。ASCII名のディレクトリにミラーしてから実行すること:
     ```
     robocopy "C:\Users\r_man\claudecode\方言\dialect-quiz" "C:\Users\r_man\claudecode\dialect-quiz-ascii" /E /XD node_modules android ios .git .expo
     # PowerShell: node_modules だけジャンクションで参照(読み取り専用トラバースはジャンクションで問題ない)
     New-Item -ItemType Junction -Path "C:\Users\r_man\claudecode\dialect-quiz-ascii\node_modules" -Target "C:\Users\r_man\claudecode\方言\dialect-quiz\node_modules"
     # そのASCIIコピーの中で prebuild を実行
     cd C:\Users\r_man\claudecode\dialect-quiz-ascii
     npx expo prebuild --platform android --no-install --clean
     ```
9. Apple Developer Program / Google Play Console / AdMob / RevenueCat 側でその都道府県用の新規アプリ・広告ユニット・エンタイトルメントを作成する(アプリ登録は都道府県ごとに個別。**使用アカウントは要確認**、下記参照)。

## 言語対応の範囲

- UI文言(ボタン・見出し等)は `ja`/`en`/`zh`/`ko` の4言語に対応。
- クイズの「意味」(正解・選択肢のテキスト)は `ja`/`en` のみ収録。UI言語が `zh`/`ko` のときは意味の表示は `en` にフォールバックする(`src/i18n/index.ts` の `getQuizLocale()`)。
- 中国語・韓国語でも意味を出したい場合は `questions.json` に `meaning_zh` / `meaning_ko` を追加し、`src/quiz/types.ts` の `RawQuestion` と `engine.ts` の `meaningOf()` を拡張する(100問 × 言語数ぶんの翻訳コストがかかる点は要検討)。

## まだ手を付けていないこと(次にやること)

コードと問題データの作り込み、Web上での動作確認、大阪弁クイズ用のアプリアイコン/スプラッシュ画像、`eas.json`、EAS初回ビルド(preview: Android APK + iOSシミュレータ、ストアアカウント不要、いずれも成功)までは完了した。ストア公開までには以下が残っている。**多くはご本人の操作が必要な項目(チェックリストにも明記あり)**:

EAS/Expoアカウントは `dev@robonet-c.jp`(組織名 `rnc_dev`)に統一済み。EASプロジェクト: https://expo.dev/accounts/rnc_dev/projects/dialect-quiz-osaka

**既知のハマりどころ(47都道府県展開時も注意)**: `react-native-google-mobile-ads` は v16.1.0 以降 `play-services-ads` が25.x系に上がり、そのKotlinメタデータ(2.3.0)がExpo SDK 57にバンドルされたKotlinコンパイラ(2.1.0)と非互換でAndroidビルドが失敗する。`expo-build-properties` の `kotlinVersion` で無理に引き上げると、今度はstdlibとコンパイラのバージョンがズレて `react-native-safe-area-context` 等の別モジュールまで壊れるので非推奨。**`react-native-google-mobile-ads` を `16.0.3` に固定**(`play-services-ads 24.9.0`、Kotlin 2.1.0と互換)することで解決済み。将来アップグレードする際はこの非互換に要注意。

### すぐ着手できるもの
- [ ] `expo-dev-client` を使ったネイティブ実機確認(広告・課金はExpo Goでは動作しないため)
- [ ] ビルド済みAPK/iOSシミュレータ用アーカイブを実機/シミュレータにインストールして動作確認(ビルド一覧: https://expo.dev/accounts/rnc_dev/projects/dialect-quiz-osaka/builds )

### ご本人の作業が必要なもの(代行不可、またはアカウント本人操作が前提)
- [ ] AdMobで大阪弁クイズ用のアプリ登録・バナー広告ユニット作成 → 本番IDを `EAS の production env` に設定(現状はコード側でGoogleの公開テストIDがデフォルト値になっている)
- [ ] RevenueCatでプロジェクト作成・Entitlement(`remove_ads`)/Product(`remove_ads_lifetime`)設定、Google Play側のサービスアカウントJSON連携、Apple側のIn-App Purchase Key連携
- [ ] Apple Developer Program / Google Play Console 上での新規アプリ登録、審査提出
- [ ] プライバシーポリシー・利用規約の作成(海外ホスティング/広告SDKへの言及を含む)、可能なら弁護士レビュー
- [ ] EEA/UK/スイス向けに配信するなら Google UMP(同意管理)の実装(現状未実装)
- [ ] ストア掲載用のスクリーンショット・説明文(多言語)

これらの詳細な注意点(反映まで36時間かかる、テストIDの扱い等)は `mobile-app-launch-checklist` スキルにまとめてあるので、作業時に参照してください。
