const http = require("http");
const querystring = require("querystring");
const postData = querystring.stringify({
  content: "期待后续更多的课程！",
  cid: 637,
  mid: 11549
});
const options = {
  hostname: "www.imooc.com",
  port: 80,
  path: "/course/docomment",
  method: "POST",
  headers: {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Length": postData.length,
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie:
      "imooc_uuid=1f8d5b5b-7946-4300-a151-25f90c33ae45; imooc_isnew_ct=1537260600; imooc_isnew=2; UM_distinctid=1661f2e8f2c10f-088ec34958ad23-346a7809-13c680-1661f2e8f2d3e8; CNZZDATA1261110065=515641218-1538121451-https%253A%252F%252Fwww.baidu.com%252F%7C1538121451; zg_did=%7B%22did%22%3A%20%22166818e9624cef-094b8cee82c776-346a7809-13c680-166818e9625285%22%7D; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1541070885,1541154138,1541154602; CNZZDATA1275034521=1272261686-1541660066-https%253A%252F%252Fwww.imooc.com%252F%7C1541660066; CNZZDATA1275035727=96213477-1541661495-https%253A%252F%252Fwww.imooc.com%252F%7C1541661495; loginstate=1; apsid=RmMmMyZjJjOTEzZWFhNjFiMDc1OGFmNmUxNTMyNmYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDA5MzA2NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxODgxMDk3OTY5NEAxNjMuY29tAAAAAAAAAAAAAAAAADkwYmQwYTRjNzk4NTNiZThlNmZhMDI4NDM2NDFhYTk0iujzW4ro81s%3DMD; PHPSESSID=vvffa9o41h4up53mceodchtjr5; IMCDNS=0; zg_f375fe2f71e542a4b890d9a620f9fb32=%7B%22sid%22%3A%201544431149294%2C%22updated%22%3A%201544431159449%2C%22info%22%3A%201544168562326%2C%22superProperty%22%3A%20%22%7B%5C%22%E5%BA%94%E7%94%A8%E5%90%8D%E7%A7%B0%5C%22%3A%20%5C%22%E6%85%95%E8%AF%BE%E7%BD%91%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1%5C%22%2C%5C%22%E5%B9%B3%E5%8F%B0%5C%22%3A%20%5C%22web%5C%22%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22www.baidu.com%22%2C%22cuid%22%3A%20%22MVFfSz3JE9k%2C%22%7D; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1544005395,1544168586,1544177910,1544431160; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1544431163; cvde=5c0e262cd78bf-5",
    Host: "www.imooc.com",
    Origin: "https://www.imooc.com",
    Pragma: "no-cache",
    Referer: "https://www.imooc.com/video/11549",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
  }
};
const req = http.request(options, res => {
  console.log(`状态码：${res.statusCode}`);
  console.log(`响应头：${JSON.stringify(res.headers)}`);
  res.on("data", chunk => {
    console.log(Buffer.isBuffer(chunk));
    console.log(typeof chunk);
  });
  res.on("end", () => {
    console.log("评论完毕！");
  });
});
req.on("error", e => {
  console.log(`请求失败：${e.message}`);
});
req.write(postData);
req.end();
