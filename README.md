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

## EC2 - Route53
**: AWS 에 제공하는 DNS 서비스**

### 주요 적용 서비스
+ EC2 instance
+ S3 Bucket
+ Load Balancer

# AWS RDS(Relational Database Service)
**: 시중에 존재하는 다양한 종류의 관계형 데이터베이스를 지원하는 서비스**

## Relational DB Service
**: 데이터를 속성에 따라 분류하여 저장하는 방식**

### RDS의 주요 요소
+ Database
+ Table
+ Data
+ Field

## AWS에서 지원하는 RDS의 종류

+ Microsoft SQL
+ Oracle
+ MySQL
+ Postgre
+ **Aurora** : AWS 자체적으로 지원하는 DB로 Free Tier에서는 사용 불가능
+ Maria DB

## Data Warehousing
**: Bussiness Intelligence에서 주로 사용되는 방대한 분량의 데이터 로드가 필요할 경수 사용되는 시스템**
+ 다양한 소스로부터 방대한 양의 데이터를 보유
+ 사용자의 필요에 의해 데이터를 로드
+ 비교적 Transaction에는 적합하지 않음

### OLTP와 OLAP
+ OLTP(Online Transaction Processing) <br>: INSERT와 같이 종종 사용되어지는, 또는 규모가 작은 데이터를 불러올떄 사용되는 SQL쿼리가 필요할 경우 유용한 방식
+ OLAP(Online Analytical Processing) <br>: 매우 큰 데이터를 불러올 경우 사용, 주로 덩치가 큰 SELECT 쿼리가 사용됨

## RDS - Database Backup
**: AWS RDS는 Automated Backup(자동백업), DB Snapshots (데이터베이스 스냅샷) 두가지 Backup 방법을 지원한다.**

### Automated Backup(자동백업)
1. Retention Peroid(1~35일 사이의 기간) 안의 특정 시간으로 DB 복원 가능
2. AB 매일 생성된 Snapshot과 Transaction Logs를 참고하여 복원 진행
3. AB는 Default로 설정되어있으며, 백업정보는 S3에 저장
4. AB동안 약간의 I/O Suspension의 존재 가능 => Latency 존재
### DB Snapshots(데이터베이스 스냅샷)
1. 사용자에 의해 실행되는 Backup 방법
2. 원본 RDS Instance가 삭제되어도 Snapshot은 S3 Bucket에 존재.
3. 원본이 유실 되었어도 Snapshot만을 사용하여 복구 가능

### Database Backup시 유의사항
**DB Backup 수행시 Restored된 DB는 원본과 다른 ```RDS Instance```와 ```RDS Endpoint```를 가진다.**

## RDS - Multi AZ, Read Replicas

### Multi AZ
+ 원래 존재하는 RDS DB에 변화가 생길경우 다른 AZ에 복제본을 생성 => Synchronize
+ AWS에 의해 자동 관리
+ 원본 RDS에 장애 발생시 자동으로 다른 AZ의 복제본을 사용
+ Disaster Recovery에만 사용됨(성능 개선 X).

### Read Replicas
+ Production DB의 ```Read Only 복제본```이 생성된다.
+ 주로 Read-Heavy DB작업의 효율 극대화를 위해 사용 => Scaling
+ ```Not for Disaster Recovery```
+ 최대 5개의 Replica DB 허용
+ Replica의 Replica 생성 가능 => Latency 발생
+ 각각의 Replica는 고유한 Endpoint가 존재

## RDS - ElastiCache
**: File Read에 대한 속도 증가를 위해 AWS에서 사용되는 Cache Memory 서비스**
+ Cloud 내에서 In-Memory Cache 생성
+ Cache를 통하여 빠른 속도로 데이터 Read
+ Read-Heavy App에서 상당한 Latency 감소 효과 발생
+ Memchched 와 Redis로 분류
### Memcached
**: 단순한 Object Cache System**
+ ElestiCache에서 Default로 사용됨
+ Auto Scaling처럼 자동으로 유동적인 크기 조정
+ Open Source 지원
### Redis
**: 정교한 형태의 데이터를 저장가능한 In-Memory Cache**
+ Key-value, Set, List와 같은 다양한 형태의 Data를 In-Memory에 저장 가능
+ Open Source 지원
+ Multi-AZ 지원
+ Data set의 랭킹을 정렬하는 용도로 사용 가능

