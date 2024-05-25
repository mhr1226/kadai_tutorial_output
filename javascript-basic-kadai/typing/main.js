// --オブジェクトで変数を格納したタイプ---


// 変数格納オブジェクト
const gameData ={

  // ↓↓↓↓↓↓↓↓↓文字列を入れるspan要素を取得するための変数↓↓↓↓↓↓↓↓↓↓↓
  // ↓↓↓↓↓↓↓↓↓変数であるのは後から再代入できるようにするため↓↓↓↓↓↓↓

  // ------------------------------------
   // テキストの表示をする為の変数
  untyped:'',
  // 入力済のテキストを表示する変数
  typed:'',

  // ↑↑↑↑↑↑↑-------------------↑↑↑↑↑↑↑↑↑↑

  // ↓↓↓↓↓↓↓↓タイプする文字列を表示するためのフィールド↓↓↓↓↓↓↓↓↓

  // -------------------------------------------

  // 未入力のテキストフィールド
  untypedField:document.getElementById('untyped'),

  // 入力済のテキストフィールド
  typedField:document.getElementById('typed'),

  //↑↑↑↑↑↑↑----------------------↑↑↑↑↑↑
  
  // タイプフィールドを囲う背景
  wrap:document.getElementById('wrap'),

  // スタートボタン
  start:document.getElementById('start'),

  // 一時停止ボタンを押した時の動作を制御する為に使用
  isPaused:true,

  // タイマー部分の取得
  count:document.getElementById('count'),

  // // タイマーの動きを制御する為のプロパティ
  timerId:null,

  score:0,


  // テキストの中身に何を入れるかの配列
  textLists: [
      'Hello World','This is my App','How are you?',
      'Today is sunny','I love JavaScript!','Good morning',
      'I am Japanese','Let it be','Samurai',
      'Typing Game','Information Technology',
      'I want to be a programmer','What day is today?',
      'I want to build a web app','Nice to meet you',
      'Chrome Firefox Edge Safari','machine learning',
      'Brendan Eich','John Resig','React Vue Angular',
      'Netscape Communications','undefined null NaN',
      'Thank you very much','Google Apple Facebook Amazon',
      'ECMAScript','console.log','for while if switch',
      'var let const','Windows Mac Linux iOS Android',
      'programming'
  ]
};

// ゲーム開始画面のタイプフィールド内の文字列
gameData.untypedField.textContent = 'スタートボタンで開始';


// テキストの配列を参照し、
// その上でその配列をspan要素に適用させるため
// 関数で一発で呼び出せるように
const createText = () => {
  // 変化した文字色と文字列のリセット
  gameData.typed ='';
  gameData.typedField.textContent =gameData.typed;
  // Mathオブジェクトに対して、
  // floorで小数点以下を切り捨て
  /*random*textLists.lengthで
  配列の数値をランダムで出力する*/ 
  let random = Math.floor(Math.random()*gameData.textLists.length);
  gameData.untyped =gameData.textLists[random];
  gameData.untypedField.textContent = gameData.untyped;
  
};



// キー入力が正しいのか判定するための関数
const keyPress = e => {

  // isPausedがtrueである場合に、keyPress内の処理を止める
  if(gameData.isPaused){
    return;
  }
// ↓↓↓↓↓↓↓↓↓↓↓↓--------誤入力時の処理---------↓↓↓↓↓↓↓↓↓↓↓↓↓
  // 入力を間違えた時に背景が赤色になるようにクラスを追加する
  if(e.key !== gameData.untyped.substring(0,1)){
    gameData.wrap.classList.add('mistyped');

    // 色を一瞬だけ出すための関数
    setTimeout(() => {
      gameData.wrap.classList.remove('mistyped');
    },100);
    return;
  }
  // -----------------------------------------------------

// ↓↓↓↓↓↓↓↓↓↓↓↓----------正入力された時の処理----↓↓↓↓↓↓↓↓↓

  // スコアの加算
  gameData.score++;

  // タイプされたら、untypedの0~1文字目以下までの内容を
  // typedに追加する
  gameData.typed += gameData.untyped.substring(0,1);
  // untypedは1文字目から始まる定義(1文字~最後まで表示)
  gameData.untyped = gameData.untyped.substring(1);
  // 入力できた文字を格納（#typedと連動）
  gameData.typedField.textContent = gameData.typed;
  // 未入力の文字を格納（#untypedと連動）
  gameData.untypedField.textContent = gameData.untyped;

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑-------------------↑↑↑↑↑↑↑↑↑↑↑↑↑

    // 全て入力出来たら、新しい文字列をランダムで生成する
  if(gameData.untyped === ''){
    createText();
  }
};


// ランクの評価
const rankCheck = score => {

  // アラートに表示するテキストを格納する為の変数
  let text ='';

  // ランクの条件分岐
  // ランクを複数作るなら、上のランクの下限値-scoreと指定する
  if(score < 100){
    text =`あなたのランクはCです。\nBランクまであと${100 - score}です`;
  }else if(score < 200){
    text =`あなたのランクはBです。\nAランクまであと${100 - score}です`;
  }else if(score < 300){
    text =`あなたのランクはAです。\nSランクまであと${100 - score}です`;
  }else if(score >= 300){
    text =`おめでとうございます‼\nあなたのランクはSです。\nこれであなたもタイピングマスター‼`;
  }

  // アラート表示
  return `ゲーム終了！\n${score}文字打てました！${text}
          \n【OK】 リトライ / 【キャンセル】 終了`;
};

const gameOver = () => {
  clearInterval(gameData.timerId);

  const result =confirm(rankCheck(gameData.score));

  if(result === true){
    location.reload();
  }
};

// ※リセットボタンの作成を行う（後日）

