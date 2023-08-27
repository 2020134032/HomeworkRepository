GET "/"
- 응답 데이터: 메인 랜딩 페이지 (제품 정보 디스플레이)


GET "/login"
GET "/signup"
- 응답 데이터: 각각 html 파일 제공


GET "product/:product_id"
- 응답 데이터: 제품 상세정보와 제품별 댓글 써져있는 페이지 제공
- 메인 랜딩 페이지에서 제품 사진을 누를시 이쪽으로 리디렉션

POST "product/:product_id"
- 제품별 댓글 폼 정보 서버에 전송(JSON)
- JSON 형식으로 저장함
- (댓글 입력 버튼 누를시 POST 요청)
