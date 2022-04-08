//関数式の利用⇒定数「app」に関数を値として代入
const app = () => {
  //定数songにhtml要素代入
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //sounds
  //指定したセレクター全てを取得
  const sounds = document.querySelectorAll('.sound-picker button');

  //timeDisplay
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');

  //.moving-outlineのcircleの長さ取得
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);

  //duration
  let fakeDuration = 600;
  //線の間隔を指定
  outline.style.strokeDasharray = outlineLength;
  //線の始まりの位置指定
  outline.style.strokeDashoffset = outlineLength;

  //各soundボタンクリック時に切り替える
  sounds.forEach(sound => {
    sound.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //playSound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  //select sound
  //timeSelectの値を順に取得
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      //属性値data-timeの値を取得
      fakeDuration = this.getAttribute('data-time');
      //各data-timeの値を表示
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
  });

  //サウンドの停止と再生に固有の関数を作成します
  const checkPlaying = song => {
    //曲が一時停止のとき実行
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    }else{
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  song.ontimeupdate = () => {
    //現在の再生位置取得
    let currentTime = song.currentTime;
    //600-曲の再生経過時間
    let elapsed = fakeDuration - currentTime;

    //秒数の表示
    let seconds = Math.floor(elapsed % 60);
    //分数の表示
    let minutes = Math.floor(elapsed / 60);

    //サークルのアニメーション
    //サークルの長さ - (現在の再生位置 / 600) * サークルの長さ
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //テキスト情報取得
    timeDisplay.textContent = `${minutes}:${seconds}`;

    //現在の再生位置がdata-time以上になったら=data-timeを超えたら
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;

      play.src = './svg/play.svg';
      video.pause();
    }
  }
};


app();
