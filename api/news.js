export default async function handler(req, res) {
  const sources = [
    "https://www.in.gov.br/rss/-/asset_publisher/Kujrw0TZC2Mb/content/id/684900353",
    "https://www.jusbrasil.com.br/noticias/rss",
    "https://www.conjur.com.br/rss.xml"
  ];

  let allNews = [];

  for (let source of sources) {
    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source)}`
      );
      const data = await response.json();
      if (data.items) {
        allNews = allNews.concat(data.items);
      }
    } catch (error) {
      console.log("Erro na fonte:", source);
    }
  }

  allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  res.status(200).json(allNews.slice(0, 50));
}