## RDS 실습

### Amazon RDS DB 생성

**Aurora는 Free tier에 해당되지 않으므로 MySQL로 생성**
1. 엔진 유형에서 MySQL 선택
2. Default 버전 지정
3. Template에서 Free tier 선택
4. 설정 방법
    + DB 인스턴스 식별자 : DB 이름
    + 자격 증명
      + 관리자 ID와 마스터 암호 지정 
    + DB 인스턴스 클래스 : 버스터블 클래스(저렴하고 작은 용량의 클래스)
    + 스토리지
      + 범용 SSD 사용
      + 스토리지 자동 조정(Auto Scaling) 활성화
      + 가용성 및 내구성 : Free tier는 해당 없음
    + 연결
      + 퍼블릭 액세스 : 외부에서의 접근 허용(X)
      + 보안 그룹 : 새로 생성
    + DB 인증옵션 : 암호 인증
    + 추가 구성
      + 초기 DB 이름 설정
5. DNS 접속을 위한 엔드포인트 확인
6. EC2 인스턴스 사용자 데이터에 Script 작성
    ``` 
    #!/bin/bash
    yum install httpd php php-mysql -y
    yum update -y
    chkconfig httpd on
    service httpd start
    echo "<?php phpinfo();?>" > /var/www/html/index.php
    cd /var/www/ht
    wget https://aws-learner-storage.s3.ap-northeast-2.amazonaws.com/connect.php
    ```
7. 보안 그룹에 기존 보안그룹 선택(http, ssh port Open)
8. 인스턴스 연결 설정을 통해 terminal에서 접속하여 EC2 동작 확인
9. 엔드포인트를 통한 접속으로 MySQL 접속

## Amazon RDS 설정
1. 읽기 복제본 생성
+  Amazon RDS Console의 작업에서 읽기 전용 복제본 생성
   +  퍼블릭 엑세스 설정 가능
   +  원본과 별개의 암호화 가능
   +  생성 리전/서브넷 그룹 지정 가능
   +  확장 모니터링을 사용한 CloudWatch 연동 가능
   +  게시 로그 유형 선택 가능
2. DB 인스턴스 수정
   + 다중 AZ 설정 가능
   + 백업 기간 설정 가능
3. Snapshot
   + RDS 인스턴스 실행시 자동으로 생성
   + 주기에 따라 자동으로 생성됨
   + 인스턴스-작업-특정 시점으로 복원에서 스냅샷 사용 가능
# Amazon S3(Simple Storage Service)
**:Cloud 저장소를 지원하는 AWS의 첫 런칭 서비스**
## S3 특징
+ 안전하고 가변적인 Object Storage 제공
+ 편리한 UI 인터페이스를 통해 어디서나 쉽게 데이터 Save/load 가능
+ 0TB까지 파일 크기 지원
+ 사실상 저장공간 무제한
+ Bucket을 default name으로 사용
+ Bucket은 보편적은 namespace를 사용

### S3 Object 구성요소
+ Key : 파일명
+ Value : 파일 data
+ Version ID : S3 고유특징
+ Meatdata : 파일 변경사항에 대한 다양한 정보
+ CORS(Cross Origin Resource Sharing) : 파일에 대한 동시 접근 지원

### S3 Data Consistency Model
1. **Read after Write Consistency(PUT)** : 파일이 S3에 적재되면 즉시사용가능
2. **Eventual Consistency(UPDATE, DELETE)**: Bucket에 올라간 파일 내용의 변경사항이 바로 반경되지 않는다.

## S3 Storage Type
+ 일반 S3
+ S3-IA(Infrequent Access)
+ S3-One Zone IA
+ Glacier
+ Intelligent Tiering

