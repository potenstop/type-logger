import {ConsoleAppender} from "../../../src/appender/ConsoleAppender";

describe("测试 ConsoleAppender.test", () => {
    it("write", async () => {
       new ConsoleAppender().write("11");
    });
});
