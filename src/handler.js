const { nanoid } = require("nanoid");
const quotes = require("./quotes");
const credential = require("./credential");

let isLogin = false;

const authHandler = (req, res) => {
    if (isLogin) {
        return res.redirect("/dashboard");
    }

    const { username, password } = req.params;

    if (username === credential.uName && password === credential.pWord) {
        isLogin = true;
        return res.redirect("/dashboard");
    }

    const response = res.response({
        status: "fail",
        message: "Username atau password salah",
    });

    response.code(401);
    return credential;
};

const dashboardHandler = (req, res) => {
    if (!isLogin) {
        return res.redirect("/");
    }

    const response = res.response({
        status: "success",
        message: "Welcome to the dashboard!",
    });

    response.code(200);
    return response;
};

const addQuoteHandler = (req, res) => {
    if (!isLogin) {
        return res.redirect("/");
    }

    const { author, quote } = req.payload;

    const id = nanoid(20);
    const updateAt = new Date().toISOString();

    const newQuote = {
        id,
        author,
        quote,
        updateAt,
    };

    quotes.push(newQuote);

    const isSuccess = quotes.filter((quote) => quote.id === id).length > 0;

    if (isSuccess) {
        const response = res.response({
            status: "success",
            message: "Quote berhasil ditambahkan",
            data: {
                quoteId: id,
            },
        });

        response.code(201);
        return response;
    }

    const response = res.response({
        status: "fail",
        message: "Quote gagal ditambahkan",
    });

    response.code(500);
    return response;
};

const getAllQuotesHandler = (req, res) => {
    if (!isLogin) {
        return res.redirect("/");
    }

    const response = res.response({
        status: "success",
        data: {
            quotes,
        },
    });

    response.code(201);
    return response;
};

const getQuoteHandler = (req, res) => {
    if (!isLogin) {
        return res.redirect("/");
    }

    const { quoteId } = req.params;

    const quote = quotes.filter((quote) => quote.id === quoteId)[0];

    if (quote !== undefined) {
        return {
            status: "success",
            message: "Quote berhasil ditemukan",
            data: {
                quote,
            },
        };
    }

    const response = res.response({
        status: "fail",
        message: "Quote tidak ditemukan",
    });

    response.code(404);
    return response;
};

const updateQuoteHandler = (req, res) => {
    if (!isLogin) {
        return res.redirect("/");
    }

    const { quoteId } = req.params;

    const { author, quote } = req.payload;

    const updateAt = new Date().toISOString();
    const index = quotes.findIndex((quote) => quote.id === quoteId);
    console.log(index);

    if (index !== -1) {
        quotes[index] = {
            ...quotes[index],
            author,
            quote,
            updateAt,
        };

        const response = res.response({
            status: "success",
            message: "Quote berhasil diupdate",
            data: {
                quotes,
            },
        });

        response.code(200);
        return response;
    }
};

const deleteQuoteHandler = (req, res) => {
    if (!isLogin) {
        return res.redirect("/");
    }

    const { quoteId } = req.params;

    const index = quotes.findIndex((quote) => quote.id === quoteId);

    if (index !== -1) {
        quotes.splice(index, 1);

        const response = res.response({
            status: "success",
            message: "Quote berhasil dihapus",
        });

        response.code(201);
        return response;
    }
};

module.exports = {
    authHandler,
    dashboardHandler,
    addQuoteHandler,
    getAllQuotesHandler,
    getQuoteHandler,
    updateQuoteHandler,
    deleteQuoteHandler,
};
