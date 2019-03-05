/**
 *
 * 功能描述:
 *
 * @className LoggerFactory
 * @projectName type-slf4
 * @author yanshaowen
 * @date 2019/2/25 15:05
 */
import {Configuration} from "./Configuration";
import {Logger} from "./Logger";
import {ILogger} from "type-interface";
import * as path from "path";
if (!Configuration.getConfigure()) {
    // 尝试加载项目的src目录的typeslf4.json
    try {
        const config = require(path.join(process.cwd(), "src/typeslf4.json"));
        Configuration.configure(config);
    } catch (e) {

    }

}
// 加载配置
export class LoggerFactory {
    public static getLogger(packageName: string): ILogger {
        // Configuration.getConfigure().config;
        return new Logger(packageName);
    }
}
