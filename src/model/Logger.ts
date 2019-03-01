import {AppenderRef} from "./AppenderRef";

/**
 *
 * 功能描述:
 *
 * @className Logger
 * @projectName type-slf4
 * @author yanshaowen
 * @date 2019/2/26 13:30
 */
export class Logger {
    public name: string;
    public level: string;
    public additivity: boolean;
    public appenderRefs: AppenderRef[];
}
