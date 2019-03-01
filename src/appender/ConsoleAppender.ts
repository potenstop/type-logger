/**
 *
 * 功能描述:
 *
 * @className ConsoleAppender
 * @projectName type-slf4
 * @author yanshaowen
 * @date 2019/2/26 9:56
 */
import {IAppender} from "./IAppender";
import * as fs from "fs";
import {Appender} from "../model/Appender";

export class ConsoleAppender implements IAppender {
    private appender: Appender;
    constructor(appender: Appender) {
        this.appender = appender;
    }
    public write(data: string) {
        fs.writeSync(1, data);
    }

}
