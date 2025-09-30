export default function formatCurrencyVND(money: number) {
    if (isNaN(money)) return '0 VNĐ'

    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ'
}