export default async function handler(req, res) {
  const sources = [
  { name: "TST", url: "https://www.tst.jus.br/rss" },
  { name: "CNJ", url: "https://www.cnj.jus.br/feed/" },
  { name: "Conjur", url: "https://www.conjur.com.br/rss.xml" },
  { name: "Agência Brasil", url: "https://agenciabrasil.ebc.com.br/rss/justica" },
  { name: "G1 Política", url: "https://g1.globo.com/rss/g1/politica/" },
  { name: "Jota", url: "https://www.jota.info/feed" }
];


  let allNews = [];

  for (let source of sources) {
    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`
      );
      const data = await response.json();

      if (!data.items) continue;

      data.items.forEach(item => {
        if (!item.pubDate) return;

        allNews.push({
          title: item.title,
          link: item.link,
          date: item.pubDate,
          source: source.name
        });
      });
    } catch (error) {
      console.log("Erro no feed:", source.name);
    }
  }

  res.status(200).json(allNews);
}
