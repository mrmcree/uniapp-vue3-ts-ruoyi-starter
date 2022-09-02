export class Enum {
  static enumKeys: Array<string>
  static enumValues: Array<Enum>
  private name: string
  private code: string
  private color: string
  enumKey!: string
  enumOrdinal!: number

  /**
     *
     * @param name {string} 枚举名称
     * @param code {string|number} 枚举编码
     * @param color {string} 枚举颜色
     */
  constructor(name: string, code: string, color = '#fff') {
    this.name = name
    this.code = code
    this.color = color
  }

  /**
     * 内部方法
     */
  static insideEnum() {
    const enumKeys = []
    const enumValues = []
    for (const [key, value] of Object.entries(this)) {
      enumKeys.push(key)
      value.enumKey = key
      value.enumOrdinal = enumValues.length
      value.dictLabel = value.name
      value.dictValue = value.code

      enumValues.push(value)
    }
    this.enumKeys = enumKeys
    this.enumValues = enumValues
  }

  /**
     * 获取枚举值
     * @param str
     * @returns {undefined|*}
     */
  static enumValueOf(str: string) {
    const index = this.enumKeys.indexOf(str)
    if (index >= 0) {
      return this.enumValues[index]
    }
    return undefined
  }

  /**
     * 获取枚举值
     * @param str
     * @returns {undefined|*}
     */
  static getCode(str: string) {
    const index = this.enumValues.findIndex(item => item.name === str)
    if (index !== -1) {
      return this.enumValues[index].code
    }
    return undefined
  }

  /**
     * 获取枚举值
     * @param str
     * @returns {undefined|*}
     */
  static getName(str: string) {
    const index = this.enumValues.findIndex(item => Number(item.code) === Number(str))
    if (index !== -1) {
      return this.enumValues[index].name
    }
    return undefined
  }

  /**
     * 获取枚举值
     * @param str
     * @returns {undefined|*}
     */
  static getColor(str: string) {
    const index = this.enumValues.findIndex(item => Number(item.code) === Number(str))

    if (index !== -1) {
      return this.enumValues[index].color
    }
    return undefined
  }

  /**
     * 定义迭代器
     * @returns {IterableIterator<*>}
     */
  static [Symbol.iterator]() {
    return this.enumValues[Symbol.iterator]()
  }

  toString() {
    return `${this.constructor.name}.${this.enumKey}`
  }
}
// demo
// export class Color extends Enum {
//   static red = new Color('红色', '#f44336');
//   static _ = this.insideEnum(); // TypeScript: Color.closeEnum()
// }
