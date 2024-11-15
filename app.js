fetch('data.json')
  .then(response => response.json())  // JSONデータをオブジェクトに変換
  .then(data => {
    console.log(data);  // 取得したデータを確認

    const container = document.getElementById('question-container');

    // ここではtrueであれば問題が表示されるxxx
    if (data && data.problems && data.problems.length > 0) {
      // problemsの中身を一つずつproblemに格納していく、このfunctionについてはいまいちわからず。
      data.problems.forEach(function (problem) {
        // 親要素の子要素としてliタグを生成
        const hoge = document.createElement("li");
        // これをテンプレートリテラルを使ってやるとしたら？xxx
        // hogeにテキストを設定
        hoge.textContent = problem.question;
        // 親要素の子要素としてhogeを追加
        container.appendChild(hoge);
      })
    } else {
      container.innerHTML = '<p>問題が読み込めませんでした。</p>';
    }
  })
  .catch(error => {
    console.error('エラーが発生しました:', error);
  });

// テンプレートリテラルを使う場合、innerHTML にはセキュリティ上の注意点（XSS攻撃）があるので、注意が必要。

