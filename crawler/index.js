const http = require("http");
const cheerio = require("cheerio");
const url = "http://www.imooc.com/learn/175";
const printCourseInfo = result => {
  result.forEach(item => {
    console.log(`${item.title}\n`);
    console.log(`*  ${item.description}\n`);
    item.videos.forEach(obj => {
      console.log(`【${obj.id}】 ${obj.text}`);
    });
  });
};
const filterChapters = html => {
  let $ = cheerio.load(html);
  let chapters = $(".chapter");
  let courseData = [];
  chapters.each((index, item) => {
    let chapter = $(item);
    let title = chapter
      .find("h3")
      .text()
      .trim();
    let desc = chapter
      .find(".chapter-description")
      .text()
      .trim();
    let chapterData = {
      title: title,
      description: desc,
      videos: []
    };
    let videos = chapter.find(".video").children("li");
    videos.each((index, item) => {
      let video = $(item).find(".J-media-item");
      let videoId = $(item)
        .attr("data-media-id")
        .trim();
      let videoText = $(item)
        .text()
        .trim();
      chapterData.videos.push({
        id: videoId,
        text: videoText
      });
    });
    courseData.push(chapterData);
  });
  return courseData;
};
http
  .get(url, res => {
    let html = "";
    res.on("data", chunk => {
      html += chunk;
    });
    res.on("end", () => {
      let result = filterChapters(html);
      printCourseInfo(result);
      console.log("抓取完毕！");
    });
  })
  .on("error", () => {
    console.log("获取课程信息失败！");
  });
