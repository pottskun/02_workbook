fetch('data.json')
  .then(response => response.json())  // JSONデータをオブジェクトに変換
  .then(data => { //jsonのデータはdataに入っている

    const container = document.getElementById('js-question-list');
    // HTMLにある'js-question-list'というIDの要素をcontainerという変数に格納する
    // 最終的にはcontainerの中に子要素としてhogeが追加されるようになっている
    // hogeには生成したliが入っている、クラスも追加している(question-item)

    // ここではtrueであれば問題が表示されるxxx
    if (data && data.beginnerProblems && data.beginnerProblems.length > 0) {
      // if (data && data.intermediateProblems && data.intermediateProblems.length > 0) {
      // if (data && data.AdvancedProblems && data.AdvancedProblems.length > 0) {
      // if (data && data.AdvancedProblems && data.AdvancedProblems.length > 0) {
      // このif文はどういう意味？todo
      const bookmarkedStates = {};
      data.beginnerProblems.forEach(function (problem) {
        const questionItem = document.createElement("li");
        const question = document.createElement("div");
        const questionHeader = document.createElement("div");
        const questionMain = document.createElement("div");
        const answer = document.createElement("div");
        questionItem.classList.add('question-item');
        question.classList.add('question');
        questionHeader.classList.add('question-header');
        questionMain.classList.add('question-main');
        answer.classList.add('answer');

        // ブックマーク用のボタンを生成
        const bkmBtn = document.createElement("button");
        bkmBtn.classList.add('bkm-btn');
        // bkmBtn.setAttribute('aria-label', 'Bookmark this question');xxx

        // アイコンを生成
        const bkmIcon = document.createElement("i");
        bkmIcon.classList.add('bkm-icon', 'far', 'fa-thin', 'fa-bookmark', 'fa-xl');
        // bkmIcon.setAttribute('aria-hidden', 'true');xxx
        bkmBtn.appendChild(bkmIcon);

        const questionNum = document.createElement("span");
        questionNum.textContent = `問題${problem.id}`;
        // ここで問題の番号を表示
        questionNum.classList.add('question-num');

        const questionText = document.createElement("span")
        questionText.textContent = problem.question;
        // ここで問題文を表示
        questionText.classList.add('question-text');

        const answerHeader = document.createElement("button");
        answerHeader.textContent = `答え`;
        // ここで答え、と表示
        answerHeader.classList.add('answer-header', 'theme-yellow');

        const answerMain = document.createElement("span")
        answerMain.textContent = problem.answer;
        answerMain.classList.add('answer-main');
        answerHeader.addEventListener('click', function () {
          if (answerMain.classList.contains('open')) {
            answerMain.classList.remove('open')
          } else {
            answerMain.classList.add('open');
          }
        });

        questionMain.appendChild(questionText);
        questionHeader.appendChild(questionNum);
        questionHeader.appendChild(bkmBtn);
        question.appendChild(questionHeader);
        question.appendChild(questionMain);
        questionItem.appendChild(question);
        questionItem.appendChild(answer);
        answer.appendChild(answerHeader);
        answer.appendChild(answerMain);
        container.appendChild(questionItem);

        // クリックイベントで色を変更
        bkmIcon.addEventListener('click', function () {
          if (bkmIcon.classList.contains('far')) {
            bkmIcon.classList.remove('far');
            bkmIcon.classList.add('fa');
          } else {
            bkmIcon.classList.remove('fa');
            bkmIcon.classList.add('far');
          }
        });
        // bkmbtnをクリックしたときにそのidをローカルストレージに保存する
        bkmBtn.addEventListener('click', function () {
          let bookmarkedStates = JSON.parse(localStorage.getItem("bookmarkedStates")) || {};
          bookmarkedStates[problem.id] = true;
          localStorage.setItem("bookmarkedStates", JSON.stringify(bookmarkedStates));
        });
      })
      localStorage.setItem("questionID", JSON.stringify(data.beginnerProblems));
      // problem.idの値を文字列に変換、"questionID"というキーでローカルストレージに保存する
    } else {
      container.innerHTML = '<p>問題が読み込めませんでした。</p>';
    }
  })
  .catch(error => {
    console.error('エラーが発生しました:', error);
  });


// 1.クリックされた問題の id を取得する。
// 2.bookmarkedStates オブジェクトで、問題の id に対応するブクマ状態を取得する。
// 3.ブクマ状態を反転させる（true なら false、false なら true にする）。
// 4.bookmarkedStates オブジェクトのブクマ状態を更新する。
// 5.localStorage にブクマ情報を保存する。
// 6.ブクマボタンの表示を更新する。