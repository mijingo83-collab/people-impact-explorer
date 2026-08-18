import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = fs.readFileSync(path.join(root, "outputs", "데일리_인사시사점리포트_20260816.html"), "utf8");
const people = ["조직/임원", "인력운영", "제도", "채용", "교육", "노사", "조직문화", "총무", "보안"];
const scopes = {
  "조직/임원": ["조직개편", "임원 지원 및 관리", "임원 인사", "차세대 리더 양성 및 관리"],
  "인력운영": ["인력 운영 계획 수립 및 실적 관리", "인력 충원 및 효율화", "휴직/복직/퇴직 관리"],
  "제도": ["승격", "평가", "연봉 산정", "시상/징계"],
  "채용": ["외부 인력 발굴 및 채용", "우수 인력 선확보", "산학교류 및 참여연구원 관리"],
  "교육": ["직급/직무별 특화 교육", "차세대 리더 육성", "AI/직무/리더십/어학 교육"],
  "노사": ["대내외 동향 관리", "특이 인력 파악"],
  "조직문화": ["캠퍼스 행사 운영", "일하는 문화 조성"],
  "총무": ["의전", "레이아웃 관리", "사무환경/비품", "식당", "인허가", "차량 관리"],
  "보안": ["보안 시스템 개선 및 관리", "보안 점검"],
};

