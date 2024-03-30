```tsx
export async function GET(request: Request, { params }: { params: Params }) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  const total = searchParams.get('total');
  const type = searchParams.get('type');
  let data;

  if (slug === 'banners') {
    // @ts-ignore
    data = await app.banner({ type: 1 });
  }
  data = data?.body as unknown as IBanner;

  const banners = data.banners
    .slice(0, total ? parseInt(total) : 15)
    .map((item) => {
      return {
        id: item.targetId,
        imageUrl: item.pic,
        typeTitle: item.typeTitle,
      };
    });

  // 支持跨域
  return Response.json(banners, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```