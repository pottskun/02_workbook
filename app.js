fetch('data.json')
  .then(response => response.json())  // JSONデータをオブジェクトに変換
  .then(data => { //jsonのデータはdataに入っている

    const container = document.getElementById('js-question-list');
    // この子要素としてliを作って取得したデータを入れていく

    // ここではtrueであれば問題が表示されるxxx
    if (data && data.beginnerProblems && data.beginnerProblems.length > 0) {
    // if (data && data.intermediateProblems && data.intermediateProblems.length > 0) {
    // if (data && data.AdvancedProblems && data.AdvancedProblems.length > 0) {
    // if (data && data.AdvancedProblems && data.AdvancedProblems.length > 0) {
      // このif文はどういう意味？todo
      data.beginnerProblems.forEach(function (problem) {
        // ここはどういう意味？

        const hoge = document.createElement("li");
        // hogeを追っていくとわからなくなる、どこに追加されてるんだxxx
        hoge.classList.add('green');

        const span1 = document.createElement("span");
        span1.textContent = `問題${problem.id}`;
        span1.classList.add('txt-break');

        const span2 = document.createElement("span")
        span2.textContent = problem.question;
        span1.classList.add('txt-break');

        hoge.appendChild(span1);
        hoge.appendChild(span2);
        // hogeがわからないから上に行も曖昧xxx
        container.appendChild(hoge);
      })
    } else {
      container.innerHTML = '<p>問題が読み込めませんでした。</p>';
    }
  })
  .catch(error => {
    console.error('エラーが発生しました:', error);
  });
