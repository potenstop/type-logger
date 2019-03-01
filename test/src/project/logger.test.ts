import {Configuration} from "../../../src/core/Configuration";
import {LoggerFactory} from "../../../src/core/LoggerFactory";

describe("测试 logger.test", () => {
    it("exec", async () => {
        // Configuration.configure(require("./typelogger.json"));
        const logger = LoggerFactory.getLogger("type-logger.test.project.logger");
        logger.debug("111");
        logger.info("111");
    });
});
