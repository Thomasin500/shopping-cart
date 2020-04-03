const formatCurrency = (number) => {
    return '$' + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

module.exports = formatCurrency;