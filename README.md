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
            "name":  // ftp 연결된 이름 (임의로 지정 가능)
            "host":  // AWS EC2 탄력적 IP주소
            "port":  // SSH 연결이면 22 # 인바운드 규칙에서 22 port 열려있는지 확인
            "type": "sftp",
            "username": "ubuntu",  // putty 설정 때 host name
            "password": "",// 비워두어도 무방
            "path": //"/home/username/작업폴더",
            "autosave": true,
            "confirm": false,
            "privateKey": // pem 보안키 경로
        }
    ]
    ```
3. EC2 directory 열기<br>
 : Command Palette에서 ftp-simple: Remote directory open to workspace를 선택

# AWS IAM(Identity and Access Management)
: **유저/접근 레벨/권한에 대한 관리**

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
> + **IAM은 지역 설정이 필요없이 Universal**

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

# Amacon EC2(Elastic Compute Cloud)
: **On-demand 형식으로 비용을 지불하는 Cloud기반 Server**

## EC2 지불 방식
+ On-demand
+ Reserved(예약)
+ Spot

### On-demand
+ 오랜시간동안 선불없이 최소한의 비용을 지불하여 EC2 인스턴스 사용
+ 개발 종료시간을 알수 없을 경우 유리
+ 단기간 사용이 필요할 경우 유리
### Reserved
+ 한정된 EC2 용량을 1-3년 동안 미리 정하여 지불
+ 안정되고 예상가능한 workload시 유리
+ 선불요금으로 인한 비용 감소 효과
### Spot
+ 입찰 가격을 적용하여 가장 큰 할인률로 비용을 지불하지만 여분의 인스턴스가 없을 경우 종료될 수 있음
+ 가격이 중간중간 변동될 수 있음
+ 비용절감에 가장 유리
+ 인스턴스의 시작/종료 시점에 구애받지않는 개발조건에 유리

## EBS(Elastic Block Storage)
: **EC2 인스턴스에 부착되어 사용되는 Storage Volume**

### EBS 개요
+ EC2 Server의 저장공간으로 사용
+ EBS Disk Volume 위에 File System이 생성된다.
+ 특정 Availability Zone(가용영역)에 생성된다.
   
### EBS Volume Type

+ **SSD군**
  + GP2(General Purpose SSD) : 최대 10K IOPS를 지원하여 1GB당 31OPS의 속도
  + IO1(Provisioned IOPS SSD) : 거대한 DB관리와 같은 극도의 I/O비율 요구 환경에 주로 사용. 10K 이상의 IOPS 지원
+ **Magnetic/HDD군**
  + ST1(Throughtput Optimized HDD) : 빅데이터 Warehouse, Log 프로세싱시 주로 사용되며 boot Volume으로 사용할 수 없음
  + SC1(CDD HDD) : 파일 서버와 같이 volume 접근이 드문경우 주로 사용되며 boot volume으로 사용할 수 없음, 비용 저렴
  + Manetic(Standard) : Root volume으로 사용 가능하며, 1GB 당 비용이 가장 저렴

## ELB(Elastic Load Balancers)
: **애플리케이션 트래픽을 Amazon EC2 인스턴스, 컨테이너, IP 주소, Lambda 함수, 가상 어플라이언스와 같은 여러 대상에 자동으로 분산해주는 Tool**

### ELB 개요
+ 수많은 서버의 흐름을 균형있게 흘러보내는 중추적인 역할
+ 하나의 서버로 traffic이 몰리는 병목현상을 방지
+ Traffic의 흐름을 healty instance로 변화 시켜주는 역할

### ELB 종류
1. Application Load Balancer
   + OSI Layer7에서 작동
   + HTTP, HTTPS와 같은 traffic의 load balancing에 적합
   + 고급 request routing 설정을 통해 request를 특정 서버로 보낼 수 있음 
2. Network Load Balancer : OSI Layer4에서 작동되며 속도가 매우 빨라 Production 환경에 종종 사용됨
   + 극도의 Performance가 요구되는 TCP traffic에 적합
   + 초당 수백만개의 request를 미세한 delay로 처리 가능  
3. Classic Load Balancer : Legacy로 간주되어 거의 사용되지 않음
   + Layer7의 HTTP/HTTPS 라우팅 지원
   + Layer4의 TCP traffic 라우팅 지원  

### Load Balancer Error : 504 Error
: App이나 서비스에서 Response를 수신하지 못하였을때 발생

### X-Forwraded-For Header
: Private IP Address 밖에 볼수없는 EC2를 대신하여 ELB에서  DNS를 통해 Public IP Address를 식별 해주는 기능