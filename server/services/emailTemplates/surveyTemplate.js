const keys = require('../../config/keys')

module.exports = (survey) => {
    // the redirect link for "yes" and "no" could be improved to either say thank you and styling that route via a component. And with a no answer- maybe adding something that allows user to tell us how we can improve.
    return `
        <html>
            <body>
                <div style="text-align: center;">
                        <h3>I'd like your input</h3>
                        <p>Please answer the following question:</p>
                        <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                     </div>
                </div>
            </body>
        </html>
    `;
};
