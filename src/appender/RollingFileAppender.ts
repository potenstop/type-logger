import {Appender} from "../model/Appender";
import * as fs from "fs";
import * as path from "path";
import {IAppender} from "./IAppender";
import {PatternLayoutBase} from "../layout/PatternLayoutBase";
import {FileSockets} from "../core/FileSockets";

/**
 *
 * 功能描述: 按文件的最大记录日志至本地
 *
 * @className FileAppender
 * @projectName type-slf4
 * @author yanshaowen
 * @date 2019/3/4 10:32
 */
interface IFileAppenderExt {
    "fileNamePattern": string;
    // "maxHistory?": number;
    // 单个文件的最大写入大小  kb mb gb 不设置则不限制
    "maxFileSize"?: string;
}
export class RollingFileAppender implements IAppender {
    private appender: Appender;
    constructor(appender: Appender) {
        this.appender = appender;
        if (!appender.appenderExt) {
            throw new Error(`appenderName(${appender.name}) not found appenderExt`);
        }
        const appenderExt = appender.appenderExt as IFileAppenderExt;
        if (!appenderExt.fileNamePattern) {
            throw new Error(`appenderName(${appender.name}).appenderExt.fileNamePattern is null`);
        }
        appenderExt.fileNamePattern = path.join(appenderExt.fileNamePattern.replace(/^@/, process.cwd() + "/"));
        appenderExt.fileNamePattern += ".log";
        const dir = path.dirname(appenderExt.fileNamePattern);
        // 判断目录是否存在 不存在则创建 创建失败抛出异常
        try {
            const state = fs.statSync(dir);
            if (!state.isDirectory()) {
                throw new Error("not is dir");
            }
        } catch (e) {
            fs.mkdirSync(dir);
        }
        // 检查maxFileSize是否正确
        if (appenderExt.maxFileSize) {
            const unit = appenderExt.maxFileSize.slice(appenderExt.maxFileSize.length - 2);
            if (["KB", "MB", "GB"].indexOf(unit) === -1) {
                throw new Error(`appenderExt.maxFileSize(${appenderExt.maxFileSize}) unit error,(MB, KB, GB)`);
            }
            const num = +appenderExt.maxFileSize.slice(0, appenderExt.maxFileSize.length - 2);
            if (isNaN(num)) {
                throw new Error(`appenderExt.maxFileSize(${appenderExt.maxFileSize}) error, example 100MB`);
            }
            if (unit === "MB") {
                appenderExt.maxFileSize = num * 1024 * 1024 + "";
            } else if (unit === "GB") {
                appenderExt.maxFileSize = num * 1024 * 1024 * 1024 + "";
            } else {
                appenderExt.maxFileSize = num * 1024 + "";
            }
        }
        FileSockets.loadDir(dir);
    }
    /**
     * 方法功能描述: 获取文件的socket
     * @author yanshaowen
     * @date 2019/3/4 13:22
     * @return
     */
    public getFileSocket(): number {
        const appenderExt = this.appender.appenderExt as IFileAppenderExt;
        // 替换变量
        const originFilePath = PatternLayoutBase.variableReplace(appenderExt.fileNamePattern, {
            date: new Date(),
        });
        const o = FileSockets.getAliasOrOrigin(originFilePath) as any;
        const fd = o.fd;
        const realPath = o.filePath;
        let newFd;
        try {
            const state = fs.fstatSync(fd);
            if (state.isFile()) {
                // 判断大小是否超过限制
                if (state.size >= +appenderExt.maxFileSize) {
                    // 关闭fd
                    FileSockets.closeFile(realPath);
                    newFd = FileSockets.openAliasFile(originFilePath);
                } else {
                    newFd = fd;
                }
            } else {
                newFd = FileSockets.openFile(originFilePath);
            }
        } catch (e) {
            newFd = FileSockets.openFile(originFilePath);
        }
        return newFd;
    }
    public write(data: string) {
        fs.write(this.getFileSocket(), data, (e) => {
            if (e) { console.error(e); }
        });
    }
}