### 일반 S3
+ 보편적으로 사용되는 Type
+ 높은 내구성 + 가용성
### S3-IA
+ 자주 접근되지 않느나 접근시 빠른 속도야 요구되는 파일이 많을 경우 유용
+ S3에 비해 비용은 저렴하지만 데이터 접근시 추가 비용 발생
+ 멀티 AZ를 통한 Data 저장 가능
### S3-One Zone IA
+ 단일 AZ에 data 저장
+ 단일 AZ에 의한 데이터 접근 제어
+ S3-IA보다 20% 저렴
### Giacier
+ 거의 접근하지 않을 데이터 저장시 유용
+ 매우 저렴한 비용
+ 데이터 접근시 4-5시간 소요
### Intelligent Tiering
+ 데이터 접근 주기가 불규칙할때 유용
+ 2가지 Tier 존재
  + Frequent Tier : data 접근이 잦을 경우
  + Infrequent Tier : data접근이 자주 없을 경우
+ Frequent가 좀더 고가
+ 최고의 비용 절감 효율

## S3 요금
+ GB당 비용 지불
+ PUT,GET,COPY 요청 횟수당 비용 지불
+ data Download/Upload시 비용 발생
+ MetaData 정보에 따라 비용 구분
+ Fress Tier 사용시 기본 5GB 무료

## S3 버킷 생성시 유의 사항
### S3 사용 예시
+ 파일 저장소(log, image,video...)
+ 웹사이트 호스팅

> CORS(Cross Origin Resource Sharing)<br>
> : 리전이 서로다른 Bucket간의 데이터 접근을 가능하게 해주는 기술적 요소

### S3 Bucket 접근 제어
+ S3 Bucket는 최초 생성시 Private 상태로 설정되어있음
+ 외부의 접근을 승인하는 2가지 방법
  + Bucket 정책(Bucket policy) 변경 : private => public
  + 접근 제어 리스트(Access Control List) 변경 : Bucket의 각 요소에 대한 접근승인

## S3 암호화

### S3 암호화 유형
+ file Upload/Download시 발생
  + SSL/TLS
+ 대기 상황에서 발생
  + SEE-S3 : S3 Bucket에 저장되어있는 Object들의 Key값(AES-256)을 변경시키는 Master Key방식
  + SSE-KMS : AWS에서 일괄 관리되는 Key Management System으로 보안을 해제한 이용자의 정보 확인가능
  + SSE-C : Key를 사용자가 직접 다룰 수 있으며 사용자가 Key값을 주기적으로 변경시켜야 한다.

### S3 암호화 과정
+ PUT 요청 생성
  + header에 파일명, 생성일, 생성자, 파일type정보 보유
  + x-amz-server-side-encryption-parameter : 헤더에 인자가 있을경우 암호화 진행
  + Bucket Policy 설정을 통해 암호화 되어있지 않은 파일의 Upload 거절 가능

## S3 실습
> S3는 Global Service 이기에 Region 선택이 필요 없음

### Bucket 생성
+ Bucket name : Region에 관계없이 Unique한 이름으로 지정 - 중복 불가능
+ Public Access Control : 모든 Public Access 차단 권장
+ 객체 잠금 : 객체 저장이후 고정된 시간(무기한)동안 객체 변경 차단

### S3 Bucket
+ **File Upload**
  + 콘솔을 사용해 직접 File을 Upload 할 수 있음 
  + 권한항목에서 개별 사용자의 Access 권한을 지정할 수 있음
  + 속성에서 Storage 클래스와 암호화 설정 가능
+ **File Management**
  + 콘솔에서 파일을 열어 확인 할 수있음
  + Public Access가 차단되어있는 파일의 경우 URL로 접근할 수 없음
  > public Access허용 방법
  > 1. Bucket의 권한 tab에서 public access 허용
  > 2. 개별 파일의 권한 tab에서 public read 허용
  + Bucket Level에서의 public access 권한 허용시 모든 File에 Public Access 가능

### Bucket 정책편집
+ 정책생성기를 통한 정책 생성
  + Policy Type : S3 Bucket
  + Statement 추가
    + Principal : IAM 사용자의 ARN 입력
    + Actions : 허용 권한
    + ARN : Bucket의 ARN
### Bucket 암호화
+ Bucket 생성시 암호와
  + Bucket 생성의 기본 암호화 설정
  + AWS KMS - aws/s3 키 선택
  + 객체 Upload시 속성 tap-  암호화 키 지정 - 기본 암호화 버킷 설정 적용