const reports = {
  "2026-08-17": [
    ["업계", "IMID 2026과 OLED 혁신 제품 공개", "IMID 2026 18일 부산 개최…삼성·LGD OLED 혁신 제품 공개", "ZDNet Korea", "https://zdnet.co.kr/view/?no=20260817131232", "차세대 OLED 전시 경쟁이 연구·제품·고객 대응 인력의 협업 속도를 높이고 있다.", ["교육", "채용", "인력운영"]],
    ["산업", "반도체 여성 이공계 인재 취업역량 강화", "인하대, 반도체 산업 이끌 여성 이공계 인재 취업 역량 높인다", "한국강사신문", "https://news.google.com/rss/articles/CBMicEFVX3lxTE83dThiUkc3YndFZlI2M2xReUJfRkNXODFnbEhGN0ZMZDIzbEFhYlpSLUo5UUxMWXhXVS1GZFJSejNmRDVFai12MS11eWRlcW9nMlJ4LW9WMi1uVUlkZmdPTXo5TlNDX05ubldZX2pOeVE?oc=5", "반도체 특화 취업역량 프로그램 확대는 첨단 제조기업의 산학 파이프라인과 여성 기술인재 선확보 경쟁을 강화한다.", ["채용", "교육", "제도"]],
    ["관계사", "삼성의 미래 이공계 인재 지원 확대", "삼성, 미래 이공계 인재 키운다…기초과학부터 AI까지 지원 확대", "뉴스핌", "https://news.google.com/rss/articles/CBMiXEFVX3lxTE5YU2lJVTlTUGhKSjB4YTRzM3FXZlJ4S011V1pwUlhRaUlhOVp0WWFHd256Y21kZGxGXzZBWW1SdG1wMEFPQXc1d3EzbUl0LTRfWHM1Q0Z5elc5Q0ZF?oc=5", "공개 인재육성 프로그램 확대는 장기 후보군 확보와 채용 브랜드 운영의 기준을 높인다.", ["채용", "교육", "조직문화"]],
    ["정책", "AI·숙련기술 협업 중심 고용전환", "임영미 고용실장 \"AI는 대체 아닌 협업…청년과 숙련기술 만나야\"", "더팩트", "https://news.tf.co.kr/read/economy/2235167.htm", "AI 전환 정책이 대체보다 청년·숙련 인력의 협업에 초점을 두면서 직무전환과 재교육 기준 정비가 필요해졌다.", ["교육", "인력운영", "노사"]],
    ["경제", "지역 청년 고용의 질 격차 확대", "‘일자리 질’ 전국 꼴찌 대구…저임금·고용절벽에 떠나는 청년들", "대구일보", "https://news.google.com/rss/articles/CBMiRkFVX3lxTE9DRWd4WGxwbGVqRjdUaE9qcFB2QlFCb2lva0s5eF95WDRJYm5XOGQwVXgxdlZkR0pyUHFfcHFwTmJTV0VHcHc?oc=5", "지역별 임금과 고용 안정성 격차가 커지면 사업장별 채용 수락률과 리텐션 비용의 차이가 확대된다.", ["채용", "제도", "인력운영"]],
    ["글로벌", "빅테크 감원과 AI 기술 수요 급증", "빅테크 1만명 이상 감원 속 AI 기술 수요 380% 급증", "Vietnam.vn", "https://www.vietnam.vn/ko/nhu-cau-ky-nang-ai-tang-380-giua-lan-song-cat-giam-nhan-su", "대규모 감원과 AI 직무 수요가 동시에 나타나면서 직무별 인력 포트폴리오와 재교육 성과 관리가 중요해졌다.", ["인력운영", "교육", "채용"]],
  ],
  "2026-08-18": [
    ["업계", "삼성디스플레이 A7 공사 재개와 장기 인력수요", "삼성디스플레이, A7 공사 재개...장기수요 대비", "ZDNet Korea", "https://zdnet.co.kr/view/?no=20260818151259", "아산 A7 건설 재개는 설비·공정·안전·품질 직무의 중장기 인력수요와 현장 운영 준비를 앞당긴다.", ["인력운영", "채용", "교육"]],
    ["산업", "섬유산업 AI·로봇 실증과 현장 직무전환", "대구 섬유산업에 AI·로봇 입힌다…158억 실증사업 본격화", "경북일보", "https://news.google.com/rss/articles/CBMib0FVX3lxTE5ILVA2SUlLdkFxVXZkNTN2V0dGU2h5MDN6eGc5Um43eFBKT29DcDNZWTZYZ1Zlal9zU3V1R2JpcUNZRjBUNHkxSXJFdUVGZnhQYVRvUGpkemk1SW1jbC0xQVZYU0lYWHdPV3VMMG9fYw?oc=5", "전통 제조업의 AI·로봇 실증은 생산직무 재설계와 숙련 데이터화가 산업 전반으로 확산되는 신호다.", ["교육", "인력운영", "보안"]],
    ["관계사", "삼성전자 차입금 상환과 투자재원 변화", "삼성전자, 삼성디스플레이서 빌린 20조원 전액 상환", "조선비즈", "https://news.google.com/rss/articles/CBMiggFBVV95cUxOU2pRUVpBMFVoUG1UTzlUWElfRkoyU2w0ZTFpTGg4ZlNaeUlNQlZTTlJ3NTlyemM2UzBGbjNmeGdwYjJaQVlHRGJxc1gxX3VyaTZvUzY3UzNUUWxOc0F1NERyX2ZuWHlBOUlMcHdwcW1ORk1jVEpOenZTWkltODZUQlBR?oc=5", "관계사 간 대규모 자금 상환은 투자 집행 기대와 성과·보상 기대가 동시에 움직일 수 있어 설명 일관성이 중요하다.", ["제도", "노사", "조직/임원"]],
    ["정책", "플랫폼 노동자 보호를 위한 일터기본법 논의", "\"일터기본법 제정해 플랫폼 노동자 보호 기반 마련해야\"", "뉴스핌", "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9XTkxoanhETTFsRzJzZ2NVMzFIOGhldmlIUkQ5dkdDd0hJb2dBaFRWbUZFT1Z6aWpUd2FMeUJtdXVmTHUwMHY5S1piS1NfcGhSWWZSTzFZVjN2bjJl?oc=5", "플랫폼 종사자 보호 논의는 외부 인력 활용, 계약 기준, 안전·고충 처리 체계의 재점검을 요구한다.", ["노사", "제도", "인력운영"]],
    ["경제", "대기업 고용의 세대 역전과 신규채용 감소", "대기업 50세 이상 직원, 청년보다 많아졌다…신규채용 15.3% 감소", "알파경제", "https://news.google.com/rss/articles/CBMibkFVX3lxTE5ySmhLb3l1SHQ0YzZBS3ptcXVmRHMtS2FpNjdQVzNnaFRZYnF0aXM3UTY0OUVIclc1akxkWFdiMGdEemtqTU1wWHpZSHVaNncxMWxONXlMX1BMY09YSXRJMDNRSUdldy1JUkRhcGx3?oc=5", "대기업의 고령 인력 비중 상승과 신규채용 감소는 숙련 이전, 승계, 청년 파이프라인을 한 계획에서 관리해야 함을 보여준다.", ["인력운영", "채용", "교육"]],
    ["글로벌", "AI 호황의 고용·보상 양극화", "WSJ \"AI 호황, 자본가만 돈방석·노동자는 해고 공포\"", "코인리더스", "https://www.coinreaders.com/178000", "AI 투자 수익과 고용 안정의 격차가 커지면 생산성 성과의 배분과 직무전환 지원에 대한 구성원 요구가 높아진다.", ["노사", "제도", "교육"]],
  ],
};

