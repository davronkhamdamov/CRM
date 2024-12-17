function formatMoney(amount: number) {
  const absAmount = Math.abs(amount);
  const parts = absAmount.toFixed(2).split(".");

  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedAmount = `${integerPart}.${parts[1]}`;

  return `${amount < 0 ? "-" : ""}${formattedAmount} so'm`;
}

export default formatMoney;
