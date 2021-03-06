import * as uuid from 'uuid';

export default class UuidHelper {
    public static gen() {
        return uuid.v4();
    }

    /**
     * @description 生成给唯一id，做标识。 example: 70(友好文标识)(13位时间戳)(3位随机数)
     * @author yangwend
     * @static
     * @returns
     * @memberof UuidHelper
     */
    public static getOrderId() {
        const timestamp = new Date().getTime().toString();
        const random = (Math.random() * 1000).toString().substr(0, 3);
        return Number(`70${timestamp}${random}`);
    }
}