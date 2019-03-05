/**
 *
 * 功能描述: 生成json字符的格式
 * 如: create_time: %date{yyyy-MM-dd HH:mm:ss.SSS}, msg: %msg
 *
 * @className JsonLayout
 * @projectName type-slf4
 * @author yanshaowen
 * @date 2019/3/1 17:46
 */
import {Layout} from "../model/Layout";
import {LogMessage} from "../model/LogMessage";
import {PatternLayoutBase} from "./PatternLayoutBase";

export class JsonLayout extends PatternLayoutBase {
    private static valueStringRe = /%[a-zA-Z_]\w*({.*})*/g;
    private static keyStringRe = /[a-zA-Z_]\w*:\s*%/g;
    constructor(layout: Layout) {
        // key添加双引号
        const keyMatchArray = layout.pattern.match(JsonLayout.keyStringRe) || [];
        keyMatchArray.forEach((v) => {
            layout.pattern = layout.pattern.replace(new RegExp(v, "gm"), `"${v.split(":")[0]}":%`);
        });
        // 替换为标准的json
        const valueMatchArray = layout.pattern.match(JsonLayout.valueStringRe) || [];
        // value添加双引号
        valueMatchArray.forEach((v) => {
            layout.pattern = layout.pattern.replace(new RegExp(v, "gm"), `"${v}"`);
        });
        super(layout);
    }
    public toString(logMessage: LogMessage): string {
        return "{" + super.toString(logMessage) + "}\n";
    }
}
