import fs from "node:fs/promises";
import path from "node:path";

const root = "C:/Users/Administrator/Documents/Codex/2026-06-24/so";
const outputsDir = path.join(root, "outputs");
const templatePath = path.join(outputsDir, "template.html");
const reportsPath = path.join(outputsDir, "reports.json");
const latestPath = path.join(outputsDir, "latest.html");

const reportDate = "2026-06-26";
const reportDateCompact = "20260626";
const datedFile = `outputs/데일리_인사시사점리포트_${reportDateCompact}.html`;
const datedPath = path.join(root, datedFile);

const peopleScope = {
  "조직/임원": ["조직개편", "임원 지원 및 관리", "임원 인사", "차세대 리더 양성 및 관리"],
  인력운영: ["인력 운영 계획 수립 및 실적 관리", "인력 충원 및 효율화", "휴직/복직/퇴직 관리"],
  제도: ["승격", "평가", "연봉 산정", "시상/징계"],
  채용: ["외부 인력 발굴 및 채용", "우수 인력 선확보", "산학교류 및 참여연구원 관리"],
  교육: ["직급/직무별 특화 교육", "차세대 리더 육성", "AI/직무/리더십/어학 교육"],
  노사: ["대내외 동향 관리", "특이 인력 파악"],
  조직문화: ["캠퍼스 행사 운영", "일하는 문화 조성"],
  총무: ["의전", "레이아웃 관리", "사무환경/비품", "식당", "인허가", "차량 관리"],
  보안: ["보안 시스템 개선 및 관리", "보안 점검"],
};

function stars(redeploy, cost, regulation, urgency) {
  return {
    "인력 재배치": redeploy,
    "운영비 영향": cost,
    "규제 리스크": regulation,
    "실행 시급성": urgency,
  };
}

function area(
  name,
  owner,
  score,
  confidence,
  summary,
  why,
  insight,
  starSet,
  actions,
  directImpact,
  finalRisk,
  indicators,
) {
  return {
    name,
    owner,
    score,
    confidence,
    summary,
    why,
    insight,
    stars: starSet,
    actions,
    scope: peopleScope[name],
    directImpact,
    finalRisk,
    indicators,
  };
}

