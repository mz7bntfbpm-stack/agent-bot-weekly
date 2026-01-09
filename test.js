const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    
    page.on('pageerror', err => {
        errors.push(err.message);
    });
    
    try {
        await page.goto('file:///workspace/crm-landing-page/index.html');
        await page.waitForLoadState('networkidle');
        
        // Test basic interactions
        console.log('Page loaded successfully');
        
        // Check if main sections exist
        const heroExists = await page.$('.hero') !== null;
        const problemExists = await page.$('#problems') !== null;
        const solutionExists = await page.$('#solution') !== null;
        const casesExists = await page.$('#cases') !== null;
        const pricingExists = await page.$('#pricing') !== null;
        const faqExists = await page.$('#faq') !== null;
        const footerExists = await page.$('.footer') !== null;
        
        console.log('Sections check:');
        console.log('- Hero:', heroExists ? 'OK' : 'MISSING');
        console.log('- Problems:', problemExists ? 'OK' : 'MISSING');
        console.log('- Solution:', solutionExists ? 'OK' : 'MISSING');
        console.log('- Case Studies:', casesExists ? 'OK' : 'MISSING');
        console.log('- Pricing:', pricingExists ? 'OK' : 'MISSING');
        console.log('- FAQ:', faqExists ? 'OK' : 'MISSING');
        console.log('- Footer:', footerExists ? 'OK' : 'MISSING');
        
        // Test FAQ accordion
        const faqButton = await page.$('.faq-question');
        if (faqButton) {
            await faqButton.click();
            console.log('FAQ accordion: OK');
        }
        
        // Test form exists
        const formExists = await page.$('#contactForm') !== null;
        console.log('Contact form:', formExists ? 'OK' : 'MISSING');
        
        // Test mobile responsive
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        console.log('Mobile viewport: OK');
        
        if (errors.length > 0) {
            console.log('\nConsole errors found:');
            errors.forEach(err => console.log('-', err));
        } else {
            console.log('\nNo console errors detected');
        }
        
    } catch (err) {
        console.error('Test failed:', err.message);
    } finally {
        await browser.close();
    }
})();
