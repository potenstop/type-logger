import {Configuration} from "../../../src/core/Configuration";
import {LoggerFactory} from "../../../src/core/LoggerFactory";

describe("测试 logger.test", () => {
    it("exec", async () => {
        Configuration.configure(require("./typeslf4.json"));
        const logger = LoggerFactory.getLogger("type-slf4.test.project.logger");
        logger.debug("111");
        logger.info("111");
    });
});
