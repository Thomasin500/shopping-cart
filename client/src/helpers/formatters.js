const formatCurrency = (number) => {
    debugger
    if (number) {
        return '$' + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else return '-';
}

module.exports = formatCurrency;