# AWS CloudWatch
: 지표를 사용하여 AWS 인프라와 AWS에서 실행되는 애플리케이션의 실시간 모니터링을 지원하는 지표 저장소(Metrics Repo).
+ AWS 리소스 사용의 실시간 모니터링 기능 지원
+ Event를 수집하여 로그파일에 저장
+ Event&Alarm 설정을 통해 SNS, AWS Lambda로 이벤트 발생 전달 가능
+ 지원 AWS 서비스 : EC2, RDS, S3, ELB 등

### CloudWatch 모니터링 종류
+ Basic
  + 무료
  + 5분 간격으로 최소의 Metrics 제공
  + CPU 사용량,디스크 사용량, Network I/O등의 Metric 제공
+ Detailed
  + 유료
  + 1분 간격으로 자세한 Metrics 제공

### CloudWatch 사용 예시
- Use case  : 모바일 앱을 일일 접속자 확인
- Potential Issue : 특정리에 수많은 traffic이 물리는 병목현상 발생 가능
- Solution : traffic rate와 사용자의 버튼 클릭 회수를 분석하여 더 효율적은 앱개발 가능

### CloudWatch - Alarm
+ 미리 지정한 임계값에 도달할 시 Alarm을 울릴 수 있음
+ Alarm이 발생할 경우 특정 Event를 작동 시킬 수 있음
+ **Alarm State**
  + Alarm(경보) : 정해진 임계값에 도달시 발생
  + Insufficient(부족) : 임계값이 정해져있는 요소가 존재하지 않을 경우
  + OK(확인) : Alarm이 발생하지 않는 일반적인 상태
+ Billing Alarm
+ 미리 지정한 지출 임계값을 초과할 경우 SNS를 통하여 경고

## CloudWatch 실습
### CloudWatch 경보 생성
1. 지표 및 조건 지정
   + 지표 : 대상 Resource 및 Metric
   + 조건 : Alarm을 발생시키는데 필요한 조건
   + 추가 구성 : 데이터 누락시의 처리방법 설정
2. 작업 구성
   + 작업을 발생시키는 경보 상태 설정
   + Alarm 수신 주제 설정
     + 수신할 email-endpoint 지정 
3. Auto Scaling 작업 추가
   + Alarm 발생시 AWS의 Auto Scaling 유무 설정
4. EC2 작업
   + EC2 인스턴스에 대한 작업 지정
5. Alarm 이름 설정

> 새 Alarm 작성시 주제에 묶여있는 email에 구독 확인 메시지가 전송됨<br>
> endpoint에서 구독했을 경우 Alarm 메시지 전송 시작

# AWS Lambda
: 코드를 별도의 관리 없이 실행할 수 있는 서버리스 컴퓨팅 서비스

## Lamba 개요
+ AWS Serverless Service의 주축
+ Events를 통해 Lambda 실행
+ NodeJS, Python, Java, GO등 다양한 언어 지원
+ Lambda Function을 통해 Computing
## AWS Lambda의 비용 체계
+ Lambda Function을 실행될때만 비용 지불
+ 매달 100,0000 함수 호출 무료
## Lambda 함수 지원사항
+ 최대 300초 Runtime 허용
+ 512MB의 일시적인 디스크공간 제공
+ 최대 50MB Deployment Package 허용 => 초과시 S3 Bucket 사용

## Lambda 사용 예시
1. S3 Bucket의 PutObject를 감지해 해당 File에서 Data를 정제하여 DB에 적재
2. IoT의 Topic에서 호출하여 필요한 데이터로 전처리하여 SNS에 연결하여 메시지 전송

## Lambda 실습
> 계정 동시성(Concurrency)에 주의하며 작성

### Lambda 기초 실습
1. 함수작성 
   + 새로 작성 : 처음부터 함수 구현
   + 블루프린트 사용 : 자주 사용되는 기능 Template을 선택하여 구현
   + repo에서 서버리스 앱 찾기 : 공유되고 있는 간단한 Architecture를 불러와 구현
2. 블루프린트 사용 
   + 간단한 예제 구현을 위해 hello-world-python 사용
3. 구성요소 작성
   + 이름 작성
   + 역할 설정 : 기본 Lambda 권한을 가진 새 역할 생성
4. 테스트 실행
   + 함수 개요 - 테스트 - 테스트 
> CloudWatch 로그 그룹에서 테스트 Log 확인가능

