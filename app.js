fetch('data.json')
  .then(response => response.json())  // JSONデータをオブジェクトに変換
  .then(data => { //jsonのデータはdataに入っている
    const container = document.getElementById('js-question-list');
    if (data && data.beginnerProblems && data.beginnerProblems.length > 0) {
      //data（JSONから取得したオブジェクト）が存在するか、data.beginnerProblemsが存在していて、さらにその配列が空でないことを確認、この条件が満たされると、実際に問題をリストとして表示する処理が走る
      // if (data && data.intermediateProblems && data.intermediateProblems.length > 0) {
      // if (data && data.AdvancedProblems && data.AdvancedProblems.length > 0) {
      // if (data && data.AdvancedProblems && data.AdvancedProblems.length > 0) {
      let bookmarkedStates = JSON.parse(localStorage.getItem("bookmarkedStates")) || {};
      // ローカルストレージに"bookmarkedStates"があればそれをオブジェクト形式で取得、なければ空のオブジェクト {} を代入
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
        // pタグとかでなくiタグ？？？xx
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
        bkmBtn.addEventListener('click', function () {
          let bookmarkedStates = JSON.parse(localStorage.getItem("bookmarkedStates")) || {};
          // bkmbtnをクリックしたときにそのidをローカルストレージに保存する
          if (bkmIcon.classList.contains('fa')) {
            bookmarkedStates[problem.id] = true;
            // クリックされた問題のidをキーとして、bookmarkedStatesのオブジェクト(ローカルストレージ)にtrueを設定する？保存する？
          } else {
            // bookmarkedStates に何かデータが存在していれば true になり、中の処理が実行される？
            delete bookmarkedStates[problem.id];
          }
          localStorage.setItem('bookmarkedStates', JSON.stringify(bookmarkedStates));
          // json形式の文字列に変えて更新されたデータを保存
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


  // 「既存のデータを取得してから操作する処理」を追加する
  // 最初にローカルストレージから既存のデータを取得する
  // 今回クリックしたデータを既存のデータと結合する（追加 or 削除）
  // その結果を改めてローカルストレージに保存する