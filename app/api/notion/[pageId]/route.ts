import { notionClient } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;
  try {
    const recordMap = await notionClient.getPage(pageId);
    return NextResponse.json(recordMap);
  } catch (error) {
    console.error('获取页面数据失败:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page data' },
      { status: 500 }
    );
  }
}