### Lambda 응용 실습
> S3의 PutOject를 트리거로하여 입력 데이터값에 따른 메시지 출력 함수
1. 함수 생성
   + 역할 Template에서 S3 읽기 역할을 선택
   + S3에서 받아온 데이터를 처리하는 함수 생성
      ``` python
      import json
      import boto3 # AWS Service를 위한 Package
      from datetime import datetime # 현재시간 

      client = boto3.client('s3') # S3 연동

      def lambda_handler(event, context):
          what_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S") # 현재 시간
          bucket = event['Records'][0]['s3']['bucket']['name'] # bucket 정보 추출
          key = event['Records'][0]['s3']['object']['key'] # key 정보 추출
          try:
              response = client.get_object(Bucket=bucket,Key=key)
              # Object json type으로 호출
              
              text = response["Body"].read().decode()
              data = json.loads(text)
              
              if data['temperature'] > 40:
                  print(f"Temperature detected : {data['temperature']}C at{what_time}")
                  print("Be carefule! It's getting really hot!!")
              else:
                  print("So far so god")
          except Exception as e:
              print(e)
              raise e
      ``` 
    + 함수 Deploy
2. 연동할 S3 Bucket 생성
  + 기본 설정으로 Bucket 생성
  + 속성 tab 에서 이벤트 알림 생성
    + 사용하고자 하는 이벤트 유형 선택 : ```s3:ObjectCreated:Put```
    + 접두사/접미사 : 특정 Object를 필터링하기 위해 설정
    + 전송 대상 설정 : lambda 함수 선택 및 연결할 함수이름 지정
3. Lambda 함수 개요에서 연결상태 확인
4. S3에 파일 업로드
5. CloudWatch Log에서 Response 확인
   
# CloudFront
: Edge Location을 활용하여 정적/동적 콘텐츠를 사용자에게 빠르게 전달해주는 CDN(Contents Delivery Network)

## 개요
- 정적, 동적, 실시간 웹 컨텐츠를 사용자에게 전달
- Edge Location 사용하여 웹 performance 극대화
- CDN
- 분산 네트워크(Distributed Network)

## CloudFront 용어 정리
+ Edge Location : 사용자와 물리적으로 가까운 장소에 존재하는 웹 콘텐츠 Cache의 복제본
+ Origin : 원래 콘텐츠가 저장되어있는 장소로 웹 호스팅이 이루어지는 장소(EC2,S3...)
+ Distribution : CND에서 사용되어 Edge Location을 묶고 있는 개념

## CloudFront 실습
1. Origin 생성 (S3 Bucket)
   + Bucket에 대한 퍼블릭 엑세스 허용
2. 콘텐츠 업로드
   + 콘텐츠에 대한 Public Read 권한 허용
3. CloudFront 분산 네트워크 생성
   + 원본 도메인 : 원본 지정
   + 원본 경로 : 특정 경로 타켓팅을 위해 사용
   + S3 버킷 액세스 :CloudFront를 거친 Bucket 접근만 허용하는 옵션
     + OAI(원본 액세스 ID) : Bucket 접근을 허용하기 위한 ID
     + 버킷 정책 : 외부에서의 접근을 허용하는 옵션
   + 뷰어 프로토콜 정책 
     + Redirect HTTP to HTTPS 옵션으로 자동으로 HTTPS로 변환
   + 캐시 키 및 원본 요청
     + TTL 설정 가능
   + 설정
     + 대체 도메인 이름 : 보유하고있는 도메인 설정 가능
4. 배포 관리
   + 원본 : 새로운 원본 등록 가능
   + 동작 : 배포 설정 확인 가능
   + 지리적 제한 : 특정국가의 접근 제한(허용/차단) 가능
   + 무효화 : 수동으로 Cache 삭제 가능하지만 비용이 발생
5. Origin의 Public Access 해제
6. CloudFront의 Domain으로 콘텐츠에 접속
   + 최초 접속시에는 Cache에 적재되어 있지 않기에 속도차익라 없을 수 있음 

# DynamoDB
: 기본 스토리지 관리, 시스템 규모 조정을 자동으로 지원해주는 서버리스 Database

