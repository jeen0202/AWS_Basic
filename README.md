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


# AWS IAM(Identity and Access Management)
: 유저/접근 레벨/권한에 대한 관리

## IAM 개요
+ Access key(접근키) , Secret Access Key(비밀키)
  + 새로운 User가 생성될 떄 함께 생성된다.
+ 세밀한 접근권한 부여 (Granular Permission)
+ 비밀번호의 수시 변경 가능
+ MFA(Multi-factor Autentication) 기능
  + 2개이상의 인증방법을 통해 로그인

## IAM 요소  
+ 유저(USER) : 최소 단위
+ 그룹(GROUP) : 하나, 또는 다수의 유저가 존재
+ 역할(ROLE) : 하나 혹은 다수의 정책을 지정하여 유저에게 부여
+ 정책(Policy) : JSON 형태로 세밀한 접근 권한을 지정한 것 
> + 그룹, 역할에 정책을 추가할 수도 있음
> + 하나의 그룹안에 다수의 유저가 존재 할 수 있음

### IAM은 지역 설정이 필요없이 Universal

## IAM 정책 시뮬레이터
: IAM과 관련된 Problem Debugging 최적화 되어있는 Tool<br>
> + 실제 유저에게 부여된 다양한 정책의 테스트 가능
> + 실제환경으로 빌드하기전 IAM 정책이 잘 작동되는지 테스트하기 위해 사용

## IAM 실습

### 유저 생성
1. 유저이름 및 접근방법 지정
   + Access key 방식 과 password 방식 교차 선택가능
2. 소속 그룹/태그 지정
3. Access key 및 Secrect Key 확인(Access Key 방식)
   + 이후에는 Secret Key 확인 불가능
   + 
### 그룹 생성
1. 그룹 이름 지정
2. 정책 연결
3. 유저 연결
4. 
### 역할 생성
> 유저와 동일한 방식으로 생성되지만, 역할 자체에 권한을 부여할 수 있음

### 정책 생성
: 시작적 편집기/ JSON 2가지 방식으로 생성가능
1. 서비스 지정
2. 서비스 내부에서 사용 가능한 엑세스 지정
3. 리소스 지정
4. 이름 지정

### 정책 시뮬레이터(Policy Simulator)
+ user와 action을 선택하여 권한 여부 확인 가능
+ User에게 부여되어있는 정책의 적용여부 선택가능