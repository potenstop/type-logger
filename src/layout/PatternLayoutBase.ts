import {Layout} from "../model/Layout";
import {ILayout} from "./ILayout";
import {LogMessage} from "../model/LogMessage";
import {DateUtil} from "../util/DateUtil";

/**
 *
 * 功能描述: 对日志的匹配和替换
 *
 * @className PatternLayoutBase
 * @projectName type-slf4
 * @author yanshaowen
 * @date 2019/3/4 10:47
 */
export class PatternLayoutBase implements ILayout {
    private readonly pattern: string;
    // 匹配key和参数
    private static variableRe = /%[a-zA-Z_]\w*({.*})*/g;
    private static keyRe = /%([a-zA-Z_]\w*)/;
    constructor(layout: Layout) {
        this.pattern = layout.pattern;
    }
    public toString(logMessage: LogMessage): string {
        try {
            return PatternLayoutBase.variableReplace(this.pattern, {
                date: logMessage.startTime,
                level: logMessage.level.name,
                class: logMessage.stackType.className,
                method: logMessage.stackType.methodName,
                file: logMessage.stackType.file,
                line: logMessage.stackType.line,
                row: logMessage.stackType.row,
                msg: logMessage.data,
                n: "\n",
                error: logMessage.error,
            });
        } catch (e) {
            return e.message + e.stack;
        }
    }
    public static variableReplace(str: string, variables: object) {
        const matchList = str.match(PatternLayoutBase.variableRe);
        if (!Array.isArray(matchList) || matchList.length === 0) {
            return str;
        }
        const matchSet = new Set(matchList);
        for (let v of matchSet) {
            v = v as string;
            const variableKey = v.match(PatternLayoutBase.keyRe)[1];
            let variableValue = variables[variableKey];
            if (typeof variableValue === "string" && variableKey !== "n") {
                variableValue = variableValue.replace(/(\r\n)|(\n)/g, "\\n");
            }
            if (variableKey === "date") {
                const params = v.slice(5, v.length);
                if (variableValue instanceof Date) {
                    let format = "yyyy-mm-dd HH:mm:ss.S";
                    if (params.length > 0) {
                        const params1 = params.split("}")[0];
                        format = params1.slice(1, params1.length);
                    }
                    variableValue = DateUtil.format(variableValue, format);
                }
            }
            if (variableValue instanceof Error) {
                const values = [];
                Object.keys(variableValue).map((k) => {
                    if (k !== "name") {
                        if (typeof variableValue[k] === "object") {
                            values.push(`${k}:${JSON.stringify(variableValue[k])}`);
                        } else {
                            values.push(`${k}:${variableValue[k]}`);
                        }
                    }
                });
                variableValue = ` ${variableValue.stack}\n${values.toString()} `;
                variableValue = variableValue.replace(/(\r\n)|(\n)/g, "\\n");
            } else if (typeof variableValue === "object") {
                variableValue = JSON.stringify(variableValue);
            }
            const re = new RegExp(v, "gm");
            str = str.replace(re, variableValue);
        }
        return str;

    }
}
