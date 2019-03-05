import {Appender} from "../model/Appender";
import * as fs from "fs";
import {IAppender} from "./IAppender";

/**
 *
 * 功能描述: 按日期分隔记录至本地
 *
 * @className DailyRollingFileAppender
 * @projectName type-slf4
 * @author yanshaowen
 * @date 2019/3/4 10:42
 */
export class DailyRollingFileAppender implements IAppender {
    private appender: Appender;
    constructor(appender: Appender) {
        this.appender = appender;
    }
    public write(data: string) {
        fs.writeSync(1, data);
    }
}
