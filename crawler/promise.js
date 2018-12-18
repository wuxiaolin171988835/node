const http = require("http");
const Promise = require("bluebird");
const cheerio = require("cheerio");
const baseUrl = "http://www.imooc.com/learn/";
const filterChapters = html => {
  let $ = cheerio.load(html);
  let chapters = $(".chapter");
  let courseData = [];
  let title = $(".hd")
    .find("h2")
    .text()
    .trim();
  let chapterData = [];
  chapters.each((index, item) => {
    let chapterTitle = $(item)
      .find("h3")
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
    chapterData.push({
      chapterTitle: chapterTitle,
      videos: videos
    });
  });
  courseData = {
    title: title,
    chapterData: chapterData
  };
  return courseData;
};
const printCourseData = coursesData => {
  coursesData.forEach(course => {
    console.log(`课程标题：${course.title}\n`);
    course.chapterData.forEach(chapter => {
      console.log(`*${chapter.chapterTitle}\n`);
      chapter.videos.forEach(video => {
        console.log(`【${video.id}】：${video.text}\n`);
      });
    });
  });
};
const getPageAsync = url => {
  return new Promise((resolve, reject) => {
    console.log(`正在爬取 ${url}`);
    http
      .get(url, res => {
        let html = "";
        res.on("data", chunk => {
          html += chunk;
        });
        res.on("end", () => {
          resolve(html);
          // let courseInfo = filterChapters(html);
          // printCourseData(courseInfo);
        });
      })
      .on("error", e => {
        reject(e);
        console.log("获取数据出错!");
      });
  });
};
let fetchCourseArray = [];
[971, 953, 944].forEach(id => {
  fetchCourseArray.push(getPageAsync(baseUrl + id));
});
Promise.all(fetchCourseArray).then(pages => {
  let coursesData = [];
  pages.forEach(html => {
    let courseInfo = filterChapters(html);
    coursesData.push(courseInfo);
  });
  console.log(`总共爬取到${coursesData.length}门课程\n`);
  printCourseData(coursesData);
});
