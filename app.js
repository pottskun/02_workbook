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
        const wrapper = document.createElement("div");
        hoge.classList.add('question-item');
        wrapper.classList.add('question-container');

        // ブックマーク用のボタンを生成
        const bkmBtn = document.createElement("button");
        bkmBtn.classList.add('bkm-btn');
        // bkmBtn.setAttribute('aria-label', 'Bookmark this question');xxx

        // アイコンを生成
        const bkmIcon = document.createElement("i");
        bkmIcon.classList.add('bkm-icon', 'far', 'fa-thin', 'fa-bookmark', 'fa-xl');
        // bkmIcon.setAttribute('aria-hidden', 'true');xxx
        bkmBtn.appendChild(bkmIcon);

        const span1 = document.createElement("span");
        span1.textContent = `問題${problem.id}`;
        span1.classList.add('txt-break', 'space');

        const span2 = document.createElement("span")
        span2.textContent = problem.question;
        span2.classList.add('txt-break', 'question');

        hoge.appendChild(wrapper);
        wrapper.appendChild(span1);
        wrapper.appendChild(bkmBtn);
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