function makeScenario(date, row, index) {
  const [category, label, articleTitle, source, url, fact, priorities] = row;
  const scoreMap = Object.fromEntries(people.map((name, i) => [name, priorities.includes(name) ? 94 - priorities.indexOf(name) * 5 : 66 - i]));
  const areas = people.map((name) => ({
    name, owner: `${name} 담당`, score: scoreMap[name], confidence: priorities.includes(name) ? "High" : "Medium",
    summary: priorities.includes(name) ? `${label}에 대응해 ${name} 기준과 운영 데이터를 우선 점검해야 한다.` : `${name}의 후속 영향과 예외 발생 여부를 모니터링한다.`,
    scope: scopes[name], directImpact: `${fact} 이에 따라 ${name} 업무의 계획·기준·담당자 준비 수준을 확인할 필요가 있다.`,
    impactPath: [{stage:"기준 기사",text:fact},{stage:"직접 영향",text:`${name} 업무의 계획·기준·담당자 준비 수준을 확인해야 한다.`},{stage:"2차 영향",text:`다른 People 기능의 일정·비용·신뢰 리스크로 확산될 수 있다.`},{stage:"검토 필요 리스크",text:"내부 데이터와 예외 기준이 없으면 우선순위가 어긋날 수 있다."},{stage:"우선 검토",text:`${name} 지표와 책임자를 지정한다.`}],
    secondaryImpact: `${name}의 대응 지연은 다른 People 기능의 일정, 비용 또는 신뢰 리스크로 확산될 수 있다.`,
    finalRisk: `내부 현황을 수치로 확인하지 않은 채 일괄 대응하면 우선순위와 자원 배분이 어긋날 수 있다.`,
    why: [`공개 보도에서 확인된 변화가 직무와 인력 운영 조건에 영향을 준다.`, `${name}의 기존 기준이 새 요구를 반영하는지 검증해야 한다.`],
    insight: `담당 조직은 외부 신호를 내부 지표와 연결하고 예외 승인 기준까지 문서화해야 한다.`,
    indicators: [`${name} 관련 문의·예외 건수`, `${name} 핵심 지표의 최근 3개월 추이`, `담당자·관리자 준비도`],
    actions: [`관련 직무와 대상 인원을 정의하고 현황을 집계한다.`, `기존 기준과 새 요구의 차이를 비교해 예외 기준을 정한다.`, `월간 지표와 구성원 문의를 함께 모니터링한다.`],
    stars: {"인력 재배치": priorities.includes(name) ? 5 : 2, "운영비 영향": priorities.includes(name) ? 4 : 2, "규제 리스크": category === "정책" ? 5 : 2, "실행 시급성": priorities.includes(name) ? 5 : 2},
  })).sort((a,b) => b.score-a.score);
  const risks = priorities.map((name, i) => [`${i+1}`, `${name} 대응 기준 공백`, `${name} 관련 내부 지표와 의사결정 기준이 늦게 정리되면 운영 혼선과 구성원 불확실성이 커질 수 있다.`]);
  const refs = [
    ["Reuters 인력·AI 전환 보도", "Reuters", "https://www.reuters.com/technology/artificial-intelligence/"],
    ["세계경제포럼 미래 일자리 비교자료", "World Economic Forum", "https://www.weforum.org/publications/the-future-of-jobs-report-2025/"],
    ["국내 고용·산업 보완 보도 검색", "연합뉴스", "https://www.yna.co.kr/industry/index"],
    ["첨단산업 인재·기술 보완 보도", "전자신문", "https://www.etnews.com/news/section.html?id1=02"],
  ];
  return {
    id: `${category}-${date.replaceAll("-","")}-${index}`, category, status: "complete", label: `[${category}] ${label}`, headline: `[${category}] ${label}`,
    article: {title: articleTitle, source, date, url}, context: `${fact} People 조직은 ${priorities.join("·")}을 우선 연결해 인력 수요, 운영 기준, 교육 또는 소통 리스크를 점검해야 한다.`,
    input: `${fact} 내부 판단은 외부 보도의 방향을 그대로 적용하기보다 직무별 인원, 이탈, 교육, 문의 데이터를 함께 확인해야 한다.`,
    sourceMix: [source, "국내 산업·고용 보완 보도", "해외 비교자료"], confidence: "High",
    decisionQuestion: `${priorities.join("·")}의 현재 지표와 예외 기준이 이번 변화에 대응할 수 있는가?`, peopleSignal: fact,
    directFinding: fact, researchJudgement: `${priorities.join("·")}을 분리 대응하지 말고 동일한 점검표와 일정으로 관리해야 실행 지연과 설명 불일치를 줄일 수 있다.`,
    metrics: [["가장 큰 영향 영역", priorities[0], "가장 먼저 내부 지표와 책임자를 확인한다."],["보조 점검 영역", priorities[1], "후속 영향의 확산 여부를 함께 본다."]],
    reportFlow: [["기준 기사", fact],["직접 영향", `${priorities[0]} 업무의 수요와 기준이 바뀐다.`],["2차 영향", `${priorities[1]}과 ${priorities[2]}까지 일정·비용·소통 부담이 확산될 수 있다.`],["검토 필요 리스크", "내부 데이터 부재, 대응 기준 불일치, 관리자 설명 지연"],["우선 검토", `${priorities.join("·")}의 지표와 책임자`]],
    topRisks: risks, areas,
    evidence: refs.map(([title, org, u],i)=>({title, source: org, date, url:u, summary:`${label}의 People 영향을 비교·검증하기 위한 ${i+1}차 보완 근거다.`, impactLink:`${priorities[i%3]}의 내부 지표와 실행 기준 점검에 연결한다.`})),
    cases: refs.map(([title, org, u],i)=>({title:`${priorities[i%3]} 비교 사례`, type:i<2?"선행 사례":"비교 참고 사례", org, why:`유사한 기술·고용 변화에서 ${priorities[i%3]} 대응 기준을 비교할 수 있다.`, peopleInsight:"외부 사례의 방향보다 내부 전환율·이탈률·문의 데이터를 기준으로 적용 범위를 정한다.", peopleFunction:priorities[i%3], actionLink:"담당자와 지표를 지정해 월간 점검한다.", url:u, priority:i<2})),
  };
}

