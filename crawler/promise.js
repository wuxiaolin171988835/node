const http = require("http");
const cheerio = require("cheerio");
const filterChapters = html => {
  let $ = cheerio.load(html);
  let chapters = $(".chapter");
  let courseData = [];
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
        videos.push({
          id: $(obj).attr("data-media-id"),
          text: $(obj)
            .text()
            .trim()
        });
      });
    courseData.push({
      title: title,
      description: description,
      videos: videos
    });
  });
  return courseData;
};
const printCourseData = courseInfo => {
  courseInfo.forEach(item => {
    console.log(`${item.title}\n`);
    console.log(`* ${item.description}\n`);
    item.videos.forEach(obj => {
      console.log(`【${obj.id}】：${obj.text}\n`);
    });
  });
};
http
  .get("http://www.imooc.com/learn/766", res => {
    let html = "";
    res.on("data", chunk => {
      html += chunk;
    });
    res.on("end", () => {
      let courseInfo = filterChapters(html);
      printCourseData(courseInfo);
    });
  })
  .on("error", e => {
    console.log("获取数据出错!");
  });
