AWS_Basic
-----

### windows에서 vs code를 사용한 EC2의 원활한 사용을 위한 설정
1. ftp-simple extension 설치

2. FTP 연결 설정
    1. Command Palette 열기(Command+T)

    2. \>ftp-simple:Config - FTP connection setting 열기

    3. config file 설정

    ``` json
    [
        {
            "name":  ftp 연결된 이름 (임의로 지정 가능)
            "host":  AWS EC2 탄력적 IP주소
            "port":  SSH 연결이면 22 # 인바운드 규칙에서 22 port 열려있는지 확인
            "type": "sftp",
            "username": "ubuntu",  # putty 설정 때 host name
            "password": "",
            "path": "/home/username/작업폴더",
            "autosave": true,
            "confirm": false,
            "privateKey": pem 보안키 경로
        }
    ]
    ```
3. EC2 directory 열기<br>
 : Command Palette에서 ftp-simple: Remote directory open to workspace를 선택