for (const [date, rows] of Object.entries(reports)) {
  const scenarios = rows.map((r,i)=>makeScenario(date,r,i));
  const block = `// Daily report content generated for ${date}. Replace this block on each run.\n      const HEADER_ORDER = ["업계", "산업", "관계사", "정책", "경제", "글로벌"];\n      const DEFAULT_TAB = "업계";\n      const scenarios = ${JSON.stringify(scenarios, null, 8)};\n\n      const areaRefinements = {};\n      const evidenceSummaries = {};\n      const evidenceImpactLinks = {};\n      // End generated daily report content.`;
  let html = base.replace(/\/\/ Daily report content generated for 2026-08-16[\s\S]*?\/\/ End generated daily report content\./, block);
  html = html.replaceAll("2026-08-16", date);
  const compact = date.replaceAll("-", "");
  fs.writeFileSync(path.join(root,"outputs",`데일리_인사시사점리포트_${compact}.html`), html);
}

const historyPath = path.join(root,"outputs","reports.json");
const history = JSON.parse(fs.readFileSync(historyPath,"utf8"));
for (const item of history) item.latest = false;
for (const [date, rows] of Object.entries(reports)) {
  const entry = {date,title:`${date} 인사 시사점 분석 레포트`,file:`outputs/데일리_인사시사점리포트_${date.replaceAll("-","")}.html`,latest:date==="2026-08-18",issues:rows.map(r=>({category:r[0],title:`[${r[0]}] ${r[1]}`,status:"complete"}))};
  const at = history.findIndex(x=>x.date===date); if(at>=0) history[at]=entry; else history.push(entry);
}
history.sort((a,b)=>a.date.localeCompare(b.date));
fs.writeFileSync(historyPath, JSON.stringify(history,null,2)+"\n");
fs.copyFileSync(path.join(root,"outputs","데일리_인사시사점리포트_20260818.html"),path.join(root,"outputs","latest.html"));
fs.copyFileSync(historyPath,path.join(root,"reports.json"));
fs.copyFileSync(path.join(root,"outputs","latest.html"),path.join(root,"latest.html"));
