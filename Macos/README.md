# macOS 개발 머신 관리 가이드

> 대상: 개발에 사용하는 Mac  
> 범위: 상주 프로세스, 자동 실행 항목, 저장공간  
> 제외: 프로젝트의 빌드·실행 절차. [09 실행 환경 준비하기](../Playbooks/09-prepare-runtime.md)에서 다룬다.

## 학습 순서

| 순서 | 문서 | 익혀야 할 내용 |
|---|---|---|
| 1 | [프로세스와 캐시 정리](./macos_01_background_cleanup_guide.md) | 자동 실행 항목, 삭제·유지 판단, 캐시 |

## 공통 원칙

머신 설정을 바꾸는 작업은 되돌릴 수 있는 순서로 진행한다.

- **조사 → 대체 기능 테스트 → 등록 해제 → 파일 제거 → 재부팅 → 검증** 순서를 지킨다.
- 삭제 명령은 경로와 파일명을 직접 확인한 뒤 실행한다.
- `rm -rf`는 휴지통을 거치지 않는다.
- `/System/Library`와 macOS 기본 프로세스는 건드리지 않는다.
- `Operation not permitted`가 나온 Apple 보호 항목은 강제로 삭제하지 않는다.
- 정체가 불명확한 항목은 삭제하지 말고 조사 대상으로 남긴다.

## 상태 확인 명령

작업 전후에 같은 기준으로 상태를 기록한다.

```bash
# 저장공간
df -h /
du -sh ~/Library/Caches 2>/dev/null

# 자동 실행 항목
ls -1 ~/Library/LaunchAgents /Library/LaunchAgents /Library/LaunchDaemons 2>/dev/null

# 상주 프로세스
ps -axo pid,arch,comm | grep -i '<키워드>' | grep -v grep
```

## 완료 기준

- 정리 대상으로 판단한 근거를 항목별로 남겼다.
- 재부팅 후 대상 프로세스가 다시 실행되지 않는 것을 확인했다.
- 유지하기로 한 앱의 기능이 그대로 동작한다.
- 정리 전후 저장공간을 기록했다.
