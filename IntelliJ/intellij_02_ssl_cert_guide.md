# IntelliJ 사내 SSL 인증서 설정 가이드

> 대상: 사내망에서 IntelliJ IDEA와 Google Antigravity 등 AI 에이전트를 쓰는 개발자  
> 목적: 사내 루트 인증서 추출과 환경 변수 등록으로 SSL 오류 해결  
> 원칙: 인증서 추출과 환경 변수 등록을 원클릭 스크립트로 자동화해요.

사내망 환경에서 Google Antigravity 등 AI 에이전트 로그인 시 발생하는 SSL 인증서 오류를 해결해요.  
PowerShell 스크립트로 사내 루트 인증서를 추출해 `.gemini/cacert.pem`을 생성하고 필요한 환경 변수를 등록해요.

## 1. 사내 PC SSL 인증서 오류 해결 스크립트

PowerShell을 열고 아래 스크립트를 그대로 복사해 붙여넣고 엔터를 눌러요.

```powershell
# 1. 사내 루트 인증서 추출 및 cacert.pem 생성
$caPath = "$env:USERPROFILE\.gemini\cacert.pem"
New-Item -ItemType Directory -Path "$env:USERPROFILE\.gemini" -Force | Out-Null
$sb = [System.Text.StringBuilder]::new()
$exported = [System.Collections.Generic.HashSet[string]]::new()

@("Cert:\CurrentUser\Root", "Cert:\LocalMachine\Root") | ForEach-Object {
    Get-ChildItem $_ -ErrorAction SilentlyContinue | ForEach-Object {
        if ($_.Thumbprint -and $exported.Add($_.Thumbprint)) {
            $b64 = [Convert]::ToBase64String($_.Export([Security.Cryptography.X509Certificates.X509ContentType]::Cert), [Base64FormattingOptions]::InsertLineBreaks)
            [void]$sb.AppendLine("-----BEGIN CERTIFICATE-----`n$b64`n-----END CERTIFICATE-----`n")
        }
    }
}
[IO.File]::WriteAllText($caPath, $sb.ToString(), [Text.Encoding]::UTF8)

# 2. 필수 환경 변수 영구 등록 (User)
@("REQUESTS_CA_BUNDLE", "HTTPLIB2_CA_CERTS", "SSL_CERT_FILE", "GRPC_DEFAULT_SSL_ROOTS_FILE_PATH", "CURL_CA_BUNDLE") | ForEach-Object {
    [Environment]::SetEnvironmentVariable($_, $caPath, "User")
}

Write-Host "✅ 설정 완료! IntelliJ 재시작 후 로그인하세요." -ForegroundColor Green
```

## 2. 실행 후 작업

1. IntelliJ를 완전히 종료한 뒤 다시 실행해요.
2. Google Antigravity 로그인을 다시 시도해요. 브라우저에서 승인하면 자동으로 완료돼요.

## 3. 등록되는 환경 변수

스크립트가 사용자 환경 변수에 영구 등록하는 항목이에요.

| 환경 변수 | 대상 도구 및 라이브러리 |
| --- | --- |
| `REQUESTS_CA_BUNDLE` | Python Requests 라이브러리 |
| `HTTPLIB2_CA_CERTS` | Python Httplib2 라이브러리 |
| `SSL_CERT_FILE` | OpenSSL, Python ssl 모듈 기본값 |
| `GRPC_DEFAULT_SSL_ROOTS_FILE_PATH` | gRPC 통신 (Google API 및 Antigravity 클라이언트) |
| `CURL_CA_BUNDLE` | cURL 및 Git 툴체인 |

## 4. 설정 롤백 (환경 변수 및 인증서 삭제)

등록한 환경 변수와 인증서 파일을 원래대로 삭제하려면 아래 스크립트를 실행해요.

```powershell
# 1. 등록된 환경 변수 제거 (User)
@("REQUESTS_CA_BUNDLE", "HTTPLIB2_CA_CERTS", "SSL_CERT_FILE", "GRPC_DEFAULT_SSL_ROOTS_FILE_PATH", "CURL_CA_BUNDLE") | ForEach-Object {
    [Environment]::SetEnvironmentVariable($_, $null, "User")
}

# 2. cacert.pem 파일 제거
$caPath = "$env:USERPROFILE\.gemini\cacert.pem"
if (Test-Path $caPath) {
    Remove-Item $caPath -Force
}

Write-Host "✅ 설정 롤백 완료!" -ForegroundColor Green
```

## 5. 다음 단계

- 로그인 완료 후 IntelliJ에서 Antigravity 에이전트와 대화를 시작해요.
- 런타임 검증이 필요하면 [IntelliJ 런타임 디버깅 가이드](./intellij_01_runtime_debug_guide.md)를 참고해요.
