const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {

  //브라우저 창을 생성
  win = new BrowserWindow({width : 800, height : 600});

  //index.html 로드
  win.loadURL(url.format({
    pathname : path.join(__dirname, 'index.html'),
    protocol : 'file',
    slashes : true
  }));

  //개발자 도구을 연다.
  win.webContents.openDevTools();

  //창을 닫히면 호출 된다.
  win.on('closed', () => {
    //윈도우 객체의 참조를 삭제. 보통 멀티 윈도우 지원을 위해
    //윈도우 객체를 배열에 저항하는 경우가 있는데 이 경우
    //해당하는 모든 윈도우 객체의 참조를 삭제해 주어야 한다.
    win = null;
  });
}

/*
  이 메세지는 Electron의 초기화가 끝나면 실행되며
  윈도우를 생성할 수 있다. 몇몇 API는 이 이벤트 이후에만 사용할 수 있다.
*/
app.on("ready", createWindow);

//모든 창이 닫히면 애플리케이션 종료.
app.on("window-all-closed", () => {
  //macOS의 대부분의 애플리케이션은 유지가 cmd + Q 커맨드로 확실하게
  //종료하기 전까지 메뉴바에 남아 계속 실행 된다.
  if(process.platform !== "darwin"){
    app.quit();
  }
});

app.on("activate", () => {
  //macOS에선 보통 독 아이콘이 클릭되고 나서도
  //열린 윈도우가 없으면, 새로운 윈도우를 다시 만든다.
  if(win === null) {
    createWindow();
  }
});
