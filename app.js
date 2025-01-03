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
      data.beginnerProblems.forEach(function (problem) {
      // data.beginnerProblems.forEach(function (answer) {
        // ここはどういう意味？

        const hoge = document.createElement("li");
        const question = document.createElement("div");
        const questionWrapper = document.createElement("div");
        const questionHoge = document.createElement("div");
        const answer = document.createElement("div");
        hoge.classList.add('question-item');
        question.classList.add('question-container');
        questionWrapper.classList.add('question-wrapper');
        questionHoge.classList.add('question-wrapper2');
        answer.classList.add('question-answer');

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
        // ここで問題の番号を表示
        span1.classList.add('txt-break', 'space');

        const span2 = document.createElement("span")
        span2.textContent = problem.question;
        // ここで問題文を表示
        span2.classList.add('txt-break', 'question');

        const span3 = document.createElement("span");
        span3.textContent = `答え`;
        // ここで答え、と表示
        span3.classList.add('txt-break', 'space');

        const span4 = document.createElement("span")
        span4.textContent = problem.answer;
        // ここで答えを表示
        span4.classList.add('txt-break', 'question');

        questionHoge.appendChild(span2);
        questionWrapper.appendChild(span1);
        questionWrapper.appendChild(bkmBtn);
        question.appendChild(questionWrapper);
        question.appendChild(questionHoge);
        hoge.appendChild(question);
        hoge.appendChild(answer);
        answer.appendChild(span3);
        answer.appendChild(span4);
        container.appendChild(hoge);

        // クリックイベントで色を変更
        bkmIcon.addEventListener('click', function () {
          if (bkmIcon.classList.contains('far')) {
            bkmIcon.classList.remove('far');
            bkmIcon.classList.add('fa', 'bkmIcon__fill');
          } else {
            bkmIcon.classList.remove('fa', 'bkmIcon__fill');
            bkmIcon.classList.add('far');
          }
        });

      })
    } else {
      container.innerHTML = '<p>問題が読み込めませんでした。</p>';
    }
  })
  .catch(error => {
    console.error('エラーが発生しました:', error);
  });
