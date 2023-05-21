setTimeout(function (url1) {
    const shares = "List of shares";
    setTimeout(function (url2, shares) {
        const quotes = "List of quotes";
        setTimeout(function (url3, shares, quotes) {
            const rates = 'rates';
            const res = shares * quotes / rates;
        }, 1000)
    }, 1000)
}, 1000, url1)

