// app/api/score/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; // 사용자님의 인증 시스템
import { dbConnect } from '@/lib/db-connect'; // 사용자님의 DB 연결
import ScanResultModel from '@/lib/models/ScanResult'; // 사용자님의 스키마
import { checkGoogleSafeBrowsing } from '@/lib/gsb'; // 사용자님의 GSB 모듈
import { checkVirusTotal } from '@/lib/virustotal'; // 사용자님의 VT 모듈
import { calculateScore } from '@/lib/scoring'; // 사용자님의 점수 로직
import { normalizeUrl } from '@/lib/utils'; // 사용자님의 URL 정규화
import { ScanResult } from '@/lib/types';

export async function POST(request: Request) {
  // 1. [사용자님 코드] 인증 확인 (팀원 코드에는 없는 보안 기능)
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse('Authentication Required', { status: 401 });
  }

  // 2. [팀원님 코드 로직] 요청 바디 파싱 및 유효성 검사
  const body = await request.json().catch(() => null);

  if (!body || !body.url) {
    return NextResponse.json(
      { error: 'url 필드가 필요합니다.' },
      { status: 400 }
    );
  }

  // [사용자님 코드] URL 정규화 (http 붙여주기 등)
  const normalizedUrl = normalizeUrl(body.url);
  if (!normalizedUrl) {
    return NextResponse.json(
      { error: '올바른 URL 형식이 아닙니다.' },
      { status: 400 }
    );
  }

  try {
    // 3. [공통 로직] 외부 API 호출 (병렬 처리 가능하지만 순차적으로 명시)
    const gsbThreats = await checkGoogleSafeBrowsing(normalizedUrl);
    const vtStats = await checkVirusTotal(normalizedUrl);

    // 4. [사용자님 코드] 점수 및 등급 계산
    // calculateScore 함수는 URL을 제외한 점수, 등급, 상세 메시지를 반환함
    let scanResultBase = calculateScore(gsbThreats, vtStats);

    // 최종 결과 객체 조립
    let scanResult: ScanResult = {
      ...scanResultBase,
      url: normalizedUrl,
    };

    // 5. [팀원님 코드 패턴 적용] DB 저장 (에러가 나도 결과 반환은 되도록 try-catch 감싸기)
    try {
      await dbConnect();

      await ScanResultModel.create({
        userId: userId, // Clerk ID
        url: normalizedUrl,
        score: scanResult.score,
        trustLevel: scanResult.trustLevel,
        // API 상세 결과를 JSON 형태로 저장
        apiResults: {
          googleSafeBrowsing: gsbThreats,
          virusTotal: vtStats,
        },
      });
      console.log('DB Saved Successfully');
    } catch (dbErr) {
      // 팀원분의 의도대로, DB 저장 실패가 사용자 경험을 망치지 않게 로그만 찍고 넘어감
      console.error('MongoDB 저장 중 오류 (결과는 반환됨):', dbErr);
    }

    // 6. 결과 반환
    return NextResponse.json(scanResult, { status: 200 });
  } catch (error: any) {
    console.error('API Process Error:', error.message);
    return NextResponse.json(
      {
        error: '서버 내부 오류가 발생했습니다.',
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

// GET 요청 방지용 (선택 사항)
export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to scan URL' },
    { status: 405 }
  );
}
