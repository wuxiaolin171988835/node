const http = require("http");
const cheerio = require("cheerio");
const filterChapters = html => {
  let $ = cheerio.load(html);
  let chapters = $(".chapter");
  let chaptersData = [];
  chapters.each((index, item) => {
    let title = $(item)
      .find("h3")
      .text()
      .trim();
    let description = $(item)
      .find(".chapter-description")
      .text()
      .trim();
    let videos = [];
    $(item)
      .find(".video")
      .children("li")
      .each((index, obj) => {
        videos.push(
          $(obj)
            .text()
            .trim()
        );
      });
    chaptersData.push({
      title: title,
      description: description,
      videos: videos
    });
  });
  return chaptersData;
};
http
  .get("http://www.imooc.com/learn/766", res => {
    let html = "";
    res.on("data", chunk => {
      html += chunk;
    });
    res.on("end", () => {
      let result = filterChapters(html);
      console.log(result);
    });
  })
  .on("error", e => {
    console.log("获取数据出错!");
  });