const startTimer = () =>{

  // count内のp要素の取得
  // parseIntで文字列を整数にして、
  // 動作を管理出来るようにする
  let time = parseInt(gameData.count.textContent);
  
  // カウントダウンを開始する非同期関数
  // timerIdはプロパティだから変数として扱える
  // つまり下記でtimerIdとtimeを連携できたことになる
  gameData.timerId = setInterval(() =>{

    // timeの秒数を1ずつ減らす
    time--;

    // 上記で減らしたtimeのテキストを表示
    // この時点で文字列ではなく整数として扱われている
    gameData.count.textContent = time;

    // setInterval(() =>{
    //   console.log('10秒経過')
    // },10000);

    // タイマーが0になったら・・・
    if(time <= 0){
      gameOver(); 
      // alert('ゲーム終了！最初の画面に戻ります');
      // gameOver();でリロードによる一括リセットを出来るようにしている
      // ゲームの内容の保存が必要な場合には、下記記載のresetGame関数を呼び出して
      // 活用するのが好ましい（データの保持がされない＆読み込みに時間がかかる可能性がある為）
      // resetGame();
        }
  },1000);
}

// const resetGame = () =>{
//   gameData.isPaused = true;
//   gameData.start.textContent = 'スタート';
//   gameData.count.textContent = '60';
//   gameData.untypedField = 'スタートボタンで開始';
//   gameData.typedField = '';
// }

// タイマーを一時停止するための関数
const stopTimer = () =>{
  clearInterval(gameData.timerId);
}

// ゲーム開始後の処理
gameData.start.addEventListener('click',() => {
    
  // もしゲームが始まったら・・・
  if(gameData.isPaused){
    // ゲームの処理を動かす為isPausedを解除する
    gameData.isPaused = false;
    
    // スタート（再開）ボタンを一時停止に変えるための処理
    gameData.start.textContent ='一時停止';
    // カウントダウンの開始
    startTimer();

    // 初動時（再開時）にゲームが始まるよう、関数を実行
    // テキストのrandom表示
    createText();
     // プレイ中のキー入力判定
  document.addEventListener('keypress',keyPress);
  }//もし一時停止するなら・・・ 
  else{
    // ゲームを一時停止する処理
    gameData.isPaused = true;
    // ボタン内の文字列の変更
    gameData.start.textContent ='再開'
    // テキストフィールド内の文字列の変更
    gameData.untypedField.textContent ='ゲームを再開します';
    // タイマーを止める
    stopTimer();
       // キー入力を止める
    document.removeEventListener('keypress',keyPress);
  }

  // ゲーム開始時にボタンからフォーカスを外す
  gameData.start.blur();
  // 同時にテキストフィールドにフォーカスを移動するために使う
  gameData.wrap.focus();

  // div要素をフォーカス可能にするためのメソッド
  gameData.wrap.setAttribute('tabindex',0);

});

  // 「スタート」ボタンを非表示にする
  // start.style.display = 'none';





  // 以下個人的なメモ

// ----通常の記述----




// // テキストの表示をする為の変数
// let untyped = '';

// // 入力済のテキストを表示する変数
// let typed ='';

// // 文字列を入れるspan要素を取得するための変数
// // 変数であるのは後から再代入できるようにするため
// const untypedField =document.getElementById('untyped');
// const typedField =document.getElementById('typed');
// const wrap =document.getElementById('wrap');

// // テキストの中身に何を入れるかの配列
// const textLists =[
//   'Hello World','This is my App','How are you?',
//   'Today is sunny','I love JavaScript!','Good morning',
//   'I am Japanese','Let it be','Samurai',
//   'Typing Game','Information Technology',
//   'I want to be a programmer','What day is today?',
//   'I want to build a web app','Nice to meet you',
//   'Chrome Firefox Edge Safari','machine learning',
//   'Brendan Eich','John Resig','React Vue Angular',
//   'Netscape Communications','undefined null NaN',
//   'Thank you very much','Google Apple Facebook Amazon',
//   'ECMAScript','console.log','for while if switch',
//   'var let const','Windows Mac Linux iOS Android',
//   'programming'
// ];

// // テキストの配列を参照し、
// // その上でその配列をspan要素に適用させるため
// // 関数で一発で呼び出せるように
// const createText = () => {
//   // 変化した文字色と文字列のリセット
//   typed ='';
//   typedField.textContent =typed;
//   // Mathオブジェクトに対して、
//   // floorで小数点以下を切り捨て
//   /*random*textLists.lengthで
//   配列の数値をランダムで出力する*/ 
//   let random = Math.floor(Math.random()*textLists.length);
//   untyped =textLists[random];
//   untypedField.textContent = untyped;
  
// };

// createText();

// // キー入力が正しいのか判定するための関数
// const keyPress = e => {

//   if(e.key !== untyped.substring(0,1)){
//     wrap.classList.add('mistyped');

//     // 色を一瞬だけ出すための関数
//     setTimeout(() =>{
//       wrap.classList.remove('mistyped');
//     },100);
//     return;
//   }

//   wrap.classList.remove('mistyped');
//   // タイプされたら、untypedの0~1文字目以下までの内容を
//   // typedに追加する
//   typed += untyped.substring(0,1);
//   // untypedは1文字目から始まる定義
//   untyped = untyped.substring(1);
//   // 入力できた文字を格納（#typedと連動）
//   typedField.textContent = typed;
//   // 未入力の文字を格納（#untypedと連動）
//   untypedField.textContent = untyped;

//   if(untyped === ''){
//     createText();
//   }
// };



// const rankCheck = score => {

// };

// const gameOver = id => {

// };

// const timer = () =>{

// }

// // キー入力時にkeyPress関数を呼び出す為の処理
// document.addEventListener('keypress',keyPress);