## 개요
- NoSQL(Not only SQL) Database
- 빠른 Query 처리 속도
- Auto-Scaling기능 탑재
- Key-Value 모델 지원
- 스키마 생성 불필요(자동 생성)
- Moblie, Web, IoT 데이터 사용에 추천
- SSD Storage 사용
## DynamoDB의 구성요소
+ Table
+ Item : RDBS의 Row
+ Attributes : RDBS의 Column
+ JSON, XML와 같은 Key-Value 요소

## DynamoDB - Primary Keys(PK)
+ DynamoDB는 PK를 사용하여 Data Query
+ PK 유형
  1. Partition KEy
    - 고유성 (Unique)
    - 실제 data의 저장위치를 결정
    - Data중복 불가능 = Partition Key 사용시 두개의 data를 한 위치에 저장할 수 없음
  2. Composite Key(복합키)
    - Partition Key + Sort key
    - 파티션키가 같은 데이터끼리 보관하며, Sort Key를 기준으로 정렬 
+ 복합키 예시
``` json
  {
    "Customer_id" : "28942", //partition key
    "Transcation_id" : "g9s4dd2",
    "Item_purchased" : "sofa",
    "Store_Location" : "seoul",
    "Transaction_date" : "2020-10-16 14:20:00", // sort key
  }
```
## DynamoDB Data 접근 관리
+ AWS IAM으로 관리 가능
  + Table 생성과 접근 권한 부여가능
  + 특정 Table, 특정 Data에만 접근 가능하게 해주는 특별한 IAM 존재
  
## DynamoDB - Index
Index : Query의 처리속도를 향상시키기 위해 Table 전체 조회 대신 특정 Cloumn을 기준점(Pivot)으로 사용하여 Query
- DynamoDB의 Index 유형
  - Local Secondary Index
  - Global Secondary Index
### Local Secondary Index(LSI)
+ Table 생성시에만 정의 가능
+ Table 생성이후 재정의, 삭제 불가
+ Table생성시 정의했던 것과 같은 Partition Key 사용
### Global Secondary Index(GSI)
+ Table 생성 후에도 추가,변경, 삭제 가능
+ Table 생성시 사용했던 것과 다른 Partition Key와 Sort Key

## Query와 Scan
### Query
+ Primary Key를 사용하여 Data 검색
+ Query 사용시 모튼 Column 반환
+ ProjectionExpression 인자를 활용하여 지정한 Column만 보여지게 하는것도 가능
### Scan
+ Primary Key 없이 모든 Data를 호출
+ Filter를 추가하여 원하는 데이터 추출
+ ProjectionExpression 인자를 사용하여 원하는 Column 추출
> Query가 Scan보다 효율적인 면이 많아 대부분의 상황에서 Query사용을 권장<br>

## DynamoDB - 실습
1. Table 생성
   + 식별을 위한 Partition Key를 지정
   + 정렬을 위한 Sort Key 지정
   + 사용자 정의 설정을 사용하면 Auto-Scaling의 세부설정이 가능
2. DynamoDB 구성
   + 개요 : Stream 세부 정보, Table 세부 정보 확인 및, ARN 확인
   + 항목 : Table 내부 Data를 직접 확인 가능
   + 모니터링 : DynamoDB에 관한 수치데이터 확인 가능, Alarm 설정 가능
3. Tabe data 생성
   + 항목 Tab의 항목 생성기능 활용
   + Json 형식으로 대량의 Data 일괄 추가 가능

### Lambda 함수를 활용한 DynamoDB 항목 추가 
1. 함수 생성
   + python 기반 함수 생성
   + IAM 콘솔로 이동하여 역할 생성
     + DynamoDB 쓰기 권한을 가지는 새로운 정책 생성
       + DynamoDB - PutItem - 모든 리소스
     + 생성된 정책과 연결된 역할 생성
     > AWS기본실행 정책과도 연결해야 한다.
    + 생성된 역할을 Lambda와 연결
2. 함수 작성
+ Deploy-Test이후 Log확인