const scenarios = [
  {
    id: "kr-semiconductor-cluster-20260626",
    label: "호남 반도체 클러스터",
    headline: "삼성 ‘호남 팹’ 급물살… K반도체 벨트 키운다",
    article: {
      title: "삼성 ‘호남 팹’ 급물살… K반도체 벨트 키운다",
      source: "동아일보",
      date: "2026-06-26",
      url: "https://www.donga.com/news/article/all/20260626/134185829/2",
    },
    context:
      "기준 기사만 보면 광주·전남 반도체 투자 가속화다. 보완 기사까지 보면 인사 쟁점은 공장 유치 자체보다 지방 거점으로 옮겨갈 핵심 인재, 주거·교육 지원, 단계별 전배 기준을 누가 먼저 설계하느냐에 있다.",
    input:
      "광주·전남 반도체 전공정 팹과 충청·영남 AI 프로젝트가 묶인 3대 메가 프로젝트는 단순 투자 뉴스가 아니라 채용, 전배, 정주 지원, 지원조직 운영을 동시에 열어젖히는 People 이슈다. 지방 클러스터를 우대하는 주거·교육·인프라 지원이 함께 거론된 만큼 핵심 직무 채용과 근무지 전환 정책을 분리하지 말고 같은 계획 안에서 검토해야 한다.",
    sourceMix: ["동아일보 기준 기사", "동아일보 정책 기사", "동아일보 TSMC 비교 기사"],
    confidence: "High",
    decisionQuestion: "신규 지방 거점 착수 전 핵심 직무의 현지 채용, 수도권 전배, 주거·교육 지원 기준이 이미 정리돼 있는가?",
    peopleSignal: "지방 투자 발표가 확정되면 채용과 총무, 제도, 전배 운영이 같은 속도로 움직이지 않으면 실행 병목이 생긴다.",
    directFinding: "수십조 원대 지방 반도체 투자 검토는 공정·설비·전력·데이터센터 인력을 어느 지역에서 어떤 보상으로 붙일지 즉시 묻기 시작한다.",
    researchJudgement:
      "종합 판단은 투자 발표보다 선행 준비가 중요하다는 쪽이다. 클러스터 우대 정책이 주거·교육·인허가 지원까지 포함하고 있어, 단순 채용 확대보다 이전 수락률과 초기 정착 설계가 People 우선 과제다.",
    metrics: [
      ["가장 큰 영향 영역", "채용", "지방 신규 거점용 핵심 직무 파이프라인을 새로 짜야 한다."],
      ["가장 시급한 리스크", "인력운영", "설비·인허가 일정과 인력 투입 타이밍이 어긋나기 쉽다."],
    ],
    reportFlow: [
      ["기준 기사", "광주·전남 전공정 팹과 충청·영남 AI 프로젝트를 묶은 대규모 투자 구상"],
      ["직접 영향", "핵심 엔지니어와 지원조직의 지역 배치 수요 조기 확대"],
      ["영향 전개", "주거·교육·인허가 지원이 늦으면 채용 수락률과 전배 속도가 함께 흔들림"],
      ["우선 검토", "지역 이전 보상과 단계별 인력 투입 기준 정리"],
    ],
    topRisks: [
      ["1", "핵심 엔지니어 확보 지연", "수도권과 지방 거점이 같은 후보자 풀을 놓고 경쟁하게 된다."],
      ["2", "설비 일정과 인력 계획 불일치", "착공·전력·인허가보다 사람을 먼저 움직이면 유휴 비용이 커진다."],
      ["3", "이전 보상 형평성 논란", "근무지별 처우 차이가 누적되면 전배 설득력이 약해질 수 있다."],
    ],
    areas: [
      area(
        "채용",
        "채용 담당",
        94,
        "High",
        "지방 신규 거점이 현실화되면 공정·설비·품질·전력 인재 풀을 수도권과 분리해 설계해야 한다.",
        [
          "전공정 팹 신설은 생산직보다 숙련 엔지니어와 지원 리더의 선제 확보가 더 중요하다.",
          "주거·교육 지원이 기사에 함께 등장한 것은 연봉만으로 이동을 설득하기 어렵다는 신호다.",
        ],
        "채용은 공고 수보다 지역 이전 수락률과 핵심 직무 후보자 풀의 깊이를 먼저 봐야 한다.",
        stars(4, 4, 2, 5),
        [
          "핵심 직무별 현지 채용 가능성, 수도권 전배 가능성, 외부 스카우트 난이도를 분리 점검한다.",
          "광주·전남 거점용 후보자 풀과 산학교류 파이프라인을 별도 리스트로 관리한다.",
          "제안 패키지에 주거·교육·통근 지원 조건을 포함해 수락률을 테스트한다.",
        ],
        "신규 반도체 거점용 인재 확보 경쟁이 조기화된다.",
        "핵심 직무 채용이 늦어 초기 가동 일정이 밀리거나 과도한 외부 의존이 생길 수 있다.",
        ["핵심 직무 지원자 풀 규모", "오퍼 수락률", "지역 이전 가능 후보자 비중"],
      ),
      area(
        "인력운영",
        "인력운영 담당",
        91,
        "High",
        "수도권 기존 조직과 신규 거점 간 전배·충원 순서를 마일스톤 중심으로 다시 설계해야 한다.",
        [
          "지방 클러스터 지원 기사에서 인허가·전력·용수 비용 지원이 함께 제시된 것은 현장 준비 속도가 일정에 큰 변수가 된다는 뜻이다.",
          "설비 준비 전 사람을 먼저 이동시키면 유휴 인력과 조기 이탈 비용이 커질 수 있다.",
        ],
        "헤드카운트 확대보다 거점별 램프업 파상 투입 계획이 더 중요하다.",
        stars(5, 4, 3, 5),
        [
          "투자, 전력, 인허가, 클린룸 준비 마일스톤과 연동된 단계별 배치표를 다시 만든다.",
          "전배 대상 직무와 현지 채용 직무를 구분한 초기 운영 모델을 정리한다.",
          "현장 투입 전까지 대기 인력이 생기지 않도록 onboarding 시점을 재점검한다.",
        ],
        "기존 조직의 인력 이동과 신규 충원 시점이 동시에 조정된다.",
        "설비 준비와 인력 투입이 어긋나면 생산성과 비용이 함께 훼손된다.",
        ["거점별 계획 headcount 대비 실제 배치", "전배 승인 리드타임", "현장 onboarding 완료율"],
      ),
      area(
        "총무",
        "총무 담당",
        87,
        "Medium",
        "지방 클러스터 우대 정책에 주거·교육·의료·문화 인프라가 포함돼 총무 준비가 조기 과제가 된다.",
        [
          "정부 지원 항목 자체가 정주 여건을 핵심 성공 조건으로 보고 있다.",
          "핵심 인력은 사택·통근·가족 동반 지원 체감이 낮으면 이동을 주저할 가능성이 높다.",
        ],
        "총무는 착공 이후가 아니라 채용 제안이 나가는 시점부터 움직여야 한다.",
        stars(3, 4, 4, 4),
        [
          "사택, 통근, 단기 체류, 출장, 방문자 동선을 포함한 초기 지원 패키지를 설계한다.",
          "면접자와 전배자의 정착 FAQ를 주거·교육 관점에서 별도 정리한다.",
          "현장 운영 지원 인력과 대관·인허가 지원 역할을 조기에 지정한다.",
        ],
        "주거·통근·사무환경 준비 부담이 빠르게 커진다.",
        "정주 지원이 늦으면 전배 수락률과 현장 정착 속도가 함께 떨어진다.",
        ["사택 확보율", "통근 지원 요청 건수", "현장 운영지원 인력 배치율"],
      ),
      area(
        "제도",
        "제도 담당",
        84,
        "Medium",
        "지역 이전 수당, 정착 지원, 예외 보상 기준을 문서화해야 형평성 논란을 줄일 수 있다.",
        [
          "동일 직무라도 수도권과 지방 거점 간 체감 부담과 생활 구조가 달라진다.",
          "예외 승인이 반복되면 내부 기준이 흔들리고 거점 간 처우 비교가 커질 수 있다.",
        ],
        "전배 보상은 금액보다 적용 기준의 명확성이 더 큰 신뢰를 만든다.",
        stars(3, 4, 3, 4),
        [
          "지역 이전 수당과 정착 지원의 적용 기준을 직급·직무·가족 동반 여부별로 재정의한다.",
          "전배 보상 패키지와 장기 체류 지원을 분리해 비교 검토한다.",
          "거점별 처우 차이가 승격·평가·연봉 산정에 미치는 영향까지 같이 점검한다.",
        ],
        "거점 간 처우 차이 관리 이슈가 커진다.",
        "기준 없는 예외 처우가 누적되면 내부 공정성 불만이 빠르게 확대된다.",
        ["전배 보상 승인 건수", "예외 처우 요청 건수", "근무지별 보상 문의 건수"],
      ),
      area(
        "조직/임원",
        "조직/임원 담당",
        82,
        "Medium",
        "대형 지방 투자에서는 사업, 생산, People, 대관을 묶는 통합 의사결정 라인이 필요하다.",
        [
          "반도체 팹과 AI 인프라 투자가 동시에 묶이면 단일 사업부 의사결정으로는 속도가 떨어진다.",
          "채용 승인과 인력 이동 기준이 여러 조직에 흩어져 있으면 현장 실행이 느려진다.",
        ],
        "조직 신설 여부보다 누가 전사 우선순위를 조정할지 먼저 정해야 한다.",
        stars(4, 3, 3, 4),
        [
          "클러스터 추진 PMO와 People 승인 창구를 임원 레벨에서 명확히 지정한다.",
          "채용·전배·정주 지원 의사결정 권한을 분산하지 않도록 정리한다.",
          "지역 거점 운영을 맡을 차세대 리더 후보군을 조기 지정한다.",
        ],
        "투자 프로젝트와 People 의사결정 구조를 함께 손봐야 한다.",
        "권한이 분산되면 채용 승인, 인력 이동, 지역 지원이 서로 다른 속도로 움직인다.",
        ["클러스터 관련 의사결정 리드타임", "임원 승인 대기 건수", "지역 PMO 운영 현황"],
      ),
    ],
    evidence: [
      {
        type: "기준 기사",
        title: "삼성 ‘호남 팹’ 급물살… K반도체 벨트 키운다",
        source: "동아일보",
        date: "2026-06-26",
        url: "https://www.donga.com/news/article/all/20260626/134185829/2",
        summary:
          "요약: 이재명 대통령과 이재용 회장 회동 뒤 광주·전남 전공정 팹 검토가 급물살을 타고, 충청 AI 데이터센터·영남 피지컬 AI 투자까지 묶인 3대 메가 프로젝트가 거론됐다.",
        impactLink:
          "판단 연결: 단일 생산시설 투자가 아니라 지역별 인재 이동과 지원조직 재배치를 동시에 요구하는 이슈다.",
      },
      {
        type: "정책 기사",
        title: "지방 반도체 클러스터 우대… 주거-교육 개선 지원",
        source: "동아일보",
        date: "2026-06-26",
        url: "https://www.donga.com/news/Economy/article/all/20260626/134185839/2",
        summary:
          "요약: 정부는 비수도권 반도체 클러스터에 주거·교육·의료·문화 인프라와 기반시설, 인허가 우대까지 함께 지원하는 방안을 제시했다.",
        impactLink:
          "판단 연결: People 계획은 채용만이 아니라 정주 지원, 총무, 전배 보상 설계까지 포함해야 한다.",
      },
      {
        type: "비교 기사",
        title: "TSMC도 북-중-남부 클러스터 조성… “관건은 시너지”",
        source: "동아일보",
        date: "2026-06-26",
        url: "https://www.donga.com/news/Economy/article/all/20260626/134185837/2",
        summary:
          "요약: TSMC의 대만 3권역 클러스터는 토지·용수 한계를 넘기 위해 지역 인재와 생활 인프라를 함께 설계한 사례로 소개됐다.",
        impactLink:
          "판단 연결: 지방 거점 확대는 시설만 세우는 접근이 아니라 인재와 생활 인프라를 묶는 운영 모델이 필요하다는 근거다.",
      },
    ],
    cases: [
      {
        title: "TSMC 북·중·남부 클러스터 확장",
        type: "해외 선행 사례",
        org: "동아일보 비교 기사 / 대만 반도체 사례",
        why: "토지·용수 제약을 넘기 위해 지역 인재와 교통 인프라를 함께 설계했다는 점이 유사하다.",
        peopleInsight: "국내 지방 클러스터도 채용, 주거, 리더 배치, 지원조직을 한 패키지로 설계해야 한다.",
        peopleFunction: "채용/인력운영/총무",
        actionLink: "전배 대상 직무와 현지 채용 직무를 구분한 단계별 인력맵을 만든다.",
        url: "https://www.donga.com/news/Economy/article/all/20260626/134185837/2",
        priority: true,
      },
      {
        title: "비수도권 반도체 클러스터 정주 지원 패키지",
        type: "국내 정책 사례",
        org: "동아일보 정책 기사 / 정부 지원안",
        why: "주거·교육 지원이 투자 인센티브와 함께 언급돼 People 실행 조건을 직접 건드린다.",
        peopleInsight: "주거·교육 지원을 채용 보상과 분리하지 말고 하나의 수락 패키지로 봐야 한다.",
        peopleFunction: "총무/제도/채용",
        actionLink: "제안 패키지에 주거·교육·통근 지원 조건을 포함해 수락률을 테스트한다.",
        url: "https://www.donga.com/news/Economy/article/all/20260626/134185839/2",
        priority: true,
      },
      {
        title: "미국 애리조나 반도체 투자 초기 인력 확보 난항",
        type: "비교 참고 사례",
        org: "해외 반도체 제조 투자 일반",
        why: "현지 숙련 인재 부족이 초기 램프업 속도를 떨어뜨린 대표 유형이다.",
        peopleInsight: "착공 뉴스와 별개로 숙련 인재 풀과 전배 비중을 미리 확정해야 한다.",
        peopleFunction: "채용/인력운영",
        actionLink: "핵심 직무별 현지 채용 가능성과 수도권 전배 가능성을 분리 점검한다.",
        url: "",
      },
      {
        title: "용인 반도체 생태계의 정주·교통 병행 과제",
        type: "국내 유사 사례",
        org: "국내 대형 반도체 클러스터 일반",
        why: "대규모 투자에서는 생산시설 못지않게 출퇴근, 주거, 협력사 동선이 병목이 된다.",
        peopleInsight: "현장 지원조직을 착공 후가 아니라 채용 시작 시점부터 붙여야 한다.",
        peopleFunction: "총무/조직문화",
        actionLink: "현장 운영 지원 인력과 대관·인허가 지원 역할을 조기에 지정한다.",
        url: "",
      },
    ],
  },
  {
    id: "kr-yellow-envelope-20260626",
    label: "노란봉투법 100일",
    headline: "[단독]노란봉투법 100일… 하청 복지 챙겨도 ‘교섭 폭탄’ 위험",
    article: {
      title: "[단독]노란봉투법 100일… 하청 복지 챙겨도 ‘교섭 폭탄’ 위험",
      source: "동아일보",
      date: "2026-06-23",
      url: "https://www.donga.com/news/Society/article/all/20260623/134161936/2",
    },
    context:
      "기준 기사만 보면 노란봉투법 시행 100일 점검이다. 보완 기사까지 보면 핵심은 노사 분쟁이 생겼을 때 대응하는 수준이 아니라, 원청의 복지·운영 기준이 언제부터 사용자성 근거로 해석될 수 있는지 People이 선제적으로 정리해야 한다는 점이다.",
    input:
      "노란봉투법 시행 이후 하청 노조 교섭 요구와 사용자성 인정 범위가 빠르게 넓어지는 흐름은 노사팀만의 이슈가 아니다. 급식, 청소, 경비, 복지, 관리비 상한, 휴게공간 같은 비핵심 운영 기준도 원청 책임 범위를 넓힐 수 있어 제도, 총무, 인력운영, 외주관리 문서 체계까지 같이 점검해야 한다.",
    sourceMix: ["동아일보 기준 기사", "동아일보 통계 기사", "동아일보 최저임금 기사"],
    confidence: "High",
    decisionQuestion: "사내 하청·협력사 운영 정책 중 원청의 사용자성 근거로 해석될 수 있는 기준과 문서가 정리돼 있는가?",
    peopleSignal: "복지와 운영 지원이 선의로 설계돼도 교섭 책임 확대 근거가 될 수 있으므로 문서화와 역할 구분이 중요하다.",
    directFinding: "노란봉투법 이후 원청 439곳이 1161개 하청 노조로부터 교섭 요구를 받고, 사용자성 판단 사업장 10곳 중 9곳꼴로 인정된 점이 People 운영 범위를 넓힌다.",
    researchJudgement:
      "종합 판단은 노사팀 단독 대응으로는 부족하다는 쪽이다. 지원업무, 협력사 복지, 현장 운영 기준이 실제로는 제도·총무·인력운영 문서에 흩어져 있어, 어느 문장이 교섭 쟁점으로 바뀔지 먼저 지도화해야 한다.",
    metrics: [
      ["가장 큰 영향 영역", "노사", "원청-하청 관계 설정과 설명 논리가 직접 흔들린다."],
      ["가장 시급한 리스크", "제도", "복지·운영 기준 문구가 사용자성 근거로 해석될 수 있다."],
    ],
    reportFlow: [
      ["기준 기사", "노란봉투법 100일 경과 후 하청 복지·운영 기준이 교섭 근거가 될 수 있다는 경고"],
      ["직접 영향", "원청의 사용자성 범위와 하청 노조 교섭 대응 부담 확대"],
      ["영향 전개", "지원업무 운영 기준 노출 → 다중 교섭 요구 증가 → 비용·일정·설명 책임 확대"],
      ["우선 검토", "외주 운영 문서, 복지 기준, 현장 의사결정 권한 점검"],
    ],
    topRisks: [
      ["1", "하청 교섭 요구의 다중화", "한 사업장 안에서도 급식·경비·청소 등 여러 교섭 채널이 동시에 생길 수 있다."],
      ["2", "복지·운영 문서의 사용자성 근거화", "선의의 복지 기준이 교섭 책임을 넓히는 근거로 해석될 수 있다."],
      ["3", "현장 관리자 설명 논리 미비", "경계가 불명확하면 노사·현업·총무 간 메시지가 엇갈릴 가능성이 크다."],
    ],
    areas: [
      area(
        "노사",
        "노사 담당",
        94,
        "High",
        "노란봉투법 시행 100일은 원청의 교섭 책임 범위를 다시 정의하라는 신호다.",
        [
          "하청 조합원 16만여 명이 원청 439곳에 교섭을 요구했고, 판단이 내려진 사업장 91.2%에서 사용자성이 인정됐다.",
          "정부 설명과 달리 현장에서는 비핵심 지원업무까지 사용자성 판단이 넓어지고 있다는 우려가 커지고 있다.",
        ],
        "노사는 분쟁 발생 후 대응보다 어떤 사안이 교섭 의제로 바뀔 수 있는지 지도를 먼저 그려야 한다.",
        stars(3, 4, 5, 5),
        [
          "하청·협력사 관련 교섭 요구 가능 쟁점을 업무별로 분류한 FAQ를 만든다.",
          "현장 관리자와 HRBP가 공통으로 쓸 수 있는 설명 문구를 정비한다.",
          "원청 사용자성 판단이 날 수 있는 의사결정 포인트를 노사팀 기준서로 정리한다.",
        ],
        "하청 노조 교섭 요구와 사용자성 판단 대응이 급증한다.",
        "준비 없는 다중 교섭 대응은 노무 비용과 현장 혼선을 동시에 키울 수 있다.",
        ["하청 관련 문의 건수", "교섭 요구 접수 건수", "현장 FAQ 미답변 이슈 수"],
      ),
      area(
        "제도",
        "제도 담당",
        91,
        "High",
        "관리비 상한, 복지, 휴게공간, 복리후생 기준 같은 제도 문구가 사용자성 판단 근거가 될 수 있다.",
        [
          "기준 기사에서는 취약계층과 하청 직원을 위한 복지 제도 자체가 사용자성 인정의 구실이 될 수 있다고 짚었다.",
          "노동위 통계 기사에서는 지원 업무도 실질적 지배가 있으면 사용자성이 인정될 수 있다고 정부 방침을 재확인했다.",
        ],
        "제도 설계는 선의 여부보다 권한과 책임 경계가 어떻게 문서화돼 있는지가 중요하다.",
        stars(2, 4, 5, 5),
        [
          "협력사·하청 관련 복지와 운영 기준 문서를 사용자성 관점에서 전수 점검한다.",
          "원청 승인, 벌점, 평가, 예산 통제 문구가 교섭 책임 확대로 연결될 여지를 점검한다.",
          "하청 관련 복리후생 지원 기준은 목적과 권한 경계를 함께 기록한다.",
        ],
        "복지와 운영 제도 자체가 교섭 쟁점으로 재해석될 수 있다.",
        "문서 경계가 모호하면 원청이 의도하지 않은 범위까지 책임을 떠안을 수 있다.",
        ["협력사 관련 제도 문서 개정 건수", "예외 승인 문구 보유 문서 수", "법무 검토 필요 문서 비중"],
      ),
      area(
        "인력운영",
        "인력운영 담당",
        86,
        "Medium",
        "외주화된 지원업무의 운영 방식과 현장 지휘 체계를 다시 정리해야 한다.",
        [
          "급식, 청소, 경비 같은 비핵심 업무도 실제 운영 지휘와 평가 방식에 따라 사용자성 판단을 받을 수 있다.",
          "현장 리더가 협력사 인력을 직접 지휘하거나 성과를 사실상 통제하면 노무 경계가 흐려질 수 있다.",
        ],
        "외주 운영은 계약 구조보다 현장 지휘 체계와 승인 흐름을 먼저 봐야 한다.",
        stars(4, 4, 4, 4),
        [
          "지원업무 외주 인력의 지휘·평가·근태 관여 수준을 부서별로 점검한다.",
          "현장 관리자에게 직접 지시가 가능한 범위와 불가한 범위를 다시 안내한다.",
          "원청 내부 의사결정자가 협력사 인력 운영에 개입하는 프로세스를 최소화한다.",
        ],
        "외주 운영 프로세스와 현장 지휘 방식 조정이 필요하다.",
        "실무 관행이 계약보다 앞서 있으면 예기치 않은 사용자성 인정 리스크가 생긴다.",
        ["협력사 인력 직접 지시 사례", "외주 운영 예외 승인 건수", "현장 관리자 교육 이수율"],
      ),
      area(
        "조직/임원",
        "조직/임원 담당",
        82,
        "Medium",
        "노사와 현장운영, 법무, 총무를 분리 대응하면 메시지가 어긋날 가능성이 크다.",
        [
          "사용자성 판단은 현장운영, 복지, 예산, 계약이 동시에 얽혀 있어 한 조직만으로 판단하기 어렵다.",
          "임원 레벨의 공통 기준이 없으면 사업장별 예외 대응이 누적될 수 있다.",
        ],
        "노란봉투법 대응은 사건 처리보다 전사 원칙 수립이 먼저다.",
        stars(2, 3, 4, 4),
        [
          "노사·법무·People·총무가 함께 보는 사용자성 판단 체크리스트를 만든다.",
          "사업장별 개별 대응 대신 공통 승인 체계를 임원 레벨에서 정리한다.",
          "고위험 사업장과 고위험 운영 관행을 우선순위로 올린다.",
        ],
        "노무 이슈를 전사 운영 리스크로 올려야 한다.",
        "사업장별 예외 대응이 누적되면 전사 원칙과 현장 관행 사이가 벌어진다.",
        ["고위험 사업장 수", "임원 리뷰 안건 처리 시간", "공통 원칙 예외 승인 건수"],
      ),
      area(
        "총무",
        "총무 담당",
        76,
        "Medium",
        "휴게공간, 식당, 시설 관리, 경비 운영 같은 총무 영역도 사용자성 판단과 연결될 수 있다.",
        [
          "관련 기사들은 휴게실 설치나 관리비 상한 같은 운영 기준이 원청 책임 논리로 이어질 수 있다고 짚는다.",
          "총무 운영은 지원 성격이 강하지만 실제로는 협력사 인력의 근무환경을 직접 좌우한다.",
        ],
        "총무는 선의의 지원이 어디까지 허용되는지 경계를 문서화해야 한다.",
        stars(2, 3, 4, 4),
        [
          "협력사 대상 시설·복지 지원 기준과 승인 주체를 문서화한다.",
          "식당, 휴게실, 경비, 청소 운영 기준이 노무 리스크와 연결되는 지점을 점검한다.",
          "총무팀 예외 승인 관행을 노사·법무와 함께 재정리한다.",
        ],
        "지원시설 운영 기준이 교섭 논리와 연결될 수 있다.",
        "총무 운영 문서가 준비되지 않으면 현장 설명과 실제 운영이 어긋날 수 있다.",
        ["협력사 복지 관련 예외 승인 건수", "시설 운영 기준 개정 건수", "협력사 운영 문의 건수"],
      ),
    ],
    evidence: [
      {
        type: "기준 기사",
        title: "[단독]노란봉투법 100일… 하청 복지 챙겨도 ‘교섭 폭탄’ 위험",
        source: "동아일보",
        date: "2026-06-23",
        url: "https://www.donga.com/news/Society/article/all/20260623/134161936/2",
        summary:
          "요약: 공공 부문 법률 자문에서 취약계층·하청 복지 제도와 휴게공간 지원이 원청의 사용자성 인정 근거가 될 수 있다는 우려가 제기됐다.",
        impactLink:
          "판단 연결: People 문서의 복지·운영 기준도 사용자성 판단의 근거가 될 수 있어 제도와 총무 점검이 필요하다.",
      },
      {
        type: "통계 기사",
        title: "노란봉투법에 하청노조 교섭 요구 1161곳… 노동위, 원청 10곳중 9곳꼴 ‘사용자성’ 인정",
        source: "동아일보",
        date: "2026-06-23",
        url: "https://www.donga.com/news/Society/article/all/20260623/134162005/2",
        summary:
          "요약: 법 시행 후 439개 원청 사업장이 1161개 하청 노조로부터 교섭 요구를 받았고, 판단이 내려진 113곳 중 103곳에서 사용자성이 인정됐다.",
        impactLink:
          "판단 연결: 이슈는 개별 판례가 아니라 원청-하청 운영 관행 전반을 재점검해야 하는 수준으로 커지고 있다.",
      },
      {
        type: "보완 기사",
        title: "내년 최저임금도 업종 차등없이 단일 적용",
        source: "동아일보",
        date: "2026-06-19",
        url: "https://www.donga.com/news/Society/article/all/20260619/134140552/2",
        summary:
          "요약: 최저임금 업종별 차등 적용이 무산돼 모든 업종에 단일 금액이 적용되면서 저마진 외주·지원업무 비용 압박이 계속될 전망이다.",
        impactLink:
          "판단 연결: 외주 운영비 압박과 사용자성 확대가 겹치면 협력사 운영 구조와 노사 대응 부담이 함께 커진다.",
      },
    ],
    cases: [
      {
        title: "노란봉투법 시행 100일의 원청 사용자성 확대",
        type: "국내 핵심 사례",
        org: "동아일보 보도 / 노동위 통계",
        why: "원청 10곳 중 9곳꼴 사용자성 인정이라는 수치는 전사 운영 원칙 점검이 필요함을 보여준다.",
        peopleInsight: "노사팀만이 아니라 제도·총무·인력운영 문서를 묶어 봐야 한다.",
        peopleFunction: "노사/제도/인력운영",
        actionLink: "협력사 관련 복지와 운영 기준 문서를 사용자성 관점에서 전수 점검한다.",
        url: "https://www.donga.com/news/Society/article/all/20260623/134162005/2",
        priority: true,
      },
      {
        title: "복지 지원이 교섭 근거가 될 수 있다는 법률 자문",
        type: "국내 비교 참고 사례",
        org: "동아일보 기준 기사 / 공공부문 법률 자문",
        why: "선의의 복지 제도도 권한 경계가 모호하면 사용자성 판단에 활용될 수 있다.",
        peopleInsight: "지원 취지와 승인 권한을 문서에 함께 적지 않으면 리스크가 커진다.",
        peopleFunction: "제도/총무",
        actionLink: "협력사 대상 시설·복지 지원 기준과 승인 주체를 문서화한다.",
        url: "https://www.donga.com/news/Society/article/all/20260623/134161936/2",
        priority: true,
      },
      {
        title: "현대차 하청·지원업무 교섭 요구 확대 논란",
        type: "국내 유사 사례",
        org: "제조업 노사 일반",
        why: "원청 사업장 안에서 지원업무까지 교섭 범위가 넓어질 때 제조 현장의 부담이 커진다.",
        peopleInsight: "사업장 단위 운영 관행과 협력사 관리 기준을 묶어서 봐야 한다.",
        peopleFunction: "노사/인력운영",
        actionLink: "지원업무 외주 인력의 지휘·평가·근태 관여 수준을 부서별로 점검한다.",
        url: "",
      },
      {
        title: "최저임금 단일 적용과 외주 운영비 압박",
        type: "국내 정책 연계 사례",
        org: "동아일보 보완 기사",
        why: "외주 인건비 압박이 커질수록 원청의 운영 개입과 노사 마찰이 함께 커질 수 있다.",
        peopleInsight: "노무 리스크는 법 해석만이 아니라 비용 구조 변화와 같이 봐야 한다.",
        peopleFunction: "제도/노사",
        actionLink: "외주 운영 예외 승인과 비용 통제 문구를 함께 점검한다.",
        url: "https://www.donga.com/news/Society/article/all/20260619/134140552/2",
      },
    ],
  },
  {
    id: "global-ai-workforce-transition-20260626",
    label: "미국 AI 전환 대응",
    headline: "AI is plowing through the workplace. This new group wants to help people adapt and have jobs",
    article: {
      title: "AI is plowing through the workplace. This new group wants to help people adapt and have jobs",
      source: "Associated Press",
      date: "2026-06-25",
      url: "https://apnews.com/article/929986c149d415cd2ef4dc3eaf66ca8c",
    },
    context:
      "기준 기사만 보면 미국이 AI 전환 대응을 위한 대규모 재교육 연합을 출범시켰다는 소식이다. 보완 기사까지 보면 핵심은 AI 도입 속도보다 재교육, 경력 전환, wage insurance, 내부 이동 설계를 누가 먼저 제도화하느냐다.",
    input:
      "RAISE US의 출범은 AI가 일자리를 단번에 없앤다는 공포 기사보다 더 실무적인 신호다. 기술 기업과 대형 고용주가 직접 재교육·전직·경력 코칭 기금을 마련하기 시작했다는 뜻이기 때문이다. 국내 HR에도 중요한 질문은 동일하다. AI 도입 정책과 별개로 어떤 직무를 재교육 우선 대상으로 보고, 관리자에게 어떤 설명 책임을 줄지, 내부 이동과 단기 자격과정을 어떻게 붙일지 미리 정리해야 한다.",
    sourceMix: ["AP", "Axios", "Business Insider"],
    confidence: "High",
    decisionQuestion: "AI 도입과 동시에 직무 전환, 재교육, 관리자 설명 책임을 다루는 내부 people strategy가 있는가?",
    peopleSignal: "해외 선도 기업들은 AI 도입과 별도로 workforce transition 예산과 프로그램을 묶기 시작했다.",
    directFinding: "AI 전환 논의가 생산성 도입에서 workforce transition 체계 설계로 옮겨가고 있다는 점이 핵심 신호다.",
    researchJudgement:
      "종합 판단은 국내 기업도 AI 활용 가이드만으로는 부족하다는 쪽이다. 재교육 대상 직무, 내부 이동 기준, 관리자 커뮤니케이션, 채용 재정의가 하나의 패키지로 다뤄져야 한다.",
    metrics: [
      ["가장 큰 영향 영역", "교육", "재교육과 관리자 교육이 AI 도입 속도를 따라가야 한다."],
      ["가장 시급한 리스크", "인력운영", "전환 경로가 없으면 현업 불안과 도입 저항이 커질 수 있다."],
    ],
    reportFlow: [
      ["기준 기사", "미국 RAISE US가 AI 전환 대응용 5억달러 이상 기금을 출범"],
      ["직접 영향", "재교육·전직·관리자 설명 책임이 AI 도입 정책의 일부로 편입"],
      ["영향 전개", "직무 불안 확대 → 재교육 수요 급증 → 내부 이동 기준과 채용 정의 재설계"],
      ["우선 검토", "전환 우선 직무, 교육 과정, 관리자 메시지, 내부 이동 기준"],
    ],
    topRisks: [
      ["1", "재교육보다 도구 도입이 앞서는 리스크", "직무 전환 기준 없이 AI를 밀어넣으면 현업 저항과 불안이 커질 수 있다."],
      ["2", "전환 대상 직무 식별 실패", "영향 직무를 늦게 특정하면 교육 예산과 인력 재배치가 모두 후행한다."],
      ["3", "채용 기준과 내부 육성 기준의 불일치", "외부에서 찾는 역량과 내부 교육 과정이 다르면 전환 효율이 떨어진다."],
    ],
    areas: [
      area(
        "교육",
        "교육 담당",
        93,
        "High",
        "AI 도입 교육이 아니라 직무 전환 교육을 중심으로 포트폴리오를 다시 짜야 한다.",
        [
          "AP와 Axios는 단기 자격과정, AI 기반 경력 코칭, 재교육 인센티브를 핵심 수단으로 제시했다.",
          "재교육 프로그램이 기술 사용법에 그치지 않고 새 역할로 옮겨갈 경로를 제공해야 한다는 메시지가 강하다.",
        ],
        "교육은 툴 사용법보다 전환 대상 직무와 관리자 역할을 묶는 방향으로 바뀌어야 한다.",
        stars(4, 3, 2, 5),
        [
          "AI 영향이 큰 직무군을 우선순위로 나눠 전환 교육 로드맵을 만든다.",
          "관리자용 과정에 직무 재설계, 평가, 커뮤니케이션 가이드를 포함한다.",
          "단기 과정 수료 후 실제 내부 이동까지 이어지는 실습형 트랙을 설계한다.",
        ],
        "재교육과 관리자 교육 수요가 빠르게 커진다.",
        "교육이 도구 사용법에 머물면 현업 전환과 생산성 개선이 분리될 수 있다.",
        ["AI 전환 교육 이수율", "직무 전환 교육 신청률", "교육 후 내부 이동 전환율"],
      ),
      area(
        "인력운영",
        "인력운영 담당",
        90,
        "High",
        "AI 도입으로 달라질 역할을 식별하고 내부 이동 경로를 먼저 설계해야 한다.",
        [
          "RAISE US는 wage insurance와 retraining incentives처럼 이동 과정의 비용과 불안을 낮추는 장치를 같이 다룬다.",
          "이는 단순 감원 논리보다 전환 경로 설계가 People 경쟁력의 일부가 되고 있음을 보여준다.",
        ],
        "AI 전환은 직무를 없애는 계획이 아니라 역할을 옮기는 운영 계획으로 관리하는 편이 실무적이다.",
        stars(4, 4, 2, 5),
        [
          "AI 영향 직무를 업무 단위로 분류해 유지, 축소, 전환 후보군을 구분한다.",
          "내부 공모, 프로젝트 배치, 단기 과정을 연동한 전환 경로를 설계한다.",
          "전환 대상자에게 적용할 임시 보상·평가·배치 원칙을 먼저 정리한다.",
        ],
        "직무 전환과 내부 이동 설계가 AI 도입의 병행 과제가 된다.",
        "경로가 없으면 현업은 AI를 비용 절감 신호로만 받아들일 가능성이 높다.",
        ["AI 영향 직무 목록 완료율", "내부 이동 지원 건수", "직무 전환 대상자 retention"],
      ),
      area(
        "채용",
        "채용 담당",
        86,
        "Medium",
        "외부 채용은 기존 직무명보다 AI 협업과 전환 실행 경험을 보는 방향으로 바뀔 수 있다.",
        [
          "Business Insider는 고용주가 엔트리 레벨에도 더 높은 수준의 판단·협업·적응 역량을 요구한다고 전했다.",
          "외부 채용 기준과 내부 육성 기준이 다르면 직무 전환 전략이 무너질 수 있다.",
        ],
        "채용은 AI 전문가만 찾는 게 아니라 AI와 함께 일할 수 있는 일반 직무 역량을 다시 정의해야 한다.",
        stars(3, 3, 2, 4),
        [
          "AI 노출 직무의 JD를 재작성하고 요구 역량을 세분화한다.",
          "후보자 인터뷰에 직무 전환 적응력과 AI 협업 경험 질문을 추가한다.",
          "외부 채용과 내부 전환 중 어떤 경로가 더 빠른지 직무별로 비교한다.",
        ],
        "직무 정의와 채용 기준이 빠르게 재편된다.",
        "채용이 과거 JD를 유지하면 새 역할에 맞는 인재를 놓치거나 과채용이 생길 수 있다.",
        ["JD 개정 완료율", "AI 노출 직무 채용 소요기간", "내부 전환 대비 외부 채용 비중"],
      ),
      area(
        "조직/임원",
        "조직/임원 담당",
        84,
        "Medium",
        "기술 투자 계획과 people transition 계획을 같은 임원 테이블에서 다뤄야 한다.",
        [
          "RAISE US는 기술 기업, 대형 고용주, 주정부가 함께 workforce strategy를 논의하는 구조다.",
          "이는 AI 도입이 IT 부서 프로젝트가 아니라 경영 의사결정 이슈라는 의미다.",
        ],
        "임원단은 생산성 수치만이 아니라 전환 비용과 내부 신뢰 지표를 함께 봐야 한다.",
        stars(2, 3, 3, 4),
        [
          "AI 투자 안건에 재교육, 내부 이동, 설명 책임 항목을 필수로 붙인다.",
          "분기별로 AI 전환 영향 직무와 people 리스크를 함께 리뷰한다.",
          "핵심 직무 전환을 맡을 차세대 리더와 현업 스폰서를 지정한다.",
        ],
        "AI 도입을 people agenda와 분리하면 실행 저항이 커진다.",
        "기술 투자만 승인되고 전환 계획이 비어 있으면 현업 신뢰가 빠르게 떨어질 수 있다.",
        ["AI 전환 관련 임원 리뷰 안건 수", "현업 스폰서 지정률", "분기별 전환 리스크 보고 건수"],
      ),
      area(
        "제도",
        "제도 담당",
        79,
        "Medium",
        "전환 대상자 평가, 보상, 단기 배치 기준을 별도로 정리할 필요가 있다.",
        [
          "AI 도입기에는 기존 직무 성과지표만으로 학습·전환 기간을 공정하게 평가하기 어렵다.",
          "wage insurance나 retraining incentive 논의는 전환 기간 보상 원칙이 중요하다는 뜻이다.",
        ],
        "제도는 전환기 예외를 허용하되 기준을 명확히 두는 방향이 바람직하다.",
        stars(2, 3, 2, 4),
        [
          "직무 전환자 평가 기준과 학습 기간 처리 원칙을 정의한다.",
          "AI 프로젝트 참여 인력의 보상·승격 반영 기준을 문서화한다.",
          "단기 자격과정 수료와 실제 배치 연계를 제도상 인정할지 검토한다.",
        ],
        "전환기 평가와 보상 기준을 손봐야 한다.",
        "기존 평가 기준을 그대로 쓰면 학습 부담이 높은 직무에서 불만이 커질 수 있다.",
        ["전환 대상자 평가 예외 승인 건수", "AI 프로젝트 참여 반영률", "보상 관련 문의 건수"],
      ),
    ],
    evidence: [
      {
        type: "기준 기사",
        title: "AI is plowing through the workplace. This new group wants to help people adapt and have jobs",
        source: "Associated Press",
        date: "2026-06-25",
        url: "https://apnews.com/article/929986c149d415cd2ef4dc3eaf66ca8c",
        summary:
          "요약: 미국의 초당적 비영리단체 RAISE US가 5억 달러 이상을 바탕으로 AI 전환에 대비한 교육·훈련·경력 전환 프로그램을 주정부와 고용주 중심으로 추진하기 시작했다.",
        impactLink:
          "판단 연결: AI 도입 자체보다 workforce transition 체계를 함께 설계하는 흐름이 본격화됐다는 신호다.",
      },
      {
        type: "시장 기사",
        title: "Anthropic, OpenAI join $500 million AI jobs push",
        source: "Axios",
        date: "2026-06-25",
        url: "https://www.axios.com/2026/06/25/anthropic-labor-market-ai-jobs-crisis",
        summary:
          "요약: Raise US는 wage insurance, retraining incentives, AI 기반 career coaching, short-term credentialing을 실험 항목으로 제시했다.",
        impactLink:
          "판단 연결: 기업 People 조직도 재교육만이 아니라 전환 지원 장치와 관리 체계를 같이 설계해야 한다.",
      },
      {
        type: "채용 기사",
        title: "OpenAI, Anthropic, Microsoft, and Amazon are behind a new organization that aims to help prepare workers for AI",
        source: "Business Insider",
        date: "2026-06-25",
        url: "https://www.businessinsider.com/raise-us-ai-workers-supporters-openai-anthropic-2026-6",
        summary:
          "요약: 대형 기술기업과 고용주들이 AI 전환 대응 기금과 주정부 자문 플랫폼을 함께 만들며, AI 도입 논의를 채용·경력개발 전략과 직접 연결하기 시작했다.",
        impactLink:
          "판단 연결: 국내 기업도 AI 도입 정책과 채용·육성 정책을 분리해서 보기 어려워지고 있다.",
      },
    ],
    cases: [
      {
        title: "RAISE US의 재교육·전직 지원 연합",
        type: "해외 선행 사례",
        org: "AP / Axios / Business Insider",
        why: "기술 기업과 대형 고용주가 AI 도입과 workforce transition을 하나의 의제로 다루기 시작했다.",
        peopleInsight: "국내 기업도 AI 도입과 동시에 재교육, 내부 이동, 관리자 교육을 세트로 설계해야 한다.",
        peopleFunction: "교육/인력운영/조직·임원",
        actionLink: "AI 영향 직무군을 우선순위로 나눠 전환 교육 로드맵을 만든다.",
        url: "https://apnews.com/article/929986c149d415cd2ef4dc3eaf66ca8c",
        priority: true,
      },
      {
        title: "AI 도입기 wage insurance·재교육 인센티브 실험",
        type: "해외 정책 참고 사례",
        org: "Axios",
        why: "기술 전환기 불안을 줄이기 위해 보상과 교육을 함께 설계하는 접근이 등장하고 있다.",
        peopleInsight: "직무 전환자의 단기 보상과 평가 원칙을 미리 정하지 않으면 전환 참여가 낮아질 수 있다.",
        peopleFunction: "인력운영/제도",
        actionLink: "전환 대상자에게 적용할 임시 보상·평가·배치 원칙을 먼저 정리한다.",
        url: "https://www.axios.com/2026/06/25/anthropic-labor-market-ai-jobs-crisis",
        priority: true,
      },
      {
        title: "AI 노출 직무의 엔트리 역할 고숙련화",
        type: "비교 참고 사례",
        org: "Business Insider / PwC Jobs Barometer 인용",
        why: "AI가 반복 업무를 흡수하면서 주니어 채용에도 더 높은 판단·협업 역량이 요구되고 있다.",
        peopleInsight: "채용 기준과 교육 과정이 동시에 바뀌지 않으면 엔트리 파이프라인이 흔들릴 수 있다.",
        peopleFunction: "채용/교육",
        actionLink: "AI 노출 직무의 JD를 재작성하고 요구 역량을 세분화한다.",
        url: "https://www.businessinsider.com/raise-us-ai-workers-supporters-openai-anthropic-2026-6",
      },
      {
        title: "AI 도입을 people strategy로 끌어올린 미국 고용주 연합",
        type: "적용 가능성이 있는 선행 사례",
        org: "미국 주정부·고용주 연합",
        why: "AI 전환 논의를 IT 도입 프로젝트가 아니라 노동시장 전환 전략으로 올린 사례다.",
        peopleInsight: "국내 기업도 AI 거버넌스 회의체에 HR, 현업, 재무, 교육을 함께 넣는 구조가 필요하다.",
        peopleFunction: "조직/임원/인력운영",
        actionLink: "AI 투자 안건에 재교육, 내부 이동, 설명 책임 항목을 필수로 붙인다.",
        url: "",
      },
    ],
  },
];

