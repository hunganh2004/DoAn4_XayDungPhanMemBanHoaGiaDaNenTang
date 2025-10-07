export const currencyFormat = (value: number): string => {
  const str = Math.round(value).toString(); // làm tròn và chuyển sang chuỗi
  const formatted = str.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // thêm dấu chấm ngăn cách
  return `${formatted} ₫`; // thêm đơn vị tiền
};