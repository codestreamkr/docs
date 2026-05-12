# basic-pi-package

Pi package 예시다.

## 포함 리소스

- Extension: `package_scripts` custom tool
- Prompt template: `/ready-pr`
- Skill: `/skill:project-check`

## 설치

문서 저장소 루트에서 프로젝트 로컬로 설치한다.

```bash
pi install -l ./PI/examples/basic-pi-package
```

다른 프로젝트에서 사용할 때는 절대 경로를 사용한다.

```bash
pi install -l /path/to/docs/PI/examples/basic-pi-package
```

## 확인

```bash
pi list
```

Pi 안에서 실행한다.

```text
/ready-pr
/skill:project-check
```
