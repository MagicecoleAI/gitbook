# GitBook 스타일 매뉴얼 사이트 테스트 문서

## 📋 테스트 개요
- **테스트 대상**: GitBook 스타일 매뉴얼 사이트
- **테스트 URL**: http://localhost:8080
- **테스트 일자**: 2025-06-17
- **참고 자료**: https://magiceco-1.gitbook.io/corp_admin

## 🎯 테스트 목표
GitBook 기관 관리자 매뉴얼을 참고하여 현재 개발된 사이트의 기능과 UI/UX를 체계적으로 테스트

## ✅ 테스트 체크리스트

### 1. 기본 접근성 테스트
- [ ] 메인 페이지 로딩 (http://localhost:8080)
- [ ] 페이지 로딩 속도 (2초 이내)
- [ ] 반응형 디자인 (데스크톱/태블릿/모바일)
- [ ] 브라우저 호환성 (Chrome, Safari, Firefox)

### 2. 레이아웃 및 네비게이션 테스트
- [ ] 3단 레이아웃 구조 (사이드바, 메인, 우측 패널)
- [ ] 헤더 네비게이션 표시
- [ ] 사이드바 메뉴 표시 및 작동
- [ ] 모바일에서 햄버거 메뉴 작동
- [ ] 다크/라이트 모드 전환 (있는 경우)

### 3. 콘텐츠 렌더링 테스트
- [ ] 마크다운 파일 렌더링
- [ ] 목차 자동 생성 및 표시
- [ ] 코드 블록 하이라이팅
- [ ] 이미지 표시 및 최적화
- [ ] 표(Table) 렌더링
- [ ] 링크 작동 확인

### 4. 네비게이션 기능 테스트
- [ ] 메뉴 항목 클릭 시 페이지 이동
- [ ] 브레드크럼 네비게이션 (있는 경우)
- [ ] 이전/다음 페이지 버튼 (있는 경우)
- [ ] 페이지 내 앵커 링크 이동
- [ ] 뒤로 가기/앞으로 가기 버튼

### 5. 검색 기능 테스트 (구현된 경우)
- [ ] 검색 입력 필드 표시
- [ ] 키보드 단축키 (Cmd+K 또는 Ctrl+K)
- [ ] 검색 결과 표시
- [ ] 자동완성 기능 (있는 경우)
- [ ] 검색 결과 하이라이팅

### 6. 에디터 기능 테스트 (/editor)
- [ ] 에디터 페이지 접근 (http://localhost:8080/editor)
- [ ] 파일 탐색기 사이드바 표시
- [ ] Monaco 에디터 로딩 및 작동
- [ ] 마크다운 실시간 프리뷰
- [ ] 파일 선택 시 내용 로드
- [ ] 파일 편집 및 저장 기능
- [ ] 사이드바 토글 기능
- [ ] 새 파일 생성 기능 (있는 경우)
- [ ] 파일 삭제 기능 (있는 경우)

### 7. 기관 관리자 매뉴얼 참고 기능 테스트
#### 7.1 시작하기 섹션
- [ ] 로그인 페이지 또는 설명
- [ ] 회원가입 프로세스 설명
- [ ] 아이디 찾기 기능 설명
- [ ] 용어 설명 페이지

#### 7.2 메뉴별 사용법
- [ ] 기관선택 관련 문서
- [ ] 서비스 대시보드 설명
- [ ] 커뮤니티 기능 설명
- [ ] 공지사항 관리 설명

#### 7.3 캠페인 관리 기능
- [ ] 캠페인 대시보드 설명
- [ ] 캠페인 공지사항 관리
- [ ] 질의응답 시스템 설명
- [ ] 캠페인 활동 관리

#### 7.4 액티비티 관리
- [ ] 섹션 추가/순서 변경 설명
- [ ] 일반 액티비티 관리
- [ ] 영상 액티비티 관리
- [ ] 과제 액티비티 및 평가
- [ ] 시험 액티비티 및 문항 관리

#### 7.5 관리자 기능
- [ ] 캠페인 멤버 관리 설명
- [ ] 캠페인 정보 관리
- [ ] 관리자 대시보드 설명
- [ ] 기관 전체 관리 기능
- [ ] 사용자 관리 및 로그 관리

### 8. 성능 및 최적화 테스트
- [ ] 페이지 로딩 속도 측정
- [ ] 이미지 최적화 확인
- [ ] 캐싱 동작 확인
- [ ] 메모리 사용량 모니터링
- [ ] SEO 메타 태그 확인

### 9. 접근성 테스트
- [ ] 키보드 네비게이션 가능
- [ ] 스크린 리더 호환성
- [ ] 색상 대비율 확인
- [ ] alt 태그 및 aria 속성 확인
- [ ] 포커스 인디케이터 표시

### 10. 오류 처리 테스트
- [ ] 404 페이지 처리
- [ ] 잘못된 URL 접근 시 처리
- [ ] 네트워크 에러 시 처리
- [ ] 파일 로딩 실패 시 처리
- [ ] JavaScript 에러 발생 시 처리

## 📊 테스트 결과 기록

### 테스트 환경
- **OS**: macOS (M4)
- **브라우저**: 
- **해상도**: 
- **테스트 시작 시간**: 
- **테스트 완료 시간**: 

### 발견된 이슈
| 번호 | 카테고리 | 이슈 설명 | 우선순위 | 상태 |
|------|----------|-----------|----------|------|
| 1    |          |           | High/Medium/Low | Open/Fixed |
| 2    |          |           |          |      |
| 3    |          |           |          |      |

### 성공한 기능
- [ ] 기본 페이지 로딩
- [ ] 레이아웃 구조
- [ ] 네비게이션 기능
- [ ] 콘텐츠 렌더링
- [ ] 에디터 기능
- [ ] 반응형 디자인

### 개선 제안사항
1. **UI/UX 개선**:
   - 
   
2. **기능 추가**:
   - 
   
3. **성능 최적화**:
   - 

## 🚀 테스트 진행 방법

### 1단계: 자동화된 기본 테스트
```bash
# 1. 사이트 실행 확인
curl -I http://localhost:8080

# 2. 에디터 페이지 확인  
curl -I http://localhost:8080/editor

# 3. API 엔드포인트 확인 (있는 경우)
curl -I http://localhost:8080/api/docs
```

### 2단계: 브라우저 테스트 (Playwright)
```javascript
// 기본 페이지 로딩 테스트
await page.goto('http://localhost:8080');
await page.screenshot({ path: 'homepage.png' });

// 에디터 페이지 테스트
await page.goto('http://localhost:8080/editor');
await page.screenshot({ path: 'editor.png' });

// 네비게이션 테스트
await page.click('[data-testid="menu-item"]');
```

### 3단계: 수동 테스트
1. **데스크톱 브라우저 테스트**
   - Chrome에서 전체 기능 테스트
   - Safari에서 호환성 확인
   - Firefox에서 레이아웃 확인

2. **모바일 반응형 테스트**
   - 개발자 도구로 모바일 뷰 확인
   - 실제 모바일 기기에서 테스트

3. **기능별 상세 테스트**
   - 각 체크리스트 항목을 순차적으로 테스트
   - 발견된 이슈는 즉시 기록

## 📝 테스트 완료 후 액션 아이템
- [ ] 발견된 버그 수정
- [ ] 성능 개선 작업
- [ ] 문서 업데이트
- [ ] 다음 개발 단계 계획 수립
- [ ] GitHub Issues 등록

---
**테스트 문서 버전**: 1.0  
**최종 업데이트**: 2025-06-17  
**담당자**: 개발팀

