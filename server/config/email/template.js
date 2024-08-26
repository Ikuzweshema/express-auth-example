const ejs = require("ejs");
const path = require("path");

const renderHtml = async (code, username, from) => {
 return await ejs.renderFile(path.join(__dirname, "/views", "email-template.ejs"), {
    username: username,
    code: code,
    email: from,
  });
};
module.exports = renderHtml;
