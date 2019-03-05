import {RollingFileAppender} from "../../../src/appender/RollingFileAppender";
import * as path from "path";
import {FileSockets} from "../../../src/core/FileSockets";
describe("测试 RollingFileAppender.test", () => {
    it("write", async () => {
        new RollingFileAppender({
        name: "APPLICATION",
        class: "RollingFileAppender",
        layout: {
           class: "JsonLayout",
           pattern: "create_time: %date",
        },
        appenderExt: {
           fileNamePattern : "@logs/application/application-%date{yyyy-MM-dd}",
           maxFileSize: "100KB",
        }} as any).write("444\n");
        new RollingFileAppender({
            name: "APPLICATION",
            class: "RollingFileAppender",
            layout: {
                class: "JsonLayout",
                pattern: "create_time: %date",
            },
            appenderExt: {
                fileNamePattern : "@logs/database/database-%date{yyyy-MM-dd}",
                maxFileSize: "100KB",
            }} as any).write("444\n");
    });
});
