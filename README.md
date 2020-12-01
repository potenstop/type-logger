type-slf4是基于typescript开发的通用日志记录框架

type-slf4支持的特性：
- 自动加载配置(目前仅支持json)
- 格式化输出日志
- 按日期分割输出到日志文件


# 入门
## 安装
 `npm install type-slf4 --save`
## 快速配置
resources/typelogger.json(会自动加载该路径的json文件) 也可以手动加载Configuration.configure(require("./typeslf4.json"));
- @为rootDir 默认位项目的目录Configuration.setRootDir(path)手动设置目录   
```json
{
  "appenders": [
    {
      "name": "CONSOLE",
      "class": "ConsoleAppender",
      "layout": {
        "class": "SimpleLayout"
      }
    }, {
      "name": "FORMAT_CONSOLE",
      "class": "ConsoleAppender",
      "layout": {
        "class": "PatternLayout",
        "pattern": "%date{yyyy-MM-dd HH:mm:ss.S} [%level] [%class.%method] %line %row - %msg%n"
      }
    }, {
      "name": "APPLICATION",
      "class": "RollingFileAppender",
      "layout": {
        "class": "JsonLayout",
        "pattern": "createTime:%date{yyyy-MM-dd HH:mm:ss.S}, level:%level,className:%class,methodName:%method,line:%line,row:%row,message:%msg,file:%file"
      },
      "appenderExt": {
        "fileNamePattern" : "@logs/application/application-%date{yyyy-MM-dd}",
        "maxFileSize": "4KB"
      }
    }
  ],
  "loggers": [
    {"name": "type-slf4.*", "level": "TRACE", "additivity": false, "appenderRefs":  [{"ref": "APPLICATION"}, {"ref": "FORMAT_CONSOLE"}]}
  ],
  "root": {
    "level": "TRACE",
    "appenderRefs": [{
      "ref": "CONSOLE"
    }, {
      "ref": "FORMAT_CONSOLE"
    }]
  }
}

```
## 使用
```javascript 1.8
const logger = LoggerFactory.getLogger("type-slf4.test.project.logger");
logger.debug("111");
```

# 更新日志
- 0.0.1 支持格式化输出日志
- 0.0.2 项目改名
- 0.0.3 支持按日志分割输出
- 0.0.8 设置项目目录

