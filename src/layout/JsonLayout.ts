/**
 *
 * 功能描述:
 *
 * @className JsonLayout
 * @projectName type-logger
 * @author yanshaowen
 * @date 2019/3/1 17:46
 */
import {ILayout} from "./ILayout";
import {Layout} from "../model/Layout";

export class JsonLayout implements ILayout {
    constructor(layout: Layout) {
        // this.pattern = layout.pattern;
    }
}