``` python
import boto3 # AWS 요소들에 연결하기 위한 Package

def lambda_handler(event, context):
  client = boto3.resource('dynamodb')
    table = client.Table('테이블 이름')
    
    table.put_item(
        Item={
            DynamoDB에 삽입할 Data
        })
```
### batch를 활용한 다중항목 추가
1. 코드 작성
``` python
import boto3

def lambda_handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('janjan-learner-dynamodb-table')
    
    with table.batch_writer() as batch:
        batch_put_item(
        Item={
           # DynamoDB에 삽입할 Data Json 형식
        })
        
        batch_put_item(
        Item={
           # DynamoDB에 삽입할 Data Json 형식
        })
        
        batch_put_item(
        Item={
           # DynamoDB에 삽입할 Data Json 형식
        })
``` 
2. 정책 편집
+ IAM - 정책 - 정책 편집 - BatchWriteItem 추가

### DynamoDB Scan & Query
1. Scan
  + Table에서 필터를 추가하여 검색
2. Query
  + partition_key 입력하여 검색

## DynamoDB - DAX(DynamoDB Accelerator)
### DAX
: DynamoDB에서 지원하는 Cluster In-Memory Cache
+ 읽기 요청에 한정하여 기존 10배 이상의 속도 향상

### DAX 원리
+ DAX Caching System
  + Table에 Data를 Insert/Update 시 DAX에도 반영하여 읽기 요청에 맞는 Data가 DAX에 들어있다면(Cache Hit) Cache에서 즉시 반환하는 방식
+ DAX를 사용이 힘든 유형
  + 쓰기 요청에 많은 어플리케이션
  + 읽기 요청이 많지 않은 어플리케이션
  + Cache Miss가 많이 발생하는 어플리케이션

## DynamoDB - Streams
: DynamoDB Table에서 일어나는 Event(Insert/Update/Delete)가 시간순서에 맞게 저장되는 저장소
### Streams 개요
+ Log는 즉각 암호화되며 24동안 보관됨
+ 주로 Event를 기록하고 Event 발생을 외부로 알리는 용도로 사용
  + Lambda Function과 Pair로 동작하여 Event에 따른 알림
+ Event 발생 전&후에 대한 상광 보고

# API Gateway

## API와 RESTful API
### API (Application Programming Interface)
: 응용프로그램에서 운영체제, 프로그래밍 언어가 제공하는 기능을 제어할 수 있도록 해주는 Tool
### RESTful API
: Representational State Tranfer API
+ CREATE, READ, UPDATE, DELETE 유형으로 Server-Client간 통신
+ JSON 형태로 REQ/RES 전달
> 대부분의 Application은 RESTful API 기반으로 운용되지만 관리가 까다롭다.<br/>
>> + Authentication & Authorization 필요
>> + API 요청의 모니터링 필요
>> + 성능 향상을 위해 API Request Caching 시스템 필요
## API Gateway
: 뛰어난 확장성 제공 및 API의 생성/운영/모니터링을 간편하게 해주는 Tool
+ Back-end 서비스(Web App, EC2)내부 데이터에 접근 가능
+ Pay As You Go 기반 요금

## API Gateway 실습
: API Gateway - Lambda Function - DynamoDB 
1. REST API(PUBLIC) 구축
   - 새 API
   - 엔드포인트 유형 - 지역 or 최적화된 에지
2. 리소스 생성
3. Lambda Func 생성
   - DynamoDB의 쓰기 권한을 가진 역할 부여     
4. 메서드 생성 
   - POST
   - 통합 유형 : Lambda
   - Lambda 함수 연결
5. 요청 본문을 작성하여 test
   - json type으로 요청 작성 
6. 실제 작동할 Lambda Func 작성
+ dynamodb table에 data를 삽입하는 함수  
``` python
import boto3

resoure = boto3.resource('dynamodb')
table = resource.Table('테이블 이름')
def lambda_handler(event,context):
  table.put_item(Item-event)
  return {"code":200, "Message": "Data Successfully Inserted!"}
```
1. API Gateway에 삽입할 data 작성하여 test
``` json
{
    "customer_id" : "38NME",
    "customer_name":"Sejing",
    "product_name":"desk",
    "price":670000
}
```

# AWS Code Commit/Deploy & Code Pipeline
## CI/CD
+ CI(Continuous Integration) : 개발의 지속적인 통합
+ CD(Continuous Deployment) : 지속적인 배포
### CI/CD의 장점
+ 자동화 시스템(Automation)을 활용한 SW 개발 속도 개선
+ Incremental Change 
  + 프로그램을 절차적으로 변경해나가는 개발방식
