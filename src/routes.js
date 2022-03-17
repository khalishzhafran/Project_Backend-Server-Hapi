const {
    authHandler,
    dashboardHandler,
    getAllQuotesHandler,
    getQuoteHandler,
    addQuoteHandler,
    updateQuoteHandler,
    deleteQuoteHandler,
} = require("./handler");

const routes = [
    {
        method: "GET",
        path: "/{username}&{password}",
        handler: authHandler,
    },
    {
        method: "GET",
        path: "/dashboard",
        handler: dashboardHandler,
    },
    {
        method: "POST",
        path: "/quotes",
        handler: addQuoteHandler,
    },
    {
        method: "GET",
        path: "/quotes",
        handler: getAllQuotesHandler,
    },
    {
        method: "GET",
        path: "/quotes/{quoteId}",
        handler: getQuoteHandler,
    },
    {
        method: "PUT",
        path: "/quotes/{quoteId}",
        handler: updateQuoteHandler,
    },
    {
        method: "DELETE",
        path: "/quotes/{quoteId}",
        handler: deleteQuoteHandler,
    },
];

module.exports = routes;
