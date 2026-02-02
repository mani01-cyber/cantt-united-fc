

const EXTERNAL_DATA_URL = 'https://canttunited.com';

const escapeXml = (str: string) => str.replace(/[<>&'"]/g, (c) => {
    switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
    }
});

function generateSitemapXml(pages: { url: string; lastModified: string; changeFrequency: string; priority: number }[], videos: any[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${pages
            .map(page => {
                return `
  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${escapeXml(page.lastModified)}</lastmod>
    <changefreq>${escapeXml(page.changeFrequency)}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
            })
            .join('')}
  ${videos
            .map(video => {
                return `
  <url>
    <loc>${escapeXml(`${EXTERNAL_DATA_URL}/gallery`)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      ${video.playerLoc ? `<video:player_loc>${escapeXml(video.playerLoc)}</video:player_loc>` : ''}
      ${video.contentLoc ? `<video:content_loc>${escapeXml(video.contentLoc)}</video:content_loc>` : ''}
    </video:video>
  </url>`;
            })
            .join('')}
</urlset>`;
}

export async function GET() {
    const baseUrl = 'https://canttunited.com';

    const pages = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/join`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/squad`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    const videos = [
        {
            title: 'Match Highlights',
            description: 'Highlights from the latest Cantt United match.',
            thumbnail: 'https://res.cloudinary.com/deak2c1my/video/upload/f_auto,q_auto,w_800/v1/VID-20260127-WA0010_moj2qy.jpg',
            playerLoc: 'https://player.cloudinary.com/embed/?cloud_name=deak2c1my&public_id=VID-20260127-WA0010_moj2qy',
        },
        {
            title: 'OUR pitch',
            description: 'A view of the Cantt United football pitch.',
            thumbnail: 'https://res.cloudinary.com/deak2c1my/video/upload/f_auto,q_auto,w_800/v1/VID-20260127-WA0011_tf1g0w.jpg',
            playerLoc: 'https://player.cloudinary.com/embed/?cloud_name=deak2c1my&public_id=VID-20260127-WA0011_tf1g0w',
        },
        {
            title: 'MS GARRSION TOUR',
            description: 'Tour of the MS Garrison facility.',
            thumbnail: 'https://res.cloudinary.com/deak2c1my/video/upload/f_auto,q_auto,w_800/v1769940033/VID-20250501-WA0034_rnwimh.jpg',
            contentLoc: 'https://res.cloudinary.com/deak2c1my/video/upload/v1769940033/VID-20250501-WA0034_rnwimh.mp4',
        }
    ];

    return new Response(generateSitemapXml(pages, videos), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
