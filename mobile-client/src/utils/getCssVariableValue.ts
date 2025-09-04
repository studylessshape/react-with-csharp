/**
 * 获取指定 CSS 自定义属性的值
 * @param propertyName - CSS 自定义属性名（例如 '--sat'）
 * @param element - 要从中读取属性的元素，默认为 document.documentElement (:root)
 * @returns 属性的字符串值（例如 '44px'），如果不存在则返回空字符串
 */
export function getCssVariableValue(
  propertyName: string,
  element: HTMLElement = document.documentElement
): string {
  // 获取计算样式并返回特定的属性值
  return getComputedStyle(element).getPropertyValue(propertyName).trim();
}

/**
 * 获取解析后的数值（仅适用于像素值或其他可解析为数字的单位）
 * @param propertyName - CSS 自定义属性名
 * @param element - 要从中读取属性的元素
 * @returns 解析后的数字值（单位会被忽略），如果解析失败则返回 NaN
 */
export function getCssVariableValueAsNumber(
  propertyName: string,
  element: HTMLElement = document.documentElement
): number {
  const value = getCssVariableValue(propertyName, element);
  // 尝试从字符串值中提取数字部分（例如从 "44px" 中提取 44）
  const numericValue = parseFloat(value);
  return numericValue;
}
