# CodeStream 기술문서

새로운 기능을 만들고 어려운 문제를 푸는 공통 작업 방식과, AI별 실행 방법을 안내해요.

여러 Skill의 결과를 연결할 때는 Playbook을 골라요.

단일 작업의 Skill 선택과 제품별 실행 방법은 플랫폼 문서에서 확인해요.

## 처음 시작하기

지금 목적에 맞는 경로를 골라요.

1. 여러 Skill을 이어야 한다면 흐름을 골라요: [Playbook](./Playbooks/README.md)
2. CodeStream 사용자 Skill(`ct-*`)은 [ai-comm-init](https://github.com/codestreamkr/ai-comm-init) 설치 후에 사용해요. clone과 배치 절차는 해당 저장소를 따라요.
3. 지금 쓰는 AI의 실행 방법을 확인해요: [Antigravity](./Platforms/Antigravity/README.md), [Codex](./Platforms/Codex/README.md), [Claude Code](./Platforms/ClaudeCode/README.md), [Grok Build](./Platforms/GrokBuild/README.md) 또는 [Pi](./Platforms/Pi/README.md)

Git, Python, macOS, IntelliJ 가이드는 아래 [문서 구성](#문서-구성)에서 골라요.  
웹 목차에서 전체 문서를 찾으려면 [CodeStream 기술문서 목록](./index.md)을 사용해요.

## 문서 구성

각 영역은 하나의 책임만 담당해요.

| 영역 | 책임 | 시작 문서 |
| --- | --- | --- |
| Playbooks | 여러 Skill을 연결하는 작업의 순서와 판단 기준 | [Playbook](./Playbooks/README.md) |
| Antigravity | 환경 설정, 사용자 Skill, 작업 흐름과 명령 확인 | [Antigravity 가이드](./Platforms/Antigravity/README.md) |
| Codex | 환경 설정, 사용자 Skill, 작업 흐름과 명령 확인 | [Codex 가이드](./Platforms/Codex/README.md) |
| Claude Code | 환경 설정, 사용자 Skill, 작업 흐름과 명령 확인 | [Claude Code 가이드](./Platforms/ClaudeCode/README.md) |
| Grok Build | 환경 설정, 사용자 Skill, 권한·세션과 Workflow | [Grok Build 가이드](./Platforms/GrokBuild/README.md) |
| Pi | 환경 설정, 사용자 Skill, Extension과 모델 연결 | [Pi 가이드](./Platforms/Pi/README.md) |
| Git | 변경 확인, 커밋, 복구, 브랜치와 충돌 해결 | [Git 필수 가이드](./Git/README.md) |
| Python | Python 생태계 이해와 웹 백엔드 구현 기준 | [Python 개발 가이드](./Python/README.md) |
| Macos | 개발용 Mac의 상주 프로세스와 저장공간 관리 | [macOS 개발 머신 관리 가이드](./Macos/README.md) |
| IntelliJ | IntelliJ IDEA 세션 기준으로 JVM/JS 런타임 검증 | [IntelliJ IDEA 개발 가이드](./IntelliJ/README.md) |

## AI별 구현 기준

같은 Skill을 어느 플랫폼에서 호출해도 필수 입력과 결과 기준은 같아요.  
다른 건 호출 표기와 실행 방법뿐이에요.  
Codex는 `$ct-*`, Antigravity, Claude Code와 Grok Build는 `/ct-*`, Pi는 `/skill:ct-*`를 사용해요.

## 문서 작성 기준

문서를 추가하거나 고칠 때는 [문서 포맷 기준](./DOC_FORMAT.md)을 따라요.

## 라이선스와 고지

저장소에서 직접 작성한 문서와 예제는 [MIT License](./LICENSE)를 따라요.

외부 서비스명, 상표, 브랜드 자산에는 각 권리자의 정책이 적용돼요.  
상세 범위는 [NOTICE.md](./NOTICE.md)를 확인해요.