async function main() {
  const template = await fs.readFile(templatePath, "utf8");
  const generatedBlock = `// Daily report content generated for ${reportDate}. Replace this block on each run.\n      const scenarios = ${JSON.stringify(scenarios, null, 8)};\n\n      const areaRefinements = {};\n      const evidenceSummaries = {};\n      const evidenceImpactLinks = {};\n      // End generated daily report content.`;

  let html = template.replace(
    /\/\/ Daily report content placeholders\.[\s\S]*?\/\/ End daily report content placeholders\./,
    generatedBlock,
  );
  html = html.replaceAll("{{REPORT_DATE}}", reportDate);
  html = html.replace("{{ISSUE_1_TITLE}}", scenarios[0].label);

  if (html.includes("{{")) {
    throw new Error("Template placeholders remain after generation.");
  }
  if (!html.includes('href="../archive.html"')) {
    throw new Error("Archive link is missing.");
  }

  await fs.writeFile(datedPath, html, "utf8");
  await fs.writeFile(latestPath, html, "utf8");

  let reports = [];
  try {
    reports = JSON.parse(await fs.readFile(reportsPath, "utf8"));
  } catch {
    reports = [];
  }

  reports = reports.filter((item) => item && item.date !== reportDate).map((item) => ({ ...item, latest: false }));
  reports.push({
    date: reportDate,
    title: `${reportDate} 데일리 인사 시사점 리포트`,
    file: datedFile,
    latest: true,
    issues: scenarios.map((scenario) => scenario.headline),
  });
  reports.sort((a, b) => a.date.localeCompare(b.date));

  await fs.writeFile(reportsPath, `${JSON.stringify(reports, null, 2)}\n`, "utf8");

  const publicBaseUrlPath = path.join(root, "PUBLIC_BASE_URL.txt");
  let publicBaseUrl = "";
  try {
    publicBaseUrl = (await fs.readFile(publicBaseUrlPath, "utf8")).trim();
  } catch {
    publicBaseUrl = "";
  }

  const output = {
    reportDate,
    datedFile,
    latestFile: "outputs/latest.html",
    reportsFile: "outputs/reports.json",
    publicBaseUrl,
    issues: scenarios.map((scenario) => ({
      label: scenario.label,
      title: scenario.article.title,
      source: scenario.article.source,
      date: scenario.article.date,
      url: scenario.article.url,
    })),
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

await main();
