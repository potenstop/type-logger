/**
 *
 * 功能描述:
 *
 * @className LoggerFactory
 * @projectName type-logger
 * @author yanshaowen
 * @date 2019/2/25 15:05
 */
import {Configuration} from "./Configuration";
import {Logger} from "./Logger";
import {ILogger} from "type-interface";
console.log('=======')
if (!Configuration.getConfigure()) {
    // 加载项目的src目录的typelogger.json
    console.log(process.cwd());
}
// 加载配置
export class LoggerFactory {
    public static getLogger(packageName: string): ILogger {
        // Configuration.getConfigure().config;
        return new Logger(packageName);
    }
}
