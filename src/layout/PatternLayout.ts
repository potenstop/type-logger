/**
 *
 * 功能描述: 格式化日志类
 * %date: 当前的时间 支持格式化输出 如{yyyy-MM-dd HH:mm:ss.SSS}
 * %level: 当前日志的级别
 * %class:     类名称
 * %method:  方法名称
 * %file:       文件路径
 * %line:       行号
 * %row:       列号
 * %msg:        日志文本
 * %n:          换行
 * @className PatternLayout
 * @projectName type-logger
 * @author yanshaowen
 * @date 2019/2/27 9:16
 */
import {ILayout} from "./ILayout";
import {LogMessage} from "../model/LogMessage";
import {DateUtil} from "../util/DateUtil";
import {Layout} from "../model/Layout";

export class PatternLayout implements ILayout {
    private readonly pattern: string;
    // 匹配key和参数
    private static variableRe = /%[a-zA-Z_]\w*({.*})*/g;
    private static keyRe = /%([a-zA-Z_]\w*)/;
    constructor(layout: Layout) {
        this.pattern = layout.pattern;
    }
    public toString(logMessage: LogMessage): string {
        try {
            return PatternLayout.variableReplace(this.pattern, {
                date: logMessage.startTime,
                level: logMessage.level.name,
                class: logMessage.stackType.className,
                method: logMessage.stackType.methodName,
                file: logMessage.stackType.file,
                line: logMessage.stackType.line,
                row: logMessage.stackType.row,
                msg: logMessage.data,
                n: "\n",
            });
        } catch (e) {
            return e.message + e.stack;
        }
    }
    private static variableReplace(str: string, variables: object) {
        const matchList = str.match(PatternLayout.variableRe);
        if (!Array.isArray(matchList) || matchList.length === 0) {
            return str;
        }
        const matchSet = new Set(matchList);
        for (let v of matchSet) {
            v = v as string;
            const variableKey = v.match(PatternLayout.keyRe)[1];
            let variableValue = variables[variableKey];

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
                variableValue = `{ ${variableValue.stack} \n    ${values.toString()} } `;
            } else if (typeof variableValue === "object") {
                variableValue = JSON.stringify(variableValue);
            }
            const re = new RegExp(v, "gm");
            str = str.replace(re, variableValue);
        }
        return str;

    }
}
