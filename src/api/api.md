## 热门视频排行
-  请求地址：`/api/x/web-interface/popular`
-  请求方式：Get
-  请求入参
   -  ps：每页数量
   -  pn：第N页

## B站搜索
-  请求地址：`/api/x/web-interface/search/all/v2`
-  请求方式：Get
-  请求入参
   -  page：第N页
   -  keyword：搜索关键词
   -  from_source: 搜索来源，如：web_search
   -  platform: 平台，如：pc
   -  context: 未知

## 获取视频cid
-  请求地址: `/api/x/web-interface/view`
-  请求方式：Get
-  请求入参
   -  aid: 视频aid
   -  bvid: 视频bvid

## 获取视频Url
-  请求地址：`/api/x/player/playurl`
-  请求方式：Get
-  请求入参
   -  aid: 视频aid
   -  bvid: 视频bvid
   -  cid: 视频cid
   -  qn: 未知，如：16
   -  type: 视频类型，如：mp4
   -  otype: 接口输出数据类型，如：json
   -  platform: 平台，如：html5

## 获取UP信息
-  请求地址：`/api/x/space/acc/info`
-  请求方式：Get
-  请求入参
   -  mid: up主id
   
## 获取UP关注、粉丝数
-  请求地址：`/api/x/relation/stat`
-  请求方式：Get
-  请求入参
   -  vmid: up主id
   -  jsonp： jsonp

## 获取UP获赞数、播放数、阅读数
-  请求地址：`/api/x/space/upstat`
-  请求方式：Get
-  请求入参
   -  mid: up主id
   -  jsonp： jsonp

## 获取UP公告
-  请求地址：`/api/x/space/notice`
-  请求方式：Get
-  请求入参
   -  mid: up主id
   -  jsonp： jsonp

## 获取UP视频
-  请求地址：`/api/x/space/arc/search`
-  请求方式：Get
-  请求入参
   -  mid: up主id
   -  ps: 每页视频数据
   -  pn: 第N页
   -  tid: 0
   -  keyword: UP视频关键词
   -  order: 排序方式，如：pubdate