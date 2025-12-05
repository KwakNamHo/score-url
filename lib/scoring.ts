// lib/scoring.ts
import { ScanResult, VirusTotalStats, GSBThreat, TrustLevel } from './types';

function mapScoreToTrustLevel(score: number): TrustLevel {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  if (score >= 20) return 'E';
  return 'F';
}

export function calculateScore(
  gsbThreats: GSBThreat[],
  vtStats: VirusTotalStats
): Omit<ScanResult, 'url'> {
  let score = 100;
  let detailMessage = '안전한 URL로 판단됩니다.';
  let status: ScanResult['status'] = 'safe';

  // 1. GSB 감점
  const isPhishingOrMalware = gsbThreats.some(
    (t) => t.threatType === 'MALWARE' || t.threatType === 'SOCIAL_ENGINEERING'
  );
  if (isPhishingOrMalware) {
    score -= 60;
    detailMessage =
      '경고: 피싱/악성코드 위험이 Google Safe Browsing에서 탐지되었습니다.';
  } else if (gsbThreats.length > 0) {
    score -= 30;
    detailMessage = '주의: 잠재적인 위험 요소가 감지되었습니다.';
  }

  // 2. VirusTotal 감점
  if (vtStats.total > 0 && vtStats.positives > 0) {
    const detectionRatio = vtStats.positives / vtStats.total;
    score -= Math.round(detectionRatio * 40);

    if (score < 40) {
      detailMessage += ` (${vtStats.positives}개 엔진 악성 탐지)`;
    }
  }

  score = Math.max(0, score);

  // 최종 상태 결정
  if (score < 40) {
    status = 'danger';
  } else if (score < 80) {
    status = 'warning';
  } else {
    status = 'safe';
  }

  return {
    score,
    status,
    detail: detailMessage,
    trustLevel: mapScoreToTrustLevel(score),
    gsbThreats: gsbThreats,
    vtStats: vtStats,
  };
}