### CI/CD를 위한 대표적인 중앙 Repository
+ Github
  + Local & Master branch로 구분

## AWS - Code Commit
: 프라이빗 Git 리포지토리를 호스팅하는 안전하고 확장성이 뛰어난 관리형 소스 제어 서비스
+ Github와 유사한 파일 보관 방식
+ 저장소에 대한 동시접근 허용
+ 버전 관리 제공

## Code Commit 실습
1. Repository 생성
2. 연결 유형 선택
  + HTTPS
  + SSH : Root 사용자는 사용 불가
  + HTTPS(GRC) : Remote 저장소 사용
3. Console에서 File 생성
  + main Branch에 바로 적용
4. Local Branch 생성
  + Main Branch에서 fetch하여 사용 
5. 수정사항 작성후 commit
  + 변경사항이 main Branch에 반영되지 않음
6. 풀 요청
7. Root 계정에서 Pull Request 허용
   + 승인 Tab에서 승인 규칙 변경 가능
   + 병합 전략 선택 : normally 빠른 전달 사용  
   + pull 이후 local branch를 삭제하는 옵션 선택 가능

## AWS - Code Deploy
: 자동 배포(Automated Deployment)를 위한 AWS 리소스
### Code Deploy 장점
+ 새로운 기능의 빠른 배포
+ SW / Server DownTime이 없음
+ Manual Error 없음

### Code Deploy 유형
+ Rolling 배포
  + Server 단위의 점층적인 배포
  + 일시적으로 개별 Server의 부하가 늘어 날 수 있다.
  + 배포 이전상태로 돌아가기 어려운 방식
+ Blue/Green 배포
  + Blue(현재 Service) , Green(새로운 Service)로 나누어 새로운 Green 점유율을 점층적으로 늘려나가는 방식
  + Server를 복사하여 Traffic을 조정하므로 Server의 부하에는 변화가 없다.
  + 배포 이전상태로 돌아가는것이 수월하다.

## Code Deploy 실습
1. IAM 역할 생성
   + S3에 접근 가능한 역할
   + CodeDeploy에 접근 가능한 역할
2. EC2 인스턴스 생성
3. code Deploy를 위한 EC2 환경 설정
  ``` bash
  sudo apt-get update
  sudo apt-get install ruby
  sudo apt-get install wget
  wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install
  chmod +x install
  sudo ./install auto
  ```
4. IAM에서 적절한 권한을 가지는 새 사용자 추가
   + 프로그래밍 방식 엑서스로 지정
   + 정책 연결
     + AWSCodeDeployFullAccess
     + AmazonS3FullAccess
   + access Key 보관
5. AWS CLI에서 configure 명령어로 접속
  ``` bash
  aws configure
  AWS Access Key ID : 생성한 사용자의 Access key
  AWS Secret Access Key : 생성한 사용자의 Secret Key
  Default Regin : 사용할 AWS 리전
  Default output format : 생략 가능
  ```
6. S3 Bucket 생성
7. AWS Command로 App 생성
   ``` bash
   aws deploy create-application --application-name mywebapp
   ```
8. AWS Command로 S3에 APP Upload
   ```
   aws deploy push --application-name App이름 --s3-location S3Bucket이름/webapp.zip --ignore-hidden-files
   ``` 
9. test를 위한 배포 그룹 생성
  + 서비스 역할 지정
  + 배포유형 설정 : 현재위치(Rolling)
  + 환경 구성 : EC2 인스턴스 - 태그 그룹 선택
  + 배포 설정
    + AllatOnce : 한번에 전부
    + OneatTime : 한번에 1개씩
  + 로드 밸런서 설정 : 해제
10. 배포 생성
  + 계정 위치 지정
  + 추가 배포 동작 설정
### 에러 발생시 확인 사항
1. 배포 수명 주기 이벤트 Tab에서 이벤트 확인.
2. ec2인스턴스 내부에서 log확인.
3. ec2 인스턴스 OS와 명령어가 제대로 연결되어있는지 확인
4. 배포할 Application의 중복 문제 확인
> 배포 실패시 EC2 인스턴스에서 deploy Log 확인할 것
