import {Configuration, LoggerFactory} from "../../../src";

class A {
    public toString(): string {
        return "A";
    }
}
describe("测试 logger.test", () => {
    it("exec", async () => {
        Configuration.configure(require("./typeslf4.json"));
        const logger = LoggerFactory.getLogger("type-slf4.test.project.logger");
        logger.info("211111")
        logger.trace("111A {}, {}, {}, {}, {}, {}, {}, {}", 1, "sssd", {}, new A(), true, null, JSON.stringify({"a": "1"}));
        logger.info("B111\n333\n");
        logger.error("C1112, [{}]", new Error("11"), 11, 223, 44);
    });
});
