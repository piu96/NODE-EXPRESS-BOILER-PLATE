const Page = require('../../../models/pages.model'); // Adjust path as needed
const { formatDate } = require('../../../utils/date.util'); // Common date formatter
const { validationResult } = require("express-validator");
const PageTemplateService = require('./services/web.pages.home.service');

class PagesController {
     pagesCms = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: 1,
                    message: errors.array()[0].msg
                });
            }
            
    
        } catch (error) {
            console.error("Error fetching page:", error);
            return res.status(500).json({
                error: 1,
                message: "Internal Server Error"
            });
        }
    };
    
}

module.exports = PagesController;
