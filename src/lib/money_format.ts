function formatMoney(amount: number) {
    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS'
    });

    const numericalAmount = parseFloat(formatter.format(amount).replace(/[^\d.]/g, ''));

    const formattedAmount = numericalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return `${amount < 0 ? '-' : ''}${formattedAmount} so'm`;
}
export default formatMoney
