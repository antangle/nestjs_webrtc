
## Description

personal project for studying webrtc

## 설치

```bash
#설치
npm i

#주요 패키지
npm i -g @nestjs/cli 
npm i typeorm 
npm i pg
npm i @nestjs/platform-socket.io
npm i ejs
```

check package.json!

자신의 database 사양에 따라 알아서 db 어뎁터 설치, .env파일 수정할것

## 기능

webrtc 라이브러리인 peerjs 를 통한 음성/화상 통화 기능

socket.io를 통한 채팅기능

typeorm과 postgres 연동

간단한 user, auth 테이블 entity 설정

