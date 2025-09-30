export const formatDate = (date: string | Date): string => {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}