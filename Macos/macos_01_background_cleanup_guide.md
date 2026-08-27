# macOS 백그라운드 프로세스 및 사용자 캐시 정리 가이드

> 대상: Apple Silicon 또는 Intel Mac  
> 목적: 불필요한 상주 프로세스와 자동 실행 항목 정리, 사용자 캐시 확보  
> 원칙: 조사 → 대체 기능 테스트 → 등록 해제 → 파일 제거 → 재부팅 → 검증

본문은 어느 Mac에서나 따라갈 수 있는 공통 절차만 담는다.  
실제 적용 기록은 [부록 A](#부록-a-적용-사례-기록)에 분리했고, 제품명과 경로는 일반화했다.

## 0. 먼저 읽을 안전 수칙

- 삭제 명령은 경로와 파일명을 직접 확인한 뒤 실행한다.
- `rm -rf`는 휴지통을 거치지 않는다. 오타가 있어도 복구가 어렵다.
- `/System/Library`와 macOS 기본 프로세스는 건드리지 않는다.
- 캐시 정리 전에 브라우저, IDE, 컨테이너 런타임을 종료한다.
- 장치 전용 유틸리티는 제거 전에 macOS 기본 기능으로 대체되는지 시험한다.
- `Operation not permitted`가 나온 Apple 보호 항목은 그대로 둔다.
- 정체가 불명확하거나 다시 쓸 가능성이 있으면 삭제하지 말고 조사한다.

> [!CAUTION]
> 인터넷에서 찾은 `sudo rm -rf` 명령을 경로 확인 없이 실행하지 않는다.  
> `/Library`, `~/Library`, `/Applications` 전체나 넓은 와일드카드를 대상으로 지정하지 않는다.

---

## 1. 전체 작업 체크리스트

- [ ] 중요한 작업을 저장하고 필요한 데이터를 백업했다.
- [ ] 현재 디스크 여유 공간을 기록했다.
- [ ] 상주 프로세스와 서드파티 자동 실행 항목을 조사했다.
- [ ] 장치 전용 유틸리티의 대체 기능을 시험했다.
- [ ] 5장 판단 기준으로 삭제 대상과 유지 대상을 구분했다.
- [ ] 대상 plist의 내용을 확인했다.
- [ ] `launchctl bootout`으로 자동 실행 등록을 먼저 해제했다.
- [ ] 정확한 plist와 관련 파일만 제거했다.
- [ ] 재부팅 후 대상 프로세스가 다시 실행되지 않는지 확인했다.
- [ ] 캐시 정리 전에 관련 앱을 모두 종료했다.
- [ ] Apple 보호 항목의 오류는 무시하고 강제 삭제하지 않았다.
- [ ] `du`와 `df`로 정리 전후 용량을 비교했다.

---

## 2. 정리 전 상태 기록

### 2.1 확인 명령

```bash
# 디스크 여유 공간
df -h /

# 사용자 캐시 전체 크기
du -sh ~/Library/Caches 2>/dev/null

# 용량이 큰 사용자 캐시 30개
du -sh ~/Library/Caches/* 2>/dev/null | sort -hr | head -30

# 1GB보다 큰 캐시 파일
find ~/Library/Caches -type f -size +1G -print 2>/dev/null
```

### 2.2 기록 기준

- 위 네 값을 9장의 기록표에 미리 적어 둔다.
- 보호된 Apple 캐시는 접근 제한 때문에 `du` 합계에서 빠질 수 있다.

---

## 3. 상주 프로세스 조사

### 3.1 활성 상태 보기에서 확인

1. **활성 상태 보기**를 연다.
2. CPU 탭에서 열 머리글을 우클릭해 **종류**를 표시한다.
3. CPU·메모리 사용량이 큰 항목과 이름을 모르는 항목을 목록화한다.
4. 프로세스 이름, 경로, 사용 중인 앱과의 관계를 조사한다.

### 3.2 Intel/Rosetta 프로세스 확인

Apple Silicon Mac에서 Intel용 실행 파일은 Rosetta를 통해 동작한다.  
오래된 서드파티 구성요소를 찾는 단서가 되지만, Intel이라는 이유만으로 삭제하지 않는다.

```bash
ps -axo pid,comm | while read -r pid comm; do
  arch=$(ps -p "$pid" -o arch= 2>/dev/null)
  [ "$arch" = "x86_64" ] && printf '%s %s\n' "$pid" "$comm"
done
```

### 3.3 실행 파일 경로 확인

프로세스 이름만으로는 소유 앱을 알 수 없다. 전체 경로를 확인한다.

```bash
ps -axo pid,arch,comm | grep -i '<키워드>' | grep -v grep
```

### 3.4 로그인 항목 확인

- **시스템 설정 → 일반 → 로그인 항목**에서 로그인 시 열리는 앱을 확인한다.
- 같은 화면의 백그라운드 허용 항목도 함께 확인한다.
- `launchctl`에 등록되지 않은 자동 실행이 여기에 있을 수 있다.

---

## 4. LaunchAgent와 LaunchDaemon 점검

### 4.1 세 위치의 파일 목록 확인

```bash
printf '\n=== User LaunchAgents ===\n'
ls -1 ~/Library/LaunchAgents 2>/dev/null

printf '\n=== System LaunchAgents ===\n'
ls -1 /Library/LaunchAgents 2>/dev/null

printf '\n=== System LaunchDaemons ===\n'
ls -1 /Library/LaunchDaemons 2>/dev/null
```

각 위치의 의미는 다음과 같다.

- `~/Library/LaunchAgents`: 현재 사용자 로그인 시 실행
- `/Library/LaunchAgents`: Mac에 설치된 사용자 세션용 에이전트
- `/Library/LaunchDaemons`: 시스템 수준의 백그라운드 서비스

### 4.2 plist 내용 확인

파일명만 보고 삭제하지 않는다.  
`Label`, `Program`, `ProgramArguments`로 실제 실행 파일과 소유 앱을 판단한다.

```bash
# 사람이 읽는 형식
plutil -p "/path/to/example.plist"

# 원본 XML
plutil -convert xml1 -o - "/path/to/example.plist"
```

### 4.3 특정 업체·앱 이름 검색

3장에서 만든 키워드를 `-iname` 패턴에 넣는다.

```bash
find ~/Library/LaunchAgents /Library/LaunchAgents /Library/LaunchDaemons \
  -type f \( \
  -iname '*<키워드1>*' -o \
  -iname '*<키워드2>*' \
  \) 2>/dev/null
```

- 캐시와 설정 전체를 재귀 검색하지 않는다.
- 위 세 자동 실행 디렉터리와 현재 프로세스에 집중한다.
- 실행되지 않는 설정·캐시 잔재는 CPU와 메모리를 쓰지 않는다.

---

## 5. 삭제와 유지 판단 기준

목록을 그대로 옮겨 쓰지 않는다. 항목마다 아래 질문에 답한다.  
하나라도 "모른다"가 남으면 이번에는 유지하고 조사 대상으로 남긴다.

### 5.1 판단 질문

1. **지금도 이 앱이나 장치를 쓰는가?**  
   쓰지 않으면 제거 후보다. 쓰고 있으면 유지한다.
2. **이 구성요소 없이 macOS 기본 기능으로 대체되는가?**  
   프린터·스캐너는 AirPrint/AirScan으로 대체될 수 있다.  
   제거 전에 5.2로 실제 시험한다.
3. **소유 앱이 무엇인지 확인했는가?**  
   `plutil -p`로 실행 파일 경로를 확인하지 못했다면 삭제하지 않는다.
4. **지우면 되돌릴 수 있는가?**  
   앱 재설치나 공식 언인스톨러로 복구되면 위험이 낮다.  
   복구 경로가 없으면 plist를 백업한다.
5. **재설치·재실행으로 다시 깔릴 가능성이 있는가?**  
   금융·공공기관 사이트의 보안 모듈은 다음 이용 시 다시 설치된다.  
   제거해도 영구적이지 않다.
6. **OS나 시스템 필수 항목인가?**  
   `/System/Library` 아래 항목과 Apple 서명 데몬은 대상에서 제외한다.
7. **업데이트·라이선스 구성요소인가?**  
   본체 앱을 계속 쓴다면 업데이터와 라이선스 helper는 유지한다.  
   같은 업체의 다른 제품만 지울 때 특히 주의한다.

### 5.2 대체 기능 사전 시험

- [ ] **시스템 설정 → 프린터 및 스캐너**에 장치가 AirPrint로 등록돼 있다.
- [ ] 테스트 페이지 또는 일반 문서를 실제로 인쇄했다.
- [ ] **이미지 캡처** 또는 장치의 스캔 기능으로 실제 스캔했다.
- [ ] 전용 기능이 필요한지 확인했다. 예: PC 푸시 스캔, 전용 워크플로, USB 제어.

기본 기능이 정상이고 전용 기능을 쓰지 않을 때만 제거 후보로 본다.

### 5.3 판단표

조사 결과를 아래 형식으로 정리한다. 이후 절차와 검증에 그대로 쓴다.

```text
| 항목 | 소유 앱 | plist 경로 | 사용 여부 | 대체 가능 | 판단 |
|------|---------|-----------|----------|----------|------|
|      |         |           |          |          | 삭제/유지/보류 |
```

---

## 6. `bootout` 후 제거하는 안전한 순서

### 6.1 공통 절차

1. 대상 plist 파일이 실제로 존재하는지 확인한다.
2. `plutil -p`로 실행 파일과 소유 앱을 확인한다.
3. 필요하면 plist를 별도 백업 폴더에 복사한다.
4. 사용자 에이전트는 `gui/UID`, 시스템 데몬은 `system` 도메인에서 `bootout`한다.
5. 대상 프로세스가 내려갔는지 `ps`로 확인한다.
6. 정확한 plist만 삭제한다.
7. 관련 지원 파일과 데이터 디렉터리를 별도로 확인해 제거한다.
8. 재부팅 후 다시 `ps`로 검증한다.

> [!CAUTION]
> `bootout`만 하면 다음 로그인이나 재부팅 때 plist에 의해 다시 실행된다.  
> plist만 먼저 지우면 실행 중인 프로세스가 재부팅 전까지 남는다.  
> 따라서 **`bootout` 후 삭제** 순서를 지킨다.

### 6.2 백업

```bash
backup_dir="$HOME/launchagent-backup-$(date +%Y%m%d)"
mkdir -p "$backup_dir"
cp "<대상 plist 경로>" "$backup_dir/"
```

### 6.3 사용자 LaunchAgent

```bash
target_plist="$HOME/Library/LaunchAgents/com.example.agent.plist"

[ -f "$target_plist" ] && plutil -p "$target_plist"
launchctl bootout "gui/$(id -u)" "$target_plist" 2>/dev/null
rm -f "$target_plist"
```

> [!WARNING]
> `com.example.agent.plist`는 예시다. 실제 경로로 바꾸기 전에 내용을 확인한다.

### 6.4 시스템 LaunchAgent

```bash
target_plist="/Library/LaunchAgents/com.example.agent.plist"

[ -f "$target_plist" ] && plutil -p "$target_plist"
launchctl bootout "gui/$(id -u)" "$target_plist" 2>/dev/null
sudo rm -f "$target_plist"
```

### 6.5 시스템 LaunchDaemon

```bash
target_plist="/Library/LaunchDaemons/com.example.daemon.plist"

[ -f "$target_plist" ] && plutil -p "$target_plist"
sudo launchctl bootout system "$target_plist" 2>/dev/null
sudo rm -f "$target_plist"
```

### 6.6 실행 중인 프로세스 종료

```bash
killall <프로세스명> 2>/dev/null
```

대상이 없다는 오류는 이미 내려가 있거나 실행 중이 아니라는 뜻이다.

### 6.7 지원 파일과 데이터 제거

plist 외에 실행 파일 본체와 사용자 데이터가 남는다. 경로를 하나씩 확인한다.

```bash
ls -ld "/Library/Application Support/<업체>" 2>/dev/null
ls -ld "$HOME/Library/Application Support/<번들 ID>" 2>/dev/null
ls -ld "/Library/Printers/<업체>" 2>/dev/null
```

> [!CAUTION]
> 상위 디렉터리를 통째로 지우지 않는다. 확인된 하위 경로만 대상으로 삼는다.  
> 같은 업체의 사용 중인 다른 제품이 같은 디렉터리를 공유할 수 있다.

### 6.8 와일드카드가 필요한 경우

파일명에 버전이나 해시가 붙으면 실제 일치 파일을 먼저 출력한다.

```bash
find /Library/LaunchAgents -maxdepth 1 -type f -name 'com.example.Helper.*.plist' -print
```

확인 없이 업체명 전체를 와일드카드로 삭제하면 사용 중인 앱까지 손상된다.

---

## 7. 재부팅 후 프로세스 검증

재부팅한 뒤 5.3 판단표에서 "삭제"로 표시한 항목의 키워드로 확인한다.

```bash
ps aux | grep -Ei '<키워드1>|<키워드2>|<키워드3>' | grep -v grep
```

### 7.1 결과 해석

| 결과 | 상태 | 다음 조치 |
|---|---|---|
| 출력 없음 | 해당 키워드의 상주 프로세스가 없음 | 완료 |
| 출력 있음 | 아직 실행 중 | 실행 파일 경로와 부모 프로세스 조사 |
| plist만 남음 | 현재 자원은 쓰지 않음 | 다음 로그인·재부팅 시 실행 여부 확인 |
| 등록·프로세스 모두 없음 | 설정·캐시 잔재 | 급히 삭제할 필요 없음 |

### 7.2 함께 확인할 것

- 활성 상태 보기의 로그인 항목과 Intel 프로세스
- 5.2에서 시험한 대체 기능

확인 범위는 키워드 기반이므로 모든 잔재를 보장하지 않는다.

---

## 8. 사용자 캐시 정리

### 8.1 실행 전 확인

- [ ] 모든 중요한 작업을 저장했다.
- [ ] 브라우저, IDE, 컨테이너 런타임 등 캐시를 쓰는 앱을 종료했다.
- [ ] `du`로 정리 전 크기를 기록했다.
- [ ] 첫 실행이 느려지고 인덱스가 다시 생성될 수 있음을 이해했다.

### 8.2 사용자 캐시 내용 전체 삭제

> [!CAUTION]
> 아래 명령은 `~/Library/Caches` 폴더는 남기고 안의 최상위 내용물을 즉시 삭제한다.  
> 실행 중인 앱의 임시 데이터와 로그인 상태 일부에 영향을 준다.  
> 필요한 캐시는 이후 다시 생성된다.

```bash
find ~/Library/Caches -mindepth 1 -maxdepth 1 -exec rm -rf {} +
```

- `*`에 잡히지 않는 숨김 항목까지 대상으로 삼는다.
- 경로를 임의로 바꾸지 않는다.

전체 삭제가 부담스러우면 2장에서 확인한 용량 상위 항목만 지운다.

```bash
rm -rf ~/Library/Caches/<확인한 디렉터리명>
```

### 8.3 `Operation not permitted`가 나올 때

macOS가 삭제를 막는 Apple 보호 캐시가 있다.

```text
familycircled                com.apple.homed
com.apple.HomeKit            com.apple.ap.adprivacyd
CloudKit                     com.apple.containermanagerd
com.apple.Safari             com.apple.Safari.SafeBrowsing
FamilyCircle
```

오류 예시:

```text
rm: ...: Operation not permitted
rm: ...: Permission denied
```

이 경우 다음과 같이 처리한다.

- 오류가 난 항목은 그대로 둔다.
- `sudo`를 붙여 다시 실행하지 않는다.
- 터미널에 전체 디스크 접근 권한을 부여해 강제 삭제하지 않는다.
- macOS가 관리하는 보호 데이터로 보고 정리 결과에서 제외한다.

---

## 9. 정리 후 용량 확인

```bash
du -sh ~/Library/Caches 2>/dev/null
df -h /
```

### 9.1 전후 기록표

```text
정리 전 ~/Library/Caches : __________
정리 후 ~/Library/Caches : __________
정리 전 df -h / Available: __________
정리 후 df -h / Available: __________
재부팅 후 대상 프로세스 : 있음 / 없음
대체 기능 재시험        : 성공 / 실패 / 해당 없음
```

### 9.2 두 수치가 어긋나는 이유

`du`는 디렉터리의 파일 크기 합계를, `df`는 파일시스템의 실제 여유 공간을 보여준다.  
아래 요인 때문에 두 수치의 변화량은 일치하지 않는다.

- APFS 스냅샷
- purgeable 공간
- 보호된 파일
- 앱의 캐시 재생성

---

## 10. 완료 체크리스트

- [ ] 재부팅 후 "삭제"로 표시한 프로세스가 보이지 않는다.
- [ ] 활성 상태 보기에서 정리 대상 프로세스가 사라졌다.
- [ ] 5.2에서 시험한 대체 기능이 여전히 정상이다.
- [ ] "유지"로 표시한 앱의 업데이트·라이선스 구성요소를 그대로 두었다.
- [ ] 남은 plist의 자동 실행 등록 상태를 확인했다.
- [ ] Apple 보호 캐시를 강제로 삭제하지 않았다.
- [ ] `du`와 `df`로 정리 전후 값을 기록했다.
- [ ] 백업한 plist의 보관 위치를 기록했다.

남은 설정·캐시 파일을 모두 찾으려 하지 않는다.  
실제로 자동 실행되거나 자원을 쓰는 항목을 중심으로 관리한다.

---

## 부록 A. 적용 사례 기록

> [!IMPORTANT]
> Mac 한 대를 정리하며 절차가 실제로 어떻게 적용됐는지 보여주는 기록이다.  
> 제품명과 경로는 일반화했으므로 명령을 그대로 복사해 실행할 수 없다.  
> 5장의 판단 질문을 자기 환경에 다시 적용한다.

환경: Apple Silicon Mac, 복합기 1대 연결, 삭제한 앱의 자동 실행 잔재 다수, 사용자 캐시 수십 GB.

### A.1 장치 전용 유틸리티 정리

대상은 복합기 제조사가 설치한 Intel/Rosetta 상주 구성요소 5개였다.  
이름은 `<제품>Server`, `<제품>AppControl` 형태로 역할이 서로 달랐다.

**판단 근거**

- 5.2 절차로 AirPrint 인쇄와 AirScan 스캔이 정상 동작하는 것을 확인했다.
- 제조사 전용 기능(PC 푸시 스캔, 전용 워크플로)을 사용하지 않았다.

**적용한 순서**

```bash
# 1. 현재 실행 중인지 확인
ps aux | grep -Ei '<제품 키워드>' | grep -v grep

# 2. 자동 실행 등록 해제
launchctl bootout gui/$(id -u) /Library/LaunchAgents/com.<업체>.<서비스>.plist 2>/dev/null

# 3. 남은 프로세스 종료
killall <프로세스1> <프로세스2> 2>/dev/null

# 4. 제거할 경로가 실제로 있는지 확인
ls -ld "/Library/Printers/<업체>/Utilities/Server" 2>/dev/null
ls -l /Library/LaunchAgents/com.<업체>.*.plist 2>/dev/null

# 5. 확인된 하위 경로와 plist만 제거
sudo rm -rf "/Library/Printers/<업체>/Utilities/Server"
sudo rm -f "/Library/LaunchAgents/com.<업체>.<서비스>.plist"

# 6. 사용자 계정의 서버 데이터 제거
rm -rf "$HOME/Library/Application Support/com.<업체>.<서비스>"
```

> [!CAUTION]
> 4단계에서 `/Library/Printers/<업체>` 상위 디렉터리 전체를 삭제하지 않았다.  
> 프린터 드라이버 본체가 같은 디렉터리에 있어 AirPrint까지 깨진다.  
> 확인된 `Utilities/Server` 하위만 대상으로 삼았다.

제조사 앱 본체는 별도 판단 대상으로 남겼다.  
앱을 다시 설치하면 전용 구성요소가 함께 설치된다.

### A.2 삭제로 판단한 항목

제품명 대신 분류와 판단 근거로 적는다. 같은 분류라도 사용 여부에 따라 결과가 달라진다.

| 분류 | 판단 근거 | 질문 |
|---|---|---|
| 사용을 중단한 앱의 updater와 LaunchAgent | 앱 본체를 이미 삭제했고 재사용 계획 없음 | 1 |
| PDF 뷰어의 업데이트·통신 구성요소 | 해당 제품군을 더 이상 사용하지 않음 | 1 |
| 클라우드 저장소의 updater와 동기화 보고 구성요소 | 해당 서비스를 사용하지 않음 | 1 |
| 웹 보안·인증 모듈 계열 | 상시 상주가 불필요하고 필요 시 재설치됨 | 1, 5 |

마지막 분류에는 키보드 보안, 전자서명, 통합 설치, DRM 계열이 함께 들어간다.  
이 분류는 영구 제거가 아니다. 해당 사이트를 다시 이용하면 자동으로 재설치된다.  
정리 시점의 상주 프로세스를 줄이는 효과만 있다.

### A.3 유지로 판단한 항목

| 분류 | 판단 근거 | 질문 |
|---|---|---|
| 브라우저 업데이트 구성요소 | 브라우저를 상시 사용 | 1, 7 |
| IDE 런처의 자동 실행 구성요소 | 개발에 상시 사용 | 1 |
| 주변기기 제조사 유틸리티 | 마우스·키보드·카메라 설정에 필요 | 1, 2 |
| VPN 클라이언트 서비스 | 네트워크 접속에 필요 | 1 |
| 컨테이너 런타임의 socket·네트워크 helper | 개발에 상시 사용 | 1 |
| 오피스 제품군의 업데이트·라이선스 helper | 클라우드 저장소만 제거하고 오피스는 계속 사용 | 7 |

마지막 행이 판단 질문 7번의 전형적인 사례다.  
같은 업체의 제품 하나를 지우면서 공용 구성요소까지 지우면 남긴 제품이 깨진다.  
업체 이름으로 묶어 삭제하지 않고 plist 단위로 소유 제품을 확인했다.

### A.4 처리한 항목 수

| 위치 | 제거 | 유지 |
|---|---|---|
| `~/Library/LaunchAgents` | 3 | 0 |
| `/Library/LaunchAgents` | 10 | 6 |
| `/Library/LaunchDaemons` | 7 | 4 |

일부 plist는 파일명에 버전 해시가 붙어 6.8 절차로 실제 파일을 먼저 확인했다.

```bash
find /Library/LaunchAgents -maxdepth 1 -type f -name 'com.<업체>.<제품>.*.plist' -print
```

### A.5 검증 결과

5.3 판단표에서 "삭제"로 표시한 항목의 키워드를 모아 재부팅 후 확인했다.

```bash
ps aux | grep -Ei '<키워드1>|<키워드2>|<키워드3>' | grep -v grep
```

- 위 명령의 출력이 없었다.
- 활성 상태 보기에서 정리 대상 Intel 프로세스가 사라졌다.
- AirPrint 인쇄와 AirScan 스캔이 정상이었다.
- `~/Library/Caches`가 수십 GB에서 수십 KB로 줄었다.
- `df -h /` 증가분은 `du` 감소분보다 작았다. APFS 스냅샷과 purgeable 공간 때문이다.
